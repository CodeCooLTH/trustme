# Deployment Prep — Vercel + Supabase (portable to AWS)

**Date:** 2026-04-17
**Goal:** ทำให้โปรเจค deploy Vercel + Supabase ได้ โดยยังรัน local (Docker) ได้ปกติ และย้าย cloud (AWS/R2/อื่นๆ) ในอนาคตได้โดยไม่แก้โค้ด
**Constraint:** ห้ามล็อค vendor — ใช้ S3-compatible API สำหรับ object storage

---

## 1. Architecture Decisions

| Concern | Local (Docker) | Production (Vercel) | Future (AWS) |
|---------|---------------|---------------------|--------------|
| Database | Postgres 16 (docker-compose) | Supabase pooled | RDS / Aurora |
| DB migration | `prisma migrate dev` | `prisma migrate deploy` | Same |
| Object storage | filesystem (`uploads/`) | Supabase Storage S3 endpoint | AWS S3 |
| Storage driver | `STORAGE_DRIVER=local` | `STORAGE_DRIVER=s3` | `STORAGE_DRIVER=s3` |
| Auth | NextAuth (Facebook + OTP) | Same | Same |
| Subdomain | `*.deepth.local` via `/etc/hosts` | `*.safepay.co` via DNS | Same |

**Key abstraction:** `src/lib/storage/` — 1 interface, 2 drivers (local filesystem + S3-compatible). Production chooses driver via `STORAGE_DRIVER` env.

---

## 2. Phased Rollout

### Phase 1 — Storage Abstraction (Code)

Touch: `src/lib/` only. No deploy yet. Goal: ระบบทำงานได้เหมือนเดิมด้วย driver ใหม่

**Files to create:**
- `src/lib/storage/types.ts` — `Storage` interface (`saveFile`, `getFileUrl`, `deleteFile`)
- `src/lib/storage/local.ts` — filesystem driver (ย้ายจาก upload.ts)
- `src/lib/storage/s3.ts` — S3-compatible driver (AWS SDK)
- `src/lib/storage/index.ts` — factory ตาม `STORAGE_DRIVER`

**Files to modify:**
- `src/lib/upload.ts` — re-export จาก `@/lib/storage` (keep BC) หรือลบทิ้ง + update callers
- `src/app/api/upload/route.ts` — import path
- `src/app/api/files/[fileId]/route.ts` — import path

**Deps to install:**
- `@aws-sdk/client-s3`
- `@aws-sdk/s3-request-presigner`

**Interface signature:**
```ts
export interface Storage {
  saveFile(file: File): Promise<string>           // returns fileId
  getFile(fileId: string): Promise<{ buffer: Buffer; ext: string } | null>  // local path
  getFileUrl(fileId: string, opts?: { signed?: boolean; expiresIn?: number }): Promise<string>
  deleteFile(fileId: string): Promise<void>
}
```

**Verify Phase 1:**
- [ ] `npm run build` ผ่าน
- [ ] `STORAGE_DRIVER=local` upload file → ไฟล์ยังไปอยู่ `uploads/` ตามเดิม
- [ ] `STORAGE_DRIVER=local` download file → ยังได้ bytes ถูกต้อง
- [ ] No regression ใน 2 API routes

### Phase 2 — Env & Schema (Config)

**Files to modify:**
- `.env.example` — เพิ่มทุก var (listed ใน §4)
- `.env` (local dev) — เพิ่ม `STORAGE_DRIVER=local`
- `prisma/schema.prisma` — เพิ่ม `directUrl`:
  ```prisma
  datasource db {
    provider  = "postgresql"
    url       = env("DATABASE_URL")
    directUrl = env("DIRECT_URL")
  }
  ```
- `CLAUDE.md` — อัปเดตส่วน Tech Stack + Deployment notes

**Verify Phase 2:**
- [ ] `prisma generate` ผ่าน
- [ ] `prisma migrate dev` ใน local ยังทำงาน (directUrl ไม่ set ก็ fallback ไป url)
- [ ] ดอคคอนเทนเนอร์ postgres start ปกติ

### Phase 3 — Docker Compose (Optional — MinIO)

**Decision point:** ต้องการ local parity กับ S3 flow มั้ย?
- **No (แนะนำ):** Phase นี้ skip ใช้ `STORAGE_DRIVER=local` ตลอดการ dev
- **Yes:** เพิ่ม MinIO service

**Files to modify (ถ้าเอา MinIO):**
- `docker-compose.yml` — เพิ่ม service `minio` + volume `miniodata`
- สร้าง `scripts/create-minio-bucket.sh` (init bucket บน `docker compose up`)
- `.env.local.example` — ตัวอย่าง env สำหรับ `STORAGE_DRIVER=s3` ที่ชี้ MinIO

**Verify Phase 3:**
- [ ] `docker compose up -d` → MinIO console เปิดที่ `localhost:9001`
- [ ] App upload file → ปรากฏใน MinIO bucket
- [ ] Download via signed URL → ได้ bytes

### Phase 4 — Supabase Setup (Cloud infra)

