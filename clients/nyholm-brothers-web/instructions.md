# instructions.md — Nyholm Brothers Customer Portal

> **Project:** Nyholm Brothers Oy × VIDO Social — Customer Portal  
> **Repository:** `Jambovisuaalit/vido-social-frontend`  
> **Application:** `clients/nyholm-brothers-web`  
> **Development branch:** `nyholm-brothers-sales-site`  
> **Purpose:** canonical implementation instructions for the Nyholm Brothers customer portal.

---

# 1. Overview

## 1.1 Goal

Build a secure customer portal inside the existing Nyholm Brothers web application. The portal must make three separate commercial states explicit and auditable:

1. contract acceptance;
2. invoice/payment status;
3. project activation.

Primary state rule:

```text
CONTRACT = ACCEPTED
AND INVOICE = PAID
→ PROJECT = READY_TO_START

READY_TO_START
+ authorized VIDO activation
→ PROJECT = ACTIVE
```

The portal is an extension of the existing Nyholm Brothers Next.js application. Do not create a disconnected standalone app without a separate architecture decision.

## 1.2 Problems solved

The existing workflow spans Google Drive, email, WhatsApp and Asana. This creates risks:

- contract acceptance may be scattered across channels;
- payment can be confused with contract acceptance;
- the exact accepted contract version may be ambiguous;
- historical evidence can be overwritten;
- project start has no single mechanical readiness gate;
- the customer has no single status view;
- internal VIDO information must remain hidden.

The portal creates a customer-safe dashboard plus an append-only audit history.

## 1.3 MVP scope

The first production version is for **Nyholm Brothers Oy**.

Included:

- authenticated portal access;
- current agreement view;
- explicit written agreement acceptance;
- agreement version tracking;
- invoice state;
- manual payment confirmation with evidence reference;
- deterministic readiness calculation;
- manual project activation by an authorized VIDO user;
- immutable audit trail;
- customer-safe status dashboard;
- loading, success, empty and error states;
- production QA.

Out of scope unless separately approved:

- payment gateway;
- bank reconciliation;
- full accounting integration;
- generic multi-tenant SaaS administration;
- e-signature provider;
- replacing Google Drive;
- WhatsApp automation;
- social publishing workflow;
- unrelated SEO/site redesign.

## 1.4 Core states

### Agreement

```ts
type AgreementStatus =
  | "PENDING_ACCEPTANCE"
  | "ACCEPTED"
  | "SUPERSEDED";
```

UI:

```text
ODOTTAA HYVÄKSYNTÄÄ
HYVÄKSYTTY
KORVATTU UUDELLA VERSIOLLA
```

### Invoice

```ts
type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "VOID";
```

### Project

```ts
type ProjectStatus =
  | "WAITING"
  | "READY_TO_START"
  | "ACTIVE"
  | "PAUSED"
  | "CLOSED";
```

UI:

```text
ODOTTAA
VALMIS KÄYNNISTETTÄVÄKSI
AKTIIVINEN
KESKEYTETTY
PÄÄTTYNYT
```

## 1.5 Non-negotiable invariants

### A. Payment is not agreement acceptance

A paid invoice may be commercial evidence, but it must not silently set the agreement to `ACCEPTED`.

### B. Acceptance references an exact version

Every acceptance must reference the exact agreement version and document identifier shown to the customer.

### C. Audit history is append-only

Agreement acceptance, payment confirmation and activation events are never overwritten. Corrections create new events or new versions.

### D. Activation is gated

Project activation is impossible unless:

```text
agreement_status == ACCEPTED
invoice_status == PAID
```

The system first derives `READY_TO_START`; an authorized VIDO user then performs an explicit activation.

### E. Customer isolation

Customers must never see another customer's data, VIDO internal notes, internal costs, technical logs, secret keys, GitHub/Vercel details or internal Asana tasks.

## 1.6 Dashboard

