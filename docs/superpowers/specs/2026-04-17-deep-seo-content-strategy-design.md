# Deep — SEO Content Strategy Design

**Date:** 2026-04-17
**Status:** Draft — pending user review
**Owner:** shinobu22
**Depends on:** docs/superpowers/specs/2026-04-17-deep-landing-seo-design.md

## 1. Context & Goals

This is a follow-up to the landing-page SEO spec. That parent spec builds the technical foundation (canonical URLs, JSON-LD, sitemap, robots, OG, GA4) and optimises the single marketing page at `/`. It cannot, on its own, win competitive head terms like `เช็คคนโกง`, `ป้องกันมิจฉาชีพ`, or long-form questions like `โดนโกงออนไลน์ทำยังไง` — those queries want *content*, not a product pitch.

This spec extends the framework into **content-driven organic acquisition**: a pillar + cluster blog under `/blog`, shipped inside the existing `(marketing)` root layout so it inherits Anuphan, the MUI-allowed styling envelope, and the `buildMetadata` pipeline from the parent spec.

### Goals (what "done" looks like)

- Rank top 10 for at least 8 Tier 1/2 keywords drawn from `SITE.keywords.antiFraud` and `SITE.keywords.verify` within 6 months of launch.
- Drive **~5,000 organic monthly sessions** into `/blog/*` within 6 months, of which ≥ 8% click through to the landing CTA or a shop profile.
- Build topical authority on "online shopping safety in Thailand" through a coherent pillar/cluster graph that Google can crawl end-to-end in one hop.
- Every article page is fully instrumented with `buildMetadata`, `BlogPostingSchema`, `BreadcrumbSchema`, and (when applicable) `FaqSchema` — no hand-written `Metadata` objects.
- Authoring a new article is a single MDX file drop with frontmatter; no code changes required.

### Why content (and not more product pages)

Google's helpful-content and EEAT updates reward pages that answer a specific query in depth with first-hand expertise. Deep's landing page is transactional by design — it converts, but it cannot simultaneously rank for informational head terms. Content fills that gap, and every article is a natural entry point that funnels to the landing CTA.

## 2. Non-goals (explicit)

- **EN locale.** Thai-only for launch. The MDX loader reads a `locale` frontmatter field but only `th` is activated. i18n structural readiness carries over from the parent spec.
- **Paid acquisition.** No SEM/SEO tooling budget beyond free tiers (GSC, GA4). Ahrefs / Semrush deferred — see §16.
- **Social-media content.** IG/TikTok/Facebook Page content is a separate channel plan; out of scope here.
- **Email newsletter.** Deferred until we have > 500 subscribers of organic origin.
- **Forum / UGC.** No community posts, Q&A boards, user-submitted stories. Every article is authored and reviewed.
- **AI-generated bulk content.** No "content farms". Human-written, human-edited, one pillar or two clusters per week maximum. Quality over quantity.
- **Review / AggregateRating schema on articles.** Consistent with parent spec — we do not mark up reviews we do not collect.
- **Comments on articles.** No comment system, no Disqus, no Facebook comments. Removes moderation overhead and low-quality UGC signal.

## 3. Keyword strategy & intent mapping

We group the target surface area by **search intent** because intent drives template choice and CTA placement. Keywords are pulled from the existing taxonomy in `src/lib/seo.ts` (`SITE.keywords` — `brand`, `antiFraud`, `verify`, `transaction`, `longTail`) — this spec adds no new keywords.

### Informational (the bulk of blog content)

User wants to understand, learn, or decide. CTA is soft: sidebar module + one in-body link to landing.

| Primary keyword | Group | Notes |
| --- | --- | --- |
| `โดนโกงออนไลน์ทำยังไง` | antiFraud | High volume, high commercial intent (user already burned). |
| `วิธีตรวจสอบร้านค้าก่อนซื้อ` | antiFraud | Evergreen how-to, strong featured-snippet target. |
| `ซื้อของไอจีไม่โดนโกง` | antiFraud | Channel-specific; aligns with Deep's strongest persona. |
| `ซื้อของเฟสบุ๊คไม่โดนโกง` | antiFraud | Same but Facebook Marketplace / Pages. |
| `5 สัญญาณเตือนมิจฉาชีพออนไลน์` | antiFraud | List-format, share-friendly. |
| `รายชื่อคนโกง` | antiFraud | High volume but dangerous — we explain *why* Deep does not publish raw lists, and offer Trust Score instead. |

