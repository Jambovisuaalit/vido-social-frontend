# VIDO Social Frontend

Tuotantovalmis staattinen frontend VIDO Socialin palvelupaketeille.

Nykyinen julkaisu: **V7** — Dark Performance -viimeistely ja muuttumaton Vercel-deploy-artifact.

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
- `v7.css` — V7-viimeistelykerros
- `script.js` — käyttöliittymä ja lomakkeen lähetys
- `api/contact.js` — validoitu Vercel Function, Supabase-tallennus ja Resend-ilmoitus
- `supabase/functions/submit-vido-lead/index.ts` — pysyvä liiditallennus ja rate limit
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

`SUPABASE_LEAD_URL` on valinnainen. Oletuksena käytetään VIDO:n nykyistä
`submit-vido-lead` Edge Functionia. Jos Resend-muuttujat puuttuvat, liidi
tallentuu silti Supabaseen ja sähköposti-ilmoitus ohitetaan hallitusti.

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
- honeypot, palvelinpuolen validointi, origin-tarkistus ja kevyt rate limit
- UTM-lähdeseuranta yhteydenottopyyntöihin
- Supabase toimii liidien ensisijaisena tietolähteenä
- tuotanto ei hae lähdekoodia GitHubin `main`-haarasta ajonaikaisesti
- CSP, HSTS, X-Frame-Options ja muut turvallisuusheaderit

© 2026 VIDO Social — Y-tunnus 3581471-7
