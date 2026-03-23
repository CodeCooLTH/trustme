# SafePay — Product Requirements Document (PRD)

**เวอร์ชัน:** 1.0
**วันที่:** 23 มีนาคม 2569
**ผู้จัดทำ:** SafePay Team
**BRD อ้างอิง:** `docs/BRD.md`

---

## 1. ภาพรวมผลิตภัณฑ์ (Product Overview)

SafePay เป็นเว็บแอปพลิเคชันสำหรับการซื้อขายออนไลน์ที่มีระบบ Escrow (ตัวกลางพักเงิน) ผู้ขายสร้างดีลแล้วส่งลิงก์ให้ผู้ซื้อ ผู้ซื้อโอนเงินมาที่ SafePay ระบบจะพักเงินไว้จนกว่าผู้ซื้อจะยืนยันรับสินค้า แล้วจึงปล่อยเงินให้ผู้ขาย

### 1.1 Vision Statement

> "ทำให้การซื้อขายออนไลน์ระหว่างบุคคลปลอดภัยและเชื่อถือได้ ทุกดีลมีตัวกลางค้ำประกัน"

### 1.2 Target Users

| กลุ่ม | คำอธิบาย | Pain Point |
|-------|---------|-----------|
| **ผู้ซื้อ (Buyer)** | คนที่ต้องการซื้อสินค้าจากโซเชียลมีเดีย | กลัวโดนโกง, โอนเงินแล้วไม่ได้ของ |
| **ผู้ขาย (Seller)** | คนที่ขายของออนไลน์ผ่าน Facebook, IG | ต้องการให้ลูกค้ามั่นใจ, ลดการเจรจาเรื่องความเชื่อมั่น |
| **แอดมิน (Admin)** | ทีมดูแลระบบ SafePay | ต้องตรวจสลิป, แก้ปัญหาข้อพิพาท |

---

## 2. User Stories

### 2.1 ผู้ขาย (Seller)

| ID | User Story | Priority | Acceptance Criteria |
|----|-----------|----------|-------------------|
| S-1 | ในฐานะผู้ขาย ฉันต้องการสมัครสมาชิกด้วย Facebook | Must | สมัครผ่าน FB ได้, เลือก role เป็น Seller |
| S-2 | ในฐานะผู้ขาย ฉันต้องการเพิ่มบัญชีธนาคารของตัวเอง | Must | กรอกชื่อธนาคาร, เลขบัญชี, ชื่อบัญชี |
| S-3 | ในฐานะผู้ขาย ฉันต้องการสร้างดีล | Must | กรอกชื่อสินค้า, รายละเอียด, ราคา, รูป, เลือกขนส่ง |
| S-4 | ในฐานะผู้ขาย ฉันต้องการเผยแพร่ดีล | Must | เปลี่ยน DRAFT → ACTIVE |
| S-5 | ในฐานะผู้ขาย ฉันต้องการสร้างลิงก์สั่งซื้อส่งให้ผู้ซื้อ | Must | ระบบสร้าง URL unique, คัดลอกได้ |
| S-6 | ในฐานะผู้ขาย ฉันต้องการเห็นเมื่อผู้ซื้อชำระเงินแล้ว | Must | แจ้งเตือน in-app เมื่อ admin อนุมัติสลิป |
| S-7 | ในฐานะผู้ขาย ฉันต้องการใส่เลข tracking | Must | กรอก tracking number + เลือกขนส่ง |
| S-8 | ในฐานะผู้ขาย ฉันต้องการเห็นสถานะทุกออเดอร์ | Must | Dashboard แสดงรายการ + filter ตามสถานะ |
| S-9 | ในฐานะผู้ขาย ฉันต้องการเปิดข้อพิพาทได้ | Should | เปิดได้เมื่อสถานะ DELIVERED |
| S-10 | ในฐานะผู้ขาย ฉันต้องการเห็น points ความน่าเชื่อถือ | Should | แสดง points ในโปรไฟล์ |
| S-11 | ในฐานะผู้ขาย ฉันต้องการปิดดีลได้ | Should | เปลี่ยน ACTIVE → CLOSED (ไม่มี active orders) |