**ผู้ใช้ทำบน Supabase Dashboard (ไม่ใช่ code):**
- [ ] สร้างโปรเจคใหม่
- [ ] จด connection strings (pooler 6543 + direct 5432)
- [ ] **Storage → Create bucket `uploads`** (public read ถ้าจำเป็น หรือ private + signed URL)
- [ ] **Storage → Settings → S3 connections** — เปิด S3 endpoint + สร้าง access key
- [ ] RLS policy สำหรับ `storage.objects` (อนุญาต service role ทำทุกอย่าง)
- [ ] รัน `prisma migrate deploy` ยิงไปที่ Supabase จาก local (ใช้ `DIRECT_URL`)

**Output:** ได้ 6 ค่า — `DATABASE_URL`, `DIRECT_URL`, `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`

### Phase 5 — OAuth Production Setup

**Facebook app:**
- [ ] เพิ่ม production redirect URI: `https://safepay.co/api/auth/callback/facebook`
- [ ] ถ้าใช้ seller subdomain แยก login: เพิ่ม `https://seller.safepay.co/api/auth/callback/facebook`
- [ ] App Review ถ้าต้องการ public rollout

**Google app (ถ้าใช้):**
- [ ] Authorized redirect URIs: `https://safepay.co/api/auth/callback/google`
- [ ] Authorized JavaScript origins: `https://safepay.co`, `https://seller.safepay.co`, `https://admin.safepay.co`

### Phase 6 — Vercel Project Setup

**บน Vercel Dashboard:**
- [ ] Import repo `CodeCooLTH/trustme` (branch main)
- [ ] Framework preset: Next.js (auto)
- [ ] Root directory: `./`
- [ ] Build command: `prisma generate && next build`
  (postinstall hook อาจไม่รันบน Vercel)
- [ ] Install command: `npm install`
- [ ] Node version: 20.x
- [ ] Region: Singapore (sin1)
- [ ] Environment Variables: ใส่ทั้งหมดตาม §4 production column
- [ ] **Settings → Domains:**
  - เพิ่ม `safepay.co`
  - เพิ่ม `seller.safepay.co`
  - เพิ่ม `admin.safepay.co`
  - (หรือ `*.safepay.co` wildcard — ต้องซื้อ Pro plan)

**DNS ที่ registrar:**
- [ ] `safepay.co` A record → `76.76.21.21` (Vercel)
- [ ] `seller.safepay.co` CNAME → `cname.vercel-dns.com`
- [ ] `admin.safepay.co` CNAME → `cname.vercel-dns.com`
- [ ] (ถ้า wildcard) `*.safepay.co` CNAME → `cname.vercel-dns.com`

### Phase 7 — Deploy & Smoke Test

- [ ] Push main → Vercel trigger build
- [ ] Build สำเร็จ
- [ ] เข้า `https://safepay.co/` → เห็น landing Vuexy + Thai + Anuphan
- [ ] เข้า `https://seller.safepay.co/` → redirect ไป `/auth/sign-in` (paces)
- [ ] Facebook OAuth login → สำเร็จ, session cookie เซ็ตที่ subdomain ถูกต้อง
- [ ] Upload file ผ่าน API → ไปอยู่ใน Supabase Storage (เช็ค dashboard)
- [ ] Download file ผ่าน signed URL → ได้ bytes
- [ ] Logout → session หายเฉพาะ subdomain ที่ login

### Phase 8 — Post-deploy Hardening

- [ ] ตั้ง Vercel Analytics / Speed Insights
- [ ] ตรวจ Prisma connection pool stats (Supabase dashboard)
- [ ] เปิด Sentry/log drain (optional)
- [ ] Backup strategy: Supabase auto-backup (paid plan) หรือ pg_dump cron
- [ ] Review bundle size: `next build` output — ถ้า marketing บวม ให้เช็คการ tree-shake MUI

---

## 3. Future migration: AWS S3 (หรือ cloud อื่น)

วันที่ต้องย้ายจาก Supabase → AWS S3:
1. สร้าง bucket บน AWS + IAM user
2. บน Vercel env: เปลี่ยน
   - `S3_ENDPOINT=""` (empty = AWS default)
   - `S3_REGION="ap-southeast-1"`
   - `S3_FORCE_PATH_STYLE="false"`
   - `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` (จาก IAM)
3. Migrate ไฟล์เก่า: `aws s3 sync` จาก Supabase → S3
4. Redeploy — **ไม่ต้องแก้โค้ด**

ย้าย Cloudflare R2 / DigitalOcean Spaces — logic เดียวกัน แค่ endpoint กับ access key ต่างกัน

---

## 4. Environment Variables Reference

