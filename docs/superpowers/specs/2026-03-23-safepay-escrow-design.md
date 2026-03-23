# SafePay — Escrow Marketplace Design Spec

## Overview

SafePay เป็นระบบ Escrow Marketplace สำหรับการซื้อขาย C2C ในประเทศไทย ระบบทำหน้าที่เป็นตัวกลางรับเงินจากผู้ซื้อ พักไว้จนกว่าผู้ซื้อยืนยันรับสินค้า แล้วจึงปล่อยเงินให้ผู้ขาย

### ขอบเขต MVP

- สกุลเงิน: THB เท่านั้น
- การชำระเงิน: โอนแบงค์ (Bank Transfer) เท่านั้น
- ขนส่ง: ในประเทศไทยเท่านั้น
- ภาษา UI: ไทยเท่านั้น
- ขนาด: เล็ก (< 100 deals/เดือน)

---

## Architecture

### Tech Stack

- **Framework:** Next.js (App Router, TypeScript)
- **Database:** PostgreSQL 16
- **ORM:** Prisma
- **Auth:** NextAuth.js + Facebook OAuth
- **Styling:** TailwindCSS
- **Containerization:** Docker + Docker Compose
- **File Storage:** Local filesystem (MVP), S3-ready

### Architecture Pattern: Monolith

```
Next.js App
├── Frontend (App Router, Server/Client Components)
├── API Layer (Route Handlers /api/*)
├── Service Layer (Business Logic)
└── Data Layer (Prisma ORM → PostgreSQL)
```

**เหตุผล:** MVP ขนาดเล็ก, deploy ง่าย, โค้ดอยู่ที่เดียว สามารถ extract เป็น microservices ได้ทีหลังเมื่อโตขึ้น

### Authentication Flow

```
User → Facebook OAuth → NextAuth.js → JWT (httpOnly cookie)
                                      → Check role (BUYER/SELLER/ADMIN)
                                      → Route to dashboard
```

- JWT-based session (stateless)
- Middleware ตรวจ role-based access ที่ระดับ route group
- Facebook Login บังคับสำหรับ identity verification
- User เดียวกันสามารถมีทั้ง role BUYER และ SELLER (แต่แยก account)

---

## Escrow Flow (Core Business Logic)

```
Seller สร้าง Deal
       ↓
ระบบสร้าง Order + Public Link (UUID token)
       ↓
Buyer เปิดลิงก์ → Login → เห็นรายละเอียด + บัญชีรับเงิน
       ↓
Buyer โอนเงิน → อัพโหลดสลิป (พร้อม idempotency key)
       ↓
[PENDING_PAYMENT → PAYMENT_UPLOADED] → Admin ตรวจสลิป → Approve
       ↓
[PAYMENT_RECEIVED] → แจ้ง Seller
       ↓
Seller จัดส่ง → ใส่เลข tracking + เลือกขนส่ง
       ↓
[SHIPPING] → Buyer ติดตามสถานะ
       ↓
[DELIVERED] → Buyer กดยืนยัน + อัพโหลดรูปหลักฐาน
       ↓
[COMPLETED] → สร้าง payout task แจ้ง admin → admin โอนเงินให้ seller → เพิ่ม points ทั้งคู่
       ↓
(ถ้ามีปัญหา ตอน DELIVERED) → [DISPUTE] → Admin ตัดสิน:
  → คืน Buyer → [REFUNDED] (admin โอนคืน buyer)
  → ปล่อย Seller → [RELEASED] (admin โอนให้ seller)
```

### Order State Machine

```
                    ┌─── CANCELLED
                    │
PENDING_PAYMENT ────┤
        │           │
        ▼           │
PAYMENT_UPLOADED ───┤ (admin reject → กลับ PENDING_PAYMENT, buyer อัพสลิปใหม่ได้)
        │           │
        ▼ (admin approve)
PAYMENT_RECEIVED
        │
        ▼ (seller ships)
   SHIPPING
        │
        ▼ (seller marks delivered)
   DELIVERED
        │
        ├──────────────► DISPUTE ──► REFUNDED (admin ตัดสิน: คืน buyer)
        │                        ──► RELEASED (admin ตัดสิน: ปล่อย seller)
        ▼ (buyer confirms / deadline auto-complete)
   COMPLETED
```