### 2.2 ผู้ซื้อ (Buyer)

| ID | User Story | Priority | Acceptance Criteria |
|----|-----------|----------|-------------------|
| B-1 | ในฐานะผู้ซื้อ ฉันต้องการเปิดลิงก์สั่งซื้อโดยไม่ต้อง login | Must | เห็นข้อมูลสินค้า, ราคา, ผู้ขาย |
| B-2 | ในฐานะผู้ซื้อ ฉันต้องการ login ก่อนชำระเงิน | Must | Redirect ไป Facebook login |
| B-3 | ในฐานะผู้ซื้อ ฉันต้องการเห็นบัญชีรับเงินอย่างชัดเจน | Must | แสดงธนาคาร, เลขบัญชี, ชื่อบัญชีของ SafePay |
| B-4 | ในฐานะผู้ซื้อ ฉันต้องการอัพโหลดสลิปโอนเงิน | Must | อัพโหลดรูป, รองรับ camera capture บนมือถือ |
| B-5 | ในฐานะผู้ซื้อ ฉันต้องการติดตามสถานะออเดอร์ | Must | เห็น timeline: ชำระเงิน → ตรวจสลิป → จัดส่ง → ส่งถึง |
| B-6 | ในฐานะผู้ซื้อ ฉันต้องการกดยืนยันรับสินค้า | Must | กดปุ่มยืนยัน + อัพโหลดรูปหลักฐาน |
| B-7 | ในฐานะผู้ซื้อ ฉันต้องการเปิดข้อพิพาทถ้าสินค้ามีปัญหา | Must | เปิดได้เมื่อสถานะ DELIVERED, แนบหลักฐาน |
| B-8 | ในฐานะผู้ซื้อ ฉันต้องการใช้งานบนมือถือได้สะดวก | Must | Responsive, mobile-first, ปุ่มใหญ่, camera capture |
| B-9 | ในฐานะผู้ซื้อ ฉันต้องการได้รับแจ้งเตือนเมื่อสถานะเปลี่ยน | Should | In-app notification |
| B-10 | ในฐานะผู้ซื้อ ฉันต้องการเห็น points ผู้ขาย | Should | แสดงบนหน้า order link |

### 2.3 แอดมิน (Admin)

| ID | User Story | Priority | Acceptance Criteria |
|----|-----------|----------|-------------------|
| A-1 | ในฐานะแอดมิน ฉันต้องการเห็น dashboard สถิติ | Must | แสดง total deals, GMV, success rate |
| A-2 | ในฐานะแอดมิน ฉันต้องการตรวจสลิปการชำระเงิน | Must | เห็นรูปสลิป, approve/reject + ใส่เหตุผล |
| A-3 | ในฐานะแอดมิน ฉันต้องการดูรายการผู้ใช้ | Must | รายชื่อ buyer/seller, สถานะ, points |
| A-4 | ในฐานะแอดมิน ฉันต้องการดูรายการ deals ทั้งหมด | Must | Filter ตามสถานะ |
| A-5 | ในฐานะแอดมิน ฉันต้องการตัดสินข้อพิพาท | Must | ดูหลักฐาน, ตัดสิน: คืน buyer / ปล่อย seller |
| A-6 | ในฐานะแอดมิน ฉันต้องการตั้งค่าบัญชีธนาคารรับเงิน | Must | แก้ไขชื่อธนาคาร, เลขบัญชี, ชื่อบัญชี |
| A-7 | ในฐานะแอดมิน ฉันต้องการตั้งค่า deadline ยืนยันรับ | Must | ตั้งจำนวนวัน |
| A-8 | ในฐานะแอดมิน ฉันต้องการจัดการรายชื่อขนส่ง | Must | เพิ่ม/ลบ/แก้ไข shipping providers |
| A-9 | ในฐานะแอดมิน ฉันต้องการยืนยันว่าโอนเงินให้ seller แล้ว | Must | กดยืนยัน payout สำหรับ completed orders |

---

## 3. Functional Requirements

### FR-1: Authentication & Authorization

