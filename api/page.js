const RAW_BASE = 'https://raw.githubusercontent.com/Jambovisuaalit/vido-social-frontend/main';

const POSTS = [
  {
    handle: 'valoisa_remontti',
    location: 'Helsinki · kuvitteellinen demo',
    initials: 'VR',
    image: 'https://images.unsplash.com/photo-1763485956350-1b7e230ad578?auto=format&fit=crop&w=900&h=1125&q=82',
    title: 'Uusi kylpyhuone valmiina',
    caption: 'Ajaton ilme, selkeä toteutus ja viimeistelty kokonaisuus. Näin remontin lopputulos tehdään näkyväksi myös somessa.'
  },
  {
    handle: 'lvi_varma',
    location: 'Uusimaa · kuvitteellinen demo',
    initials: 'LV',
    image: 'https://images.unsplash.com/photo-1749532125405-70950966b0e5?auto=format&fit=crop&w=900&h=1125&q=82',
    title: 'Putkityöt ammattitaidolla',
    caption: 'Siisti asennus, selkeä aikataulu ja toimiva lopputulos. Sisältö näyttää asiakkaalle, miten työ oikeasti tehdään.'
  },
  {
    handle: 'terassi_taito',
    location: 'Espoo · kuvitteellinen demo',
    initials: 'TT',
    image: 'https://images.unsplash.com/photo-1526745769964-fb72a9ed5620?auto=format&fit=crop&w=900&h=1125&q=82',
    title: 'Terassi valmiina kesään',
    caption: 'Valmis projekti, vahva kuva ja yksi ymmärrettävä viesti. Julkaisu kertoo työn arvon ilman raskasta mainoskieltä.'
  },
  {
    handle: 'sahko_suora',
    location: 'Helsinki · kuvitteellinen demo',
    initials: 'SS',
    image: 'https://images.unsplash.com/photo-1758101755915-462eddc23f57?auto=format&fit=crop&w=900&h=1125&q=82',
    title: 'Sähkötyöt turvallisesti',
    caption: 'Ammattimainen työnäyte rakentaa luottamusta. Faktat, kuva ja selkeä palvelulupaus muodostavat valmiin julkaisun.'
  },
  {
    handle: 'katto_kuntoon',
    location: 'Uusimaa · kuvitteellinen demo',
    initials: 'KK',
    image: 'https://images.unsplash.com/photo-1726589004565-bedfba94d3a2?auto=format&fit=crop&w=900&h=1125&q=82',
    title: 'Kattosi meidän huoleksi',
    caption: 'Työmaa, tekijä ja turvallinen toteutus samassa kuvassa. Julkaisu tekee palvelusta konkreettisen ja uskottavan.'
  }
];

function postCard(post, extraClass = '') {
  return `<article class="social-post ${extraClass}">
    <div class="post-head">
      <span class="post-avatar">${post.initials}</span>
      <span class="post-account"><b>${post.handle}</b><small>${post.location}</small></span>
      <span class="post-menu" aria-hidden="true">•••</span>
    </div>
    <div class="post-image">
      <img src="${post.image}" alt="${post.title} — kuvitteellinen VIDO Social -mallijulkaisu" loading="lazy" referrerpolicy="no-referrer">
      <p class="post-title">${post.title}</p>
      <span class="post-demo-chip">Demo</span>
    </div>
    <div class="post-actions" aria-hidden="true"><span>♡</span><span>◯</span><span>↗</span><span>⌑</span></div>
    <p class="post-caption"><b>${post.handle}</b> ${post.caption}</p>
  </article>`;
}

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
    const [html, css, polishCss, realPostsCss, script] = await Promise.all([
      fetchText('index.html'),
      fetchText('styles.css'),
      fetchText('typography-spacing-v1.css'),
      fetchText('real-posts-v1.css'),
      fetchText('script.js')
    ]);

    const styles = `${css}\n${polishCss}\n${realPostsCss}`.replace(/<\/style/gi, '<\\/style');
    const inlineScript = script.replace(/<\/script/gi, '<\\/script');
    const heroPosts = `<div class="post-stage" aria-label="Kolme kuvitteellista, oikean näköistä somejulkaisua">
      ${POSTS.slice(0, 3).map((post) => postCard(post, 'hero-post')).join('\n')}
      <span class="posts-demo-badge">Kuvitteelliset demot</span>
    </div>`;
    const postGallery = `<div class="shell real-post-grid reveal">
      ${POSTS.map((post) => postCard(post)).join('\n')}
    </div>
    <p class="shell post-disclaimer"><strong>Huom:</strong> tilit, tekstit ja yritysnimet ovat kuvitteellisia. Valokuvat ovat Unsplash-kuvia ja niitä käytetään vain julkaisutyylin havainnollistamiseen — ei asiakasreferensseinä.</p>`;

    let document = html
      .replace('<link rel="stylesheet" href="/styles.css">', `<style>${styles}</style>`)
      .replace('<script src="/script.js" defer></script>', `<script>${inlineScript}</script>`)
      .replace(
        /<div class="hero-visual reveal" aria-label="VIDO Socialin demovisuaaleja">[\s\S]*?<div class="floating-card floating-card-c">[\s\S]*?<\/div>\s*<\/div>/,
        `<div class="hero-visual reveal" aria-label="VIDO Socialin oikean näköisiä demojulkaisuja">${heroPosts}</div>`
      )
      .replace(
        /<div class="shell visual-showcase reveal">\s*<figure class="media-frame media-frame-wide">[\s\S]*?<\/figure>\s*<\/div>/,
        postGallery
      );

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