**กฎ:**
- สถานะเดินหน้าอย่างเดียว ย้อนกลับไม่ได้
- ยกเว้น: PAYMENT_UPLOADED → PENDING_PAYMENT (เมื่อ admin reject สลิป, buyer อัพสลิปใหม่ได้ สูงสุด 3 ครั้ง ถ้าเกิน → CANCELLED)
- ยกเว้น: DISPUTE เปิดได้จาก DELIVERED เท่านั้น
- DISPUTE ชนะ auto-complete เสมอ: ถ้ามี dispute เปิดอยู่ cron จะไม่ auto-complete order นั้น
- ทุก state transition ใช้ atomic conditional update: `UPDATE orders SET status=? WHERE id=? AND status=?` ป้องกัน race condition

### Auto-Complete

- แอดมินตั้งค่า `confirm_deadline_days` (จำนวนวัน)
- เมื่อสถานะเป็น DELIVERED และเลย deadline → ระบบ auto-complete
- **ข้อยกเว้น:** ถ้า order มี dispute ที่ status = OPEN → ข้าม ไม่ auto-complete
- `confirmDeadline` คำนวณตอน order เปลี่ยนเป็น DELIVERED: `confirmDeadline = NOW() + confirm_deadline_days`
- ใช้ custom `server.ts` ที่ wrap Next.js + `node-cron` (MVP)
- รันทุกชั่วโมง: หา orders DELIVERED ที่เลย deadline + ไม่มี OPEN dispute → COMPLETED → เพิ่ม points → แจ้งเตือน

### Cron Initialization

ใช้ custom `server.ts` ที่ root:
```
// server.ts
import next from 'next'
import { createServer } from 'http'
import cron from 'node-cron'
import { autoCompleteOrders } from './src/services/escrow.service'

const app = next({ dev: process.env.NODE_ENV !== 'production' })
// ...setup server
cron.schedule('0 * * * *', autoCompleteOrders) // ทุกชั่วโมง
```

### Payout Process (MVP — Manual)

เมื่อ order เป็น COMPLETED:
1. ระบบสร้าง notification แจ้ง admin ว่ามี payout รอดำเนินการ
2. Admin ดูหน้า payout queue → เห็นข้อมูล seller + บัญชีธนาคาร seller + จำนวนเงิน
3. Admin โอนเงินจริง (นอกระบบ) แล้วกลับมากด "ยืนยันโอนแล้ว" ในระบบ
4. ระบบ notify seller ว่าได้รับเงินแล้ว

### Payment Rejection Flow

เมื่อ admin reject สลิป:
1. `payments.status` → REJECTED (พร้อม `rejectedReason`)
2. `orders.status` → PENDING_PAYMENT (ย้อนกลับ ให้ buyer อัพสลิปใหม่)
3. Buyer ได้รับ notification พร้อมเหตุผลที่ reject
4. Buyer ต้องสร้าง idempotencyKey ใหม่สำหรับการ upload สลิปครั้งถัดไป
5. จำกัดสูงสุด 3 ครั้งต่อ order — ถ้า reject ครบ 3 ครั้ง → order เป็น CANCELLED อัตโนมัติ

---

## Database Schema

### Enums

```
UserRole:        BUYER | SELLER | ADMIN
DealStatus:      DRAFT | ACTIVE | CLOSED
OrderStatus:     PENDING_PAYMENT | PAYMENT_UPLOADED | PAYMENT_RECEIVED |
                 SHIPPING | DELIVERED | COMPLETED | CANCELLED |
                 DISPUTE | REFUNDED | RELEASED
PaymentStatus:   PENDING | APPROVED | REJECTED
DisputeStatus:   OPEN | RESOLVED_BUYER | RESOLVED_SELLER
ShipmentStatus:  SHIPPED | IN_TRANSIT | DELIVERED
```

### Tables

#### users
| Column | Type | Notes |
|--------|------|-------|
| id | String (cuid) | PK |
| facebookId | String | Unique, from OAuth |
| name | String | |
| email | String? | Optional |
| avatar | String? | Profile image URL |
| role | UserRole | BUYER / SELLER / ADMIN |
| points | Int | Default 0, running total |
| isActive | Boolean | Default true |
| createdAt | DateTime | |
| updatedAt | DateTime | |