### Transactional (direct to signup / landing CTA)

User is ready to act. CTA is hard: hero CTA + sticky CTA + in-body CTA every ~600 words.

| Primary keyword | Group | Notes |
| --- | --- | --- |
| `ยืนยันตัวตน seller` | verify | Seller-onboarding funnel. |
| `verified seller Thailand` | verify | English-in-Thai-SERP is common for this term. |
| `OTP confirm order` | transaction | Funnels into how OTP works → sign up. |
| `คุ้มครองผู้ซื้อออนไลน์` | transaction | Buyer-protection framing. |

### Navigational (brand — handled by landing)

Out of scope for the blog. `Deep`, `Deep Thailand`, `deepthailand.app` etc. resolve to the landing page per the parent spec.

### Intent → template → CTA mapping

| Intent | Template | Primary CTA | Secondary CTA |
| --- | --- | --- | --- |
| Informational (pillar) | Pillar long-form guide | "เช็คร้านค้ากับ Deep" → `/` | Related clusters |
| Informational (cluster) | Cluster article | In-body "ลองใช้ Deep ฟรี" → `/` | Link to pillar + 2 related clusters |
| Transactional | Landing-style with proof points | Sign-up CTA → `/register` (when exists) or `/` | "ดูว่า Trust Score ทำงานยังไง" → relevant cluster |
| Navigational | (Not blogged) | — | — |

## 4. Pillar + cluster architecture

We will ship **three pillars, each with 3–4 supporting clusters** (the "option B" shape). Reasoning:

1. Three pillars map one-to-one onto Deep's three value pillars (see `docs/PRD.md`): **anti-scam detection**, **seller verification & trust score**, **buyer protection via OTP/escrow**. The blog's information architecture mirrors the product's — shared vocabulary with search, docs, and marketing.
2. Three narrow pillars outperform one giant pillar on topical authority because Google clusters queries by sub-topic; a single 3,000-word mega-guide dilutes the signal for each sub-topic.
3. Three pillars give us three separate internal-link hubs, so the link graph has redundancy — if one pillar underperforms, the other two still flow link equity to the landing.

### Structure

```
                     ┌────────── Landing (/) ───────────┐
                     │         (primary CTA target)     │
                     └────────────┬─────────────────────┘
                                  │ (every cluster + pillar links here)
         ┌────────────────────────┼────────────────────────┐
         │                        │                        │
  ┌──────▼──────┐         ┌───────▼───────┐        ┌───────▼───────┐
  │ Pillar 1:   │         │ Pillar 2:     │        │ Pillar 3:     │
  │ Anti-scam   │◀───────▶│ Verification  │◀──────▶│ Buyer         │
  │ playbook    │         │ & Trust Score │        │ protection    │
  └──┬──┬──┬──┬─┘         └──┬──┬──┬──┬──┘         └──┬──┬──┬──┬───┘
     │  │  │  │              │  │  │  │                │  │  │  │
     C  C  C  C              C  C  C  C                C  C  C  C
   (clusters)              (clusters)                (clusters)
```

- **Pillar** = 2,000–3,000-word comprehensive guide. One H1 + 6–10 H2s. Must stand alone as a complete answer.
- **Cluster** = 800–1,200-word focused article answering a specific long-tail query. Links back to its parent pillar in the intro (≥ 1 time) and body (≥ 2 times).
- **Cross-pillar links.** Each pillar links to the other two pillars at least once in-body — this turns the graph from three trees into a connected web.
- **Landing link policy.** Every cluster and pillar links to `/` at least once, with anchor text drawn from the taxonomy (e.g., `เช็คร้านค้ากับ Deep` rather than `click here`).

### Freshness signal

Each pillar is reviewed **every 3 months** and its `dateModified` frontmatter is bumped when substantive edits ship. Google's freshness signal is cheap to maintain and compounding.

## 5. Initial article backlog

Launch with **3 pillars + 6 clusters** (9 pieces). This is enough volume to look like a real resource, and one cluster per pillar seeds each hub.

