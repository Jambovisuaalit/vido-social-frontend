# Juha Rantakaulio Oy — Website Design Lock v1.0

**Status:** LOCKED  
**Date:** 2026-08-20  
**Scope:** Homepage prototype / design system baseline  
**Branch:** `rantakaulio-prototype-v1`

This file is the source of truth for the five core homepage design decisions below. Changes require an explicit new version of this document.

---

## 1. Visual direction — LOCKED

### Direction

**Industrial Nordic Premium**

The website must feel like an established Finnish logistics operator: operational, technically credible, calm, durable and premium without looking like SaaS, a startup or a generic trucking template.

### Visual principles

- dark graphite / near-black industrial surfaces
- warm off-white content backgrounds
- high-visibility lime used only as a controlled accent
- large authentic photography of vehicles, terminal, loading, drivers and people
- strong condensed-feeling hierarchy through scale and spacing, not decorative effects
- generous whitespace
- visible grids, lines, technical labels and operational data may be used sparingly
- motion must be subtle and functional
- mobile experience is first-class, not a reduced desktop version

### Do

- authentic Rantakaulio photography
- large editorial image crops
- bold typography
- precise spacing
- clear hierarchy
- physical/industrial texture through photography
- real operational proof

### Do not

- stock truck photography
- gradients that make the site feel like an AI/SaaS product
- excessive glassmorphism
- neon glow effects
- oversized decorative animations
- generic logistics icons as the main visual language
- invented statistics or proof points

### Core palette

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0D1110` | primary dark background |
| `--ink-2` | `#171D1B` | elevated dark surfaces |
| `--paper` | `#F0EEE7` | primary light background |
| `--paper-2` | `#E4E1D8` | secondary light background |
| `--white` | `#FFFEFA` | high-contrast text |
| `--accent` | `#D7FF45` | CTA / active / proof accent |
| `--accent-ink` | `#182000` | text on accent |

---

## 2. Hero and core message — LOCKED

### H1

> **Lämpötilahallittua logistiikkaa yli 40 vuoden kokemuksella.**

### Supporting copy

> Kuljetukset, terminaali, varastointi ja jakelu Kouvolasta yrityksille Suomessa.

### Brand promise / proof line

> **Sovittuun aikaan. Sovitussa paikassa. Sovitulla kalustolla.**

### Primary CTA

> **Pyydä tarjous**

### Secondary CTA

> **Tutustu palveluihin**

### Hero proof strip

1. `1984 →` — Kuljetustoimintaa yli 40 vuotta
2. `ATP` — Lämpötilahallittu kalusto
3. `LIVE` — Reaaliaikainen lämpötilaseuranta
4. `KOUVOLA` — Terminaalitoiminta

### Reason for lock

The homepage must explain within seconds:

1. what Rantakaulio does
2. why it is credible
3. where it operates from
4. what the visitor should do next

The previous prototype line **“Lämpötilahallittua logistiikkaa. Varmasti perille.”** is not the locked H1. It may be reused as campaign copy later, but the website H1 prioritizes factual clarity, differentiation and SEO relevance.

---

## 3. Accent color — LOCKED

### Decision

**Keep `#D7FF45`.**

The lime is retained because it creates a distinctive high-visibility transport/industrial signal against graphite and warm neutral surfaces. It gives the site a recognizable digital asset without changing the company into a startup-style brand.

### Usage rule

The lime is an **accent, not a brand surface color**.

Target usage: approximately **5–8% of visible UI surface**.

### Use lime for

- primary CTA buttons
- active navigation states
- small technical labels
- selected proof numbers / statuses
- focus states
- limited line/detail accents

### Do not use lime for

- full large sections except a deliberate final CTA block
- body text
- long paragraphs
- multiple competing cards in one viewport
- gradients/glow-heavy visual effects

### Conservative fallback

If later brand photography or the physical vehicle livery creates a hard visual conflict, the approved fallback is:

`#C7D846`

Do not switch to the fallback without an explicit v1.1 design decision.

---

## 4. Service hierarchy — LOCKED

The website must not present all services as equal.

### Tier 1 — Core position

**1. Lämpötilahallitut kuljetukset**

This is the primary commercial and brand anchor.

### Tier 2 — Primary commercial solutions

**2. Elintarvikelogistiikka**  
**3. Terminaalipalvelut**  
**4. Varastointi ja jakelu**

These demonstrate that Rantakaulio can provide more than point-to-point transport.

### Tier 3 — Separate business line

**5. Raakapuukuljetukset**

Raw timber logistics remains visible but should not dilute the temperature-controlled logistics position. It receives its own service page and a lower visual priority on the homepage.

### Homepage service-card weighting

- Temperature-controlled transport: **large / dominant card**
- Food logistics: **second-largest card**
- Terminal: standard card
- Storage & distribution: standard card
- Raw timber: standard / visually separate card

### Commercial narrative

The homepage must communicate this chain clearly:

> **Kuljetus → terminaali → varastointi → keräily → jakelu**

This is the key mechanism for moving the company away from a generic €/km transport-company position toward a broader logistics-partner position.

---

## 5. Homepage section order — LOCKED

The homepage order is optimized for **clarity → proof → solution → capability → trust → conversion**.

### 01 — Header / navigation

- Logo
- Palvelut
- Kalusto
- Yritys
- Rekry
- Yhteystiedot
- Primary CTA: `Pyydä tarjous`

### 02 — Hero

- locked H1
- supporting copy
- primary + secondary CTA
- authentic hero photography / approved temporary prototype visual

### 03 — Proof bar

- 1984
- ATP
- live temperature monitoring
- Kouvola terminal

### 04 — Services

Order:

1. Lämpötilahallitut kuljetukset
2. Elintarvikelogistiikka
3. Terminaalipalvelut
4. Varastointi ja jakelu
5. Raakapuukuljetukset

### 05 — Logistics chain / terminal capability

> Kuljetus → varastointi → keräily → jakelu

Purpose: demonstrate a broader operational solution than transport alone.

### 06 — Fleet & technology proof

- ATP
- Fleetlogis
- real-time temperature monitoring
- fleet / safety proof
- authentic vehicle detail imagery

### 07 — Customer case / operational proof

At least one real case when permission and facts are available.

Structure:

> Haaste → ratkaisu → toteutus → tulos

Until a verified case exists, this section must not contain invented customer metrics.

### 08 — Company / history / people

- 1984 start of transport operations
- 1989 Juha Rantakaulio Oy registration
- Juha Rantakaulio
- Henri Rantakaulio
- Juho Rantakaulio
- family-business continuity

### 09 — Recruitment teaser

Short section only. Links to `/rekry`.

Purpose: continuously support driver recruiting without distracting from the B2B conversion path.

### 10 — Final quote CTA

Headline focused on the logistics need, not generic contact.

Primary action:

> **Pyydä tarjous**

The form collects enough information to qualify the request without creating excessive friction.

### 11 — Footer

- business details
- contact information
- services
- social channels
- privacy
- Y-tunnus

---

# Locked conversion path

The default homepage journey is:

> **Hero → proof → relevant service → operational capability → technical proof → company trust → quote request**

The homepage is not primarily a corporate brochure. It is a B2B credibility and conversion page.

---

# Change-control rule

These five decisions are now locked for prototype v1:

- visual direction
- hero message
- lime accent
- service hierarchy
- homepage section order

Any change to one of these items must be documented as `DESIGN_LOCK_v1.1.md` or later before implementation becomes the new baseline.