#### seller_bank_accounts
| Column | Type | Notes |
|--------|------|-------|
| id | String (cuid) | PK |
| userId | String | FK → users (SELLER), Unique |
| bankName | String | เช่น กสิกรไทย, กรุงเทพ, ไทยพาณิชย์ |
| accountNo | String | เลขบัญชี (encrypted at rest) |
| accountName | String | ชื่อบัญชี |
| createdAt | DateTime | |
| updatedAt | DateTime | |

**หมายเหตุ:** Seller ต้องกรอกบัญชีธนาคารก่อนสร้าง deal แรก (บังคับในหน้า profile)
เลขบัญชีเป็น sensitive PII — ต้อง encrypt at rest, แสดงเฉพาะ admin ในหน้า payout

#### accounts (NextAuth)
| Column | Type | Notes |
|--------|------|-------|
| id | String | PK |
| userId | String | FK → users |
| provider | String | "facebook" |
| providerAccountId | String | |
| accessToken | String? | |
| refreshToken | String? | |
| expiresAt | Int? | |

#### deals
| Column | Type | Notes |
|--------|------|-------|
| id | String (cuid) | PK |
| sellerId | String | FK → users |
| productName | String | |
| description | String | |
| price | Decimal | THB |
| images | Json | String[] of file paths |
| shippingMethod | String | เลือกจาก provider list |
| status | DealStatus | Default DRAFT |
| createdAt | DateTime | |
| updatedAt | DateTime | |

**Deal Lifecycle:**
- **DRAFT** → สร้างใหม่ แก้ไขได้ ยังไม่สามารถ generate link
- **ACTIVE** → seller กด "เผยแพร่" → สามารถ generate order link ได้
- **CLOSED** → deal ปิดแล้ว (สินค้าหมด/seller ปิดเอง)
- 1 deal สามารถมีได้หลาย orders (เช่น seller มีสินค้า 3 ชิ้นเหมือนกัน)
- deal เปลี่ยนเป็น CLOSED ได้เฉพาะเมื่อไม่มี order ที่ active อยู่ (status ≠ COMPLETED/CANCELLED/REFUNDED/RELEASED)

#### orders
| Column | Type | Notes |
|--------|------|-------|
| id | String (cuid) | PK |
| dealId | String | FK → deals |
| buyerId | String? | FK → users, null จนกว่า buyer claim |
| publicToken | String | Unique, UUID v4 สำหรับ public link |
| amount | Decimal | Copy จาก deal.price ตอนสร้าง |
| status | OrderStatus | Default PENDING_PAYMENT |
| idempotencyKey | String? | ป้องกัน double payment |
| confirmDeadline | DateTime? | Set เมื่อ DELIVERED (= NOW + confirm_deadline_days) |
| paymentAttempts | Int | Default 0, นับจำนวนครั้งที่อัพสลิป (max 3) |
| payoutConfirmed | Boolean | Default false, admin ยืนยันโอนเงินให้ seller แล้ว |
| createdAt | DateTime | |
| updatedAt | DateTime | |
| completedAt | DateTime? | Set เมื่อ COMPLETED |

#### payments
| Column | Type | Notes |
|--------|------|-------|
| id | String (cuid) | PK |
| orderId | String | FK → orders |
| amount | Decimal | |
| slipImage | String | File path |
| status | PaymentStatus | Default PENDING |
| idempotencyKey | String | Unique, from client |
| verifiedBy | String? | FK → users (admin) |
| verifiedAt | DateTime? | |
| rejectedReason | String? | |
| createdAt | DateTime | |

#### shipments
| Column | Type | Notes |
|--------|------|-------|
| id | String (cuid) | PK |
| orderId | String | FK → orders, Unique |
| provider | String | เลือกจาก provider list |
| trackingNo | String | |
| status | String | e.g. "shipped", "in_transit", "delivered" |
| shippedAt | DateTime | |
| deliveredAt | DateTime? | |

**DELIVERED Trigger:**
- Seller กดปุ่ม "ผู้ซื้อได้รับสินค้าแล้ว" หรืออัพเดท shipment status เป็น DELIVERED
- ณ จุดนี้: `orders.status` → DELIVERED, `orders.confirmDeadline` = NOW() + `confirm_deadline_days`
- (อนาคต: สามารถเพิ่ม courier API webhook ที่ trigger อัตโนมัติเมื่อขนส่งอัพเดทสถานะ)