| Variable | Local (Docker) | Production (Vercel+Supabase) | Future (AWS) |
|----------|---------------|------------------------------|--------------|
| `DATABASE_URL` | `postgresql://safepay:safepay@localhost:5432/safepay` | Supabase pooler (port 6543, `pgbouncer=true&connection_limit=1`) | RDS cluster endpoint |
| `DIRECT_URL` | (เหมือน DATABASE_URL ก็ได้) | Supabase direct (port 5432) | RDS primary |
| `NEXTAUTH_SECRET` | dev value | `openssl rand -base64 32` | Same |
| `NEXTAUTH_URL` | `http://localhost:3000` | `https://safepay.co` | Same |
| `FACEBOOK_ID` / `_SECRET` | dev app | prod app | Same |
| `GOOGLE_CLIENT_ID` / `_SECRET` | dev app | prod app | Same |
| `STORAGE_DRIVER` | `local` | `s3` | `s3` |
| `S3_ENDPOINT` | — (หรือ MinIO: `http://localhost:9000`) | `https://xxx.supabase.co/storage/v1/s3` | (empty — AWS default) |
| `S3_REGION` | `auto` (MinIO) | `ap-southeast-1` (ตามโปรเจค) | `ap-southeast-1` |
| `S3_BUCKET` | `uploads` | `uploads` | `safepay-uploads` |
| `S3_ACCESS_KEY_ID` | MinIO root / — | Supabase S3 access key | IAM user access key |
| `S3_SECRET_ACCESS_KEY` | MinIO secret / — | Supabase S3 secret | IAM secret |
| `S3_FORCE_PATH_STYLE` | `true` | `true` | `false` |
| `S3_PUBLIC_URL` | (optional) | `https://xxx.supabase.co/storage/v1/object/public/uploads` | CloudFront distribution |
| `API_URL` | `http://localhost:3000` | `https://safepay.co` | Same |
| `NEXT_PUBLIC_SELLER_URL` | `http://seller.deepth.local:4000` | `https://seller.safepay.co` | Same |

---

## 5. Files Created / Modified Summary

**Create:**
- `src/lib/storage/types.ts`
- `src/lib/storage/local.ts`
- `src/lib/storage/s3.ts`
- `src/lib/storage/index.ts`
- `docs/superpowers/plans/2026-04-17-deployment-prep.md` (this file)

**Modify:**
- `src/lib/upload.ts` (thin re-export or remove)
- `src/app/api/upload/route.ts` (import path)
- `src/app/api/files/[fileId]/route.ts` (import path)
- `prisma/schema.prisma` (add directUrl)
- `.env.example` (full env schema)
- `.env` (your local — not committed)
- `CLAUDE.md` (deployment notes)
- `docker-compose.yml` (optional: +MinIO)
- `package.json` (+2 AWS SDK deps)

**Vendor files (no change):** `src/@core/`, `src/@layouts/`, `src/views/`, `theme/`

---

## 6. Risk Register

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Prisma serverless connection exhaustion | High | Use pooler URL + `connection_limit=1` + Prisma singleton |
| NextAuth session cookie scope wrong ข้าม subdomain | Medium | ตั้ง `cookies.options.domain` หรือเก็บแยก subdomain (current behavior) |
| OAuth callback URL mismatch | Medium | Deploy staging domain ก่อน, เพิ่ม URL ใน OAuth app dashboard |
| Build fails on Vercel (prisma generate) | Medium | Override build command เป็น `prisma generate && next build` |
| Vuexy bundle เกิน Vercel serverless limit (250MB) | Low | Bundle size check หลัง build |
| Subdomain middleware ไม่ทำงาน prod | Low | Test `/api/health` ที่แต่ละ subdomain |

---

## 7. Pre-flight Commands (ก่อน Phase 7 deploy)

```bash
# Local build ผ่านมั้ย
npm run build

# Migrate Supabase (ครั้งแรก)
DATABASE_URL="<direct-url>" DIRECT_URL="<direct-url>" \
  npx prisma migrate deploy

# Test S3 driver ผ่าน local ด้วย prod env (dry run)
STORAGE_DRIVER=s3 S3_ENDPOINT="<supabase>" ... \
  npm run dev
# แล้วลอง upload ผ่าน API → เช็ค Supabase Storage dashboard

# Push ไป trustme (auto-deploy Vercel หลังเชื่อม)
git push trustme main
```

---

## 8. Rollback plan

- **Storage bug:** ตั้ง `STORAGE_DRIVER=local` → fallback local fs (แต่ Vercel read-only อ่านเก่าไม่ได้, ต้อง revert code)
- **Schema bug:** `prisma migrate resolve --rolled-back <migration-name>` + revert code
- **Vercel deploy fail:** rollback deployment ผ่าน Vercel dashboard (preserves prev working version)
- **DNS ผิด:** Cloudflare/registrar TTL สั้นไว้ก่อน (60s) ระหว่าง cutover

---

## 9. Timeline Estimate

- Phase 1 (storage abstraction): 45 นาที
- Phase 2 (env + schema): 15 นาที
- Phase 3 (docker MinIO, optional): 30 นาที
- Phase 4 (Supabase setup manual): 20 นาที
- Phase 5 (OAuth): 15 นาที
- Phase 6 (Vercel + DNS): 30 นาที
- Phase 7 (deploy + smoke): 30 นาที
- Phase 8 (hardening): 1 ชม+

**Critical path (minimal):** Phases 1, 2, 4, 5, 6, 7 — ~2.5 ชม ถ้า DNS propagate ทัน
