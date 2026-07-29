const RAW_BASE = 'https://raw.githubusercontent.com/Jambovisuaalit/vido-social-frontend/main';

async function getText(path) {
  const response = await fetch(`${RAW_BASE}/${path}`, {
    headers: { 'User-Agent': 'VIDO-Social-Vercel-Renderer' },
    cache: 'no-store'
  });
  if (!response.ok) throw new Error(`Upstream ${path}: ${response.status}`);
  return response.text();
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const [htmlSource, baseCss, mobileCss, scriptSource] = await Promise.all([
      getText('index.html'),
      getText('styles.css'),
      getText('mobile-v2.css'),
      getText('script.js')
    ]);

    const script = scriptSource
      .replace(/const mobileStyles = document\.createElement\('link'\);[\s\S]*?document\.head\.appendChild\(mobileStyles\);\s*/m, '')
      .replace(/<\/script/gi, '<\\/script');

    let html = htmlSource
      .replace(
        '<link rel="stylesheet" href="/styles.css">',
        `<style id="vido-frontend-css">${baseCss}\n${mobileCss}</style>`
      )
      .replace(
        '<script src="/script.js" defer></script>',
        `<script>${script}</script>`
      )
      .replaceAll(
        'src="/assets/landing/',
        `src="${RAW_BASE}/assets/landing/`
      )
      .replaceAll(
        'https://vido-social-frontend.vercel.app/assets/landing/',
        `${RAW_BASE}/assets/landing/`
      );

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.setHeader('X-VIDO-Frontend', 'github-rendered-mobile-v2');
    if (req.method === 'HEAD') return res.status(200).end();
    return res.status(200).send(html);
  } catch (error) {
    console.error('VIDO site renderer failed', error);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(502).send('Sivuston lataus epäonnistui. Yritä hetken kuluttua uudelleen.');
  }
}
