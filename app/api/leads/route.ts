import { NextRequest, NextResponse } from "next/server";

type LeadPayload = {
  company?: unknown;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  website?: unknown;
  source?: unknown;
  page?: unknown;
  referrer?: unknown;
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
};

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

export async function POST(request: NextRequest) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Virheellinen pyyntö." }, { status: 400 });
  }

  if (text(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  const company = text(payload.company, 160);
  const name = text(payload.name, 120);
  const phone = text(payload.phone, 40);
  const email = text(payload.email, 180).toLowerCase();

  if (!company || !name || !phone || !validEmail(email)) {
    return NextResponse.json({ error: "Tarkista yritys, nimi, puhelin ja sähköposti." }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("VIDO lead pipeline missing Supabase server configuration");
    return NextResponse.json({ error: "Yhteydenottopalvelun asetuksia viimeistellään." }, { status: 503 });
  }

  const page = text(payload.page, 200) || "/";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vido-social-frontend.vercel.app";
  const landingPage = new URL(page, siteUrl).toString();

  const lead = {
    company,
    name,
    phone,
    email,
    message: null,
    consent: false,
    consent_version: null,
    service_interest: "some",
    source: text(payload.source, 80) || "website_startti",
    landing_page: landingPage,
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
    const detail = await supabaseResponse.text();
    console.error("VIDO Supabase lead insert failed", supabaseResponse.status, detail);
    return NextResponse.json({ error: "Yhteydenoton tallennus epäonnistui." }, { status: 502 });
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
        subject: `Uusi VIDO Startti -liidi: ${company}`,
        text: [
          "Uusi VIDO Startti -liidi",
          "",
          `Yritys: ${company}`,
          `Nimi: ${name}`,
          `Puhelin: ${phone}`,
          `Sähköposti: ${email}`,
          `Lähde: ${lead.source}`,
          `Sivu: ${lead.landing_page}`,
          `UTM source: ${lead.utm_source || "-"}`,
          `UTM medium: ${lead.utm_medium || "-"}`,
          `UTM campaign: ${lead.utm_campaign || "-"}`
        ].join("\n")
      }),
      cache: "no-store"
    });

    notificationSent = resendResponse.ok;
    if (!resendResponse.ok) {
      console.error("VIDO Resend notification failed", resendResponse.status, await resendResponse.text());
    }
  } else {
    console.warn("VIDO lead stored, but Resend notification is not configured");
  }

  return NextResponse.json({ ok: true, notification_sent: notificationSent }, { status: 201 });
}