#### tracking_updates
| Column | Type | Notes |
|--------|------|-------|
| id | String (cuid) | PK |
| shipmentId | String | FK → shipments |
| status | String | |
| description | String | |
| createdAt | DateTime | |

#### disputes
| Column | Type | Notes |
|--------|------|-------|
| id | String (cuid) | PK |
| orderId | String | FK → orders, Unique |
| openedBy | String | FK → users |
| reason | String | |
| evidence | Json | String[] of file paths |
| status | DisputeStatus | Default OPEN |
| resolution | String? | คำอธิบายการตัดสิน |
| resolvedBy | String? | FK → users (admin) |
| resolvedAt | DateTime? | |
| createdAt | DateTime | |

#### dispute_messages
| Column | Type | Notes |
|--------|------|-------|
| id | String (cuid) | PK |
| disputeId | String | FK → disputes |
| senderId | String | FK → users |
| message | String | |
| attachments | Json | String[] of file paths |
| createdAt | DateTime | |

#### notifications
| Column | Type | Notes |
|--------|------|-------|
| id | String (cuid) | PK |
| userId | String | FK → users |
| type | String | e.g. PAYMENT_APPROVED, SHIPPED, DISPUTE_OPENED |
| title | String | |
| message | String | |
| relatedOrderId | String? | FK → orders |
| isRead | Boolean | Default false |
| createdAt | DateTime | |

#### point_histories
| Column | Type | Notes |
|--------|------|-------|
| id | String (cuid) | PK |
| userId | String | FK → users |
| orderId | String? | FK → orders |
| amount | Int | จำนวน points (+ หรือ -) |
| type | String | e.g. DEAL_COMPLETED, BONUS |
| createdAt | DateTime | |

#### system_settings
| Column | Type | Notes |
|--------|------|-------|
| id | String (cuid) | PK |
| key | String | Unique |
| value | String | JSON string |
| updatedAt | DateTime | |

### Indexes

- `users.facebookId` — unique
- `orders.publicToken` — unique
- `orders.status` — filter queries
- `orders.buyerId` — user's orders
- `orders.dealId` — deal's orders
- `payments.idempotencyKey` — unique
- `payments.status` — pending queue
- `notifications.userId` + `isRead` — compound index
- `disputes.orderId` — unique
- `seller_bank_accounts.userId` — unique
- `orders.payoutConfirmed` — filter for payout queue

---

## API Design

### Conventions

- **Response format:** `{ success: boolean, data?: T, error?: string }`
- **Pagination:** `?page=1&limit=20` → `{ data, meta: { total, page, limit, totalPages } }`
- **Auth:** JWT token in httpOnly cookie
- **Validation:** Zod schemas on all inputs
- **Idempotency:** Payment endpoint requires `Idempotency-Key` header

### Endpoints

#### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/facebook` | No | Facebook OAuth login/register |
| GET | `/api/auth/session` | Yes | ดึง session ปัจจุบัน |
| POST | `/api/auth/logout` | Yes | ออกจากระบบ |

#### Deals (Seller)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/deals` | SELLER | รายการ deals ของผู้ขาย |
| POST | `/api/deals` | SELLER | สร้าง deal ใหม่ |
| GET | `/api/deals/[id]` | SELLER | ดูรายละเอียด deal |
| PATCH | `/api/deals/[id]` | SELLER | แก้ไข deal (DRAFT/ACTIVE เท่านั้น) |
| POST | `/api/deals/[id]/generate-link` | SELLER | สร้าง order + public link |

