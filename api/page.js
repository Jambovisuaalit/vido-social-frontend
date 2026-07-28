const RAW_BASE = 'https://raw.githubusercontent.com/Jambovisuaalit/vido-social-frontend/main';

function htmlResponse(response, status, html, cache = 'public, s-maxage=300, stale-while-revalidate=3600') {
  response.status(status);
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.setHeader('Cache-Control', cache);
  return response.end(html);
}

async function fetchText(path) {
  const result = await fetch(`${RAW_BASE}/${path}`, {
    headers: { 'User-Agent': 'VIDO-Social-Vercel-Renderer' }
  });
  if (!result.ok) throw new Error(`${path}: ${result.status}`);
  return result.text();
}

export default async function handler(request, response) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    return htmlResponse(response, 405, 'Method Not Allowed', 'no-store');
  }

  try {
    const [html, css, polishCss, script] = await Promise.all([
      fetchText('index.html'),
      fetchText('styles.css'),
      fetchText('typography-spacing-v1.css'),
      fetchText('script.js')
    ]);

    const styles = `${css}\n${polishCss}`.replace(/<\/style/gi, '<\\/style');
    const inlineScript = script.replace(/<\/script/gi, '<\\/script');

    const document = html
      .replace('<link rel="stylesheet" href="/styles.css">', `<style>${styles}</style>`)
      .replace('<script src="/script.js" defer></script>', `<script>${inlineScript}</script>`);

    return htmlResponse(response, 200, request.method === 'HEAD' ? '' : document);
  } catch (error) {
    console.error('Page renderer failed', error);
    return htmlResponse(
      response,
      503,
      '<!doctype html><html lang="fi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>VIDO Social</title><body style="margin:0;display:grid;min-height:100vh;place-items:center;background:#05070b;color:white;font:18px system-ui"><main><h1>VIDO Social</h1><p>Sivua päivitetään. Yritä hetken kuluttua uudelleen.</p></main></body></html>',
      'no-store'
    );
  }
}
