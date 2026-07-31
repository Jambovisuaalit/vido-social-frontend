# JKP Group Oy – tuotantotoimituksen varmennettu tila

Tarkistettu: 31.7.2026

## Päätetty arkkitehtuuri

- Oma yksityinen GitHub-repository: `Jambovisuaalit/jkp-group-website`
- Supabase on ensisijainen sisältö-, media- ja lomaketallennus
- Upstash Redis poistuu tuotantoarkkitehtuurista
- JKP Groupille luodaan oma Supabase-projekti `eu-north-1`-alueelle
- `jkpgroup.fi` liitetään vasta onnistuneen Next.js-buildin ja asiakkaan hyväksynnän jälkeen

## Turvaraja

Haara `client/jkp-group-production` on JKP Groupin erillinen väliaikainen toimitusraita. **Sitä ei saa yhdistää VIDO Socialin `main`-haaraan.** Lopullinen tiedostopuu siirretään omaan yksityiseen repositoryyn.

## Toteutettu lähdekoodissa

- palvelinpuolinen Supabase admin client
- Supabase ensisijaisena `jkp_site_content`-sisältötallennuksena
- Supabasesta luettavat ja näkyvyyssäännöillä suodatettavat vuokrakohteet
- dynaamiset `/vuokraus/[slug]`-kohdesivut
- kaikkien lomakkeiden tallennus `jkp_form_submissions`-tauluun ennen sähköposti-ilmoitusta
- Resend best-effort-ilmoituksena; tallennettu lomake ei katoa sähköpostihäiriössä
- autentikoitu admin-kuvanlataus `jkp-media`-bucketiin
- hero-kuvan URL ja upload admin-näkymässä
- yhteydenottolomakkeen puuttunut tietosuostumus korjattu
- `.env.example`
- yhtenäinen Supabase-migraatio

## Supabase-resurssit

Migraatio: `supabase/migrations/202607310001_jkp_primary_backend.sql`

- `jkp_site_content`
- `jkp_rental_properties`
- `jkp_references`
- `jkp_form_submissions`
- `jkp-media`

Neljä JKP-taulua käyttävät RLS:ää ja estävät suoran `anon`- ja `authenticated`-pääsyn. Sovellus käyttää ainoastaan palvelinpuolista service role -avainta.

`jkp-media` on tarkoituksella julkinen vain verkkosivuilla näytettäville kuville. Upload tehdään autentikoidun admin-API:n kautta. Arkaluonteisia asiakirjoja ei saa tallentaa tähän bucketiin.

## Jarin vuokraussäännöt

- Loma-asunnot ja kiinteistöt näkyvät, kun `published=true`.
- Liike- ja toimitilat näkyvät vain, kun `published=true` ja `status=available`.
- Vuokra-asunnot näkyvät vain, kun `published=true` ja `status=available`.
- Varauskalenteria ei toteuteta.
- Jokaisella julkaistulla kohteella on kuvallinen lisätietosivu.

## GitHub-tila

- Väliaikainen lähdehaara: `client/jkp-group-production`
- Draft-PR: #4 — `DO NOT MERGE TO VIDO MAIN`
- Yksityistä `jkp-group-website`-repositorya ei voitu luoda käytettävissä olevalla GitHub-connectorilla, koska connectorissa ei ole repositoryn luontitoimintoa.
- GitHub Actions -build pitää varmentaa uudessa repositoryssa.

## Supabase-projektin luontiyritys

Uuden `JKP Group Website` -projektin luonti `vidosocial`-organisaatioon yritettiin `eu-north-1`-alueelle. Ilmoitettu kustannus oli 0 €/kk.

Luonti estyi, koska organisaation aktiivisten ilmaisten projektien enimmäismäärä on käytössä. Nykyistä jaettua `Paint28`-projektia ei käytetä JKP:n tuotantoympäristönä.

Ratkaisu vaatii yhden seuraavista:

1. tarpeettoman Supabase-projektin pausettaminen tai poistaminen
2. organisaation Supabase-tason päivittäminen
3. JKP-projektin luominen toiseen organisaatioon

## Ympäristömuuttujat

- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_PASSWORD`
- `SESSION_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET=jkp-media`
- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL=jari.koskela@jkpgroup.fi`

`SUPABASE_SERVICE_ROLE_KEY` on vain palvelinpuolella. Sitä ei saa tallentaa GitHubiin, Driveen tai `NEXT_PUBLIC_`-muuttujaan.

## Vercel

Nykyiset previewt ovat staattisia deployja eivätkä todenna Next.js-tuotantobuildia. Lopullinen repository kytketään omaan JKP Vercel -projektiin ja hyväksytään vasta, kun:

- `npm install` onnistuu
- `npm run build` onnistuu
- admin-tallennus toimii
- kuvanlataus toimii
- kohdelistaus ja kohdesivut toimivat
- kaikki kolme lomaketyyppiä tallentuvat Supabaseen
- Resend-ilmoitus toimii

## Avoimet julkaisuportit

1. Luo yksityinen `Jambovisuaalit/jkp-group-website`-repository GitHubin käyttöliittymässä tai sellaisella integraatiolla, joka tukee repositoryn luontia.
2. Siirrä `client/jkp-group-production` uuden repositoryn `main`-haaraksi.
3. Vapauta Supabase-projektipaikka, päivitä tilaus tai valitse toinen organisaatio.
4. Luo oma JKP Supabase -projekti ja suorita migraatio.
5. Kytke uusi GitHub-repository Verceliin.
6. Lisää ympäristömuuttujat Preview- ja Production-ympäristöihin.
7. Aja ja tallenna onnistunut Next.js-build-loki.
8. Testaa admin, kuvanhallinta, kohteet, lomakkeet ja Resend.
9. Lisää asiakkaan oikeat kuvat, vuokrakohteet ja referenssit.
10. Kytke `jkpgroup.fi` vasta Jarin hyväksynnän jälkeen.
