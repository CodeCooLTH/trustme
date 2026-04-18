# SafePay — Trust & Reputation Platform

> **Commercial brand:** "Deep" (UI copy, prod domain `deepthailand.app`). Internal codename "SafePay" is kept in repo, identifiers, and DB. See `~/.claude/projects/.../memory/feedback_brand_naming.md`.

---

## 🛑 HARD RULES — read this first, every time

### 1. No UI from scratch — always copy from the theme

**ห้ามเขียน UI/page เองเด็ดขาด** — ทุกหน้าต้อง copy จากไฟล์ theme ที่ระบุเจาะจง แล้วปรับ content

Which theme depends on the route group:

| Route | Theme | Source root |
|---|---|---|
| `src/app/(marketing)/**` (buyer + landing + public `/u/[username]` + `/o/[token]`) | **Vuexy** | `theme/vuexy/typescript-version/full-version/src/` |
| `src/app/(paces)/seller/**` | **Paces** | `theme/paces/Admin/TS/src/` |
| `src/app/(paces)/admin/**` | **Paces** | `theme/paces/Admin/TS/src/` |

**Before any `Write` of a page/component/layout, state in the response:**

1. Target route: `src/app/.../<path>/page.tsx`
2. Theme source I will copy: `theme/<vuexy|paces>/.../<path>/<file>.tsx`
3. I have `Read` that theme source this turn: ✅ / ❌

If 3 is ❌ → stop, `Read` first. If 2 is vague → stop, research with Glob/Grep.

Full mapping + workflow: **`docs/conventions/ui-page-sourcing.md`** (MANDATORY read before any UI task).

### 2. No `component={Link}` in server components

RSC refuses to serialize a component function prop across the server→client boundary. Use `LinkButton` / `LinkChip` wrappers (under `src/app/<group>/_components/mui-link.tsx`) or wrap `<Button>` with `<Link>`. Full pattern: **`docs/conventions/rsc-mui-navigation.md`**.

### 3. Commit message must cite theme source for UI changes

Every commit that touches `src/app/**`, `src/views/**`, or `src/components/**` (non-trivial UI) must include a `Base:` line pointing to the theme file it copied from. Trivial utility files are exempt. Missing `Base:` on a UI commit = convention violation.

Example:
```
feat(buyer): /dashboard using Vuexy ecommerce widgets

Base: theme/vuexy/.../(private)/apps/ecommerce/dashboard/page.tsx
Widgets adapted: Congratulations → welcome, StatisticsCard, Orders, Transactions.
Dropped: InvoiceListTable.
```

### 4. Multi-step phases run as an agent team, not single-threaded

Any phase with ≥3 tasks (e.g. P1, P2, R1-R11) MUST be executed with the agent-team workflow: Planner → (parallel Developers) → independent Reviewer per task → Controller integrates → per-phase Retro. The Controller (this main session) is the only one who commits or marks tasks complete. Reviewers must be independent agents, not the same agent that wrote the code.

After every phase: write `docs/retro/YYYY-MM-DD-<phase>.md` covering problems, root causes, conventions to adopt, action items. Promote durable conventions to `CLAUDE.md` + `docs/conventions/`; personal reminders to `~/.claude/.../memory/`.

Full workflow: **`docs/conventions/agent-team-workflow.md`**.

---

## Project Overview

SafePay เป็นระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์ ผ่านระบบ Verify ตัวตน, Trust Score, Badge และ Order History เพื่อแก้ปัญหามิจฉาชีพ

## Key Documents

- **PRD:** `docs/PRD.md`
- **Conventions (must-read before UI work):**
  - `docs/conventions/ui-page-sourcing.md` — theme-copy rule + page-type mapping
  - `docs/conventions/rsc-mui-navigation.md` — RSC + MUI + next/link pattern
- **Retros:** `docs/retro/` (post-mortems of phase mistakes — read the latest one before starting a new phase)
- **Plans / specs:** `docs/superpowers/plans/`, `docs/superpowers/specs/`

## Architecture

- **Profile-Centric** — Trust Profile เป็นศูนย์กลาง ทุกอย่างไหลเข้า profile
- ไม่แบ่ง role buyer/seller — ทุกคนมี trust profile เหมือนกัน, เปิดร้านเพิ่มได้ (isShop flag)
- Subdomain routing: main (buyer), `seller.*`, `admin.*` — handled in `src/proxy.ts`
- Session แยกตาม subdomain — login/logout แยกกัน, account เดียวกัน
- Prod domain `deepthailand.app`; dev `deepth.local`

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack) — TypeScript strict mode
- **UI:**
  - Buyer + landing + public (`(marketing)/**`) → **Vuexy** (MUI v9 + Emotion + Tailwind 4)
  - Seller + admin (`(paces)/**`) → **Paces** (Preline 4 + Tailwind 4, no MUI)
