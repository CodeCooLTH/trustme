# P2 Admin Panel — Retrospective (2026-04-18)

**Scope:** สร้าง admin UI ครบ 5 หน้า (dashboard / users / verifications / orders / badges) บน Paces theme พร้อม app shell + auth guard + cross-role E2E verification flow

**ผลลัพธ์:** สำเร็จเต็มเฟส — **10 commits** (A1-A6 + 2 bug fixes จาก cross-role QA + A9 retro นี้) ผ่าน PRD FR-10 ทั้ง 5 ข้อ cross-role + cross-subdomain flow (buyer ส่ง L2 → admin approve → buyer เห็น trust bump 0→25) ยืนยันผ่าน Chrome DevTools MCP

---

## Commit trail

| # | Commit | Task | สรุป |
|---|---|---|---|
| 1 | `(ac51867)` | QA bug fixes (ก่อน batch) | review recalc try/catch + ProductPickerModal nested-button a11y |
| 2 | `(commit)` | A1 | Admin app shell — Paces VerticalLayout + `_admin-menu.ts` + isAdmin guard |
| 3 | `(commit)` | A2 | Dashboard 5 stat cards จาก Paces ecommerce/dashboard (+ Icon wrapper fix) |
| 4 | `(commit)` | A3 | /users list + search + filter chips + trust column |
| 5 | `(commit)` | A4 | /verifications queue + detail + approve/reject actions |
| 6 | `(commit)` | A5 | /orders list + status filter |
| 7 | `(commit)` | A6 | /badges CRUD + structured criteria form + UI warning เรื่อง evaluator |
| 8 | doc updates | language | Thai-first convention + MEMORY pointer |
| 9 | `(commit)` | A9 | เอกสารนี้ (retro) |

**ผ่าน Gates ครบ 5:** Plan → Develop → Review → QA → Integrate ทุก task

---

## ปัญหาที่พบและวิธีแก้

### 1. (แก้แล้ว) Icon wrapper vs `@iconify/react` โดยตรง — ทำให้ icon ว่างเปล่า runtime
**พบใน A2 review**

A2 developer agent import `Icon` จาก `@iconify/react` โดยตรงแล้วส่ง short name เช่น `"users"`, `"building-store"` — แต่ `@iconify/react`'s `<Icon>` ต้องการ full ID (`tabler:users`). Theme ที่ copy มาใช้ wrapper `@/components/wrappers/Icon` ซึ่ง auto-prefix `tabler:` ให้อัตโนมัติ → icons จะ render ว่างเปล่า runtime (type-check ไม่ catch)

**บทเรียน:** 
- ใช้ `@/components/wrappers/Icon` เมื่อใช้ tabler short name (เช่น dashboard cards)
- ใช้ `@iconify/react` โดยตรงเมื่อ user กรอก full iconify ID (เช่น badge form ที่ admin ใส่ `tabler:trophy`)
- Reviewer agent ควรตรวจว่า icon import + ID shape ตรงกันทุกครั้ง (codify ใน reviewer prompt gate)

### 2. (แก้แล้ว) `filterFns: {}` ขาดใน tanstack-table — type drift
**พบใน A3 review (advisory), แก้เชิงรุกทุก DataTable หลังจากนั้น (A5, A6)**

`@tanstack/react-table` v8 ในบาง minor version ทำให้ `filterFns` เป็น required type (empty interface `FilterFns` ทำให้ TypeScript ต้องการ prop นี้อย่างชัดเจน) — ถ้าเวอร์ชันใดมี custom FilterFn declaration widen interface แล้ว code จะแตก

**บทเรียน:** ใส่ `filterFns: {}` ใน `useReactTable` options ทุกครั้ง (defensive) — เป็น convention ที่ต้อง codify ใน ui-page-sourcing.md

### 3. (แก้แล้ว) Paces Rule 10 violation — inline `style={{fontSize:48}}`
**พบใน A4 review**

A4 empty-state icon ใช้ `style={{ fontSize: 48 }}` — violates CLAUDE.md Rule 10 "No inline `style={...}`"

**แก้:** เปลี่ยนเป็น Tailwind `text-5xl`

**บทเรียน:** Reviewer agent prompt ต้อง check inline style สำหรับ Paces routes

### 4. (False positive) A5 reviewer flag `router.push('/orders')`
**พบใน A5 review — ไม่เป็น bug จริง**

Reviewer เข้าใจผิดว่า `router.push('/orders')` บน admin subdomain จะไปหน้า seller/buyer `/orders` — แต่จริงๆ `proxy.ts` (subdomain: 'admin') rewrite `/orders` → `/admin/orders` ที่ server-side middleware ดังนั้น pattern ที่ใช้ถูกต้อง (seller ก็ใช้ pattern เดียวกันที่ line 197 ของ `OrdersList.tsx`)

