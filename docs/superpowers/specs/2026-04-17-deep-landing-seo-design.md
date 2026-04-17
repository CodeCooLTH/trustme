# Deep — Landing Page SEO Framework Design

**Date:** 2026-04-17
**Status:** Draft — pending user review
**Owner:** shinobu22
**Related:** `docs/PRD.md`, `CLAUDE.md`, `docs/superpowers/specs/2026-04-04-safepay-trust-platform-design.md`

## 1. Context & Goals

The commercial brand of this product is **Deep** (codebase still named `safepay`). The production domain is `https://deepthailand.app`. The only public-facing route today is the landing page under `src/app/(marketing)/`. The rest of the app lives under `(paces)` (Tailwind/Preline) and is gated behind auth.

This spec covers **site-wide public SEO infrastructure** and the **landing page content/metadata** for Deep. It is framework-first: every SEO primitive is reusable so future public pages (shop profile, about, pricing, etc.) get SEO for free.

### Goals (what "done" looks like)

- Google indexes `deepthailand.app/` within a week of go-live.
- Rich snippets eligible in SERP: Organization info, FAQ dropdown, sitelinks searchbox.
- Lighthouse SEO score ≥ 95 (mobile and desktop).
- Social shares (Facebook, LINE, X/Twitter) show a branded preview card with Thai copy.
- Google Analytics 4 tracking is live on both marketing and app routes, PDPA-compliant (IP anonymised).
- Adding a new public page requires ≤ 2 lines of SEO code (one call to `buildMetadata`).

### Non-goals (explicit)

- **English (EN) locale.** Thai only for now. i18n structure is prepared but not activated.
- **Dynamic sitemaps for shops/products.** Skeleton is in place; actual DB-backed entries are a follow-up when shop data exists.
- **Review / AggregateRating schema.** Requires first-party authenticated reviews; re-evaluate when order-review flow is live.
- **A/B testing of metadata, CDN-level cache tuning, Lighthouse CI automation.** Deferred.
- **Renaming the repository / database identifiers from SafePay → Deep.** Brand is user-facing only; internal identifiers stay as-is until a separate rename project.

## 2. Scope Summary

Full scope (A + B + C from brainstorming): landing page SEO **plus** reusable framework for future public pages **plus** site-wide technical SEO (robots, sitemap, manifest, analytics, structured data).

Target keyword clusters for landing (full taxonomy lives in §4):

- **brand:** Deep, Deep Thailand, deepthailand, deepthailand.app, Deep ร้านค้า, Deep ยืนยันตัวตน
- **antiFraud:** ป้องกันมิจฉาชีพ, เช็คคนโกง, ตรวจสอบคนโกง, ซื้อของออนไลน์ปลอดภัย, ซื้อของไอจีไม่โดนโกง, ตรวจสอบร้านค้าออนไลน์, เช็คร้านค้าก่อนโอน, โดนโกงออนไลน์, รายชื่อคนโกง, แบล็คลิสต์มิจฉาชีพ, …
- **verify:** ยืนยันตัวตน seller, ยืนยันตัวตนร้านค้า, verified seller, verified seller Thailand, trust score, คะแนนความน่าเชื่อถือ, ร้านค้าน่าเชื่อถือ, ร้านค้าผ่านการตรวจสอบ, badge ร้านค้า, เครื่องหมายรับรองร้านค้า, …
- **transaction:** OTP confirm order, ยืนยันการซื้อขายด้วย OTP, ระบบยืนยันคำสั่งซื้อ, คุ้มครองผู้ซื้อออนไลน์, buyer protection Thailand
- **longTail:** พ่อค้าแม่ค้าออนไลน์ ยืนยันตัวตน, แอพตรวจสอบร้านค้า, เว็บเช็คคนโกง, ระบบ trust score ร้านค้า

### On the honesty of `<meta name="keywords">`

