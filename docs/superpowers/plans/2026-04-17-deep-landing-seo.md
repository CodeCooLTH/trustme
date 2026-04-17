# Deep Landing SEO — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship framework-first SEO for the Deep landing page: central metadata helper, dynamic OG/favicons, JSON-LD schema, GA4, robots/sitemap/manifest, and the semantic fixes needed to rank.

**Architecture:** All metadata flows through `src/lib/seo.ts::buildMetadata` so every present and future public page has 2-line SEO. Site-root files (`robots.ts`, `sitemap.ts`, `manifest.ts`, `icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`, `twitter-image.tsx`) live at `src/app/*` so they apply across both root layouts (`(marketing)` and `(paces)`). JSON-LD is emitted from server components under `src/components/seo/`. GA4 is a client component mounted in each root layout.

**Tech Stack:** Next.js 16.1.1 (App Router), React 19.2.3, TypeScript (strict), MUI 9 (marketing only), Tailwind/Preline (paces), `next/og` `ImageResponse` for dynamic images, Vitest for unit tests, npm as package manager.

**Spec:** `docs/superpowers/specs/2026-04-17-deep-landing-seo-design.md`

---

## Pre-Flight Notes

**Next.js 16 API check.** Per `AGENTS.md`: "This is NOT the Next.js you know." Before writing any Next.js-specific file, open the relevant doc in `node_modules/next/dist/docs/` and confirm the current signature/API. This applies especially to:

- `metadataBase`, `alternates`, `verification` fields on `Metadata`
- `MetadataRoute.Robots`, `MetadataRoute.Sitemap`, `MetadataRoute.Manifest` return types
- `ImageResponse` import path (`next/og`) and `runtime = 'edge'` directive
- `app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx`, `app/twitter-image.tsx` conventions

If the current API differs from what this plan shows, follow the docs and adapt — the shape of the plan stays, the exact syntax adjusts.

**No existing tests for this area.** Vitest is installed (`devDependencies`), but there is no `vitest.config.*` or test script in `package.json`. Task 2 (`buildMetadata` unit tests) creates the first tests in this codebase — it includes the minimal Vitest wiring.

**Commit style:** Small, focused commits. Each task ends with one commit unless the task explicitly says otherwise.

---

## Task 1: Environment variables

**Files:**
- Modify: `.env.example`
- Modify: `.env` (local — user-owned; show them the line to add)

- [ ] **Step 1: Append to `.env.example`**

Open `.env.example` and append at the bottom:

```
# --- SEO / Analytics ---
# Public site URL used for canonical, OG, sitemap, robots.host
NEXT_PUBLIC_SITE_URL=https://deepthailand.app

# Google Analytics 4 — see analytics.google.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TB854DJZX4

# Google Search Console HTML-tag verification — paste the "content" value after
# adding deepthailand.app as a property in search.google.com/search-console
NEXT_PUBLIC_GSC_VERIFICATION=
```

- [ ] **Step 2: Tell the user to mirror these in `.env` and any deploy target**

No code change — leave a note in the commit body reminding the operator to copy the same three variables into their local `.env` and into Vercel project env (Production + Preview).

- [ ] **Step 3: Commit**

```bash
git add .env.example
git commit -m "feat(seo): add NEXT_PUBLIC_SITE_URL / GA / GSC env vars"
```

---

## Task 2: `src/lib/seo.ts` — central config & helpers (with Vitest)

**Files:**
- Create: `src/lib/seo.ts`
- Create: `src/lib/seo.test.ts`
- Create: `vitest.config.ts` (if not present)
- Modify: `package.json` (add `test` script)

- [ ] **Step 1: Add Vitest wiring**

Check `package.json` — if no `test` script exists, add:

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest"
}
```

Create `vitest.config.ts` at repo root:

```ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    environment: 'node',
    globals: false,
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
})
```

- [ ] **Step 2: Write failing tests at `src/lib/seo.test.ts`**

```ts
import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { SITE, buildCanonical, buildMetadata } from './seo'

describe('SITE constants', () => {
  it('has title under Google SERP limit (60 chars)', () => {
    expect(SITE.defaultTitle.length).toBeLessThanOrEqual(60)
  })

  it('has description under meta limit (160 chars)', () => {
    expect(SITE.description.length).toBeLessThanOrEqual(160)
  })

  it('contains the brand "Deep" in defaultTitle', () => {
    expect(SITE.defaultTitle).toContain('Deep')
  })

  it('uses the deepthailand.app default url', () => {
    // reading env-independent default
    expect(SITE.url.startsWith('https://')).toBe(true)
  })
})

describe('buildCanonical', () => {
  it('resolves root to SITE.url + "/"', () => {
    expect(buildCanonical('/')).toBe(`${SITE.url}/`)
  })

  it('prepends leading slash when missing', () => {
    expect(buildCanonical('shop/123')).toBe(`${SITE.url}/shop/123`)
  })

  it('defaults to "/" when no arg is passed', () => {
    expect(buildCanonical()).toBe(`${SITE.url}/`)
  })
})

