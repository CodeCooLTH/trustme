# SafePay — Escrow Marketplace

ระบบ Escrow สำหรับซื้อขายออนไลน์ C2C ในประเทศไทย

## Quick Start (Development)

### Prerequisites
- Node.js 20+
- PostgreSQL 16 (or Docker)
- Facebook Developer App (for OAuth)

### 1. Setup

```bash
# Install dependencies
npm install

# Copy env file
cp .env.example .env
# Edit .env with your credentials

# Start PostgreSQL
docker compose up db -d

# Run migrations
npx prisma migrate dev

# Seed initial data
npx prisma db seed
```

### 2. Run

```bash
# Development server
npm run dev

# Or with custom server (includes cron jobs)
npm run dev:server
```

Open http://localhost:3000

### 3. Test

```bash
# Start test database
docker compose --profile test up db-test -d
DATABASE_URL="postgresql://safepay:changeme@localhost:5433/safepay_test" npx prisma db push

# Run tests
npx vitest run
```

## Production (Docker)

```bash
# Build and start everything
docker compose --profile production up -d

# Run migrations
docker compose --profile migrate up

# Seed data
docker compose --profile seed up
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Login, Register
│   ├── (public)/          # Public order link
│   ├── (customer)/        # Customer dashboard
│   ├── (admin)/           # Admin panel
│   └── api/               # API routes (36 endpoints)
├── components/            # UI components
├── services/              # Business logic
├── lib/                   # Utilities, auth, Prisma
└── types/                 # TypeScript types
```

## Tech Stack

- Next.js (App Router, TypeScript)
- PostgreSQL 16 + Prisma ORM
- NextAuth.js v4 (Facebook OAuth)
- TailwindCSS
- Docker + Docker Compose
- Vitest (26 tests)

## Escrow Flow

1. Seller สร้างดีล → สร้างลิงก์ส่งให้ผู้ซื้อ
2. Buyer เปิดลิงก์ → โอนเงินมาที่ SafePay → อัพโหลดสลิป
3. Admin ตรวจสลิป → อนุมัติ
4. Seller จัดส่งสินค้า → ใส่เลข tracking
5. Buyer ยืนยันรับสินค้า → ระบบปล่อยเงินให้ Seller
6. (ถ้ามีปัญหา) → เปิด Dispute → Admin ตัดสิน