| ID | ข้อกำหนด | Priority |
|----|---------|----------|
| FR-1.1 | ระบบต้องรองรับ Facebook OAuth Login | Must |
| FR-1.2 | ผู้ใช้ต้องเลือก role (BUYER/SELLER) ตอนสมัคร | Must |
| FR-1.3 | ใช้ Facebook account เดียวกันสมัครได้ทั้ง 2 role (แยก account) | Must |
| FR-1.4 | ระบบต้องมี role-based access control (BUYER, SELLER, ADMIN) | Must |
| FR-1.5 | Session ใช้ JWT ใน httpOnly cookie | Must |

### FR-2: Deal Management

| ID | ข้อกำหนด | Priority |
|----|---------|----------|
| FR-2.1 | Seller สร้าง deal ได้ (ชื่อ, รายละเอียด, ราคา, รูป, ขนส่ง) | Must |
| FR-2.2 | Deal เริ่มต้นเป็น DRAFT, ต้องกด publish เป็น ACTIVE | Must |
| FR-2.3 | Seller ต้องมีบัญชีธนาคารก่อนสร้าง deal แรก | Must |
| FR-2.4 | ขนส่งต้องเลือกจากรายชื่อที่ admin กำหนด | Must |
| FR-2.5 | 1 deal สามารถสร้างได้หลาย orders | Should |
| FR-2.6 | Deal เปลี่ยนเป็น CLOSED ได้เมื่อไม่มี active orders | Should |

### FR-3: Order & Escrow

| ID | ข้อกำหนด | Priority |
|----|---------|----------|
| FR-3.1 | ระบบสร้าง public link (UUID) สำหรับแต่ละ order | Must |
| FR-3.2 | Buyer เข้าลิงก์ได้โดยไม่ต้อง login (เห็นข้อมูลพื้นฐาน) | Must |
| FR-3.3 | Buyer ต้อง login ก่อนชำระเงิน/ยืนยันรับ | Must |
| FR-3.4 | Buyer ไม่สามารถซื้อสินค้าของตัวเอง | Must |
| FR-3.5 | Order status เปลี่ยนทิศทางเดียว (state machine) | Must |
| FR-3.6 | ทุก state transition ใช้ atomic conditional update | Must |
| FR-3.7 | Auto-complete เมื่อ deadline หมด + ไม่มี open dispute | Must |
| FR-3.8 | Deadline คำนวณเมื่อ order เป็น DELIVERED | Must |

### FR-4: Payment

| ID | ข้อกำหนด | Priority |
|----|---------|----------|
| FR-4.1 | แสดงบัญชีรับเงิน SafePay ให้ buyer | Must |
| FR-4.2 | Buyer อัพโหลดสลิปได้ (รองรับ camera capture) | Must |
| FR-4.3 | มี idempotency key ป้องกัน double submit | Must |
| FR-4.4 | Admin approve/reject สลิปพร้อมเหตุผล | Must |
| FR-4.5 | Reject สลิป → order กลับ PENDING_PAYMENT, buyer ส่งใหม่ได้ | Must |
| FR-4.6 | จำกัดจำนวนครั้ง upload สลิป สูงสุด 3 ครั้ง → CANCELLED | Must |

### FR-5: Shipping

| ID | ข้อกำหนด | Priority |
|----|---------|----------|
| FR-5.1 | Seller เลือกขนส่ง + ใส่ tracking number | Must |
| FR-5.2 | Seller อัพเดทสถานะจัดส่งได้ | Must |
| FR-5.3 | Buyer ดู tracking ผ่าน public link ได้ | Must |
| FR-5.4 | Seller กดยืนยัน "ส่งถึงแล้ว" → order เป็น DELIVERED | Must |

### FR-6: Confirm Receive

| ID | ข้อกำหนด | Priority |
|----|---------|----------|
| FR-6.1 | Buyer กดยืนยันรับสินค้าได้ (เมื่อ DELIVERED) | Must |
| FR-6.2 | Buyer ต้องอัพโหลดรูปหลักฐานอย่างน้อย 1 รูป | Must |
| FR-6.3 | ยืนยันรับ → order เป็น COMPLETED | Must |

### FR-7: Dispute

