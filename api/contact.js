const MAX_BODY_BYTES = 16 * 1024;
const SITE_ORIGIN = "https://vido-social-frontend.vercel.app";
const SUPABASE_LEAD_URL =
  process.env.SUPABASE_LEAD_URL ||
  "https://dbfvptbhxqgsanwnwgxy.supabase.co/functions/v1/submit-vido-lead";
const ALLOWED_PACKAGES = new Set([
  "En osaa vielä sanoa",
  "VIDO Social",
  "VIDO Työmaa",
  "VIDO Kasvu",
]);

function json(response, status, payload) {
  response
    .status(status)
    .setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  return response.end(JSON.stringify(payload));
}

function clean(value, maxLength) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validOrigin(value) {
  if (!value) return false;
  try {
    const { hostname, protocol } = new URL(value);
    if (protocol !== "https:") return false;
    return (
      hostname === "vido-social-frontend.vercel.app" ||
      /^vido-social-frontend-[a-z0-9-]+-info-32533854s-projects\.vercel\.app$/.test(
        hostname,
      ) ||
      /^vido-social-frontend-[a-z0-9-]+-info-32533854-info-32533854s-projects\.vercel\.app$/.test(
        hostname,
      )
    );
  } catch {
    return false;
  }
}

function getClientIp(request) {
  return String(
    request.headers["x-forwarded-for"] ||
      request.headers["x-real-ip"] ||
      request.socket?.remoteAddress ||
      "unknown",
  )
    .split(",")[0]
    .trim()
    .slice(0, 80);
}

function mapServiceInterest(packageName) {
  return (
    {
      "VIDO Social": "some",
      "VIDO Työmaa": "verkkosivut",
      "VIDO Kasvu": "paikallinen_mainonta",
      "En osaa vielä sanoa": "muu",
    }[packageName] || "muu"
  );
}

function parseBody(request) {
  if (request.body && typeof request.body === "object") return request.body;
  if (typeof request.body !== "string") return {};
  try {
    return JSON.parse(request.body || "{}");
  } catch {
    return null;
  }
}

async function persistLead(request, body, data) {
  const response = await fetch(SUPABASE_LEAD_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: SITE_ORIGIN,
      "User-Agent":
        clean(request.headers["user-agent"], 200) || "VIDO-Social-Vercel",
      "X-VIDO-Client-IP": getClientIp(request),
    },
    body: JSON.stringify({
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      service_interest: mapServiceInterest(data.package),
      message: data.message,
      consent: true,
      website: clean(body.website, 200),
      landing_page: data.pageUrl,
      utm_source: data.utmSource,
      utm_medium: data.utmMedium,
      utm_campaign: data.utmCampaign,
    }),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `Supabase lead persistence failed (${response.status}): ${result.error || "Unknown error"}`,
    );
  }
  return result.request_id || null;
}

async function sendEmailNotification(data, requestId) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "ville@vidosocial.com";
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    console.warn(
      JSON.stringify({
        event: "contact_notification_skipped",
        request_id: requestId,
        reason: "Resend environment is incomplete",
      }),
    );
    return false;
  }

  const text = [
    `Pyyntötunnus: ${requestId || "-"}`,
    `Nimi: ${data.name}`,
    `Yritys: ${data.company}`,
    `Sähköposti: ${data.email}`,
    `Puhelin: ${data.phone || "-"}`,
    `Palvelu: ${data.package || "Ei valittu"}`,
    `UTM source: ${data.utmSource || "-"}`,
    `UTM medium: ${data.utmMedium || "-"}`,
    `UTM campaign: ${data.utmCampaign || "-"}`,
    `Sivu: ${data.pageUrl || "-"}`,
    "",
    data.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `VIDO Social -yhteydenotto: ${data.company}`,
      text,
    }),
  });

  if (!response.ok) {
    console.error(
      JSON.stringify({
        event: "contact_notification_failed",
        request_id: requestId,
        status: response.status,
      }),
    );
    return false;
  }

  return true;
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return json(response, 405, { error: "Vain POST-pyynnöt ovat sallittuja." });
  }

  if (!validOrigin(request.headers.origin)) {
    return json(response, 403, { error: "Pyyntöä ei sallittu." });
  }

  if (
    !String(request.headers["content-type"] || "")
      .toLowerCase()
      .startsWith("application/json")
  ) {
    return json(response, 415, { error: "Sisältötyyppiä ei tueta." });
  }

  const contentLength = Number(request.headers["content-length"] || 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return json(response, 413, { error: "Pyyntö on liian suuri." });
  }

  const body = parseBody(request);
  if (!body) return json(response, 400, { error: "Virheellinen pyyntö." });
  if (body.website) return json(response, 200, { ok: true });
  if (Buffer.byteLength(JSON.stringify(body), "utf8") > MAX_BODY_BYTES) {
    return json(response, 413, { error: "Pyyntö on liian suuri." });
  }

  const data = {
    name: clean(body.name, 80),
    company: clean(body.company, 100),
    email: clean(body.email, 120),
    phone: clean(body.phone, 40),
    package: clean(body.package, 80),
    message: clean(body.message, 2000),
    utmSource: clean(body.utm_source, 120),
    utmMedium: clean(body.utm_medium, 120),
    utmCampaign: clean(body.utm_campaign, 160),
    pageUrl: clean(body.page_url, 500),
  };

  if (
    !data.name ||
    !data.company ||
    !data.email ||
    !data.message ||
    !validEmail(data.email) ||
    body.consent !== "on"
  ) {
    return json(response, 400, {
      error:
        "Pakolliset tiedot puuttuvat tai sähköpostiosoite on virheellinen.",
    });
  }

  if (data.package && !ALLOWED_PACKAGES.has(data.package)) {
    return json(response, 400, {
      error: "Valittu palvelu ei ole kelvollinen.",
    });
  }

  try {
    const requestId = await persistLead(request, body, data);
    const notificationSent = await sendEmailNotification(data, requestId);
    return json(response, 201, {
      ok: true,
      request_id: requestId,
      notification_sent: notificationSent,
    });
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "contact_persistence_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
    );
    return json(response, 502, {
      error: "Yhteydenottopyynnön tallennus epäonnistui.",
    });
  }
}