describe('buildMetadata', () => {
  const originalGsc = process.env.NEXT_PUBLIC_GSC_VERIFICATION

  afterEach(() => {
    if (originalGsc === undefined) delete process.env.NEXT_PUBLIC_GSC_VERIFICATION
    else process.env.NEXT_PUBLIC_GSC_VERIFICATION = originalGsc
  })

  it('uses defaultTitle verbatim when no title provided', () => {
    const m = buildMetadata({ path: '/' })
    expect(m.title).toBe(SITE.defaultTitle)
  })

  it('concatenates custom title with brand suffix', () => {
    const m = buildMetadata({ title: 'Dashboard', path: '/dashboard' })
    expect(m.title).toBe(`Dashboard | ${SITE.name}`)
  })

  it('merges extra keywords with SITE.keywords', () => {
    const m = buildMetadata({ keywords: ['extra-kw'] })
    expect(m.keywords).toContain('extra-kw')
    expect(m.keywords).toEqual(expect.arrayContaining(SITE.keywords))
  })

  it('sets canonical based on path', () => {
    const m = buildMetadata({ path: '/about' })
    // @ts-expect-error — alternates.canonical is a string in our impl
    expect(m.alternates.canonical).toBe(`${SITE.url}/about`)
  })

  it('emits OpenGraph with website type and locale', () => {
    const m = buildMetadata({ path: '/' })
    expect(m.openGraph?.type).toBe('website')
    expect(m.openGraph?.locale).toBe(SITE.locale)
    expect(m.openGraph?.siteName).toBe(SITE.name)
  })

  it('emits twitter card without site handle', () => {
    const m = buildMetadata({ path: '/' })
    expect(m.twitter?.card).toBe('summary_large_image')
    // No site handle at launch (see spec §13)
    expect((m.twitter as { site?: string })?.site).toBeUndefined()
  })

  it('emits robots noindex when noIndex=true', () => {
    const m = buildMetadata({ noIndex: true })
    expect(m.robots).toMatchObject({ index: false, follow: false })
  })

  it('emits robots index:true by default', () => {
    const m = buildMetadata({})
    expect(m.robots).toMatchObject({ index: true, follow: true })
  })

  it('omits verification when env is unset', () => {
    delete process.env.NEXT_PUBLIC_GSC_VERIFICATION
    const m = buildMetadata({})
    expect(m.verification).toBeUndefined()
  })

  it('includes google verification when env is set', () => {
    process.env.NEXT_PUBLIC_GSC_VERIFICATION = 'abc123'
    const m = buildMetadata({})
    expect(m.verification).toEqual({ google: 'abc123' })
  })
})
```

- [ ] **Step 3: Run tests — expect FAIL (module not found)**

```bash
npm test
```

Expected: test file cannot resolve `./seo`. Good.

- [ ] **Step 4: Implement `src/lib/seo.ts`**

```ts
import type { Metadata } from 'next'

export const SITE = {
  name: 'Deep',
  legalName: 'Deep Thailand',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deepthailand.app',
  locale: 'th_TH',
  defaultTitle: 'Deep — ซื้อขายออนไลน์อย่างมั่นใจ ไม่ต้องกลัวมิจฉาชีพ',
  description:
    'Deep ระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์ ยืนยันตัวตนร้านค้า เช็ค Trust Score ป้องกันมิจฉาชีพ ซื้อขายปลอดภัยด้วย OTP confirm',
  keywords: [
    // A — anti-fraud
    'ป้องกันมิจฉาชีพ', 'เช็คคนโกง', 'ซื้อของออนไลน์ปลอดภัย',
    'ตรวจสอบร้านค้าออนไลน์', 'โดนโกงออนไลน์',
    // B — verify / trust
    'ยืนยันตัวตนร้านค้า', 'ร้านค้าน่าเชื่อถือ', 'trust score',
    'verified seller', 'badge ร้านค้า', 'ร้านค้าผ่านการตรวจสอบ',
    // Brand
    'Deep', 'Deep Thailand', 'deepthailand',
  ],
  ogImage: { width: 1200, height: 630 },
} as const

export function buildCanonical(path: string = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  return new URL(clean, SITE.url).toString()
}

export type BuildMetadataInput = {
  title?: string
  description?: string
  path?: string
  keywords?: string[]
  noIndex?: boolean
  ogImage?: string
}

export function buildMetadata(opts: BuildMetadataInput = {}): Metadata {
  const canonical = buildCanonical(opts.path)
  const title = opts.title ? `${opts.title} | ${SITE.name}` : SITE.defaultTitle
  const description = opts.description ?? SITE.description
  const images = opts.ogImage ? [opts.ogImage] : undefined

  const gsc = process.env.NEXT_PUBLIC_GSC_VERIFICATION

  return {
    metadataBase: new URL(SITE.url),
    title,
    description,
    keywords: [...SITE.keywords, ...(opts.keywords ?? [])],
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: SITE.name,
      locale: SITE.locale,
      title,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
    robots: opts.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
        },
    verification: gsc ? { google: gsc } : undefined,
  }
}
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
npm test
```

Expected: all `seo.test.ts` tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/lib/seo.ts src/lib/seo.test.ts vitest.config.ts package.json package-lock.json
git commit -m "feat(seo): central buildMetadata helper + SITE constants"
```

---

## Task 3: Extract FAQ data from `Faqs.tsx` to `Faqs.data.ts`

**Files:**
- Create: `src/views/front-pages/landing-page/Faqs.data.ts`
- Modify: `src/views/front-pages/landing-page/Faqs.tsx`

- [ ] **Step 1: Create `Faqs.data.ts`**

Copy the `FaqsDataTypes` type and the `FaqsData` array out of `Faqs.tsx` verbatim, then rename "SafePay" → "Deep" throughout the strings. File contents:

