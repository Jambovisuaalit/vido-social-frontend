# JKP Group Oy – Production delivery

Date: 2026-07-30

## Safety boundary

This branch is a standalone JKP Group delivery track. **Do not merge it into VIDO Social production.** A dedicated JKP repository should be created when repository-creation permissions are available.

## Implemented delivery

- Next.js App Router + TypeScript production package
- Home, technical building services, rentals, property details, references, company, contact, privacy and admin
- Two separate forms: commercial-space inquiry and residential rental application
- Admin-managed text, contact details, hero image, rental properties and references
- Supabase database, private form submissions and `jkp-media` storage bucket
- SEO metadata, canonical URLs, robots, sitemap and JSON-LD
- Responsive UI

## Jari rental rules

- Holiday homes and properties remain active.
- Commercial/office spaces are visible only while available.
- Residential rental properties are visible only while available.
- No reservation calendar.
- Every property has an image-based detail page.

## Infrastructure

- Supabase project: `dbfvptbhxqgsanwnwgxy`
- Vercel project: `jkp-group-client-preview`
- Production source package checksum: `bd1569122299f77fb74242a3594f3bbceb4871fc152f7207d6bf9877886529c7`
- Google Drive delivery document: `JKP Group Oy – Tuotantotoimitus 30.7.2026`
- Canva design: `JKP Group Oy Brand & Website Board`

## Required Vercel secrets

- `ADMIN_PASSWORD`
- `SESSION_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET=jkp-media`
- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL=jari.koskela@jkpgroup.fi`

Secrets must never be committed to GitHub.

## QA

- Project structure checked
- JSON configuration checked
- Local imports checked: 0 missing
- Supabase migrations applied
- Explicit deny RLS policies applied
- Full local `npm install/build` was blocked by the execution environment's internal npm mirror returning 404 for `@types/node`; this was not an application build error