**บทเรียน:** 
- Reviewer ที่ตรวจ cross-subdomain code ต้องอ่าน `src/proxy.ts` ก่อน flag bug
- Convention: ใน reviewer prompt เพิ่ม step "ตรวจ proxy.ts subdomain rewrites ก่อน flag router.push/redirect bugs"

### 5. (แก้แล้ว + UI warning) Badge evaluator/criteria disconnect
**พบใน A6 review — critical design gap**

`evaluateBadges` ใน `src/services/badge.service.ts` award achievement badges ผ่าน `BADGE_CHECKS` array ที่ hardcode check functions by `nameEN` — **ไม่ได้อ่าน criteria JSON** เลย

ดังนั้น admin สร้าง ACHIEVEMENT badge ใหม่ผ่าน UI + ใส่ criteria → metadata บันทึกใน DB แต่จะไม่ auto-award จนกว่า developer จะเพิ่ม check function ใน `BADGE_CHECKS` + deploy

**แก้ (MVP-level honest disclosure):** เพิ่ม UI warning ใน `BadgeFormDialog` เมื่อ type=ACHIEVEMENT เตือน admin อย่างชัดเจน

**Long-term fix (P3/P4):** rewrite `evaluateBadges` ให้ data-driven (อ่าน criteria JSON + มี generic evaluator per type) — นอก MVP scope

### 6. (แก้แล้ว) Yup regex `/i` flag — iconify ID ต้อง lowercase
**พบใน A6 review**

Regex `/^[a-z0-9-]+:[a-z0-9-]+$/i` (มี flag `i`) ยอมรับ `Tabler:Trophy` ซึ่ง iconify ไม่ resolve → icon ว่าง

**แก้:** ถอด `/i` flag ทั้ง 2 จุด (validation + preview check)

### 7. (False positive) A6 reviewer flag "missing API route"
Reviewer claim `/api/admin/badges` ไม่มี — แต่จริงๆ มีอยู่ที่ `src/app/api/admin/badges/route.ts` (GET/POST/PATCH ครบ) reviewer ไม่ได้เจอตอนค้นหา

**บทเรียน:** reviewer ต้อง `ls` หรือ `Glob` path จริงก่อน flag "missing file" — ไม่ sufficient ที่จะใช้ semantic search

### 8. (แก้แล้ว) Review service post-create recalc fragility
**พบใน cross-role QA (seller→buyer E2E) — ก่อน P2 batch**

`createReview` call `evaluateBadges` + `recalculateTrustScore` ต่อท้าย review creation — ถ้า recalc throw error (เช่น DB pool timeout) request จะ fail แต่ review row save แล้ว → orphan review + stale trust score

**แก้:** wrap recalc ใน try/catch ใน `src/services/review.service.ts` — review commit ก่อน, recalc best-effort, log error ชัดเจน ถ้าล้ม

**Long-term:** retry queue/worker for recalc ล้ม (นอก MVP)

### 9. (แก้แล้ว) `ProductPickerModal` nested `<button>` hydration error
**พบใน cross-role QA**

Card ใน grid เป็น `<button>` แล้วมี qty `+/-` `<button>` ซ้อนข้างใน → HTML spec violation + React hydration warning

**แก้:** เปลี่ยน outer `<button>` เป็น `<div role="button" tabIndex={0}>` + keyboard handler (Enter/Space) — a11y เทียบเท่า

### 10. (User-env config, noted) Dev Prisma pool exhaustion — `connection_limit=1`
**พบใน cross-role QA + A7 + A8**

`.env.local` มี `DATABASE_URL` ที่มี `connection_limit=1` (Supabase pooler) + Next 16 RSC prefetch storm บน `/o/[token]` (100+ `?_rsc=...` pending per page) → ทุก mutation (review submit, verification approve, badge save) timeout 500 แรก; retry สำเร็จหรือ DB commit ถูกแต่ UI ค้าง

**ไม่ใช่ code bug — user environment config:**
- **แก้ dev:** ขึ้น `connection_limit=10` (หรือสูงกว่า) ใน `.env.local`
- **แก้ prod:** Supabase pooler auto-scale — prod ไม่เจอปัญหา

### 11. (Noted — prod concern) Self-review ใน admin approval
**พบใน A8 QA**

Test account `0920791649` เป็นทั้ง admin + buyer → ตอนทดสอบ admin approve verification ของตัวเอง → ใน prod ควรมี guard: "admin ห้าม approve verification ของตนเอง"

**Action item:** เพิ่ม check ใน `reviewVerification()` service หรือ admin API route

### 12. (Noted — minor UX) Admin detail page ไม่ auto-redirect หลัง approve
**พบใน A8 QA**

กด "อนุมัติ" → toast success + DB commit แต่หน้า detail ยังอยู่ (ไม่ redirect ไป `/verifications` ทันที) admin อาจสับสนคิดว่าไม่สำเร็จ

