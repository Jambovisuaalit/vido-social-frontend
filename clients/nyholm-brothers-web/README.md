# Nyholm Brothers – SEO & lead generation site

Production-ready Next.js sales site for Nyholm Brothers Oy. The site combines a
conversion-focused homepage with local service pages, verified project
references and a private Supabase lead pipeline.

## Included

- conversion-focused Finnish sales page;
- 12 statically generated service and location pages;
- three verified case studies;
- LocalBusiness, Service, FAQ and Breadcrumb structured data;
- sitemap, robots, Open Graph image and canonical metadata;
- responsive, accessible UI with a mobile contact bar;
- UTM-aware lead form;
- Supabase Edge Function with origin validation, honeypot, timing validation,
  field validation, HMAC-based IP throttling and database-enforced rate limits;
- deny-all RLS model for public Supabase roles;
- permanent redirects from important legacy URLs.

## Local development

```bash
npm install
npm run dev -- --hostname 127.0.0.1
```

Quality checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Optional environment variables

```bash
NEXT_PUBLIC_SITE_URL=https://www.nyholmbrothers.fi
NEXT_PUBLIC_LEAD_ENDPOINT=https://PROJECT.supabase.co/functions/v1/submit-nyholm-lead
```

The current lead endpoint has a safe public default. It does not contain a
database credential.

## Production cutover

The Vercel deployment should be reviewed before moving
`www.nyholmbrothers.fi`. At cutover:

1. add the apex and `www` domains to the Vercel project;
2. update DNS only after Vercel reports both domains valid;
3. verify legacy redirects, sitemap and Search Console ownership;
4. submit `https://www.nyholmbrothers.fi/sitemap.xml`;
5. keep the old platform available until DNS and redirect checks pass.

See [`docs/SEO-AND-CONVERSION.md`](docs/SEO-AND-CONVERSION.md) for the content
model, events and 90-day measurement plan.