Google does **not** use the `<meta name="keywords">` tag as a ranking signal — Matt Cutts confirmed this publicly in 2009 and it has not changed since. We still emit the tag (Bing and some local engines give it minimal weight, and it costs effectively nothing) but the real value of `SITE.keywords` is as the project's **canonical keyword taxonomy**. The 5 typed groups in §4 are the reference source we draw from when writing H1/H2, body copy, image `alt` text, FAQ questions, and URL slugs — the on-page signals Google actually reads. Treat the taxonomy as a content playbook first and a `<meta>` payload second.

## 3. Architecture

The SafePay codebase uses Next.js 16 App Router with **multiple root layouts** (per CLAUDE.md): `(marketing)` has its own `<html>` and uses MUI + Emotion + Anuphan font; `(paces)` has its own `<html>` and uses Tailwind/Preline. SEO primitives must work under both without duplicating logic.

```
┌─────────────────────────────────────────────────────┐
│ src/lib/seo.ts  — single source of truth             │
│   • SITE constants (name, url, locale, brand)        │
│   • buildMetadata({ title?, description?, path?,     │
│                     keywords?, noIndex?, ogImage? }) │
│   • buildCanonical(path)                             │
└──────────────────────┬──────────────────────────────┘
                       │ imported by
       ┌───────────────┼──────────────────┐
       │               │                  │
┌──────▼────────┐ ┌────▼──────┐ ┌─────────▼───────┐
│ (marketing)   │ │ (paces)   │ │ future public   │
│ layout + page │ │ layout    │ │ routes          │
└───────────────┘ └───────────┘ └─────────────────┘

┌─────────────────────────────────────────────────────┐
│ src/app/ — site-root (applies across both layouts)   │
│   robots.ts          sitemap.ts        manifest.ts   │
│   icon.tsx           apple-icon.tsx                  │
│   opengraph-image.tsx       twitter-image.tsx        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ src/components/seo/   — JSON-LD components (RSC)     │
│   JsonLd, Organization, WebSite, Service, Faq,       │
│   Breadcrumb                                         │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ src/components/analytics/                            │
│   GoogleAnalytics.tsx (client, next/script)          │
└─────────────────────────────────────────────────────┘
```

### Design decisions

1. **`src/lib/seo.ts` is the single source of truth.** Every `generateMetadata` / `export const metadata` calls `buildMetadata(...)`. No other place constructs a `Metadata` object by hand.
2. **Site-root metadata files live at `src/app/*`**, not inside any route group — so they apply across both `(marketing)` and `(paces)` roots.
3. **`opengraph-image.tsx` at site-root is the default**; per-route overrides are allowed but unused at launch.
4. **JSON-LD is rendered server-side.** Components emit a single `<script type="application/ld+json">` tag each. Google crawls it on first response.
5. **GA4 loads in both root layouts** via a reusable `<GoogleAnalytics />` client component. It no-ops if `NEXT_PUBLIC_GA_MEASUREMENT_ID` is missing (preview/dev safe).
6. **i18n-ready.** `buildCanonical(path)` is a single function; adding locale later means threading a `locale` param through `buildMetadata` and extending `hreflang` in `alternates.languages`. No restructure required.

### Environment variables

Added to `.env.example`:

```
NEXT_PUBLIC_SITE_URL=https://deepthailand.app
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TB854DJZX4
NEXT_PUBLIC_GSC_VERIFICATION=
```