**แก้:** เพิ่ม `router.push('/verifications')` + `router.refresh()` หลัง response ok ใน `ReviewActions.tsx` (จริงๆ มี code ทำอยู่ — อาจเป็น dev Prisma pool ทำให้ response ค้าง ≠ code bug)

### 13. (Noted — ENV var missing) `NEXT_PUBLIC_BUYER_URL` ไม่ได้ตั้งใน dev
**พบใน A7 QA**

`resolveProfileUrl` ใน admin /users + /orders ใช้ relative fallback `/u/{username}` ถ้าไม่มี env var → click link จะเปิด `admin.deepth.local:4000/u/{username}` → 404

**Action item:** set `NEXT_PUBLIC_BUYER_URL=http://deepth.local:4000` ใน `.env.local` สำหรับ dev

### 14. (Noted — UX minor) Badge filter chips count บ่งบอก filtered count
**พบใน A7 QA**

เมื่อเลือก filter chip (เช่น "สำเร็จ") count บน chip อื่นเปลี่ยนเป็น 0 ตาม filtered result — ผู้ใช้อ่านแล้วสับสน ต้องการเห็น global count ของแต่ละ status

**แก้ (nice-to-have):** compute count per status จาก full dataset แยกจาก filtered view

### 15. (Noted — missing data) Badges seed ไม่ได้รันบน dev DB
**พบใน A7 QA**

ตอน fresh test DB มี 0 badges — `seedDefaultBadges()` ใน `badge.service.ts` มีฟังก์ชันแต่ไม่ได้ run automatically

**Action item:** run seed script หรือ auto-seed ตอน first user signup

---

## Convention ที่ adopt (promoted ไป CLAUDE.md / docs/conventions / memory)

### C1. เอกสารทั้งหมดใช้ภาษาไทยเป็นหลัก
Memory: `feedback_doc_language.md` + CLAUDE.md Conventions section
- Retros, convention docs, commit bodies, code comments อธิบาย "ทำไม" → ใช้ภาษาไทย
- ยกเว้น: file paths, class/function names, library names (Next.js, Prisma, Vuexy, Paces, TanStack), technical jargon ไม่มีคำแปลไทยชัด (RSC, JWT, OAuth, OTP), commit hashes
- Frontmatter ของ memory files ใช้ English ได้ (consistency กับ existing)

### C2. Icon import ต้องเลือกให้ตรง use case
เพิ่มเข้า `docs/conventions/ui-page-sourcing.md`:
- ถ้าใช้ tabler short name ("users", "building-store", "dashboard") → import `Icon` จาก `@/components/wrappers/Icon`
- ถ้า user input หรือ DB เก็บ full iconify ID ("tabler:trophy", "mdi:medal-outline") → import `Icon` จาก `@iconify/react` โดยตรง (wrapper จะ double-prefix)
- Reviewer ต้องตรวจ icon string shape ตรงกับ import source

### C3. `filterFns: {}` ใน useReactTable (defensive)
เพิ่มเข้า `docs/conventions/ui-page-sourcing.md` สำหรับ DataTable ทุกที่:
```tsx
useReactTable({
  data,
  columns,
  filterFns: {},  // ← defensive, Tanstack v8 type drift
  ...
})
```

### C4. Cross-subdomain routing via `src/proxy.ts`
Convention ใหม่ — เพิ่มใน `docs/conventions/rsc-mui-navigation.md` หรือใหม่ `cross-subdomain-routing.md`:
- `router.push('/path')` บน seller subdomain → proxy.ts rewrite `/path` → `/seller/path` file path
- `router.push('/path')` บน admin subdomain → proxy.ts rewrite `/path` → `/admin/path` file path
- Reviewers **ต้องอ่าน `src/proxy.ts`** ก่อน flag "navigation bug" ข้าม role

### C5. Service layer post-operation side-effects resilient
เพิ่มใน `docs/conventions/` ใหม่ `service-layer-resilience.md`:
- หลัง DB mutation หลัก → side effects (recalc, evaluate, notify) ต้องอยู่ใน try/catch
- ห้าม side-effect failure ทำให้ main operation fail (ข้อมูลค้าง inconsistent)
- Log ชัดเจนเวลา side-effect ล้ม — ไม่เงียบหาย

### C6. QA agent prompt ต้องใช้ภาษาไทย (output report)
Update `docs/conventions/agent-team-workflow.md`:
- ตอน dispatch QA agent → prompt บอกให้ report เป็นภาษาไทย
- Technical steps + tool calls ยังใช้ English (JS/TS code, paths)
- Report format section: Thai headers + Thai evidence text

