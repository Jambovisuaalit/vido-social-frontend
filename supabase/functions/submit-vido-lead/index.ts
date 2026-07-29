import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const SITE_ORIGIN = "https://vido-social-frontend.vercel.app";
const ALLOWED_ORIGINS = new Set([
  SITE_ORIGIN,
  "https://vido-social-frontend-info-32533854s-projects.vercel.app",
  "https://vido-social-frontend-info-32533854-info-32533854s-projects.vercel.app",
  "https://vido-social-liidit.jamiha.chatgpt.site",
]);
const MAX_BODY_BYTES = 16_384;
const RATE_LIMIT_WINDOW_SECONDS = 3_600;
const RATE_LIMIT_MAX_REQUESTS = 5;
const CONSENT_VERSION = "2026-07-29";
const ALLOWED_SERVICES = new Set([
  "liidihankinta",
  "verkkosivut",
  "some",
  "paikallinen_mainonta",
  "muu",
]);

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cleanString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function responseHeaders(origin: string | null): HeadersInit {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers":
      "authorization, content-type, apikey, x-client-info, x-vido-client-ip",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    Vary: "Origin",
  };

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

function jsonResponse(
  body: JsonRecord,
  status: number,
  origin: string | null,
  extraHeaders: HeadersInit = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...responseHeaders(origin), ...extraHeaders },
  });
}

async function sha256(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function getClientFingerprint(req: Request): string {
  const forwardedFor = req.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  const clientIp =
    req.headers.get("x-vido-client-ip")?.trim().slice(0, 80) ||
    req.headers.get("cf-connecting-ip")?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    forwardedFor ||
    "unknown";
  const userAgent = req.headers.get("user-agent")?.slice(0, 200) || "unknown";
  return `${clientIp}|${userAgent}`;
}

function validLandingPage(value: string): string {
  if (!value) return SITE_ORIGIN;

  try {
    const url = new URL(value);
    return ALLOWED_ORIGINS.has(url.origin)
      ? url.toString().slice(0, 500)
      : SITE_ORIGIN;
  } catch {
    return SITE_ORIGIN;
  }
}

Deno.serve(async (req: Request) => {
  const requestId = crypto.randomUUID();
  const origin = req.headers.get("origin");
  const allowedOrigin = origin !== null && ALLOWED_ORIGINS.has(origin);

  if (req.method === "OPTIONS") {
    if (!allowedOrigin) {
      return jsonResponse(
        { error: "Origin not allowed", request_id: requestId },
        403,
        origin,
      );
    }
    return new Response(null, {
      status: 204,
      headers: responseHeaders(origin),
    });
  }

  if (req.method !== "POST") {
    return jsonResponse(
      { error: "Method not allowed", request_id: requestId },
      405,
      origin,
    );
  }

  if (!allowedOrigin) {
    return jsonResponse(
      { error: "Origin not allowed", request_id: requestId },
      403,
      origin,
    );
  }

  const contentType = req.headers.get("content-type")?.toLowerCase() || "";
  if (!contentType.includes("application/json")) {
    return jsonResponse(
      { error: "Content-Type must be application/json", request_id: requestId },
      415,
      origin,
    );
  }

  const declaredLength = Number(req.headers.get("content-length") || 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return jsonResponse(
      { error: "Request too large", request_id: requestId },
      413,
      origin,
    );
  }

  try {
    const rawBody = await req.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return jsonResponse(
        { error: "Request too large", request_id: requestId },
        413,
        origin,
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      return jsonResponse(
        { error: "Virheellinen pyyntö.", request_id: requestId },
        400,
        origin,
      );
    }

    if (!isRecord(parsed)) {
      return jsonResponse(
        { error: "Virheellinen pyyntö.", request_id: requestId },
        400,
        origin,
      );
    }

    if (cleanString(parsed.website, 200)) {
      return jsonResponse({ ok: true, request_id: requestId }, 200, origin);
    }

    const name = cleanString(parsed.name, 120);
    const company = cleanString(parsed.company, 160) || null;
    const email = cleanString(parsed.email, 320).toLowerCase() || null;
    const phone = cleanString(parsed.phone, 40) || null;
    const message = cleanString(parsed.message, 3000) || null;
    const consent = parsed.consent === true;
    const rawService = cleanString(parsed.service_interest, 40);
    const serviceInterest = ALLOWED_SERVICES.has(rawService)
      ? rawService
      : null;

    if (name.length < 2 || (!email && !phone) || !consent) {
      return jsonResponse(
        { error: "Tarkista pakolliset kentät.", request_id: requestId },
        400,
        origin,
      );
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse(
        { error: "Tarkista sähköpostiosoite.", request_id: requestId },
        400,
        origin,
      );
    }

    if (phone) {
      const digitCount = phone.replace(/\D/g, "").length;
      if (digitCount < 5) {
        return jsonResponse(
          { error: "Tarkista puhelinnumero.", request_id: requestId },
          400,
          origin,
        );
      }
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Supabase environment is incomplete");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const clientHash = await sha256(getClientFingerprint(req));
    const { data: slotReserved, error: rateLimitError } = await supabase.rpc(
      "reserve_vido_lead_slot",
      {
        p_client_hash: clientHash,
        p_window_seconds: RATE_LIMIT_WINDOW_SECONDS,
        p_limit: RATE_LIMIT_MAX_REQUESTS,
      },
    );

    if (rateLimitError) throw rateLimitError;
    if (slotReserved !== true) {
      return jsonResponse(
        {
          error: "Liian monta lähetystä. Yritä myöhemmin uudelleen.",
          request_id: requestId,
        },
        429,
        origin,
        { "Retry-After": String(RATE_LIMIT_WINDOW_SECONDS) },
      );
    }

    const { error: insertError } = await supabase.from("vido_leads").insert({
      name,
      company,
      email,
      phone,
      message,
      consent,
      consent_version: CONSENT_VERSION,
      service_interest: serviceInterest,
      source: "vido_site",
      landing_page: validLandingPage(cleanString(parsed.landing_page, 500)),
      utm_source: cleanString(parsed.utm_source, 200) || null,
      utm_medium: cleanString(parsed.utm_medium, 200) || null,
      utm_campaign: cleanString(parsed.utm_campaign, 200) || null,
      user_agent: req.headers.get("user-agent")?.slice(0, 500) || null,
    });

    if (insertError) throw insertError;

    return jsonResponse({ ok: true, request_id: requestId }, 201, origin);
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "submit_vido_lead_failed",
        request_id: requestId,
        message: error instanceof Error ? error.message : "Unknown error",
      }),
    );

    return jsonResponse(
      {
        error: "Lähetys epäonnistui. Yritä uudelleen.",
        request_id: requestId,
      },
      500,
      origin,
    );
  }
});
