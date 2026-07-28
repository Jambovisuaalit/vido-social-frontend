# VIDO Social Frontend

Tuotantovalmis staattinen frontend VIDO Socialin palvelupaketeille.

## Production

- https://vido-social-frontend.vercel.app
- Vercel project: `vido-social-frontend`
- GitHub: `Jambovisuaalit/vido-social-frontend`

## Palvelupaketit

- **VIDO Social:** 500 €/kk + ALV
- **VIDO Työmaa:** 1 500 € + ALV
- **VIDO Kasvu:** 900 €/kk + ALV + mediabudjetti

## Rakenne

- `index.html` — myyntisivu
- `styles.css` — responsiivinen design system
- `script.js` — käyttöliittymä ja lomakkeen lähetys
- `api/contact.js` — validoitu Vercel Function
- `tietosuoja.html` — tietosuojaseloste
- `404.html` — mukautettu virhesivu
- `vercel.json` — headerit, CSP, välimuisti ja function-asetukset

## Yhteydenottolomakkeen ympäristömuuttujat

Lisää Vercelin projektiasetuksiin:

```text
RESEND_API_KEY=...
CONTACT_FROM_EMAIL=VIDO Social <yhteys@vahvistettu-domain.fi>
CONTACT_TO_EMAIL=ville@vidosocial.com
```

Ilman näitä muuttujia lomake avaa käyttäjän sähköpostiohjelman varayhteydenottoa varten.

## Julkaisu

Vercel CLI:

```bash
vercel
vercel --prod
```

## Laatu ja turvallisuus

- responsiivinen mobiili- ja työpöytäasettelu
- canonical, Open Graph, Twitter Card ja JSON-LD
- robots.txt ja sitemap.xml
- tietosuojaseloste ja suostumus
- honeypot, palvelinpuolen validointi ja kevyt rate limit
- CSP, HSTS, X-Frame-Options ja muut turvallisuusheaderit

© 2026 VIDO Social — Y-tunnus 3581471-7