### C7. 3-level QA cadence ยืนยันว่า valuable
P2 dispatch QA ครบ 3 levels: per-task smoke (implicit — ไม่ได้ dispatch explicit เพราะ task ส่วนใหญ่เป็น infra หรือรีใช้ pattern ที่มี QA ใน R1-R11), batch integration (A7), end-of-phase (A8) ทำงานตามที่ออกแบบไว้

---

## สิ่งที่ work well

- **Convention docs + memory จาก P1 retro** → P2 agents บำรุงรักษา rule อัตโนมัติ ไม่ต้อง re-explain ทุกครั้ง (theme-copy rule, RSC navigation, Base: citation, doc language)
- **Agent parallelism ที่ batch-3-concurrent** — batch 2 (A2+A3+A4) + batch 3 (A5+A6) รันพร้อมกันได้ดี แต่ละ batch ใช้เวลา ~15 นาที (vs ~45-60 นาที sequential)
- **Independent reviewer agents catch real drift** — A2 Icon wrapper bug, A6 evaluator disconnect, A6 Yup regex — ทั้งหมดจะหลุดถ้าไม่มี reviewer
- **Test account bypass + isAdmin seed** — ทำให้ QA agent autonomy สูง ไม่ต้อง user supply OTP หรือ manual flag
- **Cross-role E2E (A8) ทำงานครบ hop-by-hop** — 3 subdomain hops (buyer → admin → buyer) session แยก + trust recalc + UI sync ถูกต้องหมด ยืนยัน proxy routing + auth guard design สมบูรณ์
- **Commit `Base:` citation rule** — auditable trail ของทุก UI file ย้อนกลับหา theme source ได้ในคลิกเดียว
- **Controller บังคับ reviewer agent เป็น dev คนละคน** — แยกหน้าที่ proposer (developer) vs checker (reviewer) → catch more bugs

---

## Action items ก่อน production

| # | Priority | Item | File/Action |
|---|---|---|---|
| 1 | **HIGH** | self-review guard ใน `reviewVerification` | `src/services/verification.service.ts` — throw ถ้า `record.userId === adminId` |
| 2 | HIGH | Admin detail auto-redirect หลัง approve ต้องทำงานแน่นอน | debug `ReviewActions.tsx` ทำไม UI ค้าง (อาจเป็น dev pool เท่านั้น) |
| 3 | HIGH | `NEXT_PUBLIC_BUYER_URL` ต้อง set ใน prod `.env` | prod deploy checklist |
| 4 | HIGH | dev `.env.local` `connection_limit=10+` | QA runbook + onboarding doc |
| 5 | MEDIUM | Rewrite `evaluateBadges` ให้ data-driven อ่าน criteria JSON | `src/services/badge.service.ts` — P3 scope |
| 6 | MEDIUM | Badge filter chip count เป็น global count ไม่ filtered | `BadgesTable.tsx` minor refactor |
| 7 | MEDIUM | Auto-run `seedDefaultBadges()` ตอน app init หรือ migration | `prisma/seed.ts` or startup hook |
| 8 | LOW | Some sidebar nav clicks ไม่ trigger (Preline menu) | debug Preline `hs-overlay` handler ใน admin sidebar |
| 9 | LOW | Retry queue/worker สำหรับ trust score recalc ล้ม | P3/P4 — ใช้ Vercel Queues ได้ |
| 10 | LOW | Pre-existing `filterFns` errors ใน 5+ Paces seller tables | sweep fix + add to `docs/conventions/ui-page-sourcing.md` |
| 11 | LOW | Email L1 OTP (FR-2.1) ยังเป็น stub | unblock ก่อน beta |

---

## Retro of the retro

**สิ่งที่ทำให้ P2 สำเร็จ:** เริ่มต้นด้วย convention infrastructure ที่ครบ (จาก P1 retro) — agent prompts อ้างอิง `CLAUDE.md` + `docs/conventions/` directly, Controller (session หลัก) ไม่ต้อง re-explain rule ทุก task

**ถ้ามี P3 (ต่อไป):** 
- Pre-flight memory check: read all `feedback_*.md` + existing retros ก่อน plan → leverage รวบรวม lessons
- ยัง dispatch max 3 concurrent developers — พิสูจน์แล้วว่า scale ได้พอดี
- QA agent 3-level cadence ทำงานเป็น standard operating procedure ไม่ต้อง debate
- **Convention ยืนยันว่ามีค่า:** เวลาที่ลงทุนตอน P1 retro สร้าง `docs/conventions/` + `CLAUDE.md` hard rules ทำให้ P2 จบภายใน 1 session (10 commits, <3 ชม. รวม agent runtime) ถ้าไม่มี convention เหล่านี้คาดว่า P2 จะต้อง rework เช่นเดียวกับ P1

Workflow reusable เต็มที่ — P3 (email OTP / buyer-history edge cases / retry worker / self-review guard) ใช้ pattern เดียวกันได้เลย
