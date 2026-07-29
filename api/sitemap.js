export default function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).end('Method Not Allowed');
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://vido-social-frontend.vercel.app/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>\n  <url><loc>https://vido-social-frontend.vercel.app/tietosuoja</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>\n</urlset>`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  return res.status(200).send(xml);
}