```ts
export type FaqsDataType = {
  id: string
  question: string
  active?: boolean
  answer: string
}

export const FaqsData: FaqsDataType[] = [
  {
    id: 'panel1',
    question: 'Deep ใช้งานฟรีจริงหรือไม่?',
    answer:
      'แพ็กเกจเริ่มต้นใช้งานได้ฟรีตลอดชีพ รองรับการยืนยันตัวตนด้วย OTP การสร้าง Order สูงสุด 20 รายการต่อเดือน และ Trust Score พื้นฐาน เหมาะสำหรับผู้เริ่มเปิดร้าน',
  },
  {
    id: 'panel2',
    question: 'Trust Score คำนวณจากอะไรบ้าง?',
    active: true,
    answer:
      'Trust Score คำนวณจาก 5 องค์ประกอบหลัก ได้แก่ การยืนยันตัวตน 35%, จำนวน Order ที่สำเร็จ 25%, เรตติ้งจากผู้ซื้อ 20%, อายุบัญชี 10% และ Badge 10% ในเวอร์ชัน MVP คะแนนจะเพิ่มขึ้นเท่านั้น เพื่อให้ผู้ใช้ใหม่ค่อยๆ สร้างความน่าเชื่อถือ',
  },
  {
    id: 'panel3',
    question: 'ผู้ซื้อต้องสมัคร Deep ไหม?',
    answer:
      'ไม่จำเป็น ผู้ซื้อสามารถยืนยันคำสั่งซื้อผ่านลิงก์และ OTP ได้ทันทีโดยไม่ต้องสมัครสมาชิก หากสมัครภายหลังระบบจะเชื่อมโยงประวัติคำสั่งซื้อเก่าให้อัตโนมัติผ่านเบอร์โทรศัพท์',
  },
  {
    id: 'panel4',
    question: 'Badge มีกี่ประเภทและได้มาอย่างไร?',
    answer:
      'Deep มี Badge 2 กลุ่มหลัก คือ Verification Badge จากการยืนยันตัวตนด้วย OTP เอกสาร และจดทะเบียนธุรกิจ กับ Achievement Badge อีก 10 รายการที่ได้จากการใช้งานจริง เช่น ส่งของเร็ว ตอบลูกค้าไว ยอดขายครบ 100 รายการ',
  },
  {
    id: 'panel5',
    question: 'รองรับสินค้าประเภทไหนบ้าง?',
    answer:
      'Deep รองรับสินค้า 3 ประเภท ได้แก่ สินค้าจริงที่ต้องจัดส่ง สินค้าดิจิทัลเช่นไฟล์หรือบัญชีบริการ และบริการเช่น รับจ้างออกแบบหรือสอนพิเศษ แต่ละประเภทมีขั้นตอนการยืนยันที่เหมาะสมกับรูปแบบสินค้า',
  },
  {
    id: 'panel6',
    question: 'หากเกิดปัญหากับผู้ขาย สามารถยกเลิก Order ได้ไหม?',
    answer:
      'ได้ ผู้ซื้อสามารถกดยกเลิก Order ก่อนยืนยันรับสินค้า และผู้ขายสามารถยกเลิกได้หากยังไม่จัดส่ง ประวัติการยกเลิกทั้งหมดจะถูกบันทึกไว้ในระบบเพื่อใช้ประกอบการพิจารณาต่อไป',
  },
  {
    id: 'panel7',
    question: 'ข้อมูลส่วนตัวของฉันปลอดภัยแค่ไหน?',
    answer:
      'Deep ปฏิบัติตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล ข้อมูลทั้งหมดถูกเข้ารหัสระหว่างการส่ง และเอกสารยืนยันตัวตนใช้เพื่อการพิสูจน์เท่านั้น ไม่แบ่งปันให้บุคคลที่สาม',
  },
  {
    id: 'panel8',
    question: 'ต้องการอัปเกรดจากแพ็กเริ่มต้นต้องทำอย่างไร?',
    answer:
      'สามารถอัปเกรดได้ทันทีจากหน้าตั้งค่าบัญชี เลือกแพ็กเกจที่ต้องการและชำระเงิน ระบบจะเปิดใช้งานฟีเจอร์ใหม่ทันที หากมีข้อสงสัยสามารถติดต่อทีมงานผ่านแบบฟอร์มด้านล่าง',
  },
]
```

- [ ] **Step 2: Update `Faqs.tsx` to import from the new file**

Delete the inline `FaqsDataTypes` type and `FaqsData` const from `Faqs.tsx` (lines 22–79 range in the current file). Add the import near the top:

```ts
import { FaqsData, type FaqsDataType } from './Faqs.data'
```

Then update any references in the component body: replace `FaqsDataTypes` → `FaqsDataType`.

- [ ] **Step 3: Verify landing page still compiles**

```bash
npm run build
```

Expected: build succeeds; FAQs section renders identically.

- [ ] **Step 4: Commit**

```bash
git add src/views/front-pages/landing-page/Faqs.data.ts src/views/front-pages/landing-page/Faqs.tsx
git commit -m "refactor(landing): extract FAQ data, rebrand SafePay→Deep in copy"
```

---

## Task 4: JSON-LD components — base wrapper + site-wide schemas

**Files:**
- Create: `src/components/seo/JsonLd.tsx`
- Create: `src/components/seo/OrganizationSchema.tsx`
- Create: `src/components/seo/WebSiteSchema.tsx`

- [ ] **Step 1: Create `JsonLd.tsx`**

```tsx
type JsonLdObject = Record<string, unknown>

export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  return (
    <script
      type="application/ld+json"
      // Content is controlled — safe to serialize directly.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

- [ ] **Step 2: Create `OrganizationSchema.tsx`**

```tsx
import { SITE } from '@/lib/seo'
import { JsonLd } from './JsonLd'

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE.legalName,
        alternateName: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/icon`,
        description: SITE.description,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          availableLanguage: ['th', 'en'],
        },
        areaServed: { '@type': 'Country', name: 'Thailand' },
      }}
    />
  )
}
```

