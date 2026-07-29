# Supabase lead intake

The public form calls `submit-nyholm-lead`, a Supabase Edge Function with
custom abuse protection. The browser never receives a database key.

Security model:

- `nyholm_leads` has RLS enabled and forced.
- `anon` and `authenticated` receive no table privileges or policies.
- only the Edge Function's service role can insert or read rows;
- the function validates origin, content type, body size and all fields;
- a honeypot and minimum submit time reject automated form submissions;
- raw IP addresses are never stored;
- an HMAC hash is used only for a database-enforced five-per-hour limit.

`verify_jwt` is intentionally disabled for this one function because a website
visitor does not have a Supabase identity. Authentication is replaced with the
function's explicit validation and throttling controls.

The canonical database definition is in `schema.sql`. Apply DDL through a
reviewed Supabase migration before deploying the function.
