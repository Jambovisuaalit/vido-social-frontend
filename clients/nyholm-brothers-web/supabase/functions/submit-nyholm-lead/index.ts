import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "@supabase/supabase-js";

const EXACT_ORIGINS = new Set([
  "https://nyholmbrothers.fi",
  "https://www.nyholmbrothers.fi",
  "https://nyholm-brothers-web.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
]);

const VERCEL_PREVIEW_ORIGIN =
  /^https:\/\/nyholm-brothers(?:-sales-site|-web)?-[a-z0-9-]+\.vercel\.app$/;

const MAX_BODY_BYTES = 20_000;
const MIN_FORM_TIME_MS = 1_500;
const MAX_FORM_AGE_MS = 7 * 24 * 60 * 60 * 1_000;

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true;
  return EXACT_ORIGINS.has(origin) || VERCEL_PREVIEW_ORIGIN.test(origin);
}

function corsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    Vary: "Origin",
  };

  if (origin && isAllowedOrigin(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

function json(
  body: Record<string, unknown>,
  status: number,
  origin: string | null,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders(origin),
  });
}

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, maxLength);
}

function optionalText(value: unknown, maxLength: number): string | null {
  const cleaned = cleanText(value, maxLength);
  return cleaned || null;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
}

function isValidPhone(value: string): boolean {
  return /^[+()\d\s.-]{5,40}$/.test(value);
}

function readClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";

  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

async function hmacSha256(value: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (request: Request) => {
  const origin = request.headers.get("origin");

  if (!isAllowedOrigin(origin)) {
    return json({ error: "Origin not allowed" }, 403, origin);
  }

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405, origin);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return json({ error: "Content-Type must be application/json" }, 415, origin);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ error: "Request too large" }, 413, origin);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return json({ error: "Unable to read request" }, 400, origin);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return json({ error: "Request too large" }, 413, origin);
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return json({ error: "Invalid JSON" }, 400, origin);
  }

  // Honeypot submissions receive a neutral success response.
  if (cleanText(body.website, 200)) {
    return json({ ok: true }, 200, origin);
  }

  const startedAt =
    typeof body.started_at === "number" ? body.started_at : Number.NaN;
  const formAge = Date.now() - startedAt;
  if (
    !Number.isFinite(formAge) ||
    formAge < MIN_FORM_TIME_MS ||
    formAge > MAX_FORM_AGE_MS
  ) {
    return json({ error: "Invalid submission timing" }, 400, origin);
  }

  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 160).toLowerCase();
  const phone = cleanText(body.phone, 40);
  const serviceInterest = cleanText(body.service_interest, 120);
  const city = cleanText(body.city, 100);
  const message = cleanText(body.message, 2_000);
  const source = cleanText(body.source, 120) || "website";
  const consentVersion = cleanText(body.consent_version, 40);

  if (
    name.length < 2 ||
    !isValidEmail(email) ||
    !isValidPhone(phone) ||
    serviceInterest.length < 2 ||
    city.length < 2 ||
    body.consent !== true ||
    !consentVersion
  ) {
    return json({ error: "Please check the required fields" }, 422, origin);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Lead function is missing required Supabase environment");
    return json({ error: "Service unavailable" }, 503, origin);
  }

  const ipHash = await hmacSha256(
    readClientIp(request),
    serviceRoleKey.slice(-48),
  );
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from("nyholm_leads").insert({
    name,
    email,
    phone,
    service_interest: serviceInterest,
    city,
    message,
    consent: true,
    consent_version: consentVersion,
    source,
    landing_page: optionalText(body.landing_page, 500),
    utm_source: optionalText(body.utm_source, 160),
    utm_medium: optionalText(body.utm_medium, 160),
    utm_campaign: optionalText(body.utm_campaign, 160),
    utm_content: optionalText(body.utm_content, 160),
    utm_term: optionalText(body.utm_term, 160),
    user_agent: optionalText(request.headers.get("user-agent"), 500),
    ip_hash: ipHash,
  });

  if (error) {
    if (error.message.includes("RATE_LIMIT_EXCEEDED")) {
      return json({ error: "Too many submissions" }, 429, origin);
    }

    console.error("Lead insert failed", {
      code: error.code,
      message: error.message,
    });
    return json({ error: "Unable to save submission" }, 500, origin);
  }

  return json({ ok: true }, 201, origin);
});