- [ ] **Step 3: Create `WebSiteSchema.tsx`**

```tsx
import { SITE } from '@/lib/seo'
import { JsonLd } from './JsonLd'

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE.name,
        url: SITE.url,
        inLanguage: 'th-TH',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE.url}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/seo/
git commit -m "feat(seo): JsonLd wrapper + Organization & WebSite schemas"
```

---

## Task 5: JSON-LD — Service, FAQ, Breadcrumb + barrel export

**Files:**
- Create: `src/components/seo/ServiceSchema.tsx`
- Create: `src/components/seo/FaqSchema.tsx`
- Create: `src/components/seo/BreadcrumbSchema.tsx`
- Create: `src/components/seo/index.ts`

- [ ] **Step 1: Create `ServiceSchema.tsx`**

```tsx
import { SITE } from '@/lib/seo'
import { JsonLd } from './JsonLd'

export function ServiceSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Trust & Verification Platform',
        name: 'Deep — ระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์',
        provider: {
          '@type': 'Organization',
          name: SITE.legalName,
          url: SITE.url,
        },
        areaServed: { '@type': 'Country', name: 'Thailand' },
        description:
          'บริการยืนยันตัวตนร้านค้า คำนวณ Trust Score จากหลายปัจจัย ยืนยันการซื้อขายด้วย OTP ป้องกันมิจฉาชีพ',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'THB' },
      }}
    />
  )
}
```

- [ ] **Step 2: Create `FaqSchema.tsx`**

```tsx
import { JsonLd } from './JsonLd'

export type FaqItem = { question: string; answer: string }

export function FaqSchema({ faqs }: { faqs: FaqItem[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }}
    />
  )
}
```

- [ ] **Step 3: Create `BreadcrumbSchema.tsx`**

```tsx
import { JsonLd } from './JsonLd'

export type BreadcrumbItem = { name: string; url: string }

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  )
}
```

- [ ] **Step 4: Create `src/components/seo/index.ts` barrel**

```ts
export { JsonLd } from './JsonLd'
export { OrganizationSchema } from './OrganizationSchema'
export { WebSiteSchema } from './WebSiteSchema'
export { ServiceSchema } from './ServiceSchema'
export { FaqSchema, type FaqItem } from './FaqSchema'
export { BreadcrumbSchema, type BreadcrumbItem } from './BreadcrumbSchema'
```

- [ ] **Step 5: Commit**

```bash
git add src/components/seo/
git commit -m "feat(seo): Service/Faq/Breadcrumb JSON-LD + barrel"
```

---

## Task 6: GA4 client component

**Files:**
- Create: `src/components/analytics/GoogleAnalytics.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'

import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export function GoogleAnalytics() {
  if (!GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/analytics/GoogleAnalytics.tsx
git commit -m "feat(analytics): GA4 component with anonymize_ip (PDPA)"
```

---

## Task 7: `robots.ts`

**Files:**
- Create: `src/app/robots.ts`

- [ ] **Step 1: Peek the Next.js 16 docs**

```bash
ls node_modules/next/dist/docs/ | head -20
```

Read whichever file covers `robots` (e.g., `app-api-reference-file-conventions-metadata-robots.mdx`) and confirm the `MetadataRoute.Robots` shape matches the code below.

- [ ] **Step 2: Create the file**

```ts
import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/auth/',
          '/my-account/',
          '/_next/',
          '/*?*',
        ],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

In another shell:

```bash
curl -s http://localhost:3000/robots.txt
```

Expected: a `robots.txt` response that starts with `User-agent: *`, ends with `Sitemap: https://deepthailand.app/sitemap.xml` and `Host: https://deepthailand.app`.

Kill the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/app/robots.ts
git commit -m "feat(seo): robots.ts with disallow for api/auth/admin + query strings"
```

---

## Task 8: `sitemap.ts`

**Files:**
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Create the file**

```ts
import type { MetadataRoute } from 'next'
import { buildCanonical } from '@/lib/seo'

type StaticRoute = {
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}