#### Orders
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/orders` | BUYER/SELLER | รายการ orders ของผู้ใช้ (filter ตาม role อัตโนมัติ) |
| GET | `/api/orders/[token]` | No* | ดู order ผ่าน public token (ข้อมูลต่างกันตาม auth, ดูด้านล่าง) |
| POST | `/api/orders/[token]/claim` | BUYER | Buyer ผูกตัวเองกับ order |
| POST | `/api/orders/[token]/confirm-receive` | BUYER | ยืนยันรับ + อัพรูป |

**GET /api/orders (role-based response):**
- Server ตรวจ role จาก JWT → filter อัตโนมัติ
- SELLER: แสดง orders ที่เกี่ยวกับ deals ของตัวเอง (seller perspective: payment status, shipment info)
- BUYER: แสดง orders ที่ตัวเองเป็น buyer (buyer perspective: tracking, confirm status)
- Response shape เหมือนกัน แต่ data ต่างกันตาม role

**GET /api/orders/[token] (public order link — visibility by auth level):**
- **ไม่ login:** เห็นข้อมูลพื้นฐาน — ชื่อสินค้า, ราคา, ชื่อผู้ขาย, สถานะ, ปุ่ม "เข้าสู่ระบบเพื่อชำระเงิน"
- **Login เป็น buyer (claimed):** เห็นทุกอย่าง — บัญชีรับเงิน, ปุ่มอัพโหลดสลิป, timeline, tracking, ปุ่มยืนยันรับ
- **Login เป็น seller (เจ้าของ deal):** เห็นสถานะ order, payment status, ข้อมูล buyer, ปุ่มจัดส่ง
- **Login เป็นคนอื่น:** เห็นเหมือนไม่ login (ข้อมูลพื้นฐานเท่านั้น)

#### Payments
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/orders/[token]/payment` | BUYER | อัพโหลดสลิป (ต้อง Idempotency-Key header) |

#### Shipments
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/orders/[token]/shipment` | SELLER | เพิ่ม tracking |
| PATCH | `/api/orders/[token]/shipment` | SELLER | อัพเดท tracking |
| GET | `/api/orders/[token]/tracking` | No | ดูสถานะขนส่ง (public) |

#### Disputes
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/orders/[token]/dispute` | BUYER/SELLER | เปิด dispute (เงื่อนไขด้านล่าง) |
| GET | `/api/disputes/[id]` | BUYER/SELLER/ADMIN | ดูรายละเอียด |
| POST | `/api/disputes/[id]/messages` | BUYER/SELLER/ADMIN | ส่งข้อความ + หลักฐาน |

**Dispute Rules:**
- ทั้ง Buyer และ Seller สามารถเปิด dispute ได้ แต่ต้องเป็นคนที่เกี่ยวข้องกับ order เท่านั้น
- เปิดได้เฉพาะเมื่อ `orders.status = DELIVERED` เท่านั้น
- 1 order มีได้เพียง 1 dispute (`disputes.orderId` เป็น UNIQUE)
- ใครเปิดก่อนได้ก่อน — อีกฝ่ายสามารถส่งข้อความ/หลักฐานเพิ่มใน dispute เดียวกัน
- เมื่อเปิด dispute → `orders.status` เปลี่ยนเป็น `DISPUTE`
- Admin ตัดสิน → `RESOLVED_BUYER` (order → REFUNDED) หรือ `RESOLVED_SELLER` (order → RELEASED)

#### Notifications
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/notifications` | Yes | ดึง notifications |
| PATCH | `/api/notifications/[id]/read` | Yes | mark as read |
| PATCH | `/api/notifications/read-all` | Yes | mark all as read |

#### Admin
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/dashboard` | ADMIN | สถิติ: deals, GMV, success rate |
| GET | `/api/admin/users` | ADMIN | รายชื่อผู้ใช้ + filter |
| PATCH | `/api/admin/users/[id]` | ADMIN | แก้ไขสถานะผู้ใช้ |
| GET | `/api/admin/deals` | ADMIN | ทุก deals + filter |
| GET | `/api/admin/payments` | ADMIN | สลิปรอตรวจ |
| PATCH | `/api/admin/payments/[id]/verify` | ADMIN | approve/reject สลิป |
| GET | `/api/admin/disputes` | ADMIN | disputes ทั้งหมด |
| PATCH | `/api/admin/disputes/[id]/resolve` | ADMIN | ตัดสิน (RESOLVED_BUYER / RESOLVED_SELLER) |
| GET | `/api/admin/payouts` | ADMIN | รายการ orders ที่ COMPLETED รอโอนเงินให้ seller |
| PATCH | `/api/admin/payouts/[orderId]/confirm` | ADMIN | ยืนยันว่าโอนเงินให้ seller แล้ว |
| GET | `/api/admin/settings` | ADMIN | ดึงการตั้งค่า |
| PATCH | `/api/admin/settings` | ADMIN | แก้ไขการตั้งค่า |

