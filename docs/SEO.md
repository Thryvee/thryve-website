# Thryve SEO System

This document is the source of truth for Thryve's search architecture. Read it before
adding, removing, or restructuring any indexable page. It exists so future work (human
or AI) doesn't accidentally break the internal-linking or keyword-to-page mapping below.

## Target audience

Primary: founders, ecommerce operators, growth/marketing leads, and CMOs at D2C/ecommerce
brands with existing traffic or revenue, evaluating a growth partner. Not casual
marketing-terminology researchers.

## Site architecture

```
/                       — homepage, broadest commercial positioning
/services               — service hub, links all 4 pillar pages
/services/d2c-growth
/services/ecommerce-cro
/services/ecommerce-acquisition
/services/ecommerce-retention
/case-studies           — collection page + per-study detail modal
/about                  — founder, values, positioning
/contact                — booking flow (Calendly), lead capture
/privacy, /terms        — legal
```

`/services` (scroll anchor on the homepage, `id="services"`) is a **different thing** from
`/services` (the route). The homepage anchor is a visual showcase (`ScrollStackSection`);
the route is the indexable, crawlable hub page. Do not conflate them or redirect one to
the other — they serve different purposes (on-page engagement vs. search visibility).

## Keyword-to-page map

One primary keyword per URL. Do not create a second page targeting the same primary term
— that creates cannibalization.

| URL | Primary keyword | Category |
|---|---|---|
| `/services/d2c-growth` | D2C growth agency | Scaling |
| `/services/ecommerce-cro` | ecommerce CRO agency | Conversion |
| `/services/ecommerce-acquisition` | ecommerce customer acquisition | Acquisition |
| `/services/ecommerce-retention` | ecommerce retention agency | Retention |
| `/case-studies` | D2C case studies / results | — |
| `/about` | Thryve agency, founder | — |
| `/` (homepage) | revenue systems agency, D2C growth agency (broadest) | — |

Each service page's `category` field (in `src/lib/servicesData.ts`) maps 1:1 to a
`CaseStudy["category"]` value (`Acquisition | Conversion | Retention | Scaling`), which
is how `ServicePageTemplate` automatically surfaces 2 relevant case studies per service
page without manual curation.

## Metadata rules

- Every route needs a unique `title`, `description`, and `alternates.canonical`.
- Client-component pages (`"use client"`) cannot export `metadata` — put it in a sibling
  `layout.tsx` instead (see `src/app/contact/layout.tsx` for the pattern).
- Titles should read naturally in a SERP, not as a pipe-separated keyword list.

## Structured data

- `Organization` + `WebSite` schema live once, in the root `layout.tsx`.
- Every indexable page should carry a `BreadcrumbList` matching its actual nav depth.
- Service pages carry `Service` schema keyed to `{siteUrl}/#organization` via `@id`.
- **Never fabricate** `AggregateRating`, `Review`, or numeric claims not already stated
  in visible page copy. If a stat isn't real, don't schema-mark it.

## Content standards

- No fabricated client results, testimonials, stats, or credentials — ever. If a
  section needs a real number that doesn't exist yet, write the structure and mark it
  `[BUSINESS INPUT REQUIRED]` rather than inventing one.
- Avoid agency clichés (unlock your potential, game-changing, cutting-edge, etc.) —
  match the existing brand voice: confident, specific, slightly blunt.
- A page must answer "why does this exist beyond restating the SERP" before it ships.

## Internal linking rules

- Every service page links to: the `/services` hub (breadcrumb), 2 relevant case
  studies (auto-pulled by category), and a `/contact` CTA.
- `/case-studies` and `/about` both link back into `/services` via their CTA sections.
- Nav (`Navbar.tsx`) and footer (`Footer.tsx`) both carry the same 3 primary links
  (About, Services, Case Studies) — keep them in sync if either changes.

## What's NOT built yet (flagged, not fabricated)

- `/insights` content hub, playbooks, proprietary research — no content exists to
  publish yet. Building the routes without real articles would create thin pages,
  which this system explicitly avoids. `[BUSINESS INPUT REQUIRED: content/research]`
- Industry vertical pages (`/industries/*`) — same reasoning; no verified vertical
  expertise/case studies to point them at yet.
- Google Search Console / GA4 data-driven prioritization — no access in this session.
  `[REQUIRES EXTERNAL DATA]`
- Backlink/PR strategy — directional only (see final report); execution requires
  business relationships this session has no access to.

## Before adding a new page

1. Does an existing page already target this primary keyword? If yes, expand that page
   instead of creating a new one.
2. Do you have real, verifiable content to fill every section (no fabricated stats)?
3. Does it fit an existing IA branch (`/services/*`, `/case-studies`, etc.), or does a
   new branch need its own hub page first?
4. Add it to `sitemap.ts`, add a `BreadcrumbList`, and link it from at least one
   existing page — an orphan page is invisible to both users and crawlers.