| # | Type | Title (TH) | Primary keyword | Group | Brief | Words | Primary CTA |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Pillar | คู่มือป้องกันมิจฉาชีพออนไลน์ ฉบับสมบูรณ์ 2026 | `ป้องกันมิจฉาชีพ` | antiFraud | Definitive guide covering all scam types, red flags, and counter-measures for Thai online shoppers. | 2,500 | Landing (soft) |
| 2 | Pillar | ยืนยันตัวตนร้านค้าออนไลน์: Trust Score คืออะไร ทำไมสำคัญ | `ยืนยันตัวตนร้านค้า` | verify | Explains verification tiers, how Trust Score is calculated, why buyers should look for it. | 2,800 | Landing + seller signup |
| 3 | Pillar | คุ้มครองผู้ซื้อออนไลน์ด้วย OTP Confirm: วิธีซื้อของให้ปลอดภัย | `คุ้มครองผู้ซื้อออนไลน์` | transaction | Walkthrough of Deep's OTP order confirmation flow + broader buyer protection playbook. | 2,200 | Landing (hard) |
| 4 | Cluster (P1) | 5 สัญญาณเตือนมิจฉาชีพออนไลน์ที่ต้องระวัง | `5 สัญญาณเตือนมิจฉาชีพออนไลน์` | antiFraud | Checklist-format, featured-snippet targeted, highly shareable on LINE. | 1,000 | Landing |
| 5 | Cluster (P1) | โดนโกงออนไลน์ทำยังไง? 7 ขั้นตอนกู้เงินคืน | `โดนโกงออนไลน์ทำยังไง` | antiFraud | Incident-response guide: freeze, report (1441, ปคบ.), document, claim. Ends with "ครั้งหน้าใช้ Deep". | 1,200 | Landing |
| 6 | Cluster (P1) | ซื้อของไอจีไม่โดนโกง: 8 วิธีตรวจสอบร้านค้า IG ก่อนโอน | `ซื้อของไอจีไม่โดนโกง` | antiFraud | IG-specific: follower quality, comment sentiment, reverse-image search, Trust Score check. | 1,100 | Landing |
| 7 | Cluster (P2) | verified seller คืออะไร ต่างจากร้านทั่วไปยังไง | `verified seller Thailand` | verify | Disambiguates platform "verified" ticks vs. first-party identity verification like Deep. | 900 | Seller signup |
| 8 | Cluster (P2) | Trust Score ร้านค้า คำนวณยังไง ทำไมตัวเลขนี้เชื่อถือได้ | `trust score ร้านค้า` | verify | Opens the black box: the 35/25/20/10/10 weighting from PRD, worked example. | 1,000 | Landing |
| 9 | Cluster (P3) | OTP Confirm Order คืออะไร ทำไมระบบนี้ป้องกันโกงได้ | `OTP confirm order` | transaction | Explains the confirm-on-delivery flow, why it breaks classic scam patterns. | 950 | Landing (hard) |

Post-launch (Month 1+): add 2 clusters per week (~8/month) prioritised by GSC impressions-but-no-clicks queries. Stop when each pillar has ≥ 6 clusters, then shift to freshness passes.

## 6. Article structure template

Every pillar and cluster follows this template. Deviations need a reason in PR review.

### Required structure (in order)

