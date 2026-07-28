const PRIVACY_URL = 'https://raw.githubusercontent.com/Jambovisuaalit/vido-social-frontend/main/tietosuoja.html';

export default async function handler(request, response) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    response.status(405).end('Method Not Allowed');
    return;
  }

  try {
    const result = await fetch(PRIVACY_URL, {
      headers: { 'User-Agent': 'VIDO-Social-Vercel-Renderer' }
    });
    if (!result.ok) throw new Error(`Privacy page: ${result.status}`);
    const html = await result.text();
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=3600');
    response.status(200).end(request.method === 'HEAD' ? '' : html);
  } catch (error) {
    console.error('Privacy renderer failed', error);
    response.setHeader('Content-Type', 'text/plain; charset=utf-8');
    response.setHeader('Cache-Control', 'no-store');
    response.status(503).end('Tietosuojasivua ei voitu ladata.');
  }
}
