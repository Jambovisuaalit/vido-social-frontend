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
  const resendApiKey = process.env.RESEND_API_KEY;
  const notificationTo = process.env.LEAD_NOTIFICATION_TO;
  const resendFrom = process.env.RESEND_FROM_EMAIL;

  const missing = [
    ["SUPABASE_URL", supabaseUrl],
    ["SUPABASE_SERVICE_ROLE_KEY", supabaseServiceRoleKey],
    ["RESEND_API_KEY", resendApiKey],
    ["LEAD_NOTIFICATION_TO", notificationTo],
    ["RESEND_FROM_EMAIL", resendFrom]
  ]
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length) {
    console.error("VIDO lead pipeline missing environment configuration", missing);
    return NextResponse.json({ error: "Yhteydenottopalvelun asetuksia viimeistellään." }, { status: 503 });
  }

  const lead = {
    company,
    name,
    phone,
    email,
    source: text(payload.source, 80) || "website_startti",
    page: text(payload.page, 200) || "/",
    referrer: nullableText(payload.referrer, 500),
    utm_source: nullableText(payload.utm_source, 120),
    utm_medium: nullableText(payload.utm_medium, 120),
    utm_campaign: nullableText(payload.utm_campaign, 160),
    status: "NEW",
    created_at: new Date().toISOString()
  };

  const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: supabaseServiceRoleKey!,
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

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: resendFrom,
      to: [notificationTo],
      subject: `Uusi VIDO Startti -liidi: ${company}`,
      text: [
        "Uusi VIDO Startti -liidi",
        "",
        `Yritys: ${company}`,
        `Nimi: ${name}`,
        `Puhelin: ${phone}`,
        `Sähköposti: ${email}`,
        `Lähde: ${lead.source}`,
        `Sivu: ${lead.page}`,
        `UTM source: ${lead.utm_source || "-"}`,
        `UTM medium: ${lead.utm_medium || "-"}`,
        `UTM campaign: ${lead.utm_campaign || "-"}`
      ].join("\n")
    }),
    cache: "no-store"
  });

  if (!resendResponse.ok) {
    const detail = await resendResponse.text();
    console.error("VIDO Resend notification failed", resendResponse.status, detail);
    return NextResponse.json({ error: "Yhteydenotto tallennettiin, mutta ilmoituksen lähetys epäonnistui." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
