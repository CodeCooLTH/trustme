# SafePay — Trust & Reputation Platform

## Project Overview

SafePay เป็นระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์ ผ่านระบบ Verify ตัวตน, Trust Score, Badge และ Order History เพื่อแก้ปัญหามิจฉาชีพ

## Key Documents

- PRD: `docs/PRD.md`
- Design Spec: `docs/superpowers/specs/2026-04-04-safepay-trust-platform-design.md`
- Implementation Plan: `docs/superpowers/plans/2026-04-04-safepay-trust-platform.md`

## Architecture

- **Profile-Centric** — Trust Profile เป็นศูนย์กลาง ทุกอย่างไหลเข้า profile
- ไม่แบ่ง role buyer/seller — ทุกคนมี trust profile เหมือนกัน, เปิดร้านเพิ่มได้ (isShop flag)
- Subdomain routing: `safepay.co` (buyer), `seller.safepay.co` (seller), `admin.safepay.co` (admin)
- Session แยกตาม subdomain — login/logout แยกกัน, account เดียวกัน

## Tech Stack

- **Framework:** Next.js 16 (App Router) — TypeScript strict mode
- **UI:** MUI v7 + TailwindCSS (Vuexy theme as base)
- **CSS-in-JS:** Emotion.js (required by MUI)
- **Database:** PostgreSQL 16, Prisma ORM
- **Auth:** NextAuth.js v4 (Facebook OAuth + Phone OTP)
- **Validation:** Valibot (tree-shakeable, ~1KB, ตาม Vuexy theme)
- **Form:** React Hook Form
- **Testing:** Vitest
- **Container:** Docker + Docker Compose
- **Icons:** Tabler Icons via Iconify (from Vuexy)

## Theme: Vuexy (MANDATORY)

**ห้ามสร้าง UI component เองเด็ดขาด** — ต้องใช้จาก Vuexy theme เท่านั้น ถ้าต้องการ component ใด ให้ค้นหาจาก `theme/vuexy/` ก่อนเสมอ ถ้าไม่มีใน theme ให้ใช้ MUI component ที่ Vuexy ใช้อยู่ ห้ามติดตั้ง UI library เพิ่มเติมหรือเขียน component ขึ้นมาเอง

- Location: `theme/vuexy/`
- Based on MUI v7 + TailwindCSS + Emotion
- Layouts: VerticalLayout (sidebar), HorizontalLayout, BlankLayout
- Core modules: `@core/` (theme engine), `@layouts/` (layout system), `@menu/` (navigation)
- Color: Primary purple #7367F0, supports light/dark mode
- Has pre-built: auth pages, dashboards, forms, tables, dialogs, OTP input
- i18n ready (en, fr, ar with RTL)

**Rules:**
1. ต้องใช้ components จาก Vuexy/MUI เท่านั้น — ห้ามเขียน custom UI components เอง
2. ต้องใช้ layout system จาก `@layouts/` — ห้ามสร้าง layout เอง
3. ต้องใช้ menu system จาก `@menu/` — ห้ามสร้าง navigation เอง
4. ต้องใช้ theme/styling จาก `@core/theme/` — ห้ามกำหนด color/typography เอง
5. ถ้าต้องการ pattern ใหม่ → ดูตัวอย่างจาก `theme/vuexy/src/views/` ก่อน แล้วทำตาม pattern เดียวกัน
6. สร้างได้เฉพาะ domain-specific components (trust-score-badge, order-status-badge ฯลฯ) โดยต้อง compose จาก MUI components เท่านั้น

## Core Systems

1. **Verification** — หลายระดับ: OTP (L1) → เอกสาร (L2) → จดทะเบียนธุรกิจ (L3), admin review
2. **Trust Score** — คำนวณจาก Verification (35%), Orders (25%), Rating (20%), Age (10%), Badges (10%), MVP มีแต่ขึ้น
3. **Badge** — Verification badges + Achievement badges (10 อัน)
4. **Simple OMS** — Seller สร้าง order → ลิงก์ → buyer OTP confirm + review, รองรับ PHYSICAL/DIGITAL/SERVICE
5. **Buyer History Linking** — Buyer ไม่ต้องสมัคร (OTP confirm), สมัครทีหลัง auto-link history

## Conventions

- Language: TypeScript (strict mode)
- UI ภาษาไทย
- Mobile-first responsive
- Service layer แยกจาก API layer
- Input validation ด้วย Valibot ทุก endpoint
- ไม่ใช้ Redux — ใช้ Server Components + React state/context
- Follow Vuexy theme patterns: `@core/`, `@layouts/`, `@menu/` structure

@AGENTS.md