const STATIC_MARKETING_ROUTES: StaticRoute[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  // Add future marketing routes here as they ship:
  // { path: '/about',   priority: 0.8, changeFrequency: 'monthly' },
  // { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  return STATIC_MARKETING_ROUTES.map((r) => ({
    url: buildCanonical(r.path),
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  // TODO: once shop/product data is available, append dynamic entries:
  //   const shops = await prisma.shop.findMany({ where: { verified: true } })
  //   return [...static, ...shops.map(s => ({ url: buildCanonical(`/shop/${s.id}`), ... }))]
}
```

- [ ] **Step 2: Verify**

Start `npm run dev`, then:

```bash
curl -s http://localhost:3000/sitemap.xml
```

Expected: a `<urlset>` with a single `<url>` entry for `https://deepthailand.app/` (priority 1.0, weekly).

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(seo): sitemap.ts with static marketing routes"
```

---

## Task 9: `manifest.ts` (PWA)

**Files:**
- Create: `src/app/manifest.ts`

- [ ] **Step 1: Create the file**

```ts
import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/seo'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.legalName,
    short_name: SITE.name,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#6366f1',
    lang: 'th',
    categories: ['business', 'shopping', 'finance'],
    icons: [
      { src: '/icon', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
```

- [ ] **Step 2: Verify**

With dev running:

```bash
curl -s http://localhost:3000/manifest.webmanifest
```

Expected: JSON with `name: "Deep Thailand"`, `short_name: "Deep"`, `theme_color: "#6366f1"`.

- [ ] **Step 3: Commit**

```bash
git add src/app/manifest.ts
git commit -m "feat(seo): PWA manifest.ts"
```

---

## Task 10: Cache Anuphan font for OG image rendering

**Files:**
- Create: `src/assets/fonts/anuphan-400.woff2`
- Create: `src/assets/fonts/anuphan-700.woff2`
- Create: `src/lib/og-fonts.ts`
- Modify: `package.json` (adds `@fontsource/anuphan` devDep)

Background: `ImageResponse` needs a font binary; fetching from Google Fonts at runtime is fragile. Cache the Anuphan files locally once.

- [ ] **Step 1: Install Anuphan from `@fontsource`**

This is the simplest reliable way to get a TTF file on disk.

```bash
mkdir -p src/assets/fonts
npm install --save-dev @fontsource/anuphan
cp node_modules/@fontsource/anuphan/files/anuphan-thai-400-normal.woff2 src/assets/fonts/anuphan-400.woff2
cp node_modules/@fontsource/anuphan/files/anuphan-thai-700-normal.woff2 src/assets/fonts/anuphan-700.woff2
```

Verify the files exist and are > 20KB:

```bash
ls -la src/assets/fonts/anuphan-*.woff2
```

If `@fontsource/anuphan` does not exist on npm (check with `npm view @fontsource/anuphan`), fall back: download the Anuphan family ZIP from `https://fonts.google.com/specimen/Anuphan`, extract `Anuphan-Regular.ttf` and `Anuphan-Bold.ttf`, save them as `src/assets/fonts/anuphan-400.ttf` and `anuphan-700.ttf` (and update the file extensions in Step 2 accordingly).

- [ ] **Step 2: Create `src/lib/og-fonts.ts`**

```ts
import { readFile } from 'node:fs/promises'
import path from 'node:path'

const FONT_DIR = path.join(process.cwd(), 'src/assets/fonts')

// Change the extension to 'ttf' if you used the Google Fonts ZIP fallback.
const FONT_EXT = 'woff2'

export async function loadAnuphan() {
  const [regular, bold] = await Promise.all([
    readFile(path.join(FONT_DIR, `anuphan-400.${FONT_EXT}`)),
    readFile(path.join(FONT_DIR, `anuphan-700.${FONT_EXT}`)),
  ])
  return [
    { name: 'Anuphan', data: regular, weight: 400 as const, style: 'normal' as const },
    { name: 'Anuphan', data: bold,    weight: 700 as const, style: 'normal' as const },
  ]
}
```

Note: the edge runtime does not allow `node:fs`. If `icon.tsx` / `opengraph-image.tsx` must be edge, switch to `nodejs` runtime (see next tasks) — or inline the fonts as base64. This plan uses `runtime = 'nodejs'` for these handlers to keep the font code simple.

- [ ] **Step 3: Commit**

```bash
git add src/assets/fonts/ src/lib/og-fonts.ts package.json package-lock.json
git commit -m "chore(seo): cache Anuphan font files + og-fonts loader"
```

---

## Task 11: `icon.tsx` + `apple-icon.tsx`

**Files:**
- Create: `src/app/icon.tsx`
- Create: `src/app/apple-icon.tsx`
- Delete: `src/app/favicon.ico` (Next.js prefers the generated icon.tsx output)

- [ ] **Step 1: Create `icon.tsx` (32×32)**

```tsx
import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: 'white',
          fontSize: 22,
          fontWeight: 900,
          borderRadius: 6,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        D
      </div>
    ),
    { ...size }
  )
}
```

- [ ] **Step 2: Create `apple-icon.tsx` (180×180)**

```tsx
import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: 'white',
          fontSize: 120,
          fontWeight: 900,
          borderRadius: 40,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        D
      </div>
    ),
    { ...size }
  )
}
```

- [ ] **Step 3: Remove the old static favicon**

```bash
rm src/app/favicon.ico
```

- [ ] **Step 4: Verify**

```bash
npm run dev &
sleep 3
curl -sI http://localhost:3000/icon | head -5
curl -sI http://localhost:3000/apple-icon | head -5
```

Expected: `HTTP/1.1 200`, `content-type: image/png`. Visit `http://localhost:3000` in a browser and check the tab favicon — should show a gradient "D".

Kill the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/app/icon.tsx src/app/apple-icon.tsx
git rm src/app/favicon.ico
git commit -m "feat(seo): dynamic favicon & apple-icon (text-based D)"
```

---

## Task 12: `opengraph-image.tsx` + `twitter-image.tsx`

**Files:**
- Create: `src/app/opengraph-image.tsx`
- Create: `src/app/twitter-image.tsx`

- [ ] **Step 1: Create `opengraph-image.tsx`**

```tsx
import { ImageResponse } from 'next/og'
import { loadAnuphan } from '@/lib/og-fonts'

export const runtime = 'nodejs'
export const alt = 'Deep — ซื้อขายออนไลน์อย่างมั่นใจ ไม่ต้องกลัวมิจฉาชีพ'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  const fonts = await loadAnuphan()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
          color: 'white',
          fontFamily: 'Anuphan',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: -2 }}>Deep</div>

        <div style={{ fontSize: 54, fontWeight: 700, marginTop: 20, lineHeight: 1.2 }}>
          ซื้อขายออนไลน์อย่างมั่นใจ
        </div>
        <div style={{ fontSize: 40, fontWeight: 400, marginTop: 8, opacity: 0.9 }}>
          ไม่ต้องกลัวมิจฉาชีพ
        </div>

        <div style={{ display: 'flex', gap: 16, marginTop: 40, fontSize: 24 }}>
          <span style={chipStyle}>✓ ยืนยันตัวตน</span>
          <span style={chipStyle}>✓ Trust Score</span>
          <span style={chipStyle}>✓ OTP Confirm</span>
        </div>

        <div style={{ fontSize: 28, marginTop: 50, opacity: 0.85 }}>deepthailand.app</div>
      </div>
    ),
    { ...size, fonts }
  )
}