- `NEXT_PUBLIC_SITE_URL` drives canonical, OG URL, sitemap `<loc>`, robots `host`.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` is provided; already in hand: `G-TB854DJZX4`.
- `NEXT_PUBLIC_GSC_VERIFICATION` is TBD — user will paste it in after adding `deepthailand.app` as a Search Console property and choosing the HTML-tag verification method. The code conditionally renders the `<meta>` only if present, so an empty value is safe in dev/preview.

> **Note (per `AGENTS.md`)**: Next.js 16 has breaking changes. The implementation plan must verify `MetadataRoute`, `ImageResponse` import paths, and `generateMetadata` signatures against `node_modules/next/dist/docs/` before writing the code.

## 4. Central SEO Config — `src/lib/seo.ts`

Holds brand constants plus two helpers: `buildCanonical` and `buildMetadata`.

### `SITE` constants

Keywords are modelled as a typed, grouped taxonomy (not a flat array). Pages can opt into specific groups via `buildMetadata({ keywordGroups })`; omit the field to merge all groups (what the landing page does).

```ts
const _keywords = {
  brand: [
    'Deep', 'Deep Thailand', 'deepthailand', 'deepthailand.app',
    'Deep ร้านค้า', 'Deep ยืนยันตัวตน',
  ],
  antiFraud: [
    'ป้องกันมิจฉาชีพ', 'เช็คคนโกง', 'ตรวจสอบคนโกง',
    'ซื้อของออนไลน์ปลอดภัย', 'ขายของออนไลน์ปลอดภัย',
    'ซื้อของไอจีไม่โดนโกง', 'ซื้อของเฟสบุ๊คไม่โดนโกง',
    'ตรวจสอบร้านค้าออนไลน์', 'วิธีตรวจสอบร้านค้าก่อนซื้อ', 'เช็คร้านค้าก่อนโอน',
    'โดนโกงออนไลน์', 'โดนโกงออนไลน์ทำยังไง',
    'รายชื่อคนโกง', 'แบล็คลิสต์มิจฉาชีพ',
    '5 สัญญาณเตือนมิจฉาชีพออนไลน์',
  ],
  verify: [
    'ยืนยันตัวตน seller', 'ยืนยันตัวตนร้านค้า', 'ร้านค้ายืนยันตัวตน',
    'verified seller', 'verified seller Thailand',
    'trust score', 'trust score ร้านค้า', 'คะแนนความน่าเชื่อถือ',
    'ร้านค้าน่าเชื่อถือ', 'ร้านค้าผ่านการตรวจสอบ',
    'badge ร้านค้า', 'badge ร้านค้าออนไลน์', 'เครื่องหมายรับรองร้านค้า',
  ],
  transaction: [
    'OTP confirm order', 'ยืนยันการซื้อขายด้วย OTP', 'ระบบยืนยันคำสั่งซื้อ',
    'คุ้มครองผู้ซื้อออนไลน์', 'buyer protection Thailand',
  ],
  longTail: [
    'พ่อค้าแม่ค้าออนไลน์ ยืนยันตัวตน', 'แอพตรวจสอบร้านค้า', 'เว็บเช็คคนโกง',
    'ระบบ trust score ร้านค้า',
  ],
} as const

export type KeywordGroup = keyof typeof _keywords

export const SITE = {
  name: 'Deep',
  legalName: 'Deep Thailand',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deepthailand.app',
  locale: 'th_TH',
  defaultTitle: 'Deep — ซื้อขายออนไลน์อย่างมั่นใจ ไม่ต้องกลัวมิจฉาชีพ',
  description:
    'Deep ระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์ ยืนยันตัวตนร้านค้า เช็ค Trust Score ป้องกันมิจฉาชีพ ซื้อขายปลอดภัยด้วย OTP confirm',
  keywords: _keywords,
  ogImage: { width: 1200, height: 630 },
} as const