| Information | Customer-facing state |
|---|---|
| Sopimusehdot | `ODOTTAA HYVÄKSYNTÄÄ / HYVÄKSYTTY` |
| Sopimusversio | e.g. `v1.0 – 05.08.2026` |
| Kirjallinen hyväksyntä | text + timestamp |
| Hyväksyjä | authenticated approver |
| Hyväksyntätapa | `PORTAALI / SÄHKÖPOSTI` |
| Lasku | `LÄHETETTY / MAKSETTU` |
| Laskun numero | stable invoice identifier |
| Maksun vahvistus | date + evidence reference |
| Projekti | `ODOTTAA / VALMIS KÄYNNISTETTÄVÄKSI / AKTIIVINEN` |

## 1.7 Agreement acceptance UX

The customer must see the active agreement before accepting it.

Recommended text:

> Olen tutustunut Nyholm Brothers Oy:n ja VIDO Socialin välisiin sopimusehtoihin sekä palvelun sisältöön, hintaan, laskutukseen, hyväksyntäprosessiin ja muihin sopimuksessa määriteltyihin ehtoihin. Hyväksyn sopimusehdot kokonaisuudessaan ja vahvistan tilauksen niiden mukaisesti.

UI:

```text
[ ] Hyväksyn sopimusehdot
[ HYVÄKSY SOPIMUS ]
```

The server records authoritative actor identity and timestamp.

## 1.8 Acceptance criteria

- **A1** Customer can open the active agreement.
- **A2** Customer can explicitly accept with checkbox + confirmation.
- **A3** Acceptance stores actor, timestamp, agreement version, document ID and method.
- **A4** Invoice can be marked `SENT` and `PAID`.
- **A5** Payment evidence can be referenced.
- **A6** Activation is impossible when agreement or payment is missing.
- **A7** Both gates derive `READY_TO_START`.
- **A8** Authorized VIDO user can activate and the event is audited.
- **A9** A new agreement version creates a new acceptance requirement without deleting history.
- **A10** Customer cannot access internal/admin-only records.
- **A11** RLS prevents cross-customer access.
- **A12** `npm run lint`, `npm run typecheck` and `npm run build` pass.

---

# 2. Tech Stack

## 2.1 Current repository stack

Declared in `clients/nyholm-brothers-web/package.json`:

| Technology | Version | Role |
|---|---:|---|
| Next.js | `16.2.12` | framework / App Router |
| React | `19.2.4` | UI |
| React DOM | `19.2.4` | browser rendering |
| TypeScript | `^5` | static typing |
| Tailwind CSS | `^4` | styling |
| `@tailwindcss/postcss` | `^4` | PostCSS integration |
| ESLint | `^9` | linting |
| `eslint-config-next` | `16.2.12` | Next rules |
| `@types/node` | `^20` | Node types |
| `@types/react` | `^19` | React types |
| `@types/react-dom` | `^19` | React DOM types |

