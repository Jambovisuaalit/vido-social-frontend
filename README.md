# JKP Group Oy — verkkosivusto

PRD:n mukainen Next.js-toteutus JKP Group Oy:lle.

## Sivut

- `/` — etusivu ja yhteydenotto
- `/talotekniikka` — rakennuttaminen, valvonta, LVI-suunnittelu ja kustannushallinta
- `/vuokraus` — kohdelistauksen valmis rakenne
- `/referenssit` — referenssien valmis rakenne
- `/admin` — salasanasuojattu tekstien hallinta

## Ympäristömuuttujat

```bash
NEXT_PUBLIC_SITE_URL=https://jkpgroup.fi
ADMIN_PASSWORD=vahva-salasana
SESSION_SECRET=eri-pitka-satunnainen-arvo
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
RESEND_API_KEY=re_...
CONTACT_FROM_EMAIL=JKP Group <verkkosivu@jkpgroup.fi>
CONTACT_TO_EMAIL=jari.koskela@jkpgroup.fi
```

Ilman Redis-muuttujia julkinen sivusto käyttää aina `content/defaults.ts`-sisältöä. Admin-tallennus estetään selkeällä virheellä. Ilman Resend-konfiguraatiota lomake ohjaa käyttäjän käyttämään suoraa sähköpostia.

## Julkaisua ennen

1. Vahvista kaikki yritys- ja palvelutekstit Jari Koskelalta.
2. Lisää oikeat vuokrauskohteet, referenssit ja kuvat.
3. Verifioi lähettäjädomain Resendissä.
4. Aseta ympäristömuuttujat Verceliin.
5. Testaa lomake, admin, mobiilinäkymä ja hakukoneiden metatiedot.