| ID | ข้อกำหนด | Priority |
|----|---------|----------|
| FR-7.1 | Buyer หรือ Seller เปิดข้อพิพาทได้ (เมื่อ DELIVERED) | Must |
| FR-7.2 | 1 order มีได้เพียง 1 dispute | Must |
| FR-7.3 | ทั้งสองฝ่ายส่งข้อความ + หลักฐานเพิ่มได้ | Must |
| FR-7.4 | Admin ตัดสิน: คืนผู้ซื้อ (REFUNDED) หรือ ปล่อยผู้ขาย (RELEASED) | Must |
| FR-7.5 | Dispute ชนะ auto-complete เสมอ | Must |

### FR-8: Notification

| ID | ข้อกำหนด | Priority |
|----|---------|----------|
| FR-8.1 | แจ้งเตือน in-app สำหรับทุก state change | Must |
| FR-8.2 | แสดงจำนวนแจ้งเตือนที่ยังไม่อ่าน | Must |
| FR-8.3 | Mark as read / mark all as read | Must |

### FR-9: Points

| ID | ข้อกำหนด | Priority |
|----|---------|----------|
| FR-9.1 | Buyer + Seller ได้ points เมื่อ deal สำเร็จ | Should |
| FR-9.2 | แสดง points ในโปรไฟล์ + หน้า order link | Should |
| FR-9.3 | มี point history สำหรับ audit | Should |

### FR-10: Admin Panel

| ID | ข้อกำหนด | Priority |
|----|---------|----------|
| FR-10.1 | Dashboard: total deals, GMV, success rate | Must |
| FR-10.2 | User management: list, filter, view activity | Must |
| FR-10.3 | Payment verification: pending queue, approve/reject | Must |
| FR-10.4 | Dispute resolution: view evidence, decide winner | Must |
| FR-10.5 | Payout queue: completed orders, confirm payout | Must |
| FR-10.6 | System settings: bank account, deadline, shipping providers | Must |
| FR-10.7 | Deal monitoring: all deals, filter by status | Should |

---

## 4. Non-Functional Requirements

### NFR-1: Performance

| ID | ข้อกำหนด |
|----|---------|
| NFR-1.1 | API response time < 500ms (p95) |
| NFR-1.2 | หน้า Order Link (public) โหลด < 2 วินาที |
| NFR-1.3 | File upload รองรับไฟล์ขนาด ≤ 5MB |

### NFR-2: Security

| ID | ข้อกำหนด |
|----|---------|
| NFR-2.1 | JWT httpOnly cookie ป้องกัน XSS |
| NFR-2.2 | CSRF protection (NextAuth built-in) |
| NFR-2.3 | Rate limiting: 100 req/min public, 5 req/min auth, 10 req/min upload |
| NFR-2.4 | File upload: validate MIME type, limit size, rename UUID |
| NFR-2.5 | ไฟล์อัพโหลดเก็บนอก public/ — serve ผ่าน API พร้อม auth check |
| NFR-2.6 | Input validation ทุก endpoint ด้วย Zod |
| NFR-2.7 | Sanitize HTML ใน description fields |
| NFR-2.8 | เลขบัญชี seller เป็น sensitive PII — แสดงเฉพาะ admin |
| NFR-2.9 | Atomic conditional update ป้องกัน race condition |
| NFR-2.10 | Payment idempotency ป้องกัน double payment |

### NFR-3: Usability

| ID | ข้อกำหนด |
|----|---------|
| NFR-3.1 | UI ภาษาไทยทั้งหมด |
| NFR-3.2 | Responsive design — mobile-first สำหรับ order link |
| NFR-3.3 | ปุ่มอัพโหลดรองรับ camera capture บนมือถือ |
| NFR-3.4 | Admin/Customer layout แบบ Sidebar + Topbar |
| NFR-3.5 | Sidebar collapse เป็น drawer บน mobile |

### NFR-4: Reliability

| ID | ข้อกำหนด |
|----|---------|
| NFR-4.1 | Uptime > 99% |
| NFR-4.2 | Database backup รายวัน |
| NFR-4.3 | Cron job auto-complete ต้อง resilient ต่อ failure (skip + retry) |