Scripts:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "typecheck": "tsc --noEmit"
}
```

## 2.2 TypeScript

Current important settings:

```text
strict = true
noEmit = true
moduleResolution = bundler
jsx = react-jsx
@/* → ./src/*
```

`allowJs` is enabled, but all new portal code must be TypeScript.

## 2.3 Supabase

### Current

The current lead form posts directly to a Supabase Edge Function.

```text
NEXT_PUBLIC_SITE_URL=https://www.nyholmbrothers.fi
NEXT_PUBLIC_LEAD_ENDPOINT=https://dbfvptbhxqgsanwnwgxy.supabase.co/functions/v1/submit-nyholm-lead
```

The current `package.json` does **not** declare `@supabase/supabase-js`.

### Portal target

Use Supabase for:

- Auth;
- Postgres;
- Row Level Security;
- portal records;
- audit events;
- optional private Storage evidence.

Before implementation, add and pin the required Supabase JavaScript/SSR package versions. Do not claim a version is installed until it is present in `package.json`.

## 2.4 Deployment

**Vercel** is the Next.js deployment target.

Rules:

```text
PR → preview → QA → production
```

Keep secrets in environment variables. A successful build is not production approval.

## 2.5 Styling

Use the current stack:

```text
Tailwind CSS 4 tooling
src/app/globals.css
shared React components
```

Do not add a second CSS framework.

Portal UI should preserve the Nyholm black/white/orange identity but prioritize status clarity.

## 2.6 Analytics

The current app uses a `trackEvent()` helper that pushes events to `window.dataLayer`.

Safe portal events may include:

```text
portal_login_success
portal_agreement_view
portal_agreement_accept_success
portal_invoice_view
portal_project_ready_view
```

Never push agreement text, emails, payment evidence URLs, auth tokens or sensitive audit payloads to analytics.

## 2.7 Testing

No dedicated test runner is currently declared.

Mandatory current checks:

```bash
npm run lint
npm run typecheck
npm run build
```

Add automated tests for portal business logic before production. Select and pin the test framework version in the repository.

---

# 3. Project Structure

## 3.1 Current structure

```text
clients/nyholm-brothers-web/
├── .env.example
├── .gitignore
├── README.md
├── instructions.md
├── docs/
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── src/
    ├── app/
    ├── components/
    └── lib/
```

Roles:

```text
src/app/         routes, layout, metadata, global CSS
src/components/  reusable UI and interactive components
src/lib/         site configuration, domain data and analytics
```

Known current components:

```text
src/components/
├── faq-list.tsx
├── json-ld.tsx
├── lead-form.tsx
├── lead-section.tsx
├── site-footer.tsx
├── site-header.tsx
├── tracked-link.tsx
└── ui.tsx
```

Known current library files:

```text
src/lib/
├── analytics.ts
└── site.ts
```

## 3.2 Target portal structure

```text
src/
├── app/
│   ├── portal/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts
│   │   └── (protected)/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── sopimus/
│   │       │   └── page.tsx
│   │       └── laskutus/
│   │           └── page.tsx
│   └── ...
│
├── components/
│   ├── portal/
│   │   ├── agreement-card.tsx
│   │   ├── agreement-acceptance-form.tsx
│   │   ├── invoice-card.tsx
│   │   ├── project-status-card.tsx
│   │   ├── status-badge.tsx
│   │   └── portal-shell.tsx
│   └── ...
│
└── lib/
    ├── portal/
    │   ├── auth.ts
    │   ├── permissions.ts
    │   ├── agreements.ts
    │   ├── invoices.ts
    │   ├── projects.ts
    │   ├── audit.ts
    │   ├── status.ts
    │   ├── schemas.ts
    │   └── types.ts
    ├── supabase/
    │   ├── client.ts
    │   ├── server.ts
    │   └── middleware.ts
    ├── analytics.ts
    └── site.ts
```

Exact Supabase helper names may change based on the pinned package/API. Preserve separation of concerns.

## 3.3 Database model

Recommended minimum tables:

```text
clients
client_users
projects
agreements
agreement_acceptances
invoices
audit_events
```

### clients

```text
id
name
business_id
created_at
```

### client_users

```text
id
client_id
auth_user_id
role
created_at
```

Roles:

```text
CLIENT_APPROVER
CLIENT_VIEWER
VIDO_ADMIN
```

### projects

```text
id
client_id
name
status
activated_at
activated_by
created_at
updated_at
```

### agreements

```text
id
client_id
version
document_id
document_url
document_hash
status
effective_at
created_at
```

### agreement_acceptances

Append-only:

```text
id
agreement_id
client_id
accepted_by_auth_user_id
accepted_by_name
accepted_email
acceptance_method
acceptance_text_snapshot
accepted_at
evidence_url
created_at
```

### invoices

```text
id
client_id
invoice_number
status
sent_at
paid_at
evidence_url
created_at
updated_at
```

### audit_events

Append-only:

```text
id
client_id
project_id
actor_auth_user_id
actor_type
event_type
entity_type
entity_id
event_data
created_at
```

Event examples:

```text
AGREEMENT_VIEWED
AGREEMENT_ACCEPTED
AGREEMENT_VERSION_PUBLISHED
INVOICE_MARKED_SENT
INVOICE_MARKED_PAID
PAYMENT_EVIDENCE_ATTACHED
PROJECT_READY_TO_START
PROJECT_ACTIVATED
```

## 3.4 Readiness calculation

Define one authoritative domain function:

```ts
export function deriveProjectReadiness(input: {
  agreementAccepted: boolean;
  invoicePaid: boolean;
}): "WAITING" | "READY_TO_START" {
  return input.agreementAccepted && input.invoicePaid
    ? "READY_TO_START"
    : "WAITING";
}
```

Do not repeat this rule in multiple UI components. The server/database remains authoritative.

## 3.5 Evidence

The existing project uses Google Drive documents and email evidence.

MVP rules:

- store stable IDs/URLs;
- store agreement version;
- optionally store content hash;
- never use a file name alone as evidence identity;
- preserve original source references if evidence is later copied into Supabase Storage.

---

# 4. Coding Standards

## 4.1 Principles

1. Prefer clarity over abstraction.
2. Keep business rules outside JSX.
3. Default to Server Components.
4. Add `"use client"` only when browser interaction is required.
5. Validate every write on the server.
6. Enforce authorization with RLS/server rules, not hidden buttons.
7. Treat agreement/payment/activation records as business-critical.
8. Never silently mutate historical evidence.

## 4.2 TypeScript

Required:

```text
strict TypeScript
explicit domain types
no implicit any
no scattered status strings in JSX
```

Prefer union types/enums over generic strings.

Use exhaustive handling for state transitions.

## 4.3 Naming

Files:

```text
kebab-case.ts
agreement-card.tsx
project-status-card.tsx
```

Components:

```text
PascalCase
AgreementCard
```

Functions/variables:

```text
camelCase
acceptAgreement()
markInvoicePaid()
```

Database:

```text
snake_case
agreement_acceptances
accepted_at
```

Environment variables:

```text
UPPER_SNAKE_CASE
```

Only browser-safe variables use `NEXT_PUBLIC_`.

## 4.4 Next.js patterns

Server Components for:

- protected dashboard;
- agreement display;
- invoice display;
- authorization-dependent rendering.

Client Components only for:

- acceptance form;
- browser feedback;
- client-side analytics.

Choose one mutation pattern and use it consistently:

- Server Actions; or
- Route Handlers.

Every mutation:

```text
authenticate
→ authorize
→ validate
→ load authoritative state
→ transaction
→ append audit event
→ return sanitized result
```

## 4.5 Validation

Never trust browser-provided:

```text
client_id
agreement_id
accepted_by
invoice status
project status
```

Derive actor identity from the authenticated session.

Authorize:

```text
user
→ client membership
→ role
→ entity ownership
→ allowed action
```

## 4.6 RLS

Enable RLS on all portal tables exposed via Supabase.

Minimum:

- customer selects only own `client_id`;
- approver accepts only own active agreement;
- customer cannot mark invoice paid;
- customer cannot activate project;
- VIDO admin can manage assigned customer;
- audit records are not customer-editable.

Do not ship a table without reviewing its RLS policy.

## 4.7 Audit trail

Material mutations record:

```text
who
what
entity
previous/new state where relevant
timestamp
method/source
evidence reference
```

Use server/database timestamps. Browser time is not authoritative.

## 4.8 Agreement transaction

Pseudo-flow:

```text
BEGIN
  authenticate
  load current active agreement
  authorize customer/role
  verify acceptance still required
  insert acceptance
  append AGREEMENT_ACCEPTED
  derive project readiness
  if readiness changed:
      update project
      append PROJECT_READY_TO_START
COMMIT
```

Make it idempotent. Double-clicks must not create inconsistent history.

## 4.9 Payment update

Only an authorized internal role can mark payment.

Record:

```text
invoice_number
paid_at
evidence reference
actor
audit event
```

Then re-derive project readiness.

## 4.10 Security

Never expose:

```text
SUPABASE_SERVICE_ROLE_KEY
database credentials
Drive tokens
Vercel secrets
private evidence
```

Current CSP permits self-hosted content, Wix image assets and the Supabase endpoint. When auth/storage domains are added, update `next.config.ts` deliberately.

Do not solve integrations by globally allowing:

```text
connect-src *
script-src *
```

## 4.11 Accessibility

Required:

- semantic headings;
- explicit labels;
- keyboard navigation;
- focus-visible states;
- `aria-live` for mutation feedback;
- status not communicated by color alone;
- action-oriented button labels.

Example:

```text
Käynnistä projekti
Disabled reason: Sopimus odottaa hyväksyntää
```

## 4.12 Errors

Use meaningful HTTP/domain errors:

```text
401 not authenticated
403 unauthorized
404 inaccessible/not found
409 state/version conflict
422 invalid input/transition
500 unexpected server error
```

Never return raw DB errors or environment secrets.

## 4.13 Logging

Allowed:

```text
request ID
event type
entity ID
status
duration
```

Avoid:

```text
full agreement text
email bodies
payment evidence
auth tokens
cookies
unnecessary personal data
```

## 4.14 Linting and checks

Current ESLint uses:

```text
eslint-config-next/core-web-vitals
eslint-config-next/typescript
```

Required before PR/release:

```bash
npm run lint
npm run typecheck
npm run build
```

## 4.15 Git workflow

Recommended:

```text
audit
→ schema/migration
→ RLS
→ server/domain layer
→ UI
→ QA
→ docs
→ PR
→ preview
→ production
```

Commit prefixes:

```text
feat(portal):
fix(portal):
security(portal):
db(portal):
test(portal):
docs(portal):
```

---

# 5. User Stories

## 5.1 Customer login

**As a customer**, I want protected portal access so my commercial/project data is not public.

Criteria:

- approved auth method;
- anonymous access rejected;
- user sees only assigned client.

## 5.2 Customer dashboard

**As a customer**, I want one screen showing agreement, invoice and project state so I know what blocks project start.

## 5.3 Review agreement

**As a customer approver**, I want to open the exact current agreement before accepting it.

Criteria:

- version visible;
- document visible;
- content cannot change under the same version ID.

## 5.4 Accept agreement

**As a customer approver**, I want explicit written acceptance recorded.

Criteria:

- checkbox;
- confirmation action;
- text snapshot;
- authenticated actor;
- server timestamp;
- agreement version/document ID;
- immutable history.

## 5.5 View invoice

**As a customer**, I want to see `SENT/PAID` status.

The customer cannot self-mark payment.

## 5.6 Confirm payment

**As a VIDO admin**, I want to mark an invoice paid and reference evidence.

Criteria:

- admin-only;
- timestamp;
- evidence;
- audit event;
- readiness recalculated.

## 5.7 System readiness

**As the system**, I must set `READY_TO_START` only when the required agreement is accepted and required invoice is paid.

## 5.8 Activate project

**As a VIDO admin**, I want explicit activation after all gates pass.

Criteria:

- disabled before readiness;
- server re-checks;
- actor/time recorded;
- `PROJECT_ACTIVATED` event.

## 5.9 Customer sees active state

**As a customer**, I want to see `AKTIIVINEN` after activation.

## 5.10 New agreement version

**As a VIDO admin**, I want a new version without destroying old acceptance evidence.

Example:

```text
v1.0 accepted
→ publish v1.1
→ v1.0 history preserved
→ v1.1 PENDING_ACCEPTANCE
```

## 5.11 Audit review

**As an authorized internal user**, I want to see what happened, when, by whom and against which version.

## 5.12 Tenant isolation

**As any portal user**, I must never access another customer's data by changing URL/entity IDs/request bodies.

RLS enforces this.

---

# 6. APIs and Integrations

## 6.1 Existing Supabase lead endpoint

```text
POST https://dbfvptbhxqgsanwnwgxy.supabase.co/functions/v1/submit-nyholm-lead
```

Configured by:

```text
NEXT_PUBLIC_LEAD_ENDPOINT
```

Current lead payload includes:

```text
name
email
phone
service_interest
city
message
consent
source
landing_page
UTM fields
started_at
consent_version
```

This public lead flow is separate from authenticated portal mutations. Never reuse the public lead endpoint for contract acceptance or payment updates.

## 6.2 Supabase Auth — target

Preferred MVP:

```text
email magic link / OTP
```

Flow:

```text
email
→ Supabase auth
→ callback/session
→ client_users lookup
→ role/client resolution
→ RLS-protected data
```

Do not hardcode approver identity in frontend authorization.

## 6.3 Supabase Postgres

Authoritative runtime state:

```text
identity mapping
agreements
acceptances
invoices
project state
audit events
```

Google Drive, Asana, browser storage and email are not the runtime state database.

## 6.4 Supabase RLS

Every portal table defines:

```text
SELECT
INSERT
UPDATE
DELETE
```

policies per role and tenant.

Append-only acceptance/audit rows normally deny customer update/delete.

## 6.5 Supabase Storage — optional

Use private storage only if evidence files need to be retained directly.

Potential objects:

```text
agreement PDF snapshot
payment evidence
acceptance receipt
```

Use private buckets and signed URLs. Not required for MVP if stable Drive/email references are sufficient.

## 6.6 Google Drive

Existing customer-facing document structure:

```text
00 ALOITA TÄSTÄ
01 Sopimus ja laskutus
02 Projektisuunnitelma
03 Hyväksyttävät sisällöt
04 Julkaistut materiaalit
05 Raportointi
```

MVP portal strategy:

```text
store document IDs/URLs
display only customer-safe references
do not expose internal Drive tree
```

Possession of a Drive link is not portal authorization.

## 6.7 Email evidence

Existing payment confirmation may be email-based.

MVP:

```text
VIDO verifies email externally
→ admin marks invoice PAID
→ evidence reference stored
→ audit event
```

Payment email does not equal agreement acceptance.

## 6.8 Vercel

Deployment:

```text
branch
→ PR
→ lint/typecheck/build
→ Vercel preview
→ auth/RLS QA
→ approval
→ production
```

## 6.9 GitHub

Source-of-truth:

```text
Jambovisuaalit/vido-social-frontend
clients/nyholm-brothers-web
branch: nyholm-brothers-sales-site
```

Portal code, migrations and docs must be version-controlled.

## 6.10 Asana

Asana is operational project management, not runtime state.

Portal workstream:

```text
P0 — Lock agreement version
P0 — Record written acceptance
P0 — Confirm invoice PAID
P0 — Build agreement/invoice view
P0 — Implement audit trail
P1 — ACCEPTED + PAID → READY
P1 — Portal QA
[MILESTONE] — portal ACTIVE
```

Do not couple application state to Asana completion.

## 6.11 Analytics / dataLayer

Existing app pushes events to `window.dataLayer`.

Only send non-sensitive product analytics. Never send commercial evidence or unnecessary PII.

## 6.12 Resend / transactional email

Resend is **not currently declared as a dependency or environment integration in this Nyholm application**.

If future notifications are added, document and pin:

```text
provider/package version
sender domain
templates
retry/failure behavior
audit semantics
```

Portal state must not depend on successful email delivery.

---

# Implementation Checklist

## P0 — commercial state

- [ ] Lock agreement version `v1.0`.
- [ ] Record canonical agreement document ID/URL.
- [ ] Resolve final invoice/VAT representation before exposing final commercial data.
- [ ] Import/reference existing payment evidence.
- [ ] Define approver role.

## P0 — backend

- [ ] Add and pin Supabase auth/client dependencies.
- [ ] Add portal migration.
- [ ] Add RLS.
- [ ] Add append-only audit model.
- [ ] Generate TypeScript DB types.
- [ ] Add agreement acceptance transaction.
- [ ] Add payment transaction.
- [ ] Add readiness calculation.
- [ ] Add activation transaction.

## P0 — frontend

- [ ] `/portal/login`
- [ ] protected portal layout
- [ ] dashboard
- [ ] agreement view/acceptance
- [ ] invoice status
- [ ] project status
- [ ] admin activation control

## P1 — QA

- [ ] anonymous access rejected
- [ ] cross-tenant access rejected
- [ ] viewer cannot accept
- [ ] approver can accept
- [ ] customer cannot mark invoice paid
- [ ] VIDO admin can mark invoice paid
- [ ] one gate only keeps project waiting
- [ ] both gates make project ready
- [ ] activation impossible before ready
- [ ] activation creates audit event
- [ ] new version requires new acceptance
- [ ] audit history cannot be customer-modified
- [ ] mobile works
- [ ] keyboard/focus works
- [ ] lint passes
- [ ] typecheck passes
- [ ] build passes

---

# Definition of Done

Portal is **ACTIVE** only when:

```text
1. active agreement version is locked;
2. explicit written acceptance is stored;
3. invoice/payment is verified;
4. tenant isolation and RLS are tested;
5. audit history is immutable;
6. READY_TO_START works server-side;
7. authorized activation works;
8. preview QA passes;
9. production smoke test passes;
10. customer can complete acceptance without internal technical assistance.
```

The portal should reduce ambiguity, not create another parallel source of truth.