export function resolveKeywords(groups?: KeywordGroup[]): string[] {
  if (!groups || groups.length === 0) return Object.values(_keywords).flat()
  return groups.flatMap((g) => _keywords[g])
}
```

Title: 58 characters (under Google's 60-char SERP cap).
Description: 158 characters (under the 160-char cap).
Keyword taxonomy: ~45 terms across 5 typed groups (`brand`, `antiFraud`, `verify`, `transaction`, `longTail`).

### `buildMetadata(opts)` — returns Next.js `Metadata`

Accepts:

- `title?: string` — omit to use `defaultTitle` verbatim (the full hero-style title is used as-is). If provided, the helper concatenates it into `"${title} | ${SITE.name}"` (e.g., `"Dashboard | Deep"`). The Next.js `title: { default, template }` form is *not* used because `template` only applies to nested child segments; `buildMetadata` is called per-page so a direct string is correct.
- `description?: string` — omit to use `SITE.description`.
- `path?: string` — canonical / OG URL basis, defaults to `/`.
- `keywords?: string[]` — extra ad-hoc keywords, merged on top of the resolved taxonomy.
- `keywordGroups?: KeywordGroup[]` — restrict merged keywords to specific groups (default: all groups).
- `noIndex?: boolean` — set on internal/auth pages to emit `robots: noindex, nofollow`.
- `ogImage?: string` — per-page override; omit to let `opengraph-image.tsx` handle it.

Returns a `Metadata` object with: `metadataBase`, `title` (plain string, see above), `description`, `keywords`, `alternates.canonical`, `openGraph`, `twitter` (card + title + description + images; no `site` handle at launch), `robots`, and `verification` (conditional on `NEXT_PUBLIC_GSC_VERIFICATION`).

### Usage examples

```ts
// Landing page (default copy, canonical /)
export const metadata = buildMetadata({ path: '/' })

// Future shop profile (dynamic)
export async function generateMetadata({ params }): Promise<Metadata> {
  const shop = await getShop(params.id)
  return buildMetadata({
    title: `ร้าน ${shop.name}`,
    description: `${shop.description} — ยืนยันตัวตนแล้ว Trust Score ${shop.trustScore}`,
    path: `/shop/${shop.id}`,
  })
}

// Authenticated / internal page
export const metadata = buildMetadata({ title: 'Dashboard', noIndex: true })

