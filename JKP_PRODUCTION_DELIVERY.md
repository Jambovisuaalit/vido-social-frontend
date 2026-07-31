# JKP Group Oy – tuotantotoimituksen varmennettu tila

Tarkistettu: 31.7.2026

## Turvaraja

Haara `client/jkp-group-production` on JKP Groupin erillinen toimitusraita. **Sitä ei saa yhdistää VIDO Socialin `main`-haaraan.** Lopullinen ratkaisu on siirtää tiedostopuu omaan yksityiseen `jkp-group-website`-repositoryyn.

## GitHub

- Lähdehaara: `client/jkp-group-production`
- Draft-PR: #4 — `DO NOT MERGE TO VIDO MAIN`
- Tarkistettu head-commit: `1b45cb1a2bc06b5a2475f012a113d5658c4891ad`
- Haaralla on Next.js App Router + TypeScript -lähdekoodi.
- GitHub Actions -ajoa tai hyväksyttyä CI-buildia ei löytynyt tarkistetulle commitille.

## Vercel

Vercelissä on kaksi JKP-preview-projektia:

- `jkp-group-client-preview`
- `jkp-group-production-preview`

Molemmilla on `READY`-tilassa oleva deploy. Uusimman `jkp-group-production-preview`-deployn build-loki kuitenkin näyttää vain yhden deployment-tiedoston, `framework: null` ja 26 ms buildin. Tämä todentaa staattisen previewn, **ei Next.js-sovelluksen tuotantobuildia**.

Tuotantovalmiutta ei saa merkitä hyväksytyksi ennen kuin oma JKP-repository on kytketty omaan Vercel-projektiin ja `npm install && npm run build` on onnistunut Vercelin build-lokissa.

## Supabase

Supabase-projekti `dbfvptbhxqgsanwnwgxy` on aktiivinen, mutta projektin nimi on edelleen `Paint28` ja samassa tietokannassa on myös muiden asiakasprojektien tauluja. JKP:n tuotantoeristys ei siten ole valmis.

Varmennetut JKP-resurssit:

- `jkp_site_content`
- `jkp_rental_properties`
- `jkp_references`
- `jkp_form_submissions`
- `jkp-media` Storage bucket

Kaikissa neljässä JKP-taulussa RLS on käytössä ja `anon`- sekä `authenticated`-rooleille on eksplisiittinen deny-policy. `jkp-media`-bucket on tällä hetkellä **public**, ei private. Bucket sallii JPEG-, PNG- ja WebP-kuvat, enintään 6 Mt.

Nykyinen GitHub-haara käyttää sisällön tallennukseen Upstash Redisiä. Supabase-skeema on olemassa erillisenä infrastruktuurina, mutta sitä ei ole kytketty tämän haaran `lib/content.ts`-toteutukseen. Dokumentaatiossa ei saa väittää Supabase-adminin olevan käytössä ennen integraatiota ja build-testiä.

## Toteutettu lähdekoodissa

- Next.js App Router + TypeScript
- etusivu, talotekniikka, vuokraus, referenssit ja admin
- kaksi erillistä vuokrauslomaketta
- Resend-pohjainen sähköpostikäsittely
- Upstash Redis -sisältötallennus ja oletussisällön fallback
- SEO-metadata, robots ja sitemap
- responsiivinen käyttöliittymä

## Jarin vuokraussäännöt

- Loma-asunnot ja kiinteistöt pysyvät näkyvissä.
- Liike- ja toimitilat näkyvät vain vapaina.
- Vuokra-asunnot näkyvät vain vapaina.
- Varauskalenteria ei toteuteta.
- Jokaisella kohteella on kuvallinen lisätietosivu.

## Nykyisen haaran Vercel-muuttujat

- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_PASSWORD`
- `SESSION_SECRET`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL=jari.koskela@jkpgroup.fi`

Supabase-integraatioon siirryttäessä tarvitaan lisäksi palvelinpuoliset Supabase-muuttujat. Salaisuuksia ei saa tallentaa GitHubiin.

## Avoimet julkaisuportit

1. Luo oma yksityinen GitHub-repository.
2. Siirrä JKP-sovelluspuu sen `main`-haaraan.
3. Luo tai kytke oma Vercel-projekti GitHub-repositoryyn.
4. Päätä käytetäänkö tuotannossa Upstashia vai Supabasea — ei kahta rinnakkaista totuutta.
5. Jos Supabase valitaan, siirrä JKP omaan Supabase-projektiin tai dokumentoi ja hyväksytä jaetun projektin riski.
6. Muuta `jkp-media` private-bucketiksi, jos kuvia ei ole tarkoitus jakaa julkisina URL-osoitteina, tai dokumentoi tietoisesti public-ratkaisu.
7. Aseta ympäristömuuttujat Preview- ja Production-ympäristöihin.
8. Aja onnistunut Next.js-tuotantobuild ja tallenna build-loki.
9. Testaa admin, kuvanhallinta, molemmat lomakkeet ja sähköpostitoimitus.
10. Kytke `jkpgroup.fi` vasta Jarin hyväksynnän jälkeen.

## Asiakasriippuvuudet

- vahvistetut tekstit ja yhteystiedot
- logo ja omat kuvat
- vuokrakohteet ja niiden saatavuustiedot
- referenssit ja julkaisuluvat
- Jarin koottu palaute ensimmäisestä vedoksesta
