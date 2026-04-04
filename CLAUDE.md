# SafePay — Trust & Reputation Platform

## Project Overview

SafePay เป็นระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์ ผ่านระบบ Verify ตัวตน, Trust Score, Badge และ Order History เพื่อแก้ปัญหามิจฉาชีพ

## Key Documents

- PRD: `docs/PRD.md`

## Architecture

- **Profile-Centric** — Trust Profile เป็นศูนย์กลาง ทุกอย่างไหลเข้า profile
- ไม่แบ่ง role buyer/seller — ทุกคนมี trust profile เหมือนกัน, เปิดร้านเพิ่มได้ (isShop flag)
- Subdomain routing: `safepay.co` (buyer), `seller.safepay.co` (seller), `admin.safepay.co` (admin)
- Session แยกตาม subdomain — login/logout แยกกัน, account เดียวกัน

## Tech Stack

- Next.js 15 (App Router), TypeScript
- PostgreSQL 16, Prisma ORM
- NextAuth.js v4 (Facebook OAuth + Phone OTP)
- Zod validation, TailwindCSS
- Docker + Docker Compose
- Vitest

## Core Systems

1. **Verification** — หลายระดับ: OTP (L1) → เอกสาร (L2) → จดทะเบียนธุรกิจ (L3), admin review
2. **Trust Score** — คำนวณจาก Verification (35%), Orders (25%), Rating (20%), Age (10%), Badges (10%), MVP มีแต่ขึ้น
3. **Badge** — Verification badges + Achievement badges (10 อัน)
4. **Simple OMS** — Seller สร้าง order → ลิงก์ → buyer OTP confirm + review, รองรับ PHYSICAL/DIGITAL/SERVICE
5. **Buyer History Linking** — Buyer ไม่ต้องสมัคร (OTP confirm), สมัครทีหลัง auto-link history

## Conventions

- UI ภาษาไทย
- Mobile-first responsive
- Service layer แยกจาก API layer
- Input validation ด้วย Zod ทุก endpoint

@AGENTS.md