// Shop profile — narrower keyword targeting
buildMetadata({
  title: `ร้าน ${shop.name}`,
  path: `/shop/${shop.id}`,
  keywordGroups: ['brand', 'verify'],
})
```

## 5. Site-root SEO Files

All under `src/app/` (not in a route group) so Next.js exposes them at the domain root.

### `robots.ts` → `/robots.txt`

- `userAgent: '*'`, `allow: '/'`.
- `disallow: ['/api/', '/admin/', '/dashboard/', '/auth/', '/_next/', '/*?*']`.
- `sitemap: ${SITE.url}/sitemap.xml`.
- `host: SITE.url`.

Rationale: `/*?*` blocks query-string duplicates (e.g., UTM-tagged URLs indexed as separate pages). Auth / app routes are `noIndex` at the page level too, but disallowing in `robots.txt` saves crawl budget.

### `sitemap.ts` → `/sitemap.xml`

- Static list of marketing routes with `priority` + `changeFrequency` (landing `/` starts at `priority: 1.0`, `weekly`).
- A `TODO` comment marks where dynamic shop/product entries will be added (Prisma query merged into the returned array).
- `lastModified: new Date()` per build.

### `manifest.ts` → `/manifest.webmanifest`

- `name: 'Deep Thailand'`, `short_name: 'Deep'`.
- `start_url: '/'`, `display: 'standalone'`, `lang: 'th'`.
- `theme_color: '#6366f1'` (placeholder indigo — revisit when the real brand palette is settled; single-file change).
- `background_color: '#ffffff'`.
- `icons` reference `/icon` and `/apple-icon` (generated by `icon.tsx` / `apple-icon.tsx`).
- `categories: ['business', 'shopping', 'finance']`.

## 6. Dynamic OG Image + Favicon

Uses Next.js `next/og` `ImageResponse` API on the edge runtime — no static PNG assets required, text-based placeholder until a logo exists.

### `src/app/opengraph-image.tsx` (1200×630)

- Edge runtime, `contentType: 'image/png'`.
- Linear gradient background: indigo-500 → violet-500 → pink-500 (placeholder brand gradient; swap to final palette in one file).
- Content (top to bottom): wordmark `Deep` (80px bold) → headline `ซื้อขายออนไลน์อย่างมั่นใจ` (54px) → subhead `ไม่ต้องกลัวมิจฉาชีพ` (40px) → three trust-badge chips (`✓ ยืนยันตัวตน`, `✓ Trust Score`, `✓ OTP Confirm`) → `deepthailand.app` footer.
- Font: Anuphan 400 + 700 (Thai glyphs). Cached at `src/assets/fonts/anuphan-{400,700}.ttf` and loaded via `fs.readFile` in the handler — Google-Fonts-at-runtime is avoided for reliability.

### `src/app/twitter-image.tsx`

Re-exports the OG image module so Twitter/X reuses the same artwork with `summary_large_image` cards.

### `src/app/icon.tsx` (32×32)

- Gradient square, rounded 6px, white uppercase "D" at 22px, weight 900.
- Serves `/icon` (the `manifest.ts` points here).

### `src/app/apple-icon.tsx` (180×180)

- Same design as `icon.tsx` with `fontSize: 120`, `borderRadius: 40` (iOS rounded-square).

### Future per-route OG

`src/app/(marketing)/shop/[id]/opengraph-image.tsx` (when shop profiles exist) — generate with shop name + Trust Score for share cards.

## 7. JSON-LD Structured Data

Components under `src/components/seo/` — all are server components, each emits a single `<script type="application/ld+json">`.

### Components

- `JsonLd.tsx` — low-level wrapper; accepts a schema object and serialises it.
- `OrganizationSchema.tsx` — `@type: Organization`; name/legalName/url/logo/description/contactPoint/areaServed. **Site-wide.**
- `WebSiteSchema.tsx` — `@type: WebSite` with `potentialAction: SearchAction` (sitelinks searchbox eligibility). **Site-wide.**
- `ServiceSchema.tsx` — `@type: Service`; provider/areaServed/offers. **Landing only.**
- `FaqSchema.tsx` — `@type: FAQPage`; reads FAQ data from a shared constant. **Landing only.**
- `BreadcrumbSchema.tsx` — `@type: BreadcrumbList`. **Reserved for future inner pages.**

### FAQ data extraction

The existing landing FAQ component (`src/views/front-pages/landing-page/Faqs/`) has hardcoded FAQ content. Extract that content into a single typed constant `LANDING_FAQS: Array<{ q: string; a: string }>` at `src/views/front-pages/landing-page/Faqs/data.ts`, then:

- `Faqs/index.tsx` renders from the constant.
- `FaqSchema` on the page uses the same constant.

This guarantees visible FAQ and JSON-LD FAQ stay in sync (Google will demote rich snippets if they diverge).

### Composition on the landing page

```tsx
// src/app/(marketing)/page.tsx
import {
  OrganizationSchema, WebSiteSchema, ServiceSchema, FaqSchema,
} from '@/components/seo'
import { LANDING_FAQS } from '@/views/front-pages/landing-page/Faqs/data'

export const metadata = buildMetadata({ path: '/' })

export default function LandingPage() {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <ServiceSchema />
      <FaqSchema faqs={LANDING_FAQS} />
      <LandingPageWrapper />
    </>
  )
}
```

`OrganizationSchema` + `WebSiteSchema` could also be pushed up into the marketing layout to cover every marketing route at once — decide during implementation once more than one marketing page exists. Keep them on the landing page for the first pass.

### Explicitly out of scope

No `Review` or `AggregateRating` schema until first-party authenticated reviews are live. Google's 2023 policy demotes or penalises sites that mark up reviews the site does not itself collect.

## 8. Landing Content & Semantic HTML Fix

### Metadata changes to `(marketing)/layout.tsx`

- Replace the current hand-written `metadata` export with `export const metadata = buildMetadata({ path: '/' })`.
- Keep the Anuphan font wiring and the separate `<html>` root — this spec does not touch the multi-root layout architecture.
- Mount `<GoogleAnalytics />` inside `<body>`.
- Optionally mount `<OrganizationSchema />` + `<WebSiteSchema />` here so all marketing pages inherit them (vs. only the landing page). Defer this decision to implementation; landing-only is fine for launch.

### Landing page `page.tsx`

- Mount `<ServiceSchema />` + `<FaqSchema faqs={LANDING_FAQS} />` above `<LandingPageWrapper />`.

### Semantic HTML — the `<h1>` problem

Current state: `src/views/front-pages/landing-page/HeroSection.tsx` renders the main headline via `<Typography>` without a `component` prop, which resolves to a `<p>` or `<div>` by default. **The page has no `<h1>`.** Google treats missing `<h1>` on a landing page as a weak signal.

Fix: change the hero headline to `<Typography component='h1' variant='h2'>`. `variant='h2'` preserves the existing visual weight; `component='h1'` emits the correct tag.

Audit + normalise the rest of the heading hierarchy on the landing page:

- Exactly one `<h1>` (hero).
- Each section title (`UsefulFeature`, `CustomerReviews`, `OurTeam`, `Pricing`, `ProductStat`, `Faqs`, `GetStarted`, `ContactUs`) uses `<h2>`.
- Sub-items inside sections use `<h3>`.
- Typography `variant` stays however designers want it; only the rendered tag (`component`) changes.

### Image optimisation (minimum viable)

- Hero dashboard and hero background PNGs (`public/images/front-pages/landing-page/hero-*.png`) are the LCP element. Migrate **only those** to `next/image` with `priority` and an explicit `sizes` attribute.
- Team avatars, customer logos, and other below-the-fold imagery stay as `<img>` (marketing route allows it per CLAUDE.md). Add `loading="lazy"` + `decoding="async"` where missing.

This is a minimal intervention — the goal is LCP improvement, not a full image refactor.

## 9. Analytics & Verification

### `src/components/analytics/GoogleAnalytics.tsx`

- Client component, uses `next/script` with `strategy="afterInteractive"`.
- Reads `process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID`. If falsy → returns `null` (dev/preview safe).
- `gtag('config', GA_ID, { anonymize_ip: true })` — PDPA-friendly.

### Where to mount

- `src/app/(marketing)/layout.tsx` — one instance inside `<body>`.
- `src/app/(paces)/layout.tsx` — one instance inside `<body>`.

Both root layouts mount the same component; there is no shared wrapper that can do this for both.

### Google Search Console

- Verification method: HTML tag. User generates the code from Search Console after adding `deepthailand.app` as a property, pastes it into `NEXT_PUBLIC_GSC_VERIFICATION`.
- `buildMetadata` renders `<meta name="google-site-verification" content="...">` via `metadata.verification.google` when the env is set, and skips it otherwise.
- **Post-deploy manual steps (user):** verify in Search Console, submit `sitemap.xml`, request indexing for `/`.

### Vercel Speed Insights (optional, recommended)

`@vercel/speed-insights/next` streams real-user Core Web Vitals to Vercel. Zero-config, no bundle impact. Add in a follow-up PR if not installed now.

## 10. File Changes

### Created

```
src/lib/seo.ts
src/app/robots.ts
src/app/sitemap.ts
src/app/manifest.ts
src/app/icon.tsx
src/app/apple-icon.tsx
src/app/opengraph-image.tsx
src/app/twitter-image.tsx
src/components/seo/index.ts
src/components/seo/JsonLd.tsx
src/components/seo/OrganizationSchema.tsx
src/components/seo/WebSiteSchema.tsx
src/components/seo/ServiceSchema.tsx
src/components/seo/FaqSchema.tsx
src/components/seo/BreadcrumbSchema.tsx
src/components/analytics/GoogleAnalytics.tsx
src/views/front-pages/landing-page/Faqs/data.ts
src/assets/fonts/anuphan-400.ttf
src/assets/fonts/anuphan-700.ttf
```

### Modified

```
src/app/(marketing)/layout.tsx         — use buildMetadata; mount <GoogleAnalytics/>
src/app/(marketing)/page.tsx           — mount JSON-LD schema components
src/app/(paces)/layout.tsx             — mount <GoogleAnalytics/>
src/views/front-pages/landing-page/HeroSection.tsx
                                       — component='h1', next/image for hero LCP
src/views/front-pages/landing-page/**/*.tsx
                                       — audit + fix heading hierarchy