1. **H1** containing the primary keyword verbatim (or in Thai: the exact target phrase).
2. **Hero image** (`next/image`, `priority`, explicit `sizes`). Alt text uses the primary keyword phrase. Aspect ratio 16:9, minimum 1200px wide.
3. **Intro (~150 words)** — the very first sentence answers the search query directly. This is AI-Overview / featured-snippet bait. Example opening for article #5: *"ถ้าคุณเพิ่งโดนโกงออนไลน์ ให้ทำ 3 อย่างภายใน 24 ชั่วโมงแรก: ระงับบัญชีผู้รับเงิน แจ้งความออนไลน์ที่ ปคบ. และเก็บหลักฐานทุกข้อความ"*. No fluff, no "ในยุคนี้…" intros.
4. **Key takeaways box** (component: `<KeyTakeaways>`). 3–5 bullet points, rendered before the first H2. This is the single highest-value element for featured snippets; it goes above the first H2 by design.
5. **4–8 H2 sections**. Each H2 is a sub-question someone might ask. Use the `People Also Ask` section in SERP for inspiration.
6. **Bullet lists / numbered steps** wherever content is enumerable. Lists rank disproportionately well in Thai SERP.
7. **In-body CTAs**. One soft CTA per ~600 words — a `<CalloutCTA>` component with varied copy (not the same button nine times).
8. **FAQ section at the bottom**. 4–8 Q&A pairs. Reuses the parent spec's `FaqSchema` via the `BlogPostingSchema` wrapper. Questions should cover adjacent long-tails the article did not directly target (expands keyword surface).
9. **Author box** (`<AuthorBox>`). Photo + name + one-line bio + `datePublished` + `dateModified`. E-E-A-T signal.
10. **Related articles grid** (`<RelatedArticles>`). 3 cards — 1 pillar, 2 clusters (or the inverse for a pillar page).

### Word-count & readability targets

- Pillars: 2,000–3,000 words. Flesch-TH not standardised, so instead target: no paragraph > 4 sentences; sub-headings every 250–300 words; ≥ 1 list per H2.
- Clusters: 800–1,200 words. Same density rules.
- Sentence length: prefer short. Thai readability suffers from long nested clauses; break them.

### Internal links per article (minimum)

- ≥ 3 links to the parent pillar (for clusters); ≥ 3 to each child cluster (for pillars).
- ≥ 1 link to the landing page `/`.
- ≥ 1 link to a related cluster (not in the same pillar, for variety).
- ≤ 3 internal links per 500 words — more than that reads as spam to crawlers and humans.

## 7. URL structure & routing

### Decision: flat `/blog/[slug]`

We will ship **flat URLs**: `/blog/โดนโกงออนไลน์ทำยังไง-7-ขั้นตอนกู้เงินคืน`. Justification:

1. **Simplicity wins.** One dynamic segment, one page file, one route. No per-pillar index pages to maintain beyond the master `/blog` index.
2. **Link equity does not redistribute.** Nested URLs (`/blog/anti-scam/...`) are folklore for SEO — Google has stated URL structure is near-irrelevant to ranking as long as each URL is unique and crawlable. Flat URLs equal out link equity.
3. **Moves are cheap.** If an article's pillar-association changes, there is no redirect to write.
4. **Slug encodes meaning.** Thai slugs like `/blog/ซื้อของไอจีไม่โดนโกง` are human-readable *and* keyword-rich — equivalent SEO value to a nested path, zero refactor cost.

Pillar membership is metadata (`pillar: 'anti-scam'` in frontmatter) and drives the `BreadcrumbSchema` and the related-articles grid, but **not** the URL.

### Thai slugs

Slugs are written in Thai script — Google handles URL-encoded UTF-8 fine, and Thai slugs are a small but real CTR lift in the Thai SERP (users see the keyword in the URL). Slug rule: take the primary keyword, append a differentiator if needed, swap spaces for `-`. The MDX loader validates slug uniqueness at build time.

### Route group: `(marketing)`

The blog routes live under `src/app/(marketing)/blog/…`. This puts them under the same root layout as the landing page, which means:

