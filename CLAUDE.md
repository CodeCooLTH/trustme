# SafePay — Trust & Reputation Platform

## Project Overview

SafePay เป็นระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์ ผ่านระบบ Verify ตัวตน, Trust Score, Badge และ Order History เพื่อแก้ปัญหามิจฉาชีพ

## Key Documents

- PRD: `docs/PRD.md`
- Design Spec: `docs/superpowers/specs/2026-04-04-safepay-trust-platform-design.md`
- Implementation Plan: `docs/superpowers/plans/2026-04-04-safepay-trust-platform.md`

## Current State — Paces UI Rebuild

**2026-04-13: Full UI rewrite in progress.** Project was migrated from Vuexy (MUI + Emotion) to **Paces (Preline + Tailwind)**. All Vuexy UI was wiped; backend (Prisma, API routes, services) is preserved. Pages must be rebuilt on top of the paces scaffold.

Safety checkpoint: `git checkout pre-paces-wipe` restores the pre-wipe state (including all Vuexy-era work-in-progress).

## Architecture

- **Profile-Centric** — Trust Profile เป็นศูนย์กลาง ทุกอย่างไหลเข้า profile
- ไม่แบ่ง role buyer/seller — ทุกคนมี trust profile เหมือนกัน, เปิดร้านเพิ่มได้ (isShop flag)
- Subdomain routing: `safepay.co` (buyer), `seller.safepay.co` (seller), `admin.safepay.co` (admin) — handled in `src/proxy.ts`
- Session แยกตาม subdomain — login/logout แยกกัน, account เดียวกัน

## Tech Stack

- **Framework:** Next.js 16 (App Router) — TypeScript strict mode
- **UI:** **Preline 4 + TailwindCSS 4** (Paces theme as base — no MUI, no Emotion)
- **Database:** PostgreSQL 16, Prisma ORM
- **Auth:** NextAuth.js v4 (Facebook OAuth + Phone OTP)
- **Validation:** Valibot (backend/API), Yup (frontend forms with react-hook-form — paces convention)
- **Form:** React Hook Form + `@hookform/resolvers`
- **Charts:** ApexCharts, ECharts (via `echarts-for-react`), Chart.js (via `react-chartjs-2`)
- **Rich Text:** Quill (`react-quill-new`)
- **Date:** flatpickr + react-datepicker
- **Alerts:** SweetAlert2, react-toastify
- **Icons:** `@iconify/react` (on-demand, no bundle)
- **Testing:** Vitest
- **Container:** Docker + Docker Compose

## Marketing Route Exception

The `src/app/(marketing)/` route group is the ONLY place in the app where MUI + Emotion + Vuexy components are permitted. It is isolated via Next.js multiple root layouts — the `(marketing)` layout has its own `<html>` tag with Anuphan font and MUI theme, and does NOT load `@/assets/css/app.css`. All other routes (paces) remain strictly Tailwind/Preline-only per the rules below.

If you touch `src/app/(marketing)/**`, `src/views/front-pages/**`, `src/components/layout/front-pages/**`, `src/@core/**` (Vuexy core), or `src/@layouts/BlankLayout.tsx`, the paces rules do NOT apply. For any other path, the paces rules are absolute.

## Theme: Paces (MANDATORY)

**ห้ามสร้าง UI component เองเด็ดขาด** — ต้องใช้จาก paces theme หรือ compose จาก Preline + Tailwind เท่านั้น

- Paces source: `theme/paces/Admin/TS/src/` (reference only — do not import from here)
- Project scaffold in `src/{components,layouts,hooks,utils,context,assets,config,types}/` — copied from paces
- CSS entry: `src/assets/css/app.css` (imported by `src/app/(paces)/layout.tsx`)
- Preline init: `src/utils/preline.ts` (called from `AppProvidersWrapper`)

### Rules (ABSOLUTE — NO EXCEPTIONS)

1. **ห้ามเขียน UI/page เองเด็ดขาด** — ทุกหน้าต้อง copy จาก `theme/paces/Admin/TS/src/app/` หรือ `theme/paces/Admin/TS/src/components/` แล้วปรับ content
2. **วิธีสร้างหน้าใหม่:**
   - หา page ที่ใกล้เคียงจาก `theme/paces/Admin/TS/src/app/(admin)/` (list/detail/form/dashboard templates) หรือ `theme/paces/Admin/TS/src/app/auth/` (login, sign-up, OTP, reset-pass, 2fa)
   - copy markup + Tailwind classes มา → ปรับ content/logic ให้ตรง SafePay
   - ห้ามเขียนจาก scratch
