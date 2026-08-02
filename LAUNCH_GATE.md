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
- [x] Supabase lead insert implemented server-side
- [x] Resend lead notification implemented server-side
- [x] Consent-gated GA4 events implemented
- [x] Privacy policy and cookie policy routes implemented
- [x] Canonical metadata, schema, sitemap and robots implemented
- [x] Mobile sticky CTA implemented
- [x] Ville trust section implemented
- [x] Real proof component implemented with fail-closed gating

## External production blockers

Production launch remains blocked until these are confirmed and set in Vercel:

1. `NEXT_PUBLIC_LEGAL_ENTITY` + `NEXT_PUBLIC_BUSINESS_ID`
2. `NEXT_PUBLIC_WHATSAPP_NUMBER`
3. Approved customer proof: `NEXT_PUBLIC_PROOF_CLIENT_NAME`, `NEXT_PUBLIC_PROOF_BEFORE_URL`, `NEXT_PUBLIC_PROOF_AFTER_URL`

No placeholder customer logo, testimonial, case result or fake before/after asset may be used to bypass blocker #3.

## Server configuration required

The lead endpoint intentionally fails closed until these server variables exist:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `LEAD_NOTIFICATION_TO`

Analytics is disabled until `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured and the visitor explicitly consents.

## Merge policy

`feature/next-landing-v1` → Vercel Preview → build/functional/mobile/desktop QA → squash merge to `main` → production deploy.

Do not merge if the build fails, the form pipeline fails, or any of the three external production blockers is unresolved.