- They inherit Anuphan from `(marketing)/layout.tsx`.
- They can use MUI + Emotion + Vuexy primitives (CLAUDE.md's explicit exception for `(marketing)`).
- They inherit `<GoogleAnalytics />` and (if mounted at layout level) `<OrganizationSchema />` + `<WebSiteSchema />`.
- They inherit `buildMetadata` via page-level exports.

### Theme templates

Scanning `theme/paces/Admin/TS/src/app/` turned up **only admin-side blog templates** under `(admin)/apps/blog/` (add/article/grid/list). There is no `(front)` or `(public)` blog template in the current paces snapshot.

**This matters for CLAUDE.md compliance.** The paces rules mandate that all `(paces)` routes be copied from `theme/paces/.../src/app/` and not written from scratch. However — **the blog lives under `(marketing)`, not `(paces)`** — so per CLAUDE.md's own exception, the paces rules **do not apply** to `src/app/(marketing)/blog/**`. We are free to use MUI/Emotion/Vuexy patterns here.

Recommendation: base the public article view on `theme/paces/Admin/TS/src/app/(admin)/apps/blog/article/` (salvage the typography/layout, drop the admin chrome), and base the index on `theme/paces/Admin/TS/src/app/(admin)/apps/blog/grid/`. If the blog were instead scaffolded under `(paces)`, we would have to flag that the admin templates are the only fallback and get explicit sign-off — but because the blog is correctly under `(marketing)`, this is advisory, not a blocker.

## 8. CMS choice (MVP)

Three options evaluated; one chosen.

### Options

1. **MDX in-repo** (`src/content/blog/*.mdx`). Content lives in Git. Authors edit via PR or a lightweight editor pointed at the repo. Component embedding (`<KeyTakeaways>`, `<CalloutCTA>`) is trivial. Zero infrastructure. Weakness: non-technical authors need training; no WYSIWYG; previews require a local dev server or a Vercel preview deploy.
2. **Headless CMS** (Sanity / Contentful / Strapi / Payload). Best authoring UX; live preview; image handling; drafts/scheduling. Weakness: adds a runtime dependency, auth concern, schema duplication between CMS and validation layer, vendor lock-in (for hosted options), and monthly cost for anything beyond free tiers.
3. **Postgres via Prisma + in-app admin**. Lives in existing DB. We already have auth + admin subdomain (`admin.safepay.co`). Weakness: building the editor and image pipeline from scratch is expensive, and articles are rarely edited so the ORM overhead is pure cost.

### Decision: MDX for launch

Ship **option 1 (MDX)**. Rationale:

- Authoring team at launch is 1–3 people, all technical enough to handle Markdown + Git.
- Component embedding is critical for quality — `<KeyTakeaways>`, `<CalloutCTA>`, author boxes, related grids are all React components, and MDX is the only option that supports them natively without glue code.
- Content velocity in the first 6 months will be ≤ 2 posts/week. MDX scales to that without strain.
- Zero new infrastructure means we ship faster.
- Image hosting: use the existing S3-compatible storage driver (landed in commit `efba4dc`); image `src` in MDX points to the S3 URL, not a git-tracked binary.

### Migration trigger

Move to option 2 or 3 when **any one of** the following fires:

- Content velocity exceeds 4 posts/week sustained for 4 weeks.
- A non-technical editor joins who cannot reasonably be onboarded to Git + MDX.
- Scheduled publishing becomes a requirement.
- A/B testing of titles/descriptions becomes a requirement.

Migration path: the MDX loader's frontmatter schema (defined in `src/lib/blog.ts`, see §15) is stable — porting it to a CMS schema is mechanical. Article URLs are stable (flat slug-based), so a CMS migration does not force any redirects.

## 9. Structured data per article

Each article page emits JSON-LD via three components, all of which are thin extensions or reuses of the parent spec's primitives.

### `BlogPostingSchema` (new, in `src/components/seo/BlogPostingSchema.tsx`)

Wraps the existing `<JsonLd>` primitive. Emits `@type: BlogPosting` (preferred over `Article` for blog content — Google treats them equivalently but `BlogPosting` is semantically closer and does not add cost). Fields:

- `headline` — from frontmatter `title`.
- `description` — from frontmatter `description`.
- `image` — hero image URL (absolute, driven through `buildCanonical`).
- `datePublished` / `dateModified` — from frontmatter.
- `author` — resolved from `src/content/authors/<slug>.ts` (structured `Person` with `name`, `url`, `jobTitle`).
- `publisher` — static `Organization` object referencing the parent spec's `OrganizationSchema` identity (name, logo).
- `articleBody` — first 500 characters of plain-text body (sufficient for search; full body is not required).
- `mainEntityOfPage` — the canonical URL.
- `keywords` — joined from the frontmatter `keywordGroups` resolved via `resolveKeywords()` from `src/lib/seo.ts` (reuses the parent taxonomy).

### `FaqSchema` (reused from parent spec)

If the article's frontmatter has a `faqs` field (array of `{ q, a }`), mount `<FaqSchema faqs={...} />` at the bottom of the page. Component already exists per the parent spec; no changes.

### `BreadcrumbSchema` (reused from parent spec)

Always mounted. Crumb trail: `หน้าแรก` (`/`) → `บล็อก` (`/blog`) → *article title*. The breadcrumb **is a soft signal** of pillar grouping (the visible breadcrumb can read `บล็อก › ป้องกันมิจฉาชีพ › <title>` using the pillar label, even though the URL is flat) — visual aid only, does not change the URL.

### Explicitly out of scope

- No `Review` / `AggregateRating` (consistent with parent spec).
- No `HowTo` schema even on step-by-step articles — Google narrowed `HowTo` eligibility to desktop-only in 2023 and mobile is our majority traffic.
- No `Video` schema (we do not publish video on the blog in the first 6 months).

## 10. Internal linking policy

Internal links are the single biggest lever we have for pillar authority. Rules, in priority order:

1. **Every cluster links to its parent pillar ≥ 3 times.** First mention in the intro, then naturally in-body. Use varied anchor text drawn from the pillar's keyword surface — not identical anchors repeated (this reads as link-spam).
2. **Every pillar links to all its child clusters.** Usually in a "ดูเพิ่มเติม" block at the end of the relevant H2 section.
3. **Pillars cross-link to each other.** At least one in-body link from Pillar 1 → Pillar 2 and vice versa, for all pairs.
4. **Every article links to the landing `/` at least once.** Anchor text is a call-to-action phrase from the transactional-intent bucket (`เช็คร้านค้ากับ Deep`, `ลองใช้ Deep ฟรี`).
5. **Anchor text uses keyword phrases, never generic "คลิกที่นี่".** Anchor diversity matters — vary the exact wording article-to-article.
6. **Maximum 3 internal links per 500 words of body text.** Exceeding this starts to look like link-stuffing; it also degrades the reading experience.
7. **No reciprocal-link obligations with external sites.** If we link out to `ปคบ.` (consumer protection) or `ธปท.` (Bank of Thailand) for credibility, we do not expect or request a return link.

### External-link policy (light)

Outbound links to authoritative .gov.th / .or.th domains are encouraged in evidence-heavy articles — Google's EEAT signal rewards citing authorities. No `rel="nofollow"` on these; they are genuine citations, not sponsored links.

## 11. Authorship & E-E-A-T

Google's EEAT update (Experience, Expertise, Authoritativeness, Trustworthiness) disproportionately rewards bylined, bio'd content over anonymous content — especially in YMYL-adjacent topics like "how to avoid being scammed". Deep's blog is YMYL-adjacent.

### Author definitions

Authors live in `src/content/authors/<slug>.ts` as typed objects:

```ts
// src/content/authors/shinobu.ts
export default {
  slug: 'shinobu',
  name: 'Shinobu Nguyen',
  jobTitle: 'Founder, Deep Thailand',
  bio: 'ผู้ก่อตั้ง Deep ระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์ในไทย…',
  image: '/images/authors/shinobu.jpg',
  url: 'https://deepthailand.app/about#team',
  social: { x: '…', linkedin: '…' },
} as const
```

Frontmatter of each article has `author: 'shinobu'`. The MDX loader resolves this to the author object and passes it to `<AuthorBox>` and `<BlogPostingSchema>`.

### Launch author set (2 people)

- **Shinobu Nguyen** — founder. Writes product-adjacent pillars (verification, Trust Score, OTP).
- **A fraud-prevention advisor** (to be recruited; placeholder bio until then) — writes anti-scam pillars. Ideally someone with visible credentials in consumer protection or digital forensics. If recruitment slips, the founder byline is acceptable for launch — we do not ship ghost-written or AI-generated content under a fake name.

### `lastModified` freshness

Each article's `<AuthorBox>` visibly renders both `datePublished` and `dateModified`. When updating an article, bump `dateModified` in frontmatter. This is a Google-documented freshness signal and also reassures readers the content is current.

## 12. Publishing cadence

### Launch week (Week 0)

Ship 9 pieces simultaneously: 3 pillars + 6 clusters (2 per pillar). Reason: a blog with 9 coherent, cross-linked pieces on day one reads like a real resource to both humans and Google. A blog with 1 article reads like abandoned scaffolding. The content authority signal is tied to the shape of the link graph, which requires ≥ 6 nodes to feel substantive.

### Month 1+

- **2 clusters per week** — driven by GSC data (impressions without clicks, new query discovery).
- Pillars reviewed **every 3 months**; any substantive edit bumps `dateModified`.
- After each pillar has ≥ 6 clusters, shift allocation to: 1 cluster/week + 1 freshness pass/week.

### Content calendar ownership

A lightweight `docs/superpowers/content-calendar.md` (deferred — not part of this spec) tracks what's next. The spec here only defines the cadence policy, not the week-by-week list.

## 13. Analytics & measurement

All tracking flows through the GA4 instance wired up in the parent spec (`NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TB854DJZX4`, PDPA-safe with `anonymize_ip: true`).

### Events (custom)

- `blog_article_view` — auto-fires on article page-view; dimension: `pillar` (from frontmatter), `author`, `word_count_bucket` (`<1000`, `1000-2000`, `>2000`).
- `blog_article_cta_click` — fires when a reader clicks any landing-page-bound CTA from an article; dimension: `article_slug`, `cta_position` (`intro` | `body` | `outro` | `sticky`).
- `blog_related_click` — fires on related-article grid click; dimension: `from_slug`, `to_slug`.
- `blog_read_depth` — fires at 25/50/75/100 % scroll milestones (throttled, client-side observer).

### Dashboards (GA4 + GSC)

- **GSC Performance** monitored **weekly**. Watch: impressions, CTR, average position per query for Tier 1 keywords from §3.
- **GA4 engagement** monitored **monthly**. Watch: average engagement time per article, CTA click-through rate, related-click chain depth.
- **Rank tracking**: GSC alone for MVP. No paid rank tracker (Ahrefs / Semrush) until Month 4+ when sample sizes warrant the cost — see §16.

### Reporting

A monthly one-pager in `docs/superpowers/reports/YYYY-MM-seo.md` (process defined elsewhere, not part of this spec). The KPIs to report are the four dashboard watch-items above.

## 14. Performance & layout

Article pages inherit the `(marketing)` root layout. Performance constraints:

- **Anuphan font** inherited from layout (preloaded once).
- **Hero image** — required; `next/image`, `priority`, explicit `sizes="(max-width: 768px) 100vw, 800px"`. LCP target: < 2.5 s on emulated mobile 4G.
- **Body images** — `next/image`, lazy by default, `sizes` sized to the content column.
- **Code blocks** — lazy-loaded syntax highlighter (`react-syntax-highlighter`) dynamic-imported only on articles that use code. Most articles will not.
- **Reading-time indicator** — computed at build time from word count, ~200 WPM (Thai-adjusted down from the English ~230 WPM), rendered in `<AuthorBox>`.
- **TOC (table of contents)** — auto-generated from H2s, rendered sticky on `lg+` viewports, collapsible drawer on mobile.
- **No third-party embeds at launch** — no YouTube, no Twitter/X cards, no CodePen. If we need a tweet, we screenshot it. Every embed is an LCP/TBT risk.
- **Bundle size guardrail**: article route (JS) must remain ≤ 150 kB gzipped. Enforced by `bun run build` + a visual check of the Next.js build output. No automated enforcement at launch.

### Layout shape (desktop)

```
┌────────────────────────────────────────────────────────┐
│                     (marketing) header                 │
├───────────────┬────────────────────────┬───────────────┤
│               │                        │               │
│  (empty /     │   Breadcrumb           │   Sticky TOC  │
│   spacer)     │   H1                   │   Related     │
│               │   Hero image           │   sticky CTA  │
│               │   Intro                │               │
│               │   Key takeaways box    │               │
│               │   H2 … H2 … H2 …       │               │
│               │   FAQ                  │               │
│               │   Author box           │               │
│               │   Related grid         │               │
│               │                        │               │
├───────────────┴────────────────────────┴───────────────┤
│                     (marketing) footer                 │
└────────────────────────────────────────────────────────┘
```

Mobile: single column, TOC becomes a collapsible drawer triggered from a sticky button above the intro, related grid inlined below the FAQ.

## 15. File-layout preview

For the implementation plan that will follow — this is not code, it's the inventory.

### Created

```
src/app/(marketing)/blog/page.tsx                  # blog index (grid of articles)
src/app/(marketing)/blog/[slug]/page.tsx           # article page
src/app/(marketing)/blog/[slug]/opengraph-image.tsx# per-article OG card (title + pillar)
src/content/blog/<slug>.mdx                        # articles (9 at launch)
src/content/authors/shinobu.ts                     # author record
src/content/authors/<advisor>.ts                   # fraud-prevention advisor record
src/lib/blog.ts                                    # MDX loader + Valibot frontmatter schema
src/lib/blog-pillars.ts                            # pillar taxonomy constant (3 entries)
src/components/blog/ArticleLayout.tsx              # shared layout for [slug]/page
src/components/blog/AuthorBox.tsx
src/components/blog/KeyTakeaways.tsx
src/components/blog/CalloutCTA.tsx
src/components/blog/RelatedArticles.tsx
src/components/blog/TableOfContents.tsx
src/components/blog/ArticleBreadcrumb.tsx          # visible crumbs (pillar-labelled)
src/components/seo/BlogPostingSchema.tsx           # new JSON-LD emitter
```

### Modified

```
src/app/sitemap.ts                                 # add /blog + /blog/[slug] entries from MDX loader
src/app/robots.ts                                  # no changes expected; blog is under allowed root
src/app/(marketing)/layout.tsx                     # (optional) promote Organization + WebSite schema to layout so articles inherit
```

### Frontmatter schema (informative — actual definition in `src/lib/blog.ts`)

```yaml
---
title: 'โดนโกงออนไลน์ทำยังไง? 7 ขั้นตอนกู้เงินคืน'
description: 'สรุปขั้นตอนเมื่อคุณโดนโกงออนไลน์ — แจ้งความที่ไหน กู้เงินคืนยังไง …'
slug: 'โดนโกงออนไลน์ทำยังไง-7-ขั้นตอนกู้เงินคืน'
primaryKeyword: 'โดนโกงออนไลน์ทำยังไง'
keywordGroups: ['antiFraud']
pillar: 'anti-scam'
type: 'cluster'
author: 'shinobu'
datePublished: '2026-04-20'
dateModified: '2026-04-20'
heroImage: 'https://<s3>/blog/scammed-7-steps.jpg'
heroAlt: 'ขั้นตอนเมื่อโดนโกงออนไลน์'
faqs:
  - q: '…'
    a: '…'
related:
  - 'ซื้อของไอจีไม่โดนโกง-...'
  - '5-สัญญาณเตือนมิจฉาชีพออนไลน์'
---
```

The loader validates this via Valibot (the backend convention per CLAUDE.md) at build time; any malformed frontmatter fails the build.

## 16. Open questions

- **Advisor recruitment.** We want a second bylined author (fraud-prevention / consumer-protection expertise) for the anti-scam pillar. If recruitment slips past launch, do we (a) ship with the founder as sole byline and add the advisor later, or (b) delay the anti-scam pillar specifically until the advisor is onboarded? Leaning (a).
- **Hero image production workflow.** Every article needs a hero image. Options: AI-generated (Midjourney / DALL·E — risks generic look), stock (Unsplash / Pexels — risks sameness across articles), commissioned illustrations (best brand fit, slowest, most expensive). MVP plan: stock + light brand overlay; revisit when a designer joins.
- **Thai keyword-research tool.** GSC alone is fine for tracking known keywords but poor at keyword discovery. Ahrefs (~$100/mo) vs. Semrush (~$130/mo) vs. keeping GSC-only for 6 months then deciding. Leaning GSC-only until Month 4, then Ahrefs trial.
- **Infographics.** Some articles (especially pillars) would benefit from an infographic ("the 5-stage scam flow", "how Trust Score is calculated"). Produce in-house (Figma + export) or commission? No decision at launch; first pillar ships without infographics, revisit based on engagement data.
- **Comments / social proof under articles.** Currently out of scope (non-goal). Revisit at Month 6 based on traffic volume — comments only make sense with moderation staff.
- **Locked / gated content.** Any reason to gate a pillar behind a soft signup ("enter email for the full PDF")? Not at launch — it damages the primary SEO function. Revisit if the newsletter is activated.