3. **Auth pages:**
   - Login → base on `theme/paces/Admin/TS/src/app/auth/(basic)/sign-in/`
   - Register → `auth/(basic)/sign-up/`
   - OTP / Confirm → `auth/(basic)/two-factor/`
   - Reset password → `auth/(basic)/reset-pass/`
4. **Dashboard pages** → base on `theme/paces/Admin/TS/src/app/(admin)/dashboard/`
5. **Table/List pages** → base on `theme/paces/Admin/TS/src/app/(admin)/apps/` (users, invoice, ecommerce, projects)
6. **Form pages** → base on `theme/paces/Admin/TS/src/app/(admin)/form/`
7. **Layout wrappers** → use `VerticalLayout` / `HorizontalLayout` / `MainLayout` from `src/layouts/`
8. **Providers** → all client providers go through `AppProvidersWrapper` (already wires `SessionProvider`, `LayoutProvider`, Preline init)
9. **Icons:** use `@iconify/react` or `src/components/wrappers/Icon.tsx` — never import from a local icon bundle
10. **Styling:** Tailwind utility classes only. No inline `style={...}` color constants. No CSS-in-JS. No `@emotion/*`, no `@mui/*`.
11. **Domain components** (trust-score-badge, verification-badges, order-status-badge, achievement-badges) ให้สร้างใน `src/components/safepay/` โดย compose จาก Preline + Tailwind classes เท่านั้น

### Checklist ก่อนสร้างหน้าใหม่

- [ ] ค้นหา page/view ที่ใกล้เคียงจาก `theme/paces/Admin/TS/src/app/` แล้วหรือยัง?
- [ ] Copy มาแล้วปรับ content หรือยัง? (ห้ามเขียนเองจาก scratch)
- [ ] ใช้ paces layouts (VerticalLayout / HorizontalLayout / MainLayout) ครบหรือยัง?
- [ ] ใช้ `@iconify/react` สำหรับ icons หรือยัง?
- [ ] Style ใช้ Tailwind utility classes จากธีมหรือยัง? (ห้ามกำหนด color เอง)

## Directory Structure

```
src/
├── app/
│   ├── api/              # Backend routes — preserved, uses @/lib + @/services
│   ├── layout.tsx        # Root layout (paces pattern)
│   ├── page.tsx          # Landing
│   └── (will add)        # (buyer), seller, admin, auth routes
├── assets/               # paces fonts, css, images
│   └── css/app.css       # Main CSS entry — imports all paces + Tailwind + Preline
├── components/           # paces reusable components (copy from theme/paces as needed)
│   ├── wrappers/         # AppProvidersWrapper, Icon, Quill, Flatpickr, EChart, etc.
│   └── safepay/          # Domain-specific components (create here)
├── config/               # App-level constants (META_DATA, currency, etc.)
├── context/              # React context (useLayoutContext from paces)
├── hooks/                # Client hooks (useAuth wired to NextAuth)
├── layouts/              # paces layouts (Vertical, Horizontal, Main)
├── lib/                  # Backend: auth.ts, prisma.ts, otp.ts, upload.ts, validations.ts, subdomain.ts
├── services/             # Backend: order, product, shop, user, verification, trust-score, badge, review, history-linking
├── types/                # Shared types
├── utils/                # Client utils (preline, layout, helpers — from paces)
└── proxy.ts              # Subdomain routing middleware
```

## Core Systems

1. **Verification** — หลายระดับ: OTP (L1) → เอกสาร (L2) → จดทะเบียนธุรกิจ (L3), admin review
2. **Trust Score** — คำนวณจาก Verification (35%), Orders (25%), Rating (20%), Age (10%), Badges (10%), MVP มีแต่ขึ้น
3. **Badge** — Verification badges + Achievement badges (10 อัน)
4. **Simple OMS** — Seller สร้าง order → ลิงก์ → buyer OTP confirm + review, รองรับ PHYSICAL/DIGITAL/SERVICE
5. **Buyer History Linking** — Buyer ไม่ต้องสมัคร (OTP confirm), สมัครทีหลัง auto-link history

## Conventions

- Language: TypeScript (strict mode)
- UI ภาษาไทย
- Font: Noto Sans Thai (Google Fonts) — linked in `src/app/layout.tsx`
- Mobile-first responsive (Tailwind `sm:`, `md:`, `lg:` breakpoints)
- Service layer (`src/services/`) แยกจาก API layer (`src/app/api/`)
- Input validation:
  - **Backend (API routes):** Valibot schemas from `src/lib/validations.ts`
  - **Frontend (forms):** Yup + `@hookform/resolvers` (paces convention)
- ไม่ใช้ Redux — ใช้ Server Components + React state/context
- Follow paces structure: `components/`, `layouts/`, `hooks/`, `context/`, `utils/`

@AGENTS.md
