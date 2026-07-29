const RAW_BASE = 'https://raw.githubusercontent.com/Jambovisuaalit/vido-social-frontend/main';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const response = await fetch(`${RAW_BASE}/tietosuoja.html`, {
      headers: { 'User-Agent': 'VIDO-Social-Vercel-Renderer' },
      cache: 'no-store'
    });
    if (!response.ok) throw new Error(`Upstream privacy: ${response.status}`);
    const html = (await response.text())
      .replaceAll('src="/brand/', `src="${RAW_BASE}/brand/`)
      .replaceAll('href="/styles.css"', `href="${RAW_BASE}/styles.css"`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    if (req.method === 'HEAD') return res.status(200).end();
    return res.status(200).send(html);
  } catch (error) {
    console.error('VIDO privacy renderer failed', error);
    return res.status(502).send('Tietosuojasivun lataus epäonnistui.');
  }
}
