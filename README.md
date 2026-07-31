# JKP Group Oy — verkkosivusto

PRD:n mukainen Next.js-toteutus JKP Group Oy:lle.

> Turvaraja: tämä sovelluspuu kuuluu omaan yksityiseen `jkp-group-website`-repositoryyn. Haaraa ei saa yhdistää VIDO Socialin `main`-haaraan.

## Sivut

- `/` — etusivu ja yhteydenotto
- `/talotekniikka` — rakennuttaminen, valvonta, LVI-suunnittelu ja kustannushallinta
- `/vuokraus` — Supabasesta luettavat vuokrakohteet ja kaksi erillistä asiointipolkua
- `/vuokraus/[slug]` — kuvallinen kohteen lisätietosivu
- `/referenssit` — referenssien rakenne
- `/admin` — salasanasuojattu sisällön- ja hero-kuvan hallinta

## Tuotantoarkkitehtuuri

Supabase on projektin ensisijainen sisältö-, media- ja lomaketallennus.

- `jkp_site_content` — sivuston muokattavat tekstit ja yhteystiedot
- `jkp_rental_properties` — vuokrakohteet, saatavuus, kuvat ja kohdesivut
- `jkp_references` — julkaistavat referenssit
- `jkp_form_submissions` — yhteydenotot, toimitilakyselyt ja asuntohakemukset
- `jkp-media` — JPEG-, PNG- ja WebP-kuvat, enintään 6 Mt

Julkiset sivut eivät käytä selaimen Supabase-avainta. Kaikki tietokanta- ja Storage-operaatiot tehdään palvelimella `SUPABASE_SERVICE_ROLE_KEY`-avaimella. Avainta ei saa tuoda Client Componentiin eikä nimetä `NEXT_PUBLIC_`-muuttujaksi.

`content/defaults.ts` toimii vain turvallisena tekstifallbackina silloin, kun Supabase ei vastaa. Lomakkeet eivät hyväksy lähetystä ilman toimivaa Supabase-yhteyttä, jotta tietoja ei häviä.

## Vuokrakohteiden näkyvyys

- Loma-asunnot ja kiinteistöt näkyvät, kun `published=true`.
- Liike- ja toimitilat näkyvät vain, kun `published=true` ja `status=available`.
- Vuokra-asunnot näkyvät vain, kun `published=true` ja `status=available`.
- Jokaisella julkaistulla kohteella on `/vuokraus/[slug]`-lisätietosivu.
- Varauskalenteria ei ole.

## Ympäristömuuttujat

Kopioi `.env.example` tiedostoksi `.env.local` ja täytä arvot paikallisesti. Vercelissä samat arvot lisätään erikseen Preview- ja Production-ympäristöihin.

```bash
NEXT_PUBLIC_SITE_URL=https://jkpgroup.fi
ADMIN_PASSWORD=...
SESSION_SECRET=...
SUPABASE_URL=https://PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_STORAGE_BUCKET=jkp-media
RESEND_API_KEY=...
CONTACT_FROM_EMAIL="JKP Group <verkkosivu@jkpgroup.fi>"
CONTACT_TO_EMAIL=jari.koskela@jkpgroup.fi
```

Salaisuuksia ei tallenneta GitHubiin, Google Driveen eikä selaimeen.

## Supabase-käyttöönotto

1. Luo JKP Groupille oma Supabase-projekti `eu-north-1`-alueelle.
2. Suorita migraatio `supabase/migrations/202607310001_jkp_primary_backend.sql`.
3. Tarkista Security Advisor ja varmista, että neljä JKP-taulua ovat RLS-suojattuja.
4. Lisää projektin URL ja service role -avain Verceliin.
5. Testaa admin-tallennus, kuvanlataus ja kaikki kolme lomaketyyppiä.

`jkp-media` on tarkoituksella julkinen vain verkkosivuilla näytettäville kuville. Upload ja tietokantamuutokset tehdään ainoastaan autentikoidun admin-API:n ja palvelinavaimen kautta. Arkaluonteisia asiakirjoja ei saa tallentaa tähän bucketiin.

## Julkaisua ennen

1. Luo yksityinen `Jambovisuaalit/jkp-group-website`-repository.
2. Siirrä tämän haaran tiedostopuu uuden repositoryn `main`-haaraksi.
3. Kytke repository omaan JKP Vercel -projektiin.
4. Luo oma Supabase-projekti ja suorita migraatio.
5. Lisää oikeat vuokrakohteet, referenssit, kuvat ja julkaisuluvat.
6. Verifioi lähettäjädomain Resendissä.
7. Aseta ympäristömuuttujat Preview- ja Production-ympäristöihin.
8. Aja `npm install && npm run build` ja varmista onnistunut build-loki.
9. Testaa admin, kuvanhallinta, kohteet, lomakkeet, sähköpostitoimitus ja mobiilinäkymä.
10. Kytke `jkpgroup.fi` vasta asiakkaan hyväksynnän jälkeen.

## Nykyiset ulkoiset estot 31.7.2026

- GitHub-connectorissa ei ole repositoryn luontitoimintoa, joten yksityistä repositorya ei voida luoda tämän integraation kautta.
- Supabase-projektin luonti estyi, koska organisaation aktiivisten ilmaisten projektien enimmäismäärä on käytössä.
- Nykyistä jaettua `Paint28`-Supabase-projektia ei käytetä JKP:n tuotantona.
- Next.js-tuotantobuildia ei ole vielä varmennettu omassa repositoryssa ja Vercel-projektissa.

Tarkempi varmennettu tila: `JKP_PRODUCTION_DELIVERY.md`.