#### Upload
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/upload` | Yes | อัพโหลดไฟล์ → `{ fileId: "uuid" }` |
| GET | `/api/files/[fileId]` | Yes* | ดึงไฟล์ (ตรวจ auth + authorization ก่อน serve) |

**File Serving Security:**
- ไฟล์ถูกเก็บนอก `public/` directory (ที่ `./uploads/` ระดับ project root)
- ไม่สามารถเข้าถึงไฟล์ได้โดยตรงผ่าน URL
- `GET /api/files/[fileId]` ตรวจสอบว่า user มีสิทธิ์ดูไฟล์นั้น (เช่น เป็น buyer/seller ของ order นั้น หรือ admin)
- รองรับ migration ไป S3 signed URLs ทีหลังได้ง่าย

---

## Frontend

### Route Structure

```
src/app/
├── (auth)/login, register
├── (public)/orders/[token], tracking/[token]    ← Mobile-first responsive
├── (customer)/dashboard, deals, orders, disputes, notifications, profile
└── (admin)/admin/dashboard, users, deals, payments, disputes, settings
```

### Layout Pattern

- **(auth)** — Minimal layout, centered card
- **(public)** — Clean, no sidebar, mobile-first
- **(customer)** — Sidebar + Topbar (sidebar collapses to drawer on mobile)
- **(admin)** — Sidebar + Topbar (admin-specific nav)

### Key Pages

#### Order Link (`/orders/[token]`) — Mobile-first
- รายละเอียดสินค้า + ราคา + ผู้ขาย (points)
- บัญชีรับเงิน (จาก system_settings)
- ปุ่มอัพโหลดสลิป (ใหญ่, รองรับ camera capture)
- Timeline สถานะ
- ปุ่มยืนยันรับสินค้า + อัพโหลดรูป
- Responsive: ใช้งานได้ดีทั้ง mobile และ desktop

#### Customer Dashboard (`/dashboard`)
- Summary cards: จำนวน deals, orders, points
- รายการ orders ล่าสุด
- แจ้งเตือนล่าสุด

#### Admin Dashboard (`/admin/dashboard`)
- Stats: total deals, GMV, success rate
- สลิปรอตรวจ (quick action)
- disputes ที่ยังเปิดอยู่

---

## Project Structure

```
safepay/
├── docker-compose.yml
├── Dockerfile
├── .env.example
├── .gitignore
├── README.md
├── server.ts                        # Custom server: Next.js + node-cron
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── uploads/                         # ไฟล์อัพโหลด (นอก public/, serve ผ่าน API เท่านั้น)
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Landing
│   │   ├── (auth)/
│   │   ├── (public)/
│   │   ├── (customer)/
│   │   │   ├── layout.tsx            # Sidebar + Topbar
│   │   │   ├── dashboard/
│   │   │   ├── deals/ (list + create)
│   │   │   ├── orders/
│   │   │   ├── disputes/
│   │   │   ├── notifications/
│   │   │   └── profile/
│   │   ├── (admin)/
│   │   │   ├── layout.tsx
│   │   │   └── admin/ (dashboard, users, deals, payments, disputes, settings)
│   │   └── api/ (auth, deals, orders, payments, shipments, disputes, notifications, upload, admin)
│   ├── components/
│   │   ├── ui/                       # Button, Input, Modal, Badge, Card, etc.
│   │   ├── layouts/                  # Sidebar, Topbar
│   │   ├── deals/                    # DealCard, DealForm
│   │   ├── orders/                   # OrderStatusBadge, Timeline, PaymentSlipUpload, ConfirmReceiveForm
│   │   └── admin/                    # StatsCard, PaymentVerifyModal, DisputeResolvePanel
│   ├── lib/
│   │   ├── prisma.ts                 # Prisma client singleton
│   │   ├── auth.ts                   # NextAuth config
│   │   ├── upload.ts                 # File upload helper
│   │   └── utils.ts
│   ├── services/
│   │   ├── deal.service.ts
│   │   ├── order.service.ts
│   │   ├── payment.service.ts
│   │   ├── shipment.service.ts
│   │   ├── dispute.service.ts
│   │   ├── notification.service.ts
│   │   ├── point.service.ts
│   │   └── escrow.service.ts         # State machine + release logic
│   ├── types/
│   │   └── index.ts
│   └── middleware.ts                 # Auth + role-based routing
└── tailwind.config.ts
```

---

## Docker Setup

### docker-compose.yml
- **app:** Next.js container, port 3000, depends on db
- **db:** PostgreSQL 16 Alpine, port 5432, healthcheck, named volume
- **migrate:** Profile "migrate", runs `prisma migrate deploy`
- **seed:** Profile "seed", runs `prisma db seed`

### Dockerfile
- Multi-stage build: deps → builder → runner
- `node:20-alpine` base
- `output: 'standalone'` in next.config.js for optimized production image

### Seed Data
- Admin user
- Bank account setting (กสิกรไทย)
- Confirm deadline (3 วัน)
- Shipping providers (ไปรษณีย์ไทย, Kerry, Flash, J&T, Ninja Van, DHL, Best Express)

---

## Security & Fraud Prevention

### Authentication & Authorization
- JWT httpOnly cookie — ป้องกัน XSS
- Role-based middleware ทุก route
- Admin routes double-check ที่ middleware + service layer

### Escrow Protection
- Seller ไม่สามารถกดยืนยันรับสินค้าเอง (sellerId ≠ buyerId check)
- Seller ไม่สามารถแก้ไข deal หลัง status เลย ACTIVE
- Seller ต้องกรอกบัญชีธนาคารก่อนสร้าง deal แรก
- Buyer ไม่สามารถยืนยันรับก่อนสถานะ DELIVERED
- Buyer/Seller เปิด dispute ได้เฉพาะตอน DELIVERED เท่านั้น
- 1 order มีได้เพียง 1 dispute
- Order status เปลี่ยนทิศทางเดียว (state machine enforcement)
- ยกเว้น: reject slip → กลับ PENDING_PAYMENT (สูงสุด 3 ครั้ง)
- ทุก state transition ใช้ atomic conditional update ป้องกัน race condition
- DISPUTE ชนะ auto-complete เสมอ
- ทุก state change มี timestamp + actor log

### Payment Idempotency
- Client สร้าง UUID ก่อนส่ง request
- Server เช็ค idempotencyKey ใน DB
- ถ้ามีอยู่แล้ว → return ผลเดิม, ไม่ process ซ้ำ

### File Upload Security
- ไฟล์เก็บนอก `public/` → ที่ `./uploads/` ระดับ project root
- Serve ผ่าน `GET /api/files/[fileId]` เท่านั้น พร้อมตรวจ auth + authorization
- ตรวจ MIME type (image/jpeg, image/png, image/webp เท่านั้น)
- จำกัดขนาด 5MB
- Rename เป็น UUID (ป้องกัน path traversal)
- Payment slips เป็นเอกสารการเงิน — เข้าถึงได้เฉพาะ buyer/seller ของ order นั้น + admin

### Rate Limiting (in-memory สำหรับ MVP)
- Public endpoints: 100 req/min ต่อ IP
- Upload: 10 req/min ต่อ user
- Auth: 5 req/min ต่อ IP
- **Known limitation:** in-memory counters reset เมื่อ container restart — ยอมรับสำหรับ MVP
- **อนาคต:** ย้ายไป Redis-based rate limiting เมื่อ scale ขึ้น

### Input Validation
- Zod schema ทุก API endpoint
- Sanitize HTML ใน description fields
- Price validation (> 0, numeric)

---

## Decisions Log

| Decision | Choice | Reason |
|----------|--------|--------|
| Architecture | Monolith Next.js | MVP ขนาดเล็ก, deploy ง่าย |
| Auth | NextAuth + Facebook | บังคับ FB สำหรับ identity verification |
| API style | REST | เรียบง่าย, ไม่ต้อง learning curve |
| Database | PostgreSQL + Prisma | Type-safe, migration support |
| File storage | Local filesystem | MVP, ย้ายไป S3 ทีหลัง |
| Session | JWT (stateless) | ไม่ต้อง Redis session store |
| Cron | node-cron in-process | MVP, แยก worker ทีหลัง |
| Notification | In-app only | MVP, เพิ่ม LINE/Email ทีหลัง |
| Dispute | Binary (buyer/seller) | MVP simplicity |
| Payment verify | Manual by admin | MVP, เพิ่ม OCR ทีหลัง |
| Rate limit | In-memory | MVP, ย้าย Redis ทีหลัง (reset เมื่อ restart — ยอมรับ) |
| File storage | Outside public/, API-served | ป้องกัน unauthorized access ของ payment slips |
| Payout | Manual by admin | MVP, admin โอนเงินนอกระบบ แล้วกดยืนยัน |
| Cron init | Custom server.ts wrapping Next.js | เพื่อ register node-cron ตอน startup |