### NFR-5: Maintainability

| ID | ข้อกำหนด |
|----|---------|
| NFR-5.1 | Service layer แยกจาก API layer |
| NFR-5.2 | Prisma ORM สำหรับ type-safe database access |
| NFR-5.3 | Docker Compose สำหรับ local development |
| NFR-5.4 | Database migration ผ่าน Prisma Migrate |
| NFR-5.5 | Unit tests สำหรับ critical services |

---

## 5. Order Status Flow

### 5.1 สถานะทั้งหมด

| สถานะ | คำอธิบาย | ใครเปลี่ยน |
|-------|---------|-----------|
| PENDING_PAYMENT | รอชำระเงิน | (สร้างอัตโนมัติ) |
| PAYMENT_UPLOADED | อัพโหลดสลิปแล้ว | Buyer |
| PAYMENT_RECEIVED | ชำระเงินแล้ว (admin อนุมัติ) | Admin |
| SHIPPING | กำลังจัดส่ง | Seller |
| DELIVERED | ส่งถึงแล้ว | Seller |
| COMPLETED | สำเร็จ | Buyer / Auto |
| CANCELLED | ยกเลิก | System |
| DISPUTE | มีข้อพิพาท | Buyer / Seller |
| REFUNDED | คืนเงินผู้ซื้อ | Admin |
| RELEASED | ปล่อยเงินผู้ขาย | Admin |

### 5.2 Transition Rules

| จาก | ไป | เงื่อนไข |
|-----|-----|---------|
| PENDING_PAYMENT | PAYMENT_UPLOADED | Buyer อัพโหลดสลิป |
| PENDING_PAYMENT | CANCELLED | Buyer/System ยกเลิก |
| PAYMENT_UPLOADED | PAYMENT_RECEIVED | Admin approve |
| PAYMENT_UPLOADED | PENDING_PAYMENT | Admin reject (สลิปไม่ถูกต้อง, buyer ส่งใหม่ได้) |
| PAYMENT_UPLOADED | CANCELLED | Reject ครบ 3 ครั้ง |
| PAYMENT_RECEIVED | SHIPPING | Seller จัดส่ง + ใส่ tracking |
| SHIPPING | DELIVERED | Seller กดยืนยันส่งถึง |
| DELIVERED | COMPLETED | Buyer กดยืนยันรับ / Auto-complete (deadline) |
| DELIVERED | DISPUTE | Buyer/Seller เปิดข้อพิพาท |
| DISPUTE | REFUNDED | Admin ตัดสิน: คืน buyer |
| DISPUTE | RELEASED | Admin ตัดสิน: ปล่อย seller |

---

## 6. Data Visibility Rules

### 6.1 Order Link (`/orders/[token]`)

| Auth Level | เห็นอะไร |
|-----------|---------|
| ไม่ login | ชื่อสินค้า, ราคา, ชื่อผู้ขาย, สถานะ, ปุ่ม "เข้าสู่ระบบ" |
| Buyer (claimed) | ทุกอย่าง: บัญชีรับเงิน, อัพโหลดสลิป, timeline, tracking, ปุ่มยืนยัน |
| Seller (เจ้าของ deal) | สถานะ, payment status, ข้อมูล buyer, ปุ่มจัดส่ง |
| คนอื่น | เหมือนไม่ login |

---

## 7. Page Map

### 7.1 Public Pages

| Page | Path | คำอธิบาย |
|------|------|---------|
| Landing | `/` | แนะนำบริการ, CTA สร้างดีล/เข้าสู่ระบบ |
| Login | `/login` | Facebook login |
| Register | `/register` | เลือก role + Facebook login |
| Order Link | `/orders/[token]` | หน้าสาธารณะดู order (mobile-first) |
| Tracking | `/tracking/[token]` | ดูสถานะจัดส่ง |

### 7.2 Customer Pages (Sidebar Layout)