const chipStyle = {
  background: 'rgba(255,255,255,0.15)',
  padding: '8px 20px',
  borderRadius: 999,
  display: 'flex',
  alignItems: 'center',
} as const
```

- [ ] **Step 2: Create `twitter-image.tsx` as a re-export**

```tsx
export { runtime, size, contentType, alt } from './opengraph-image'
export { default } from './opengraph-image'
```

- [ ] **Step 3: Verify**

With `npm run dev` running:

```bash
curl -s -o /tmp/og.png -w '%{http_code} %{content_type} %{size_download}\n' \
  http://localhost:3000/opengraph-image
```

Expected: `200 image/png 50000+` (PNG bytes > ~50KB). Open `/tmp/og.png` in an image viewer and confirm:

- Text renders in Thai (not tofu boxes) — font loaded correctly.
- Gradient is indigo → violet → pink.
- Three trust chips display.

Also verify `/twitter-image` returns the same PNG.

- [ ] **Step 4: Commit**

```bash
git add src/app/opengraph-image.tsx src/app/twitter-image.tsx
git commit -m "feat(seo): dynamic OG & Twitter image with Thai Anuphan font"
```

---

## Task 13: Marketing layout — use `buildMetadata`, mount GA

**Files:**
- Modify: `src/app/(marketing)/layout.tsx`

- [ ] **Step 1: Replace the hand-written `metadata` export**

Current (lines 2, 31–36):

```ts
import type { Metadata } from 'next'
// ...
export const metadata: Metadata = {
  title: 'SafePay — ซื้อขายออนไลน์อย่างมั่นใจ',
  description: 'SafePay คือระบบสร้างความน่าเชื่อถือ...',
  keywords: ['SafePay', 'Trust Score', ...],
}
```

Replace with:

```ts
import { buildMetadata } from '@/lib/seo'
// ... keep other imports unchanged
export const metadata = buildMetadata({ path: '/' })
```

Remove the now-unused `import type { Metadata } from 'next'` line.

- [ ] **Step 2: Mount `<GoogleAnalytics />` inside `<body>`**

Add the import:

```ts
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
```

Inside the JSX body, add the component as a last child of `<body>` (so it loads after the app but still in the same document):

```tsx
<body className="marketing-body flex is-full min-bs-full flex-auto flex-col">
  <InitColorSchemeScript attribute="data" defaultMode={systemMode} />
  <VerticalNavProvider>
    {/* ...existing providers... */}
  </VerticalNavProvider>
  <GoogleAnalytics />
</body>
```

- [ ] **Step 3: Verify**

```bash
npm run build
```

Expected: build succeeds. Then:

```bash
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -E 'og:|twitter:|canonical|description|google-site-verification' | head -20
```

Expected output includes:

- `<link rel="canonical" href="https://deepthailand.app/">`
- `<meta property="og:title" content="Deep — ซื้อขายออนไลน์...">`
- `<meta property="og:url" content="https://deepthailand.app/">`
- `<meta name="twitter:card" content="summary_large_image">`
- `<meta name="description" content="Deep ระบบสร้าง...">`

If `NEXT_PUBLIC_GSC_VERIFICATION` is unset, the google-site-verification tag is absent (expected at this stage).

Also grep for GA:

```bash
curl -s http://localhost:3000 | grep -E 'gtag|googletagmanager' | head -5
```

Expected: at least one match referencing `G-TB854DJZX4`.

- [ ] **Step 4: Commit**

```bash
git add src/app/\(marketing\)/layout.tsx
git commit -m "feat(landing): metadata via buildMetadata + mount GA"
```

---

## Task 14: Marketing page — mount JSON-LD

**Files:**
- Modify: `src/app/(marketing)/page.tsx`

- [ ] **Step 1: Add JSON-LD components above the layout wrapper**

Replace the file contents with:

```tsx
// Util Imports
import { getServerMode } from '@core/utils/serverHelpers'

// Component Imports
import FrontLayout from '@components/layout/front-pages'
import LandingPageWrapper from '@views/front-pages/landing-page'
import {
  OrganizationSchema,
  WebSiteSchema,
  ServiceSchema,
  FaqSchema,
} from '@/components/seo'
import { FaqsData } from '@views/front-pages/landing-page/Faqs.data'

export default async function MarketingHomePage() {
  const mode = await getServerMode()

  const faqItems = FaqsData.map((f) => ({ question: f.question, answer: f.answer }))

  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <ServiceSchema />
      <FaqSchema faqs={faqItems} />
      <FrontLayout>
        <LandingPageWrapper mode={mode} />
      </FrontLayout>
    </>
  )
}
```

- [ ] **Step 2: Verify JSON-LD in rendered HTML**

```bash
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -c 'application/ld+json'
```

Expected: `4` (Organization, WebSite, Service, FAQPage).

Inspect the FAQ schema:

```bash
curl -s http://localhost:3000 | grep -oE '"@type":"FAQPage"[^<]{0,200}' | head -1
```

Expected: a JSON snippet with `"mainEntity":[...]` containing the Deep FAQ questions.

- [ ] **Step 3: Validate with Schema.org tool (manual)**

Open `https://validator.schema.org/` and paste the page HTML (or the URL once deployed). Confirm zero errors on Organization, WebSite, Service, FAQPage.

- [ ] **Step 4: Commit**

```bash
git add src/app/\(marketing\)/page.tsx
git commit -m "feat(landing): emit Organization/WebSite/Service/FAQ JSON-LD"
```

