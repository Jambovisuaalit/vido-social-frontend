# VIDO Social — Launch Gate

Branch: `feature/next-landing-v1`
PR: #5

## Technical gate

- [x] Canonical VIDO red/navy brand replaces cyan system
- [x] Official Drive master SVG used as website logo
- [x] Next.js upgraded to 16.2.11
- [x] React upgraded to 19.2
- [x] Tailwind CSS upgraded to 4.3
- [x] Four-field Startti lead form implemented
- [x] Canonical `vido_leads` schema deployed to the VIDO Supabase project
- [x] Supabase lead insert implemented server-side
- [x] Resend lead notification implemented as best-effort after durable Supabase storage
- [x] Consent-gated GA4 events implemented
- [x] Privacy policy and cookie policy routes implemented
- [x] Canonical metadata, schema, sitemap and robots implemented
- [x] Canonical public site URL set to `https://vidosocial.com`
- [x] Public contact email set to `ville@vidosocial.com`
- [x] Public phone and WhatsApp Business set to `+358 40 724 7621`
- [x] Ville Olenius identified publicly as VIDO Social founder/contact person
- [x] Legal contracting/controller entity confirmed as `Ville Olenius Tmi`
- [x] Business ID confirmed as `3581471-7`
- [x] Marketing name confirmed as `VIDO`
- [x] Postal address recorded as `Niittytie 4, 03100 NLA`
- [x] Domicile confirmed as `Vihti`
- [x] Mobile sticky CTA implemented
- [x] Ville trust section implemented
- [x] MVP intentionally launches without customer logos, testimonials, before/after assets or case studies
- [x] Customer-proof section replaced with factual delivery-process proof
- [x] GitHub Actions production build passes on Next.js 16.2.11
- [x] Pull-request workflow wired to build and deploy a Vercel Preview before merge
- [x] Main-branch workflow wired for production deployment after an approved merge
- [ ] GitHub Actions repository secret `VERCEL_TOKEN` configured
- [ ] Vercel Preview deployment available for this branch
- [ ] Preview desktop/mobile/functional/SEO QA completed

## Current technical blocker

GitHub Actions run #46 validated the Next.js application successfully, then stopped at the Vercel Preview credential gate because repository secret `VERCEL_TOKEN` is not configured.

No merge or production deployment is permitted until the secret exists, the preview deployment succeeds and QA passes.

Once `VERCEL_TOKEN` is configured, rerun the failed preview job. The workflow will:

1. pull the Vercel preview environment for project `prj_nLX0pIdNKqtYZAK45fyHezal2q3S`
2. build the prebuilt preview artifact
3. deploy a non-production Vercel URL
4. expose the preview URL in the workflow output for QA

## Business launch blockers

None.

VIDO Social will launch without customer case studies. No placeholder logo, fabricated testimonial, invented result or fake before/after asset may be used. Real customer cases can be added later only after explicit publication approval.

## Canonical public and legal identity

- Legal name: `Ville Olenius Tmi`
- Business ID: `3581471-7`
- Marketing name: `VIDO`
- Founder / entrepreneur: `Ville Olenius`
- Email: `ville@vidosocial.com`
- Website: `https://vidosocial.com`
- Phone / WhatsApp Business: `+358 40 724 7621`
- Postal address: `Niittytie 4, 03100 NLA`
- Domicile: `Vihti`

## Runtime configuration

The lead endpoint fails closed if durable Supabase storage is unavailable. Required server variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Resend notification is secondary and must never cause a successfully stored lead to be lost. Enable notifications with:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `LEAD_NOTIFICATION_TO`

A verified VIDO sender domain is required before treating Resend notifications as production-ready.

Analytics remains disabled until `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured and the visitor explicitly consents.

Optional public overrides (canonical defaults are committed):

- `NEXT_PUBLIC_SITE_URL=https://vidosocial.com`
- `NEXT_PUBLIC_CONTACT_EMAIL=ville@vidosocial.com`
- `NEXT_PUBLIC_CONTACT_PHONE=+358 40 724 7621`
- `NEXT_PUBLIC_WHATSAPP_NUMBER=+358 40 724 7621`
- `NEXT_PUBLIC_LEGAL_ENTITY=Ville Olenius Tmi`
- `NEXT_PUBLIC_BUSINESS_ID=3581471-7`
- `NEXT_PUBLIC_MARKETING_NAME=VIDO`
- `NEXT_PUBLIC_POSTAL_ADDRESS=Niittytie 4, 03100 NLA`
- `NEXT_PUBLIC_DOMICILE=Vihti`

## Supabase security model

`public.vido_leads` has RLS enabled and intentionally has no public policies. The website writes through the server-side service role only. The Supabase advisor therefore reports `rls_enabled_no_policy` as informational for this table; that is intentional for this architecture.

Other advisor findings in the shared VIDO project concern pre-existing tables/functions and are outside this launch-gate migration.

## Merge policy

`feature/next-landing-v1` → GitHub Actions build → Vercel Preview → functional/mobile/desktop/SEO QA → squash merge to `main` → production deploy.

Do not merge if `VERCEL_TOKEN` is missing, Preview is unavailable, QA fails or the durable lead pipeline fails.