| Page | Path | คำอธิบาย |
|------|------|---------|
| Dashboard | `/dashboard` | สรุป deals, orders, points |
| My Deals | `/deals` | รายการ deals ของ seller |
| Create Deal | `/deals/create` | สร้าง deal ใหม่ |
| My Orders | `/orders` | รายการ orders ของฉัน |
| Disputes | `/disputes` | ข้อพิพาทของฉัน |
| Notifications | `/notifications` | แจ้งเตือน |
| Profile | `/profile` | โปรไฟล์ + บัญชีธนาคาร |

### 7.3 Admin Pages (Sidebar Layout)

| Page | Path | คำอธิบาย |
|------|------|---------|
| Dashboard | `/admin/dashboard` | สถิติรวม |
| Users | `/admin/users` | จัดการผู้ใช้ |
| Deals | `/admin/deals` | ดู deals ทั้งหมด |
| Payments | `/admin/payments` | ตรวจสลิป |
| Disputes | `/admin/disputes` | จัดการข้อพิพาท |
| Dispute Detail | `/admin/disputes/[id]` | ดูหลักฐาน + ตัดสิน |
| Payouts | `/admin/payouts` | ยืนยัน payout |
| Settings | `/admin/settings` | ตั้งค่าระบบ |

---

## 8. API Endpoints Summary

| กลุ่ม | จำนวน Endpoints | Auth |
|-------|----------------|------|
| Auth | 3 | Public/Auth |
| Deals | 5 | Seller |
| Orders | 5 | Mixed |
| Payments | 1 | Buyer |
| Shipments | 3 | Seller/Public |
| Disputes | 3 | Buyer/Seller/Admin |
| Notifications | 3 | Auth |
| Admin | 11 | Admin |
| Upload/Files | 2 | Auth |
| **รวม** | **36** | |

(รายละเอียด API ดูที่ spec: `docs/superpowers/specs/2026-03-23-safepay-escrow-design.md`)

---

## 9. Tech Stack

| Component | Technology | เหตุผล |
|-----------|-----------|-------|
| Framework | Next.js 15 (App Router) | Full-stack, SSR, API routes |
| Language | TypeScript | Type safety |
| Database | PostgreSQL 16 | Reliable, ACID compliance |
| ORM | Prisma | Type-safe, migrations |
| Auth | NextAuth.js v4 | Facebook OAuth, JWT sessions |
| Validation | Zod | Runtime type checking |
| Styling | TailwindCSS | Utility-first, responsive |
| Container | Docker + Docker Compose | Consistent environments |
| Cron | node-cron | Auto-complete orders |
| Testing | Vitest | Fast, Vite-compatible |

---

## 10. Release Criteria

### MVP Release Checklist

- [ ] Escrow flow ทำงานครบ (สร้างดีล → ชำระ → จัดส่ง → ยืนยันรับ → สำเร็จ)
- [ ] Facebook Login ทำงาน
- [ ] Admin ตรวจสลิปได้
- [ ] Dispute flow ทำงาน
- [ ] Auto-complete ทำงาน
- [ ] Mobile responsive สำหรับ order link
- [ ] Admin dashboard แสดงสถิติ
- [ ] ไม่มี critical security issues
- [ ] Unit tests สำหรับ services ผ่านทั้งหมด
- [ ] Docker Compose deploy ได้

---

## 11. Metrics & Analytics

### Key Metrics to Track

| Metric | คำอธิบาย | วิธีคำนวณ |
|--------|---------|----------|
| GMV | มูลค่าสินค้ารวม | SUM(completed orders.amount) |
| Success Rate | อัตราดีลสำเร็จ | COMPLETED / (COMPLETED + CANCELLED + REFUNDED) |
| Dispute Rate | อัตราข้อพิพาท | DISPUTE orders / total orders |
| Avg. Resolution Time | เวลาเฉลี่ยตัดสิน dispute | AVG(resolvedAt - createdAt) |
| Slip Approval Time | เวลาเฉลี่ยตรวจสลิป | AVG(verifiedAt - createdAt) |
| Active Users | ผู้ใช้ที่มี activity | Users with orders in last 30 days |

---

## 12. การอนุมัติ (Approval)

| บทบาท | ชื่อ | วันที่ | ลายเซ็น |
|-------|------|-------|---------|
| Product Owner | | | |
| Engineering Lead | | | |
| Design Lead | | | |