---

## Task 15: Paces layout — mount GA

**Files:**
- Modify: `src/app/(paces)/layout.tsx`

- [ ] **Step 1: Read current file, locate `<body>`**

```bash
cat src/app/\(paces\)/layout.tsx
```

Identify where the `<body>` closes.

- [ ] **Step 2: Mount `<GoogleAnalytics />`**

Add the import near the top:

```ts
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
```

Add the component as the last child inside `<body>`:

```tsx
<body /* ...existing classes... */>
  {/* ...existing providers & children... */}
  <GoogleAnalytics />
</body>
```

- [ ] **Step 3: Verify**

Visit any paces route (e.g., `/auth/login` if it exists, or another public paces page) and confirm the `gtag` script is present:

```bash
curl -s http://localhost:3000/auth/login 2>/dev/null | grep -E 'gtag|googletagmanager' | head -3
```

Expected: match referencing `G-TB854DJZX4`.

- [ ] **Step 4: Commit**

```bash
git add src/app/\(paces\)/layout.tsx
git commit -m "feat(analytics): mount GA in paces root layout"
```

---

## Task 16: Semantic `<h1>` + rebrand hero copy

**Files:**
- Modify: `src/views/front-pages/landing-page/HeroSection.tsx`

- [ ] **Step 1: Add `component='h1'` to the hero headline**

Current (line 79):

```tsx
<Typography
  className={classnames('font-extrabold sm:text-[42px] text-3xl mbe-4 leading-[48px]', styles.heroText)}
>
  ซื้อขายออนไลน์อย่างมั่นใจ ไม่ต้องกลัวมิจฉาชีพ
</Typography>
```

Change to:

```tsx
<Typography
  component='h1'
  variant='h2'
  className={classnames('font-extrabold sm:text-[42px] text-3xl mbe-4 leading-[48px]', styles.heroText)}
>
  ซื้อขายออนไลน์อย่างมั่นใจ ไม่ต้องกลัวมิจฉาชีพ
</Typography>
```

- [ ] **Step 2: Rebrand the subheading SafePay → Deep**

Current (line 84–86):

```tsx
<Typography className='font-medium' color='text.primary'>
  SafePay คือระบบสร้างความน่าเชื่อถือผ่านการยืนยันตัวตน Trust Score และ Badge เพื่อให้ทุกดีลเชื่อถือได้
</Typography>
```

Change the brand name only:

```tsx
<Typography className='font-medium' color='text.primary'>
  Deep คือระบบสร้างความน่าเชื่อถือผ่านการยืนยันตัวตน Trust Score และ Badge เพื่อให้ทุกดีลเชื่อถือได้
</Typography>
```

- [ ] **Step 3: Verify exactly one `<h1>` on the page**

```bash
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -oE '<h1[^>]*>' | wc -l
```

Expected: `1`.

Grep the rendered text to confirm "Deep" (not "SafePay") appears in the hero subheading:

```bash
curl -s http://localhost:3000 | grep -o 'Deep คือระบบ' | head -1
```

Expected: one match.

- [ ] **Step 4: Commit**

```bash
git add src/views/front-pages/landing-page/HeroSection.tsx
git commit -m "fix(landing): semantic h1 + rebrand hero SafePay→Deep"
```

---

## Task 17: Heading hierarchy audit — rest of landing sections

**Files (modify each):**
- `src/views/front-pages/landing-page/UsefulFeature.tsx`
- `src/views/front-pages/landing-page/CustomerReviews.tsx`
- `src/views/front-pages/landing-page/OurTeam.tsx`
- `src/views/front-pages/landing-page/Pricing.tsx`
- `src/views/front-pages/landing-page/ProductStat.tsx`
- `src/views/front-pages/landing-page/Faqs.tsx`
- `src/views/front-pages/landing-page/GetStarted.tsx`
- `src/views/front-pages/landing-page/ContactUs.tsx`

- [ ] **Step 1: For each file, locate the section title `<Typography>`**

For every file above, open it and find the **section-title** `<Typography>` — the one that introduces the whole section (usually near the top of the returned JSX, often with `variant='h4'` or `variant='h5'`). Add `component='h2'`:

```tsx
<Typography component='h2' variant='h4' /* ...existing props... */>
  {/* existing Thai title */}
</Typography>
```

Keep the existing `variant` (for visual styling). Only `component='h2'` is added.

Also audit sub-section titles inside each file: card titles, step titles, FAQ question inside the accordion — those should be `component='h3'`. Use judgement: if a `<Typography>` is the heading for a distinct sub-block (a pricing tier card, a team member card, a feature card), give it `component='h3'`. Body copy stays as-is (default `<p>`).

Also look for any remaining "SafePay" string in these files and rename to "Deep".

- [ ] **Step 2: Verify heading structure**

```bash
curl -s http://localhost:3000 > /tmp/landing.html
echo "h1 count: $(grep -oE '<h1[^>]*>' /tmp/landing.html | wc -l)"
echo "h2 count: $(grep -oE '<h2[^>]*>' /tmp/landing.html | wc -l)"
echo "h3 count: $(grep -oE '<h3[^>]*>' /tmp/landing.html | wc -l)"
```

Expected:
- `h1 count: 1`
- `h2 count: 8` (one per section)
- `h3 count:` several (cards, tiers, team members, etc.)

```bash
grep -c 'SafePay' /tmp/landing.html
```

Expected: `0`.

- [ ] **Step 3: Commit**

```bash
git add src/views/front-pages/landing-page/
git commit -m "fix(landing): heading hierarchy (h2 per section, h3 for cards) + rebrand"
```