- **Database:** PostgreSQL 16 (Supabase), Prisma ORM
- **Auth:** NextAuth.js v4 (Facebook OAuth + Phone OTP via CredentialsProvider)
- **Validation:** Valibot (backend/API), Yup (frontend react-hook-form)
- **Form:** React Hook Form + `@hookform/resolvers`
- **Icons:** `@iconify/react` (on-demand) — use tabler icon names (e.g. `tabler-phone-check`)
- **Charts:** ApexCharts, ECharts, Chart.js (wrappers in `src/components/wrappers/`)
- **Alerts:** react-toastify (mounted once in `(marketing)/ToastMount.tsx`)
- **Testing:** Vitest
- **Container:** Docker + Docker Compose (local Postgres); prod on Supabase

## Directory Structure

```
src/
├── app/
│   ├── (marketing)/           # Vuexy route group (buyer + landing + public)
│   │   ├── layout.tsx         # MUI ThemeProvider + Anuphan font + ToastMount
│   │   ├── auth/              # sign-in, sign-up, verify-otp
│   │   ├── dashboard/         # (→ to be wrapped in (buyer-app)/ per R2)
│   │   ├── orders/            # same
│   │   ├── reviews/           # same
│   │   ├── settings/          # same
│   │   ├── u/[username]/      # public profile
│   │   ├── o/[token]/         # public order
│   │   └── _components/       # shared client wrappers (mui-link, etc.)
│   ├── (paces)/               # Paces route group (seller + admin)
│   │   ├── layout.tsx         # Preline + Tailwind + AppProvidersWrapper
│   │   ├── seller/            # seller dashboard, products, orders, verification, etc.
│   │   └── admin/             # admin auth + (partial) dashboard
│   └── api/                   # Backend — unified across subdomains
├── @core/, @layouts/, @menu/  # Vuexy theme engine (copied from theme/vuexy)
├── assets/, components/,      # Paces scaffolds (copied from theme/paces)
│   config/, context/, hooks/,
│   layouts/, utils/
├── lib/                       # auth, prisma, otp, storage, subdomain, validations
├── services/                  # user, shop, verification, trust-score, badge,
│                              #   product, order, review, history-linking
├── types/
└── proxy.ts                   # Subdomain router (main/seller/admin)

theme/
├── vuexy/typescript-version/full-version/src/   # Vuexy source (reference only)
└── paces/Admin/TS/src/                          # Paces source (reference only)
```

## Core Systems

1. **Verification** — หลายระดับ: OTP (L1) → เอกสาร (L2) → จดทะเบียนธุรกิจ (L3), admin review
2. **Trust Score** — คำนวณจาก Verification 35%, Orders 25%, Rating 20%, Age 10%, Badges 10%. MVP มีแต่ขึ้น (no penalties)
3. **Badges** — Verification badges (auto) + 10 achievement badges (auto evaluated)
4. **Simple OMS** — Seller creates order → public `/o/{token}` → buyer OTP confirm + review → trust recalc. Types: PHYSICAL / DIGITAL / SERVICE
5. **Buyer History Linking** — Buyer confirms as guest (OTP + contact) → signs up later → `linkBuyerHistory` auto-links by phone/email match. Wired in `lib/auth.ts` on phone-OTP + Facebook signup.

## Conventions

- **Language:** TypeScript strict mode; UI copy ภาษาไทย
- **Font:** Anuphan (Google Fonts) — buyer/landing via `next/font`; Noto Sans Thai reference only
- **Mobile-first:** Tailwind breakpoints (`sm:`/`md:`/`lg:`)
- **Service layer** (`src/services/`) is separated from API layer (`src/app/api/`)
- **Input validation:**
  - Backend (API routes): Valibot schemas from `src/lib/validations.ts`
  - Frontend (forms): Yup + `@hookform/resolvers`
- **No Redux** — use Server Components + React state/context
- **Icons:** use `@iconify/react` with tabler names — never bundle a static icon set
- **Commit granularity:** one task/feature = one commit. Cite `Base:` theme file for UI commits (see Hard Rule 3).
- **QA:** Chrome DevTools MCP (`mcp__chrome-devtools__*` tools) is the baseline E2E check for UI tasks. curl + type-check alone are insufficient.

## Current State Snapshots

- **2026-04-13:** Attempted Paces-wide UI rewrite (original plan wiped Vuexy).
- **2026-04-18 (AM):** User reversed the decision for buyer side — buyer + landing back to Vuexy. Admin + seller stay Paces.
- **2026-04-18 (PM):** P1 buyer build shipped (9 commits) but retrospectively violated theme-copy rule; R1-R11 rework planned. See `docs/retro/2026-04-18-p1-retrospective.md`.

Safety checkpoint: `git checkout pre-paces-wipe` restores the pre-2026-04-13 state.

@AGENTS.md
