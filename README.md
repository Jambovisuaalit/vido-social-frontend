# JKP Group Oy — verkkosivusto

PRD:n mukainen Next.js-toteutus JKP Group Oy:lle.

> Turvaraja: tämä sovelluspuu kuuluu omaan JKP-repositoryyn. Haaraa ei saa yhdistää VIDO Socialin `main`-haaraan.

## Sivut

- `/` — etusivu ja yhteydenotto
- `/talotekniikka` — rakennuttaminen, valvonta, LVI-suunnittelu ja kustannushallinta
- `/vuokraus` — vuokrakohteet ja kaksi erillistä asiointipolkua
- `/referenssit` — referenssien rakenne
- `/admin` — salasanasuojattu sisällönhallinta

## Nykyinen sisältöarkkitehtuuri

Tämä GitHub-haara käyttää tällä hetkellä:

- Upstash Redis -tallennusta sivuston muokattaville teksteille
- `content/defaults.ts`-fallbackia, jos Redis ei ole käytettävissä
- Resendiä lomakkeiden sähköpostitoimitukseen

Supabaseen on luotu JKP-taulut ja Storage-bucket erilliseksi infrastruktuuriksi, mutta nykyinen `lib/content.ts` ei vielä käytä Supabasea. Tuotantoon valitaan yksi ensisijainen sisältölähde ja integraatio testataan ennen julkaisua.

## Nykyisen haaran ympäristömuuttujat

```bash
NEXT_PUBLIC_SITE_URL=https://jkpgroup.fi
ADMIN_PASSWORD=vahva-salasana
SESSION_SECRET=eri-pitka-satunnainen-arvo
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
RESEND_API_KEY=re_...
CONTACT_FROM_EMAIL="JKP Group <verkkosivu@jkpgroup.fi>"
CONTACT_TO_EMAIL=jari.koskela@jkpgroup.fi
```

Salaisuuksia ei tallenneta GitHubiin.

## Julkaisua ennen

1. Siirrä sovellus omaan yksityiseen `jkp-group-website`-repositoryyn.
2. Kytke repository omaan JKP Vercel -projektiin.
3. Päätä tuotannon sisältötallennus: Upstash tai Supabase.
4. Vahvista yritys- ja palvelutekstit Jari Koskelalta.
5. Lisää oikeat vuokrakohteet, referenssit, kuvat ja julkaisuluvat.
6. Verifioi lähettäjädomain Resendissä.
7. Aseta ympäristömuuttujat Preview- ja Production-ympäristöihin.
8. Aja `npm install && npm run build` Vercelissä ja varmista onnistunut build-loki.
9. Testaa admin, kuvanhallinta, molemmat vuokrauslomakkeet, sähköpostitoimitus ja mobiilinäkymä.
10. Kytke `jkpgroup.fi` vasta asiakkaan hyväksynnän jälkeen.

## QA-tila 31.7.2026

- Next.js-lähdekoodi on haaralla.
- Vercelissä on toimivia staattisia preview-deployja.
- Next.js-tuotantobuildia ei ole vielä varmennettu.
- Tarkistetulle tuotantohaaran commitille ei löytynyt GitHub Actions -ajoa.
- Supabase-taulujen RLS on käytössä ja suora asiakaspääsy on estetty.
- `jkp-media`-bucket on tällä hetkellä public ja vaatii tietoisen tuotantopäätöksen.

Tarkempi varmennettu tila: `JKP_PRODUCTION_DELIVERY.md`.
