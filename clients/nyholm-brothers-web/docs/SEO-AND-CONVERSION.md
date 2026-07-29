# SEO and conversion operating model

## Positioning

Nyholm Brothers is positioned as a reliable, customer-close construction
partner for demanding renovation, yard-building and archipelago projects in
Espoo and the Helsinki metropolitan area.

Primary conversion: **Varaa maksuton kartoituskäynti**.

Secondary conversions:

- phone click to Patric;
- email click;
- qualified form submission.

The copy avoids unverified superlatives, certificates and project details.
Published proof is limited to existing customer feedback and publicly available
project material.

## Search architecture

Priority intent pages:

- `/rakennusliike-espoo`
- `/rakennusliike-helsinki`
- `/rakennusliike-vantaa`
- `/huoneistoremontti-espoo`
- `/huoneistoremontti-helsinki`
- `/huoneistoremontti-vantaa`
- `/kylpyhuoneremontti-espoo`
- `/korjausrakentaminen-espoo`
- `/terassin-rakentaminen-espoo`
- `/piharakennukset-espoo`
- `/saaristorakentaminen-espoo`
- `/maarakennus-ja-perustukset`

Each page has unique metadata and copy, visible FAQs, internal links, Service
schema and a direct conversion path.

## Measurement events

The UI sends the following events to `window.dataLayer` when a compatible
analytics container is installed:

| Event | Trigger | Useful dimensions |
| --- | --- | --- |
| `cta_click` | mapping or quote CTA | `label`, `destination` |
| `phone_click` | phone link | `label`, `destination` |
| `email_click` | email link | `label`, `destination` |
| `lead_submit` | successful database write | `service_interest`, `source` |
| `lead_error` | failed form request | `source` |

No marketing script or non-essential cookie is enabled in this release. Add a
consent platform before enabling marketing tags.

## Lead quality data

Supabase stores:

- contact details and free-text need;
- service interest and target city;
- source page and UTM parameters;
- consent version and timestamp;
- workflow status (`new`, `contacted`, `qualified`, `won`, `lost`, `spam`).

Raw IP addresses are not stored.

## 90-day scorecard

Track weekly and compare against the launch baseline:

1. qualified organic leads;
2. lead-to-cartography-call rate;
3. cartography-call-to-offer rate;
4. offer-to-won rate;
5. organic sessions landing on priority pages;
6. calls and form submissions by landing page;
7. Google Business Profile actions;
8. non-branded query impressions and clicks in Search Console.

Initial business targets from the planning material:

- 10 priority pages indexed and optimized;
- at least six complete reference pages as new material becomes available;
- organic leads +25%;
- Google Business Profile actions +20%;
- full phone and form conversion measurement.

Targets are measurement goals, not performance guarantees.