src/views/front-pages/landing-page/Faqs/index.tsx
                                       — read FAQ data from extracted constant
.env.example                           — add NEXT_PUBLIC_SITE_URL, GA, GSC
```

## 11. Verification Plan

### Automated (CI / local)

1. `bun run build` succeeds with no type errors.
2. `bun run lint` passes (heading refactor does not regress ESLint rules).
3. Unit tests — none; this work is metadata/configuration, tested via live endpoints.

### Live endpoint checks (post-deploy)

1. `curl https://deepthailand.app/robots.txt` — rules + sitemap URL present.
2. `curl https://deepthailand.app/sitemap.xml` — valid XML, `/` listed.
3. `curl https://deepthailand.app/manifest.webmanifest` — JSON valid.
4. `curl -I https://deepthailand.app/icon`, `/apple-icon` — 200 PNG.
5. `curl https://deepthailand.app/opengraph-image` — 200, 1200×630 PNG.
6. View source of `/`:
   - `<meta name="description">` present with Thai copy.
   - Full OG (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`, `og:locale`).
   - Twitter card (`summary_large_image`).
   - `<link rel="canonical" href="https://deepthailand.app/">`.
   - Four `<script type="application/ld+json">` blocks (Organization, WebSite, Service, FAQPage).
   - GA4 `gtag.js` tag for `G-TB854DJZX4`.
   - `<meta name="google-site-verification">` iff the env is set.
7. DOM audit: exactly one `<h1>`; `<h2>`+ in logical order.

### External validators

- Google Rich Results Test: `https://search.google.com/test/rich-results`.
- Schema Markup Validator: `https://validator.schema.org/`.
- Facebook Sharing Debugger: `https://developers.facebook.com/tools/debug/`.
- X/Twitter Card Validator (or paste the URL in a dev tweet).
- Lighthouse (mobile + desktop) — SEO score ≥ 95, Best Practices ≥ 90, Performance goal ≥ 80 (mobile).

### Post-deploy human steps

1. Add `deepthailand.app` as a Google Search Console property, verify via the HTML tag method, paste the code into `NEXT_PUBLIC_GSC_VERIFICATION`, redeploy.
2. Submit `sitemap.xml` in Search Console.
3. Request indexing for `/` in URL Inspection.
4. Bust social share caches so the new OG preview shows: Facebook Sharing Debugger (`https://developers.facebook.com/tools/debug/`) — covers Messenger too; Twitter/X Card Validator; LINE has no public debugger — share once internally to warm its cache.

## 12. Open Questions

- **Brand colour.** The gradient uses indigo → violet → pink as a placeholder. If the final brand palette is different (e.g., trust-blue / secure-green), change the gradient in `opengraph-image.tsx`, `icon.tsx`, `apple-icon.tsx`, and `manifest.ts` `theme_color`. Four files; single-session change.
- **Logo.** Favicons currently render a text-based "D". When a logo SVG exists, swap `icon.tsx` / `apple-icon.tsx` to render the SVG inside `ImageResponse` (or move to static PNGs if preferred). OG image would ideally include the logo mark alongside the wordmark.
- **Search Console verification code.** TBD — user generates after go-live.

## 13. Decisions Confirmed (post-review)

- **Brand color.** Keep the placeholder indigo → violet → pink gradient for launch; revisit when the final brand palette is chosen (four-file change: `opengraph-image.tsx`, `icon.tsx`, `apple-icon.tsx`, `manifest.ts`).
- **Logo.** Keep the text-based "D" favicon and the wordmark-only OG image. Revisit when a logo SVG exists.
- **Twitter/X handle.** No handle at launch. `twitter.site` is omitted from `buildMetadata`'s Twitter card (Twitter card still renders without `site`, it just will not link back to an account).
- **Keyword taxonomy.** Expanded from 13 flat items to ~45 items across 5 typed groups (`brand`, `antiFraud`, `verify`, `transaction`, `longTail`) to support per-page keyword targeting. `<meta name="keywords">` remains emitted for completeness; the taxonomy's primary job is guiding body/heading/alt copy.
