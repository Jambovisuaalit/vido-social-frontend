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
- [x] Mobile sticky CTA implemented
- [x] Ville trust section implemented
- [x] Real proof component implemented with fail-closed gating
- [x] GitHub Actions production build passes on Next.js 16.2.11
- [ ] Vercel Preview deployment available for this branch
- [ ] Preview desktop/mobile/functional/SEO QA completed

## External production blockers

Two business facts remain unresolved before production launch:

1. `NEXT_PUBLIC_LEGAL_ENTITY` + `NEXT_PUBLIC_BUSINESS_ID`
2. Approved customer proof: `NEXT_PUBLIC_PROOF_CLIENT_NAME`, `NEXT_PUBLIC_PROOF_BEFORE_URL`, `NEXT_PUBLIC_PROOF_AFTER_URL`

Public WhatsApp Business is confirmed and no longer a blocker:

- `+358 40 724 7621`

Public contact details:

- Founder/contact: Ville Olenius
- Email: `ville@vidosocial.com`
- Website: `https://vidosocial.com`
- Phone / WhatsApp Business: `+358 40 724 7621`

No placeholder customer logo, testimonial, case result or fake before/after asset may be used to bypass the proof blocker.

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

Optional public overrides (canonical defaults are now committed):

- `NEXT_PUBLIC_SITE_URL=https://vidosocial.com`
- `NEXT_PUBLIC_CONTACT_EMAIL=ville@vidosocial.com`
- `NEXT_PUBLIC_CONTACT_PHONE=+358 40 724 7621`
- `NEXT_PUBLIC_WHATSAPP_NUMBER=+358 40 724 7621`

## Supabase security model

`public.vido_leads` has RLS enabled and intentionally has no public policies. The website writes through the server-side service role only. The Supabase advisor therefore reports `rls_enabled_no_policy` as informational for this table; that is intentional for this architecture.

Other advisor findings in the shared VIDO project concern pre-existing tables/functions and are outside this launch-gate migration.

## Merge policy

`feature/next-landing-v1` → GitHub Actions build → Vercel Preview → functional/mobile/desktop/SEO QA → resolve two remaining external blockers → squash merge to `main` → production deploy.

Do not merge if Preview is unavailable, QA fails, the durable lead pipeline fails, or either remaining external production blocker is unresolved.
