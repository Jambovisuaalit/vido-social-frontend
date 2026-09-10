import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

type JsonRecord = Record<string, unknown>;

const MAX_BODY_BYTES = 16_384;
const RATE_LIMIT_WINDOW_SECONDS = 3_600;
const RATE_LIMIT_MAX_REQUESTS = 5;
const CONSENT_VERSION = "2026-08-03";

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function nullableText(value: unknown, max = 300) {
  const cleaned = text(value, max);
  return cleaned || null;
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validPhone(value: string) {
  const digitCount = value.replace(/\D/g, "").length;
  return digitCount >= 5 && digitCount <= 20;
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function requestOriginIsAllowed(request: NextRequest, siteUrl: string) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  const allowedOrigins = new Set([new URL(siteUrl).origin]);
  if (process.env.VERCEL_URL) {
    allowedOrigins.add(`https://${process.env.VERCEL_URL}`);
  }

  return allowedOrigins.has(origin);
}

function getClientFingerprint(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientIp =
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    forwardedFor ||
    "unknown";
  const userAgent = request.headers.get("user-agent")?.slice(0, 200) || "unknown";
  return `${clientIp}|${userAgent}`;
}

function safeLandingPage(path: string, siteUrl: string) {
  try {
    const candidate = new URL(path || "/", siteUrl);
    return candidate.origin === new URL(siteUrl).origin ? candidate.toString() : siteUrl;
  } catch {
    return siteUrl;
  }
}

async function reserveLeadSlot(supabaseUrl: string, serviceRoleKey: string, clientHash: string) {
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/reserve_vido_lead_slot`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      p_client_hash: clientHash,
      p_window_seconds: RATE_LIMIT_WINDOW_SECONDS,
      p_limit: RATE_LIMIT_MAX_REQUESTS
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    console.error("VIDO rate limiter failed", response.status, await response.text());
    throw new Error("Rate limiter unavailable");
  }

  return (await response.json()) === true;
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vidosocial.com";

  if (!requestOriginIsAllowed(request, siteUrl)) {
    return NextResponse.json({ error: "Pyyntö estettiin.", request_id: requestId }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return NextResponse.json({ error: "Virheellinen pyyntö.", request_id: requestId }, { status: 415 });
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Pyyntö on liian suuri.", request_id: requestId }, { status: 413 });
  }

  let payload: unknown;

  try {
    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Pyyntö on liian suuri.", request_id: requestId }, { status: 413 });
    }
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Virheellinen pyyntö.", request_id: requestId }, { status: 400 });
  }

  if (!isRecord(payload)) {
    return NextResponse.json({ error: "Virheellinen pyyntö.", request_id: requestId }, { status: 400 });
  }

  if (text(payload.website)) {
    return NextResponse.json({ ok: true, request_id: requestId });
  }

  const company = text(payload.company, 160);
  const name = text(payload.name, 120);
  const phone = text(payload.phone, 40);
  const email = text(payload.email, 180).toLowerCase();
  const consent = payload.consent === true;

  if (!company || name.length < 2 || !validPhone(phone) || !validEmail(email) || !consent) {
    return NextResponse.json(
      { error: "Tarkista yritys, nimi, puhelin, sähköposti ja tietosuojavalinta.", request_id: requestId },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("VIDO lead pipeline missing Supabase server configuration", requestId);
    return NextResponse.json(
      { error: "Yhteydenottopalvelun asetuksia viimeistellään.", request_id: requestId },
      { status: 503 }
    );
  }

  try {
    const slotReserved = await reserveLeadSlot(
      supabaseUrl,
      supabaseServiceRoleKey,
      sha256(getClientFingerprint(request))
    );

    if (!slotReserved) {
      return NextResponse.json(
        { error: "Liian monta lähetystä. Yritä myöhemmin uudelleen.", request_id: requestId },
        { status: 429, headers: { "Retry-After": String(RATE_LIMIT_WINDOW_SECONDS) } }
      );
    }

    const lead = {
      company,
      name,
      phone,
      email,
      message: null,
      consent,
      consent_version: CONSENT_VERSION,
      service_interest: "vido_social",
      source: "website_social",
      landing_page: safeLandingPage(text(payload.page, 200) || "/", siteUrl),
      referrer: nullableText(payload.referrer, 500),
      utm_source: nullableText(payload.utm_source, 120),
      utm_medium: nullableText(payload.utm_medium, 120),
      utm_campaign: nullableText(payload.utm_campaign, 160),
      status: "NEW",
      user_agent: request.headers.get("user-agent")?.slice(0, 500) || null
    };

    const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/vido_leads`, {
      method: "POST",
      headers: {
        apikey: supabaseServiceRoleKey,
        Authorization: `Bearer ${supabaseServiceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(lead),
      cache: "no-store"
    });

    if (!supabaseResponse.ok) {
      console.error("VIDO Supabase lead insert failed", supabaseResponse.status, await supabaseResponse.text(), requestId);
      return NextResponse.json(
        { error: "Yhteydenoton tallennus epäonnistui.", request_id: requestId },
        { status: 502 }
      );
    }

    let notificationSent = false;
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationTo = process.env.LEAD_NOTIFICATION_TO;
    const resendFrom = process.env.RESEND_FROM_EMAIL;

    if (resendApiKey && notificationTo && resendFrom) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: resendFrom,
          to: [notificationTo],
          reply_to: email,
          subject: `Uusi VIDO Social -liidi: ${company}`,
          text: [
            "Uusi VIDO Social -liidi",
            "",
            `Yritys: ${company}`,
            `Nimi: ${name}`,
            `Puhelin: ${phone}`,
            `Sähköposti: ${email}`,
            `Lähde: ${lead.source}`,
            `Sivu: ${lead.landing_page}`,
            `UTM source: ${lead.utm_source || "-"}`,
            `UTM medium: ${lead.utm_medium || "-"}`,
            `UTM campaign: ${lead.utm_campaign || "-"}`,
            `Request ID: ${requestId}`
          ].join("\n")
        }),
        cache: "no-store"
      });

      notificationSent = resendResponse.ok;
      if (!resendResponse.ok) {
        console.error("VIDO Resend notification failed", resendResponse.status, await resendResponse.text(), requestId);
      }
    } else {
      console.warn("VIDO lead stored, but Resend notification is not configured", requestId);
    }

    return NextResponse.json(
      { ok: true, notification_sent: notificationSent, request_id: requestId },
      { status: 201 }
    );
  } catch (error) {
    console.error("VIDO lead pipeline failed", requestId, error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Lähetys epäonnistui. Yritä uudelleen.", request_id: requestId },
      { status: 503 }
    );
  }
}
