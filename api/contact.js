const recentRequests = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 16 * 1024;
const ALLOWED_PACKAGES = new Set([
  'En osaa vielä sanoa',
  'VIDO Social',
  'VIDO Työmaa',
  'VIDO Kasvu'
]);

function json(response, status, payload) {
  response.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  return response.end(JSON.stringify(payload));
}

function clean(value, maxLength) {
  return String(value || '').replace(/[<>]/g, '').trim().slice(0, maxLength);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validOrigin(value) {
  if (!value) return true;
  try {
    const { hostname, protocol } = new URL(value);
    if (protocol !== 'https:') return false;
    return hostname === 'vido-social-frontend.vercel.app'
      || /^vido-social-frontend-[a-z0-9-]+-info-32533854s-projects\.vercel\.app$/.test(hostname)
      || /^vido-social-frontend-[a-z0-9-]+-info-32533854-info-32533854s-projects\.vercel\.app$/.test(hostname);
  } catch {
    return false;
  }
}

function isRateLimited(ip) {
  const now = Date.now();
  const history = (recentRequests.get(ip) || []).filter((timestamp) => now - timestamp < WINDOW_MS);
  history.push(now);
  recentRequests.set(ip, history);
  return history.length > MAX_REQUESTS;
}

function parseBody(request) {
  if (request.body && typeof request.body === 'object') return request.body;
  if (typeof request.body !== 'string') return {};
  try {
    return JSON.parse(request.body || '{}');
  } catch {
    return null;
  }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return json(response, 405, { error: 'Vain POST-pyynnöt ovat sallittuja.' });
  }

  if (!validOrigin(request.headers.origin)) {
    return json(response, 403, { error: 'Pyyntöä ei sallittu.' });
  }

  if (!String(request.headers['content-type'] || '').toLowerCase().startsWith('application/json')) {
    return json(response, 415, { error: 'Sisältötyyppiä ei tueta.' });
  }

  const contentLength = Number(request.headers['content-length'] || 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return json(response, 413, { error: 'Pyyntö on liian suuri.' });
  }

  const ip = String(request.headers['x-forwarded-for'] || request.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  if (isRateLimited(ip)) return json(response, 429, { error: 'Liian monta yritystä. Yritä myöhemmin uudelleen.' });

  const body = parseBody(request);
  if (!body) return json(response, 400, { error: 'Virheellinen pyyntö.' });
  if (body.website) return json(response, 200, { ok: true });

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
    pageUrl: clean(body.page_url, 500)
  };

  if (!data.name || !data.company || !data.email || !data.message || !validEmail(data.email) || body.consent !== 'on') {
    return json(response, 400, { error: 'Pakolliset tiedot puuttuvat tai sähköpostiosoite on virheellinen.' });
  }

  if (data.package && !ALLOWED_PACKAGES.has(data.package)) {
    return json(response, 400, { error: 'Valittu palvelu ei ole kelvollinen.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || 'ville@vidosocial.com';
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    return json(response, 503, { error: 'Sähköpostipalvelua ei ole vielä määritetty.' });
  }

  const text = [
    `Nimi: ${data.name}`,
    `Yritys: ${data.company}`,
    `Sähköposti: ${data.email}`,
    `Puhelin: ${data.phone || '-'}`,
    `Palvelu: ${data.package || 'Ei valittu'}`,
    `UTM source: ${data.utmSource || '-'}`,
    `UTM medium: ${data.utmMedium || '-'}`,
    `UTM campaign: ${data.utmCampaign || '-'}`,
    `Sivu: ${data.pageUrl || '-'}`,
    '',
    data.message
  ].join('\n');

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `VIDO Social -yhteydenotto: ${data.company}`,
        text
      })
    });

    if (!resendResponse.ok) {
      console.error('Resend failed', resendResponse.status, await resendResponse.text());
      return json(response, 502, { error: 'Viestin välitys epäonnistui.' });
    }

    return json(response, 200, { ok: true });
  } catch (error) {
    console.error('Contact form error', error);
    return json(response, 500, { error: 'Yhteydenottopyynnön käsittely epäonnistui.' });
  }
}