---

## Task 18: Migrate hero LCP images to `next/image`

**Files:**
- Modify: `src/views/front-pages/landing-page/HeroSection.tsx`

Rationale: the hero dashboard + background are the Largest Contentful Paint element. Using `next/image` with `priority` and `sizes` is the minimum change that measurably improves LCP.

- [ ] **Step 1: Swap the hero background image**

In `HeroSection.tsx` add at top:

```ts
import Image from 'next/image'
```

Replace the current background `<img>` (lines 69–76) with:

```tsx
<Image
  src={heroSectionBg}
  alt='hero-bg'
  fill
  priority
  sizes='100vw'
  className={classnames('bs-[95%] sm:bs-[85%] md:bs-[80%] object-cover', styles.heroSectionBg, {
    [styles.bgLight]: _mode === 'light',
    [styles.bgDark]: _mode === 'dark',
  })}
/>
```

(For `fill` to work the parent `<section>` must be `position: relative` — it already is via the `relative` class on line 68.)

- [ ] **Step 2: Swap the dashboard + elements images**

Replace the dashboard image (line 109) and elements image (line 111):

```tsx
<Image
  src={dashboardImage}
  alt='dashboard-image'
  width={1200}
  height={800}
  priority
  sizes='(max-width: 768px) 100vw, 1200px'
  className={classnames('mli-auto', styles.heroSecDashboard)}
/>
{/* ... */}
<Image
  src={elementsImage}
  alt='dashboard-elements'
  width={600}
  height={400}
  sizes='(max-width: 768px) 100vw, 600px'
/>
```

(Widths/heights are approximate — open one of the PNGs in the repo to get exact dimensions, e.g. `file public/images/front-pages/landing-page/hero-dashboard-light.png`, then use those numbers.)

- [ ] **Step 3: Verify build + runtime**

```bash
npm run build
```

Expected: build passes. Dev check:

```bash
npm run dev &
sleep 3
curl -sI http://localhost:3000/_next/image?url=%2Fimages%2Ffront-pages%2Flanding-page%2Fhero-dashboard-light.png\&w=1200\&q=75 | head -3
```

Expected: `200 OK` with a WebP/AVIF content-type.

Visit `http://localhost:3000` in a browser, open DevTools → Network, hard-reload. Confirm the hero dashboard is served from `_next/image` as AVIF or WebP, not raw PNG.

- [ ] **Step 4: Commit**

```bash
git add src/views/front-pages/landing-page/HeroSection.tsx
git commit -m "perf(landing): migrate hero LCP images to next/image with priority"
```

---

## Task 19: Final Lighthouse + validator sweep

**Files:** none — verification only.

- [ ] **Step 1: Production build + start**

```bash
npm run build
npm run start &
sleep 4
```

- [ ] **Step 2: Run Lighthouse (mobile + desktop)**

```bash
# Requires Chrome + lighthouse CLI (npx lighthouse)
npx --yes lighthouse http://localhost:3000 \
  --only-categories=seo,performance,best-practices,accessibility \
  --form-factor=mobile --screenEmulation.mobile=true \
  --output=json --output-path=/tmp/lh-mobile.json --quiet

npx --yes lighthouse http://localhost:3000 \
  --only-categories=seo,performance,best-practices,accessibility \
  --form-factor=desktop --screenEmulation.mobile=false --preset=desktop \
  --output=json --output-path=/tmp/lh-desktop.json --quiet
```

- [ ] **Step 3: Check scores**

```bash
node -e "const m=require('/tmp/lh-mobile.json'),d=require('/tmp/lh-desktop.json');
console.log('mobile  SEO', m.categories.seo.score*100, 'Perf', m.categories.performance.score*100);
console.log('desktop SEO', d.categories.seo.score*100, 'Perf', d.categories.performance.score*100);"
```

Expected thresholds: SEO ≥ 95 on both; Performance ≥ 80 on mobile, ≥ 90 on desktop.

If SEO < 95, read the audit details in the JSON and fix the failing items. Common culprits: missing alt text, heading order, tap-target size.

- [ ] **Step 4: External validators (manual)**

Deploy to Vercel preview (or expose localhost via `ngrok`) and paste the URL into:

- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Markup Validator: https://validator.schema.org/
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- Twitter/X Card Validator

Each should report zero errors for the landing URL. Fix any issues that surface.

- [ ] **Step 5: Endpoint sanity check**

```bash
for p in robots.txt sitemap.xml manifest.webmanifest icon apple-icon opengraph-image twitter-image; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000/$p")
  echo "$p -> $code"
done
```

Expected: every line shows `200`.

Kill the dev/start server.

- [ ] **Step 6: Post-deploy human steps (record in the final commit body)**

No code change — just a reminder list for the operator after deploy to Vercel:

1. Add `deepthailand.app` as a Google Search Console property (HTML-tag method), paste the code into `NEXT_PUBLIC_GSC_VERIFICATION` on Vercel, redeploy.
2. Submit `https://deepthailand.app/sitemap.xml` in Search Console.
3. Use URL Inspection → Request indexing for `/`.
4. Bust social caches: Facebook Sharing Debugger (scrape), Twitter Card Validator, share once in a LINE chat to warm LINE's cache.

- [ ] **Step 7: Commit a stamp of completion**

```bash
git commit --allow-empty -m "chore(seo): final verification pass — Lighthouse SEO ≥ 95

Post-deploy steps for operator:
1. Paste GSC verification into Vercel env NEXT_PUBLIC_GSC_VERIFICATION
2. Submit sitemap.xml in Search Console
3. Request indexing for /
4. Bust FB/Twitter/LINE social caches"
```
