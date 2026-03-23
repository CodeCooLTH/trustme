# SafePay Plan 1: Foundation — Setup, Database, Auth & Core Services

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up the project infrastructure, database schema, authentication, and core escrow services (Deal, Order, Escrow state machine) so that subsequent plans can build features on top.

**Architecture:** Monolith Next.js App Router with Prisma ORM connecting to PostgreSQL. Service layer pattern — API routes call services, services call Prisma. Custom server.ts wraps Next.js for cron job support.

**Tech Stack:** Next.js 15 (App Router, TypeScript), PostgreSQL 16, Prisma, NextAuth.js v4 (Facebook OAuth), TailwindCSS, Zod, Docker Compose, node-cron, vitest

**Spec:** `docs/superpowers/specs/2026-03-23-safepay-escrow-design.md`

**Plan series:** This is Plan 1 of 3. Plan 2 covers Payment/Shipping/Dispute/Notifications/Points. Plan 3 covers Frontend/Admin/Docker.

---

## File Structure

```
safepay/
├── .env.example
├── .env.test
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── next.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── vitest.config.ts
├── server.ts                              # Custom server: Next.js + node-cron
├── prisma/
│   ├── schema.prisma                      # Full DB schema with all enums + models
│   └── seed.ts                            # Admin user, system settings, shipping providers
├── uploads/                               # File uploads (outside public/)
│   └── .gitkeep
├── src/
│   ├── middleware.ts                       # NextAuth + role-based route protection
│   ├── app/
│   │   ├── layout.tsx                     # Root layout (Thai font, metadata)
│   │   ├── page.tsx                       # Landing placeholder
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth]/route.ts # NextAuth Facebook OAuth
│   │       ├── deals/
│   │       │   ├── route.ts              # GET (list), POST (create)
│   │       │   └── [id]/
│   │       │       ├── route.ts          # GET, PATCH
│   │       │       └── generate-link/
│   │       │           └── route.ts      # POST generate order link
│   │       └── orders/
│   │           ├── route.ts              # GET (my orders)
│   │           └── [token]/
│   │               ├── route.ts          # GET (public order)
│   │               ├── claim/
│   │               │   └── route.ts      # POST buyer claims order
│   │               └── confirm-receive/
│   │                   └── route.ts      # POST buyer confirms receipt
│   ├── lib/
│   │   ├── prisma.ts                     # Prisma client singleton
│   │   ├── auth.ts                       # NextAuth config + helpers
│   │   ├── errors.ts                     # AppError class + error codes
│   │   ├── api-response.ts              # Standardized API response helpers
│   │   ├── validations/
│   │   │   ├── deal.schema.ts           # Zod schemas for deal endpoints
│   │   │   └── order.schema.ts          # Zod schemas for order endpoints
│   │   └── utils.ts                     # Shared utilities
│   ├── services/
│   │   ├── deal.service.ts              # Deal CRUD + lifecycle
│   │   ├── order.service.ts             # Order CRUD + public token
│   │   └── escrow.service.ts            # State machine + transition logic
│   └── types/
│       ├── index.ts                     # Shared TypeScript types + enums
│       └── next-auth.d.ts              # NextAuth type extensions
├── tests/
│   ├── setup.ts                         # Vitest global setup
│   ├── helpers.ts                       # Test factories + utilities
│   ├── services/
│   │   ├── deal.service.test.ts
│   │   ├── order.service.test.ts
│   │   └── escrow.service.test.ts
│   └── api/
│       ├── deals.test.ts
│       └── orders.test.ts
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `.env.example`, `.env.test`, `.gitignore`, `vitest.config.ts`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/craftman/Projects/safepay
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
```

Accept defaults. This creates the base Next.js project with App Router + TailwindCSS.

- [ ] **Step 2: Install dependencies**

```bash
npm install prisma @prisma/client next-auth@4 @next-auth/prisma-adapter zod uuid node-cron
npm install -D vitest @vitejs/plugin-react @types/uuid @types/node-cron tsx
```

**Important:** Use `next-auth@4` (not v5/Auth.js) with `@next-auth/prisma-adapter` (v4 adapter, NOT `@auth/prisma-adapter` which is v5).

- [ ] **Step 3: Create .env.example**

Create `.env.example`:
```env
# Database
DATABASE_URL="postgresql://safepay:changeme@localhost:5432/safepay"
DB_PASSWORD="changeme"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Facebook OAuth
FACEBOOK_CLIENT_ID=""
FACEBOOK_CLIENT_SECRET=""

# App
NEXT_PUBLIC_APP_NAME="SafePay"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Upload
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE_MB="5"

# Escrow
CONFIRM_DEADLINE_DAYS="3"
```

- [ ] **Step 4: Create .env.test**

Create `.env.test`:
```env
DATABASE_URL="postgresql://safepay:changeme@localhost:5432/safepay_test"
NEXTAUTH_SECRET="test-secret-key-for-testing-only"
NEXTAUTH_URL="http://localhost:3000"
```

- [ ] **Step 5: Configure vitest**

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    env: {
      DATABASE_URL: 'postgresql://safepay:changeme@localhost:5432/safepay_test',
      NEXTAUTH_SECRET: 'test-secret',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 6: Create test setup**

Create `tests/setup.ts`:
```typescript
import { beforeEach, afterAll } from 'vitest'
import { prisma } from '@/lib/prisma'

beforeEach(async () => {
  // Clean all tables before each test
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ')

  if (tables.length) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
  }
})

afterAll(async () => {
  await prisma.$disconnect()
})
```

- [ ] **Step 7: Create uploads directory with .gitkeep**

```bash
mkdir -p uploads
touch uploads/.gitkeep
```

- [ ] **Step 8: Update .gitignore**

Ensure `.gitignore` includes:
```
node_modules/
.next/
.env
.env.local
.env.test
uploads/*
!uploads/.gitkeep
*.log
.DS_Store
```

- [ ] **Step 9: Update next.config.ts for standalone output**

Edit `next.config.ts`:
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
}

export default nextConfig
```

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with dependencies"
```

---

## Task 2: Prisma Schema

**Files:**
- Create: `prisma/schema.prisma`

- [ ] **Step 1: Initialize Prisma**

```bash
npx prisma init
```

This creates `prisma/schema.prisma` with a default config.

- [ ] **Step 2: Write complete Prisma schema**

Replace `prisma/schema.prisma` with the full schema:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  BUYER
  SELLER
  ADMIN
}

enum DealStatus {
  DRAFT
  ACTIVE
  CLOSED
}

enum OrderStatus {
  PENDING_PAYMENT
  PAYMENT_UPLOADED
  PAYMENT_RECEIVED
  SHIPPING
  DELIVERED
  COMPLETED
  CANCELLED
  DISPUTE
  REFUNDED
  RELEASED
}

enum PaymentStatus {
  PENDING
  APPROVED
  REJECTED
}

enum DisputeStatus {
  OPEN
  RESOLVED_BUYER
  RESOLVED_SELLER
}

enum ShipmentStatus {
  SHIPPED
  IN_TRANSIT
  DELIVERED
}

model User {
  id         String   @id @default(cuid())
  facebookId String   @unique
  name       String
  email      String?
  avatar     String?
  role       UserRole
  points     Int      @default(0)
  isActive   Boolean  @default(true)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  accounts         Account[]
  sellerBankAccount SellerBankAccount?
  deals            Deal[]             @relation("SellerDeals")
  buyerOrders      Order[]            @relation("BuyerOrders")
  openedDisputes   Dispute[]          @relation("DisputeOpener")
  resolvedDisputes Dispute[]          @relation("DisputeResolver")
  verifiedPayments Payment[]          @relation("PaymentVerifier")
  disputeMessages  DisputeMessage[]
  notifications    Notification[]
  pointHistories   PointHistory[]

  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model SellerBankAccount {
  id          String   @id @default(cuid())
  userId      String   @unique
  bankName    String
  accountNo   String
  accountName String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("seller_bank_accounts")
}

model Deal {
  id             String     @id @default(cuid())
  sellerId       String
  productName    String
  description    String     @db.Text
  price          Decimal    @db.Decimal(12, 2)
  images         Json       @default("[]")
  shippingMethod String
  status         DealStatus @default(DRAFT)
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt

  seller User    @relation("SellerDeals", fields: [sellerId], references: [id])
  orders Order[]

  @@index([sellerId])
  @@index([status])
  @@map("deals")
}

model Order {
  id              String      @id @default(cuid())
  dealId          String
  buyerId         String?
  publicToken     String      @unique @default(uuid())
  amount          Decimal     @db.Decimal(12, 2)
  status          OrderStatus @default(PENDING_PAYMENT)
  idempotencyKey  String?
  confirmDeadline DateTime?
  paymentAttempts Int         @default(0)
  payoutConfirmed Boolean     @default(false)
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  completedAt     DateTime?

  deal         Deal          @relation(fields: [dealId], references: [id])
  buyer        User?         @relation("BuyerOrders", fields: [buyerId], references: [id])
  payments     Payment[]
  shipment     Shipment?
  dispute      Dispute?
  notifications Notification[]
  pointHistories PointHistory[]

  @@index([buyerId])
  @@index([dealId])
  @@index([status])
  @@index([payoutConfirmed])
  @@map("orders")
}

model Payment {
  id             String        @id @default(cuid())
  orderId        String
  amount         Decimal       @db.Decimal(12, 2)
  slipImage      String
  status         PaymentStatus @default(PENDING)
  idempotencyKey String        @unique
  verifiedBy     String?
  verifiedAt     DateTime?
  rejectedReason String?
  createdAt      DateTime      @default(now())

  order    Order @relation(fields: [orderId], references: [id])
  verifier User? @relation("PaymentVerifier", fields: [verifiedBy], references: [id])

  @@index([orderId])
  @@index([status])
  @@map("payments")
}

model Shipment {
  id          String         @id @default(cuid())
  orderId     String         @unique
  provider    String
  trackingNo  String
  status      ShipmentStatus @default(SHIPPED)
  shippedAt   DateTime       @default(now())
  deliveredAt DateTime?

  order           Order            @relation(fields: [orderId], references: [id])
  trackingUpdates TrackingUpdate[]

  @@map("shipments")
}

model TrackingUpdate {
  id          String   @id @default(cuid())
  shipmentId  String
  status      String
  description String
  createdAt   DateTime @default(now())

  shipment Shipment @relation(fields: [shipmentId], references: [id])

  @@index([shipmentId])
  @@map("tracking_updates")
}

model Dispute {
  id         String        @id @default(cuid())
  orderId    String        @unique
  openedBy   String
  reason     String        @db.Text
  evidence   Json          @default("[]")
  status     DisputeStatus @default(OPEN)
  resolution String?       @db.Text
  resolvedBy String?
  resolvedAt DateTime?
  createdAt  DateTime      @default(now())

  order    Order            @relation(fields: [orderId], references: [id])
  opener   User             @relation("DisputeOpener", fields: [openedBy], references: [id])
  resolver User?            @relation("DisputeResolver", fields: [resolvedBy], references: [id])
  messages DisputeMessage[]

  @@map("disputes")
}

model DisputeMessage {
  id          String   @id @default(cuid())
  disputeId   String
  senderId    String
  message     String   @db.Text
  attachments Json     @default("[]")
  createdAt   DateTime @default(now())

  dispute Dispute @relation(fields: [disputeId], references: [id])
  sender  User    @relation(fields: [senderId], references: [id])

  @@index([disputeId])
  @@map("dispute_messages")
}

model Notification {
  id             String   @id @default(cuid())
  userId         String
  type           String
  title          String
  message        String
  relatedOrderId String?
  isRead         Boolean  @default(false)
  createdAt      DateTime @default(now())

  user  User   @relation(fields: [userId], references: [id])
  order Order? @relation(fields: [relatedOrderId], references: [id])

  @@index([userId, isRead])
  @@map("notifications")
}

model PointHistory {
  id        String   @id @default(cuid())
  userId    String
  orderId   String?
  amount    Int
  type      String
  createdAt DateTime @default(now())

  user  User   @relation(fields: [userId], references: [id])
  order Order? @relation(fields: [orderId], references: [id])

  @@index([userId])
  @@map("point_histories")
}

model SystemSetting {
  id        String   @id @default(cuid())
  key       String   @unique
  value     String   @db.Text
  updatedAt DateTime @updatedAt

  @@map("system_settings")
}
```

- [ ] **Step 3: Create Prisma client singleton**

Create `src/lib/prisma.ts`:
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

- [ ] **Step 4: Start PostgreSQL and run migration**

```bash
docker compose up db -d    # or start local postgres
cp .env.example .env       # edit DATABASE_URL if needed
npx prisma migrate dev --name init
```

Expected: Migration created successfully, all tables generated.

- [ ] **Step 5: Create seed file**

Create `prisma/seed.ts`:
```typescript
import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. Admin user
  await prisma.user.upsert({
    where: { facebookId: 'admin-system' },
    update: {},
    create: {
      facebookId: 'admin-system',
      name: 'System Admin',
      email: 'admin@safepay.co.th',
      role: UserRole.ADMIN,
    },
  })

  // 2. System settings
  const settings = [
    {
      key: 'bank_account',
      value: JSON.stringify({
        bank: 'กสิกรไทย',
        accountNo: '012-345-6789',
        accountName: 'บจก. เซฟเพย์',
      }),
    },
    {
      key: 'confirm_deadline_days',
      value: '3',
    },
    {
      key: 'shipping_providers',
      value: JSON.stringify([
        'ไปรษณีย์ไทย',
        'Kerry Express',
        'Flash Express',
        'J&T Express',
        'Ninja Van',
        'DHL',
        'Best Express',
      ]),
    },
    {
      key: 'max_payment_attempts',
      value: '3',
    },
  ]

  for (const setting of settings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
  }

  console.log('Seed completed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

- [ ] **Step 6: Add seed command to package.json**

Add to `package.json`:
```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

- [ ] **Step 7: Run seed**

```bash
npx prisma db seed
```

Expected: "Seed completed"

- [ ] **Step 8: Commit**

```bash
git add prisma/ src/lib/prisma.ts
git commit -m "feat: add Prisma schema with all models and seed data"
```

---

## Task 3: Shared Types, Errors & API Response Helpers

**Files:**
- Create: `src/types/index.ts`, `src/lib/errors.ts`, `src/lib/api-response.ts`, `src/lib/utils.ts`

- [ ] **Step 1: Create shared types**

Create `src/types/index.ts`:
```typescript
import type { User, Deal, Order, Payment, Shipment, Dispute } from '@prisma/client'

// Re-export Prisma enums for convenience
export {
  UserRole,
  DealStatus,
  OrderStatus,
  PaymentStatus,
  DisputeStatus,
  ShipmentStatus,
} from '@prisma/client'

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface PaginationParams {
  page: number
  limit: number
}

// Order status transitions (state machine definition)
export const ORDER_STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING_PAYMENT: ['PAYMENT_UPLOADED', 'CANCELLED'],
  PAYMENT_UPLOADED: ['PAYMENT_RECEIVED', 'PENDING_PAYMENT', 'CANCELLED'],  // PENDING_PAYMENT = reject
  PAYMENT_RECEIVED: ['SHIPPING'],
  SHIPPING: ['DELIVERED'],
  DELIVERED: ['COMPLETED', 'DISPUTE'],
  DISPUTE: ['REFUNDED', 'RELEASED'],
  // Terminal states: COMPLETED, CANCELLED, REFUNDED, RELEASED
}

// Deal status transitions
export const DEAL_STATUS_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['ACTIVE'],
  ACTIVE: ['CLOSED'],
  // Terminal: CLOSED
}
```

- [ ] **Step 2: Create error handling**

Create `src/lib/errors.ts`:
```typescript
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 400,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} ไม่พบ`, 404, 'NOT_FOUND')
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'ไม่มีสิทธิ์เข้าถึง') {
    super(message, 401, 'UNAUTHORIZED')
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'ไม่มีสิทธิ์ดำเนินการ') {
    super(message, 403, 'FORBIDDEN')
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT')
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 422, 'VALIDATION_ERROR')
  }
}
```

- [ ] **Step 3: Create API response helpers**

Create `src/lib/api-response.ts`:
```typescript
import { NextResponse } from 'next/server'
import { AppError } from './errors'
import { ZodError } from 'zod'
import type { ApiResponse, PaginatedResponse } from '@/types'

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data } satisfies ApiResponse<T>, { status })
}

export function paginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
) {
  const response: PaginatedResponse<T> = {
    success: true,
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  }
  return NextResponse.json(response)
}

export function errorResponse(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { success: false, error: error.errors[0]?.message ?? 'ข้อมูลไม่ถูกต้อง' },
      { status: 422 }
    )
  }

  if (error instanceof AppError) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode }
    )
  }

  console.error('Unhandled error:', error)
  return NextResponse.json(
    { success: false, error: 'เกิดข้อผิดพลาดภายในระบบ' },
    { status: 500 }
  )
}
```

- [ ] **Step 4: Create utility functions**

Create `src/lib/utils.ts`:
```typescript
import type { PaginationParams } from '@/types'

export function parsePagination(searchParams: URLSearchParams): PaginationParams {
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)))
  return { page, limit }
}

export function paginationToSkipTake(params: PaginationParams) {
  return {
    skip: (params.page - 1) * params.limit,
    take: params.limit,
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add src/types/ src/lib/errors.ts src/lib/api-response.ts src/lib/utils.ts
git commit -m "feat: add shared types, error classes, and API response helpers"
```

---

## Task 4: NextAuth + Facebook OAuth

**Files:**
- Create: `src/lib/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`, `src/middleware.ts`

- [ ] **Step 1: Create NextAuth configuration (complete file)**

Create `src/lib/auth.ts`:
```typescript
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import FacebookProvider from 'next-auth/providers/facebook'
import { getServerSession } from 'next-auth'
import { prisma } from './prisma'
import { UserRole } from '@prisma/client'
import { UnauthorizedError, ForbiddenError } from './errors'

// Custom adapter that injects facebookId and role on user creation
const customAdapter = {
  ...PrismaAdapter(prisma),
  createUser: async (data: { name?: string; email?: string; image?: string; emailVerified?: Date | null }) => {
    // Note: facebookId will be set in the jwt callback after account is linked
    // We create with a temporary facebookId that gets updated
    return prisma.user.create({
      data: {
        facebookId: `temp-${Date.now()}`, // temporary, updated in jwt callback
        name: data.name ?? '',
        email: data.email,
        avatar: data.image,
        role: UserRole.BUYER, // default role
      },
    })
  },
}

export const authOptions: NextAuthOptions = {
  adapter: customAdapter as any,
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        // First login — update facebookId from the temporary value
        const dbUser = await prisma.user.update({
          where: { id: user.id },
          data: { facebookId: account.providerAccountId },
        })

        token.userId = dbUser.id
        token.role = dbUser.role
        token.facebookId = dbUser.facebookId
      } else if (token.userId) {
        // Subsequent requests — refresh role from DB (in case admin changed it)
        const dbUser = await prisma.user.findUnique({
          where: { id: token.userId as string },
          select: { role: true },
        })
        if (dbUser) {
          token.role = dbUser.role
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string
        session.user.role = token.role as UserRole
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
}

// Auth helpers for API routes
export async function getSession() {
  return getServerSession(authOptions)
}

export async function requireAuth() {
  const session = await getSession()
  if (!session?.user) {
    throw new UnauthorizedError()
  }
  return session.user
}

export async function requireRole(...roles: UserRole[]) {
  const user = await requireAuth()
  if (!roles.includes(user.role)) {
    throw new ForbiddenError()
  }
  return user
}
```

- [ ] **Step 2: Create NextAuth route handler**

Create `src/app/api/auth/[...nextauth]/route.ts`:
```typescript
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

- [ ] **Step 3: Extend NextAuth types**

Create `src/types/next-auth.d.ts`:
```typescript
import { UserRole } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: UserRole
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string
    role: UserRole
    facebookId: string
  }
}
```

- [ ] **Step 4: Create middleware for route protection**

Create `src/middleware.ts`:
```typescript
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Admin routes — require ADMIN role
    if (path.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Customer routes — require BUYER or SELLER
    if (
      (path.startsWith('/dashboard') ||
        path.startsWith('/deals') ||
        path.startsWith('/disputes') ||
        path.startsWith('/notifications') ||
        path.startsWith('/profile')) &&
      !token?.role
    ) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname
        // Public paths — allow without auth
        if (
          path === '/' ||
          path.startsWith('/login') ||
          path.startsWith('/register') ||
          path.startsWith('/orders/') ||
          path.startsWith('/tracking/') ||
          path.startsWith('/api/auth') ||
          path.startsWith('/api/orders/') // public token access
        ) {
          return true
        }
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
}
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/auth.ts src/app/api/auth/ src/types/next-auth.d.ts src/middleware.ts
git commit -m "feat: add NextAuth with Facebook OAuth and role-based middleware"
```

---

## Task 5: Zod Validation Schemas

**Files:**
- Create: `src/lib/validations/deal.schema.ts`, `src/lib/validations/order.schema.ts`

- [ ] **Step 1: Create deal validation schemas**

Create `src/lib/validations/deal.schema.ts`:
```typescript
import { z } from 'zod'

export const createDealSchema = z.object({
  productName: z.string().min(1, 'กรุณาใส่ชื่อสินค้า').max(200),
  description: z.string().min(1, 'กรุณาใส่รายละเอียด').max(5000),
  price: z.number().positive('ราคาต้องมากกว่า 0'),
  images: z.array(z.string()).default([]),
  shippingMethod: z.string().min(1, 'กรุณาเลือกวิธีจัดส่ง'),
})

export const updateDealSchema = z.object({
  productName: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(5000).optional(),
  price: z.number().positive().optional(),
  images: z.array(z.string()).optional(),
  shippingMethod: z.string().min(1).optional(),
  status: z.enum(['ACTIVE', 'CLOSED']).optional(), // DRAFT→ACTIVE or ACTIVE→CLOSED
})

export type CreateDealInput = z.infer<typeof createDealSchema>
export type UpdateDealInput = z.infer<typeof updateDealSchema>
```

- [ ] **Step 2: Create order validation schemas**

Create `src/lib/validations/order.schema.ts`:
```typescript
import { z } from 'zod'

export const claimOrderSchema = z.object({
  // No body needed — buyer is taken from session
})

export const confirmReceiveSchema = z.object({
  photos: z.array(z.string()).min(1, 'กรุณาอัพโหลดรูปหลักฐานอย่างน้อย 1 รูป'),
})

export type ConfirmReceiveInput = z.infer<typeof confirmReceiveSchema>
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/validations/
git commit -m "feat: add Zod validation schemas for deals and orders"
```

---

## Task 6: Deal Service

**Files:**
- Create: `src/services/deal.service.ts`, `tests/services/deal.service.test.ts`, `tests/helpers.ts`

- [ ] **Step 1: Create test helpers**

Create `tests/helpers.ts`:
```typescript
import { prisma } from '@/lib/prisma'
import { UserRole, DealStatus } from '@prisma/client'

export async function createTestUser(overrides: Partial<{
  facebookId: string
  name: string
  role: UserRole
  points: number
}> = {}) {
  return prisma.user.create({
    data: {
      facebookId: overrides.facebookId ?? `fb-${Date.now()}-${Math.random()}`,
      name: overrides.name ?? 'Test User',
      role: overrides.role ?? UserRole.SELLER,
      points: overrides.points ?? 0,
    },
  })
}

export async function createTestSellerWithBank(overrides: Partial<{
  name: string
}> = {}) {
  const seller = await createTestUser({ role: UserRole.SELLER, ...overrides })
  await prisma.sellerBankAccount.create({
    data: {
      userId: seller.id,
      bankName: 'กสิกรไทย',
      accountNo: '012-345-6789',
      accountName: seller.name,
    },
  })
  return seller
}

export async function createTestDeal(sellerId: string, overrides: Partial<{
  productName: string
  price: number
  status: DealStatus
}> = {}) {
  return prisma.deal.create({
    data: {
      sellerId,
      productName: overrides.productName ?? 'iPhone 15',
      description: 'สภาพดี ใช้งาน 6 เดือน',
      price: overrides.price ?? 25000,
      shippingMethod: 'Kerry Express',
      status: overrides.status ?? DealStatus.DRAFT,
      images: [],
    },
  })
}

export async function seedSystemSettings() {
  const settings = [
    { key: 'confirm_deadline_days', value: '3' },
    { key: 'max_payment_attempts', value: '3' },
    {
      key: 'shipping_providers',
      value: JSON.stringify(['Kerry Express', 'Flash Express', 'ไปรษณีย์ไทย']),
    },
    {
      key: 'bank_account',
      value: JSON.stringify({
        bank: 'กสิกรไทย',
        accountNo: '012-345-6789',
        accountName: 'บจก. เซฟเพย์',
      }),
    },
  ]

  for (const s of settings) {
    await prisma.systemSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    })
  }
}
```

- [ ] **Step 2: Write failing tests for deal service**

Create `tests/services/deal.service.test.ts`:
```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { createTestUser, createTestSellerWithBank, createTestDeal, seedSystemSettings } from '../helpers'
import { DealService } from '@/services/deal.service'
import { DealStatus, UserRole } from '@prisma/client'

describe('DealService', () => {
  beforeEach(async () => {
    await seedSystemSettings()
  })

  describe('create', () => {
    it('should create a deal in DRAFT status', async () => {
      const seller = await createTestSellerWithBank()
      const deal = await DealService.create(seller.id, {
        productName: 'MacBook Pro',
        description: 'M3 chip, 16GB RAM',
        price: 45000,
        images: [],
        shippingMethod: 'Kerry Express',
      })

      expect(deal.productName).toBe('MacBook Pro')
      expect(deal.status).toBe(DealStatus.DRAFT)
      expect(deal.sellerId).toBe(seller.id)
    })

    it('should reject if seller has no bank account', async () => {
      const seller = await createTestUser({ role: UserRole.SELLER })
      await expect(
        DealService.create(seller.id, {
          productName: 'Test',
          description: 'Test',
          price: 100,
          images: [],
          shippingMethod: 'Kerry Express',
        })
      ).rejects.toThrow('กรุณาเพิ่มบัญชีธนาคารก่อนสร้างดีล')
    })

    it('should reject invalid shipping method', async () => {
      const seller = await createTestSellerWithBank()
      await expect(
        DealService.create(seller.id, {
          productName: 'Test',
          description: 'Test',
          price: 100,
          images: [],
          shippingMethod: 'Invalid Provider',
        })
      ).rejects.toThrow('ขนส่งไม่ถูกต้อง')
    })
  })

  describe('publish', () => {
    it('should change DRAFT to ACTIVE', async () => {
      const seller = await createTestSellerWithBank()
      const deal = await createTestDeal(seller.id)

      const updated = await DealService.update(deal.id, seller.id, { status: 'ACTIVE' })
      expect(updated.status).toBe(DealStatus.ACTIVE)
    })

    it('should reject publishing a non-DRAFT deal', async () => {
      const seller = await createTestSellerWithBank()
      const deal = await createTestDeal(seller.id, { status: DealStatus.ACTIVE })

      await expect(
        DealService.update(deal.id, seller.id, { status: 'ACTIVE' })
      ).rejects.toThrow()
    })
  })

  describe('list', () => {
    it('should return only seller own deals', async () => {
      const seller1 = await createTestSellerWithBank({ name: 'Seller 1' })
      const seller2 = await createTestSellerWithBank({ name: 'Seller 2' })

      await createTestDeal(seller1.id)
      await createTestDeal(seller1.id)
      await createTestDeal(seller2.id)

      const { deals, total } = await DealService.list(seller1.id, { page: 1, limit: 20 })
      expect(total).toBe(2)
      expect(deals).toHaveLength(2)
      expect(deals.every((d) => d.sellerId === seller1.id)).toBe(true)
    })
  })

  describe('getById', () => {
    it('should return deal if seller owns it', async () => {
      const seller = await createTestSellerWithBank()
      const deal = await createTestDeal(seller.id)

      const result = await DealService.getById(deal.id, seller.id)
      expect(result.id).toBe(deal.id)
    })

    it('should throw if seller does not own it', async () => {
      const seller1 = await createTestSellerWithBank({ name: 'S1' })
      const seller2 = await createTestSellerWithBank({ name: 'S2' })
      const deal = await createTestDeal(seller1.id)

      await expect(DealService.getById(deal.id, seller2.id)).rejects.toThrow()
    })
  })
})
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
npx vitest run tests/services/deal.service.test.ts
```

Expected: FAIL — `DealService` module not found.

- [ ] **Step 4: Implement deal service**

Create `src/services/deal.service.ts`:
```typescript
import { prisma } from '@/lib/prisma'
import { DealStatus } from '@prisma/client'
import { AppError, NotFoundError, ForbiddenError } from '@/lib/errors'
import { DEAL_STATUS_TRANSITIONS } from '@/types'
import type { CreateDealInput, UpdateDealInput } from '@/lib/validations/deal.schema'
import type { PaginationParams } from '@/types'

export class DealService {
  static async create(sellerId: string, input: CreateDealInput) {
    // Check seller has bank account
    const bankAccount = await prisma.sellerBankAccount.findUnique({
      where: { userId: sellerId },
    })
    if (!bankAccount) {
      throw new AppError('กรุณาเพิ่มบัญชีธนาคารก่อนสร้างดีล', 400)
    }

    // Validate shipping method
    await this.validateShippingMethod(input.shippingMethod)

    return prisma.deal.create({
      data: {
        sellerId,
        productName: input.productName,
        description: input.description,
        price: input.price,
        images: input.images,
        shippingMethod: input.shippingMethod,
        status: DealStatus.DRAFT,
      },
    })
  }

  static async update(dealId: string, sellerId: string, input: UpdateDealInput) {
    const deal = await this.getById(dealId, sellerId)

    // Check status transition if status change requested
    if (input.status) {
      const allowed = DEAL_STATUS_TRANSITIONS[deal.status]
      if (!allowed?.includes(input.status)) {
        throw new AppError(
          `ไม่สามารถเปลี่ยนสถานะจาก ${deal.status} เป็น ${input.status}`,
          400
        )
      }
    }

    // Can only edit DRAFT or ACTIVE deals
    if (deal.status === DealStatus.CLOSED) {
      throw new AppError('ไม่สามารถแก้ไขดีลที่ปิดแล้ว', 400)
    }

    if (input.shippingMethod) {
      await this.validateShippingMethod(input.shippingMethod)
    }

    return prisma.deal.update({
      where: { id: dealId },
      data: {
        ...(input.productName && { productName: input.productName }),
        ...(input.description && { description: input.description }),
        ...(input.price && { price: input.price }),
        ...(input.images && { images: input.images }),
        ...(input.shippingMethod && { shippingMethod: input.shippingMethod }),
        ...(input.status && { status: input.status as DealStatus }),
      },
    })
  }

  static async getById(dealId: string, sellerId: string) {
    const deal = await prisma.deal.findUnique({
      where: { id: dealId },
      include: { orders: true },
    })

    if (!deal) throw new NotFoundError('ดีล')
    if (deal.sellerId !== sellerId) throw new ForbiddenError('ไม่ใช่ดีลของคุณ')

    return deal
  }

  static async list(sellerId: string, pagination: PaginationParams) {
    const { page, limit } = pagination
    const skip = (page - 1) * limit

    const [deals, total] = await Promise.all([
      prisma.deal.findMany({
        where: { sellerId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: { _count: { select: { orders: true } } },
      }),
      prisma.deal.count({ where: { sellerId } }),
    ])

    return { deals, total }
  }

  private static async validateShippingMethod(method: string) {
    const setting = await prisma.systemSetting.findUnique({
      where: { key: 'shipping_providers' },
    })

    if (!setting) throw new AppError('ไม่พบการตั้งค่าขนส่ง', 500)

    const providers = JSON.parse(setting.value) as string[]
    if (!providers.includes(method)) {
      throw new AppError('ขนส่งไม่ถูกต้อง', 400)
    }
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npx vitest run tests/services/deal.service.test.ts
```

Expected: All tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/services/deal.service.ts tests/
git commit -m "feat: add DealService with CRUD, lifecycle validation, and tests"
```

---

## Task 7: Order Service

**Files:**
- Create: `src/services/order.service.ts`, `tests/services/order.service.test.ts`

- [ ] **Step 1: Write failing tests for order service**

Create `tests/services/order.service.test.ts`:
```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import {
  createTestUser,
  createTestSellerWithBank,
  createTestDeal,
  seedSystemSettings,
} from '../helpers'
import { OrderService } from '@/services/order.service'
import { DealStatus, OrderStatus, UserRole } from '@prisma/client'
import { prisma } from '@/lib/prisma'

describe('OrderService', () => {
  beforeEach(async () => {
    await seedSystemSettings()
  })

  describe('generateLink', () => {
    it('should create an order with a public token', async () => {
      const seller = await createTestSellerWithBank()
      const deal = await createTestDeal(seller.id, { status: DealStatus.ACTIVE })

      const order = await OrderService.generateLink(deal.id, seller.id)

      expect(order.publicToken).toBeDefined()
      expect(order.publicToken).toHaveLength(36) // UUID v4
      expect(order.status).toBe(OrderStatus.PENDING_PAYMENT)
      expect(order.amount.toString()).toBe('25000')
      expect(order.dealId).toBe(deal.id)
    })

    it('should reject if deal is not ACTIVE', async () => {
      const seller = await createTestSellerWithBank()
      const deal = await createTestDeal(seller.id) // DRAFT

      await expect(
        OrderService.generateLink(deal.id, seller.id)
      ).rejects.toThrow('ดีลต้องเป็นสถานะ ACTIVE')
    })

    it('should reject if seller does not own the deal', async () => {
      const seller1 = await createTestSellerWithBank({ name: 'S1' })
      const seller2 = await createTestSellerWithBank({ name: 'S2' })
      const deal = await createTestDeal(seller1.id, { status: DealStatus.ACTIVE })

      await expect(
        OrderService.generateLink(deal.id, seller2.id)
      ).rejects.toThrow()
    })
  })

  describe('getByToken', () => {
    it('should return order with deal info', async () => {
      const seller = await createTestSellerWithBank()
      const deal = await createTestDeal(seller.id, { status: DealStatus.ACTIVE })
      const order = await OrderService.generateLink(deal.id, seller.id)

      const result = await OrderService.getByToken(order.publicToken)

      expect(result.id).toBe(order.id)
      expect(result.deal).toBeDefined()
      expect(result.deal.productName).toBe('iPhone 15')
    })

    it('should throw if token does not exist', async () => {
      await expect(
        OrderService.getByToken('non-existent-token')
      ).rejects.toThrow()
    })
  })

  describe('claim', () => {
    it('should assign buyer to order', async () => {
      const seller = await createTestSellerWithBank()
      const buyer = await createTestUser({ role: UserRole.BUYER })
      const deal = await createTestDeal(seller.id, { status: DealStatus.ACTIVE })
      const order = await OrderService.generateLink(deal.id, seller.id)

      const claimed = await OrderService.claim(order.publicToken, buyer.id)

      expect(claimed.buyerId).toBe(buyer.id)
    })

    it('should reject if buyer is the seller', async () => {
      const seller = await createTestSellerWithBank()
      const deal = await createTestDeal(seller.id, { status: DealStatus.ACTIVE })
      const order = await OrderService.generateLink(deal.id, seller.id)

      await expect(
        OrderService.claim(order.publicToken, seller.id)
      ).rejects.toThrow('ไม่สามารถซื้อสินค้าของตัวเอง')
    })

    it('should reject if already claimed by another buyer', async () => {
      const seller = await createTestSellerWithBank()
      const buyer1 = await createTestUser({ role: UserRole.BUYER, name: 'B1' })
      const buyer2 = await createTestUser({ role: UserRole.BUYER, name: 'B2' })
      const deal = await createTestDeal(seller.id, { status: DealStatus.ACTIVE })
      const order = await OrderService.generateLink(deal.id, seller.id)

      await OrderService.claim(order.publicToken, buyer1.id)

      await expect(
        OrderService.claim(order.publicToken, buyer2.id)
      ).rejects.toThrow('ออเดอร์นี้มีผู้ซื้อแล้ว')
    })
  })

  describe('listByUser', () => {
    it('should return buyer orders for BUYER role', async () => {
      const seller = await createTestSellerWithBank()
      const buyer = await createTestUser({ role: UserRole.BUYER })
      const deal = await createTestDeal(seller.id, { status: DealStatus.ACTIVE })
      const order = await OrderService.generateLink(deal.id, seller.id)
      await OrderService.claim(order.publicToken, buyer.id)

      const { orders, total } = await OrderService.listByUser(
        buyer.id,
        UserRole.BUYER,
        { page: 1, limit: 20 }
      )

      expect(total).toBe(1)
      expect(orders[0].buyerId).toBe(buyer.id)
    })

    it('should return seller orders for SELLER role', async () => {
      const seller = await createTestSellerWithBank()
      const deal = await createTestDeal(seller.id, { status: DealStatus.ACTIVE })
      await OrderService.generateLink(deal.id, seller.id)

      const { orders, total } = await OrderService.listByUser(
        seller.id,
        UserRole.SELLER,
        { page: 1, limit: 20 }
      )

      expect(total).toBe(1)
    })
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run tests/services/order.service.test.ts
```

Expected: FAIL — `OrderService` module not found.

- [ ] **Step 3: Implement order service**

Create `src/services/order.service.ts`:
```typescript
import { prisma } from '@/lib/prisma'
import { DealStatus, OrderStatus, UserRole } from '@prisma/client'
import { AppError, NotFoundError, ForbiddenError, ConflictError } from '@/lib/errors'
import type { PaginationParams } from '@/types'

export class OrderService {
  static async generateLink(dealId: string, sellerId: string) {
    const deal = await prisma.deal.findUnique({ where: { id: dealId } })

    if (!deal) throw new NotFoundError('ดีล')
    if (deal.sellerId !== sellerId) throw new ForbiddenError('ไม่ใช่ดีลของคุณ')
    if (deal.status !== DealStatus.ACTIVE) {
      throw new AppError('ดีลต้องเป็นสถานะ ACTIVE ก่อนสร้างลิงก์', 400)
    }

    return prisma.order.create({
      data: {
        dealId: deal.id,
        amount: deal.price,
        status: OrderStatus.PENDING_PAYMENT,
      },
    })
  }

  static async getByToken(publicToken: string) {
    const order = await prisma.order.findUnique({
      where: { publicToken },
      include: {
        deal: {
          include: {
            seller: {
              select: { id: true, name: true, avatar: true, points: true },
            },
          },
        },
        buyer: {
          select: { id: true, name: true, avatar: true },
        },
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        shipment: {
          include: { trackingUpdates: { orderBy: { createdAt: 'desc' } } },
        },
        dispute: true,
      },
    })

    if (!order) throw new NotFoundError('ออเดอร์')

    return order
  }

  static async claim(publicToken: string, buyerId: string) {
    const order = await prisma.order.findUnique({
      where: { publicToken },
      include: { deal: true },
    })

    if (!order) throw new NotFoundError('ออเดอร์')

    // Prevent buying own item
    if (order.deal.sellerId === buyerId) {
      throw new AppError('ไม่สามารถซื้อสินค้าของตัวเอง', 400)
    }

    // Check if already claimed
    if (order.buyerId && order.buyerId !== buyerId) {
      throw new ConflictError('ออเดอร์นี้มีผู้ซื้อแล้ว')
    }

    // Already claimed by this buyer — return as-is
    if (order.buyerId === buyerId) {
      return order
    }

    return prisma.order.update({
      where: { id: order.id },
      data: { buyerId },
    })
  }

  static async listByUser(
    userId: string,
    role: UserRole,
    pagination: PaginationParams
  ) {
    const { page, limit } = pagination
    const skip = (page - 1) * limit

    const where =
      role === UserRole.BUYER
        ? { buyerId: userId }
        : { deal: { sellerId: userId } }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          deal: {
            select: { productName: true, images: true, shippingMethod: true },
          },
          buyer: { select: { name: true, avatar: true } },
          payments: { orderBy: { createdAt: 'desc' }, take: 1 },
          shipment: true,
        },
      }),
      prisma.order.count({ where }),
    ])

    return { orders, total }
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run tests/services/order.service.test.ts
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/services/order.service.ts tests/services/order.service.test.ts
git commit -m "feat: add OrderService with generate-link, claim, list, and tests"
```

---

## Task 8: Escrow State Machine Service

**Files:**
- Create: `src/services/escrow.service.ts`, `tests/services/escrow.service.test.ts`

- [ ] **Step 1: Write failing tests for escrow service**

Create `tests/services/escrow.service.test.ts`:
```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import {
  createTestUser,
  createTestSellerWithBank,
  createTestDeal,
  seedSystemSettings,
} from '../helpers'
import { EscrowService } from '@/services/escrow.service'
import { DealStatus, OrderStatus, UserRole } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { OrderService } from '@/services/order.service'

async function createOrderInStatus(status: OrderStatus) {
  const seller = await createTestSellerWithBank()
  const buyer = await createTestUser({ role: UserRole.BUYER })
  const deal = await createTestDeal(seller.id, { status: DealStatus.ACTIVE })
  const order = await OrderService.generateLink(deal.id, seller.id)
  await OrderService.claim(order.publicToken, buyer.id)

  // Manually set status for test setup
  if (status !== OrderStatus.PENDING_PAYMENT) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status, buyerId: buyer.id },
    })
  }

  return { seller, buyer, deal, order: { ...order, status, buyerId: buyer.id } }
}

describe('EscrowService', () => {
  beforeEach(async () => {
    await seedSystemSettings()
  })

  describe('transition', () => {
    it('should allow valid transition: PENDING_PAYMENT → PAYMENT_UPLOADED', async () => {
      const { order } = await createOrderInStatus(OrderStatus.PENDING_PAYMENT)

      const result = await EscrowService.transition(
        order.id,
        OrderStatus.PENDING_PAYMENT,
        OrderStatus.PAYMENT_UPLOADED
      )

      expect(result.status).toBe(OrderStatus.PAYMENT_UPLOADED)
    })

    it('should allow valid transition: PENDING_PAYMENT → CANCELLED', async () => {
      const { order } = await createOrderInStatus(OrderStatus.PENDING_PAYMENT)

      const result = await EscrowService.transition(
        order.id,
        OrderStatus.PENDING_PAYMENT,
        OrderStatus.CANCELLED
      )

      expect(result.status).toBe(OrderStatus.CANCELLED)
    })

    it('should reject invalid transition: PENDING_PAYMENT → COMPLETED', async () => {
      const { order } = await createOrderInStatus(OrderStatus.PENDING_PAYMENT)

      await expect(
        EscrowService.transition(
          order.id,
          OrderStatus.PENDING_PAYMENT,
          OrderStatus.COMPLETED
        )
      ).rejects.toThrow('ไม่สามารถเปลี่ยนสถานะ')
    })

    it('should use atomic conditional update (race condition prevention)', async () => {
      const { order } = await createOrderInStatus(OrderStatus.PENDING_PAYMENT)

      // Simulate race: manually change status before transition
      await prisma.order.update({
        where: { id: order.id },
        data: { status: OrderStatus.CANCELLED },
      })

      await expect(
        EscrowService.transition(
          order.id,
          OrderStatus.PENDING_PAYMENT,
          OrderStatus.PAYMENT_UPLOADED
        )
      ).rejects.toThrow()
    })
  })

  describe('transition to DELIVERED', () => {
    it('should set confirmDeadline when transitioning to DELIVERED', async () => {
      const { order } = await createOrderInStatus(OrderStatus.SHIPPING)

      const result = await EscrowService.transition(
        order.id,
        OrderStatus.SHIPPING,
        OrderStatus.DELIVERED
      )

      expect(result.status).toBe(OrderStatus.DELIVERED)
      expect(result.confirmDeadline).toBeDefined()
      expect(result.confirmDeadline!.getTime()).toBeGreaterThan(Date.now())
    })
  })

  describe('transition to COMPLETED', () => {
    it('should set completedAt when transitioning to COMPLETED', async () => {
      const { order } = await createOrderInStatus(OrderStatus.DELIVERED)

      const result = await EscrowService.transition(
        order.id,
        OrderStatus.DELIVERED,
        OrderStatus.COMPLETED
      )

      expect(result.status).toBe(OrderStatus.COMPLETED)
      expect(result.completedAt).toBeDefined()
    })
  })

  describe('autoCompleteOrders', () => {
    it('should auto-complete orders past deadline with no open dispute', async () => {
      const { order } = await createOrderInStatus(OrderStatus.DELIVERED)

      // Set deadline in the past
      await prisma.order.update({
        where: { id: order.id },
        data: { confirmDeadline: new Date(Date.now() - 1000) },
      })

      const count = await EscrowService.autoCompleteOrders()

      expect(count).toBe(1)
      const updated = await prisma.order.findUnique({ where: { id: order.id } })
      expect(updated?.status).toBe(OrderStatus.COMPLETED)
      expect(updated?.completedAt).toBeDefined()
    })

    it('should NOT auto-complete orders with open dispute', async () => {
      const { order, buyer } = await createOrderInStatus(OrderStatus.DELIVERED)

      // Set deadline in past + create open dispute
      await prisma.order.update({
        where: { id: order.id },
        data: {
          confirmDeadline: new Date(Date.now() - 1000),
          status: OrderStatus.DISPUTE,
        },
      })
      await prisma.dispute.create({
        data: {
          orderId: order.id,
          openedBy: buyer.id,
          reason: 'สินค้าเสียหาย',
          status: 'OPEN',
        },
      })

      const count = await EscrowService.autoCompleteOrders()
      expect(count).toBe(0)
    })
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run tests/services/escrow.service.test.ts
```

Expected: FAIL — `EscrowService` module not found.

- [ ] **Step 3: Implement escrow service**

Create `src/services/escrow.service.ts`:
```typescript
import { prisma } from '@/lib/prisma'
import { OrderStatus } from '@prisma/client'
import { AppError } from '@/lib/errors'
import { ORDER_STATUS_TRANSITIONS } from '@/types'

export class EscrowService {
  /**
   * Atomic state transition with conditional update.
   * Only succeeds if current DB status matches expectedStatus.
   */
  static async transition(
    orderId: string,
    expectedStatus: OrderStatus,
    newStatus: OrderStatus
  ) {
    // Validate transition is allowed
    const allowed = ORDER_STATUS_TRANSITIONS[expectedStatus]
    if (!allowed?.includes(newStatus)) {
      throw new AppError(
        `ไม่สามารถเปลี่ยนสถานะจาก ${expectedStatus} เป็น ${newStatus}`,
        400
      )
    }

    // Build additional data for specific transitions
    const additionalData: Record<string, unknown> = {}

    if (newStatus === OrderStatus.DELIVERED) {
      const setting = await prisma.systemSetting.findUnique({
        where: { key: 'confirm_deadline_days' },
      })
      const days = parseInt(setting?.value ?? '3', 10)
      additionalData.confirmDeadline = new Date(
        Date.now() + days * 24 * 60 * 60 * 1000
      )
    }

    if (newStatus === OrderStatus.COMPLETED) {
      additionalData.completedAt = new Date()
    }

    // Atomic conditional update — prevents race conditions
    const result = await prisma.order.updateMany({
      where: {
        id: orderId,
        status: expectedStatus, // Only update if status hasn't changed
      },
      data: {
        status: newStatus,
        ...additionalData,
      },
    })

    if (result.count === 0) {
      throw new AppError(
        'สถานะออเดอร์ถูกเปลี่ยนแปลงแล้ว กรุณาลองใหม่',
        409
      )
    }

    return prisma.order.findUniqueOrThrow({ where: { id: orderId } })
  }

  /**
   * Cron job: auto-complete DELIVERED orders past deadline
   * that do NOT have an open dispute.
   */
  static async autoCompleteOrders(): Promise<number> {
    const now = new Date()

    // Find eligible orders: DELIVERED, past deadline, no OPEN dispute
    const eligibleOrders = await prisma.order.findMany({
      where: {
        status: OrderStatus.DELIVERED,
        confirmDeadline: { lte: now },
        NOT: {
          dispute: { status: 'OPEN' },
        },
      },
      select: { id: true },
    })

    let completed = 0

    for (const order of eligibleOrders) {
      try {
        await this.transition(
          order.id,
          OrderStatus.DELIVERED,
          OrderStatus.COMPLETED
        )
        completed++
        // TODO: Plan 2 will add points and notifications here
      } catch {
        // Skip orders that failed transition (race condition, already changed)
        continue
      }
    }

    if (completed > 0) {
      console.log(`[Cron] Auto-completed ${completed} orders`)
    }

    return completed
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run tests/services/escrow.service.test.ts
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/services/escrow.service.ts tests/services/escrow.service.test.ts
git commit -m "feat: add EscrowService with atomic state machine and auto-complete cron"
```

---

## Task 9: Deal API Routes

**Files:**
- Create: `src/app/api/deals/route.ts`, `src/app/api/deals/[id]/route.ts`, `src/app/api/deals/[id]/generate-link/route.ts`

- [ ] **Step 1: Create deals list + create route**

Create `src/app/api/deals/route.ts`:
```typescript
import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { successResponse, paginatedResponse, errorResponse } from '@/lib/api-response'
import { parsePagination } from '@/lib/utils'
import { DealService } from '@/services/deal.service'
import { createDealSchema } from '@/lib/validations/deal.schema'
import { UserRole } from '@prisma/client'

export async function GET(req: NextRequest) {
  try {
    const user = await requireRole(UserRole.SELLER)
    const pagination = parsePagination(req.nextUrl.searchParams)
    const { deals, total } = await DealService.list(user.id, pagination)
    return paginatedResponse(deals, total, pagination.page, pagination.limit)
  } catch (error) {
    return errorResponse(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole(UserRole.SELLER)
    const body = await req.json()
    const input = createDealSchema.parse(body)
    const deal = await DealService.create(user.id, input)
    return successResponse(deal, 201)
  } catch (error) {
    return errorResponse(error)
  }
}
```

- [ ] **Step 2: Create deal detail + update route**

Create `src/app/api/deals/[id]/route.ts`:
```typescript
import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { DealService } from '@/services/deal.service'
import { updateDealSchema } from '@/lib/validations/deal.schema'
import { UserRole } from '@prisma/client'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole(UserRole.SELLER)
    const { id } = await params
    const deal = await DealService.getById(id, user.id)
    return successResponse(deal)
  } catch (error) {
    return errorResponse(error)
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole(UserRole.SELLER)
    const { id } = await params
    const body = await req.json()
    const input = updateDealSchema.parse(body)
    const deal = await DealService.update(id, user.id, input)
    return successResponse(deal)
  } catch (error) {
    return errorResponse(error)
  }
}
```

- [ ] **Step 3: Create generate-link route**

Create `src/app/api/deals/[id]/generate-link/route.ts`:
```typescript
import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { OrderService } from '@/services/order.service'
import { UserRole } from '@prisma/client'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole(UserRole.SELLER)
    const { id } = await params
    const order = await OrderService.generateLink(id, user.id)

    const orderUrl = `${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.publicToken}`

    return successResponse({ order, orderUrl }, 201)
  } catch (error) {
    return errorResponse(error)
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/api/deals/
git commit -m "feat: add Deal API routes (list, create, update, generate-link)"
```

---

## Task 10: Order API Routes

**Files:**
- Create: `src/app/api/orders/route.ts`, `src/app/api/orders/[token]/route.ts`, `src/app/api/orders/[token]/claim/route.ts`

- [ ] **Step 1: Create orders list route**

Create `src/app/api/orders/route.ts`:
```typescript
import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { paginatedResponse, errorResponse } from '@/lib/api-response'
import { parsePagination } from '@/lib/utils'
import { OrderService } from '@/services/order.service'

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth()
    const pagination = parsePagination(req.nextUrl.searchParams)
    const { orders, total } = await OrderService.listByUser(
      user.id,
      user.role,
      pagination
    )
    return paginatedResponse(orders, total, pagination.page, pagination.limit)
  } catch (error) {
    return errorResponse(error)
  }
}
```

- [ ] **Step 2: Create public order detail route**

Create `src/app/api/orders/[token]/route.ts`:
```typescript
import { NextRequest } from 'next/server'
import { getSession } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { OrderService } from '@/services/order.service'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params
    const order = await OrderService.getByToken(token)
    const session = await getSession()
    const userId = session?.user?.id

    // Determine visibility level
    const isBuyer = userId === order.buyerId
    const isSeller = userId === order.deal.sellerId

    // Get bank account for buyers
    let bankAccount = null
    if (isBuyer) {
      const setting = await prisma.systemSetting.findUnique({
        where: { key: 'bank_account' },
      })
      bankAccount = setting ? JSON.parse(setting.value) : null
    }

    // Public view: basic info only
    const publicData = {
      publicToken: order.publicToken,
      productName: order.deal.productName,
      description: order.deal.description,
      price: order.amount,
      images: order.deal.images,
      shippingMethod: order.deal.shippingMethod,
      status: order.status,
      seller: order.deal.seller,
      createdAt: order.createdAt,
    }

    if (!userId || (!isBuyer && !isSeller)) {
      // Unauthenticated or unrelated user: basic info
      return successResponse({ ...publicData, viewLevel: 'public' })
    }

    if (isBuyer) {
      return successResponse({
        ...publicData,
        viewLevel: 'buyer',
        bankAccount,
        buyer: order.buyer,
        payments: order.payments,
        shipment: order.shipment,
        dispute: order.dispute,
        confirmDeadline: order.confirmDeadline,
      })
    }

    // Seller view
    return successResponse({
      ...publicData,
      viewLevel: 'seller',
      buyer: order.buyer,
      payments: order.payments,
      shipment: order.shipment,
      dispute: order.dispute,
      paymentAttempts: order.paymentAttempts,
    })
  } catch (error) {
    return errorResponse(error)
  }
}
```

- [ ] **Step 3: Create claim route**

Create `src/app/api/orders/[token]/claim/route.ts`:
```typescript
import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { OrderService } from '@/services/order.service'
import { UserRole } from '@prisma/client'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const user = await requireRole(UserRole.BUYER)
    const { token } = await params
    const order = await OrderService.claim(token, user.id)
    return successResponse(order)
  } catch (error) {
    return errorResponse(error)
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/api/orders/
git commit -m "feat: add Order API routes (list, public detail, claim)"
```

---

## Task 11: Confirm Receive Route + Order Service Method

**Files:**
- Modify: `src/services/order.service.ts`
- Create: `src/app/api/orders/[token]/confirm-receive/route.ts`

- [ ] **Step 1: Add confirmReceive method to OrderService**

Add to `src/services/order.service.ts`:
```typescript
  static async confirmReceive(publicToken: string, buyerId: string, photos: string[]) {
    const order = await prisma.order.findUnique({
      where: { publicToken },
      include: { deal: true },
    })

    if (!order) throw new NotFoundError('ออเดอร์')
    if (order.buyerId !== buyerId) throw new ForbiddenError('คุณไม่ใช่ผู้ซื้อของออเดอร์นี้')
    if (order.status !== OrderStatus.DELIVERED) {
      throw new AppError('สามารถยืนยันรับได้เฉพาะเมื่อสถานะเป็น DELIVERED', 400)
    }

    // Use escrow state machine for atomic transition
    const { EscrowService } = await import('./escrow.service')
    return EscrowService.transition(order.id, OrderStatus.DELIVERED, OrderStatus.COMPLETED)
    // TODO: Plan 2 will add points and notifications here
  }
```

- [ ] **Step 2: Create confirm-receive route**

Create `src/app/api/orders/[token]/confirm-receive/route.ts`:
```typescript
import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { OrderService } from '@/services/order.service'
import { confirmReceiveSchema } from '@/lib/validations/order.schema'
import { UserRole } from '@prisma/client'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const user = await requireRole(UserRole.BUYER)
    const { token } = await params
    const body = await req.json()
    const { photos } = confirmReceiveSchema.parse(body)
    const order = await OrderService.confirmReceive(token, user.id, photos)
    return successResponse(order)
  } catch (error) {
    return errorResponse(error)
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/services/order.service.ts src/app/api/orders/
git commit -m "feat: add confirm-receive endpoint for buyer order confirmation"
```

---

## Task 12: Custom Server with Cron

**Files:**
- Create: `server.ts`

- [ ] **Step 1: Create custom server**

Create `server.ts`:
```typescript
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import cron from 'node-cron'

const dev = process.env.NODE_ENV !== 'production'
const hostname = '0.0.0.0'
const port = parseInt(process.env.PORT ?? '3000', 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)

    // Register cron jobs
    // Auto-complete DELIVERED orders past deadline — every hour
    cron.schedule('0 * * * *', async () => {
      console.log('[Cron] Running auto-complete check...')
      try {
        // Dynamic import to avoid circular dependencies
        const { EscrowService } = await import('./src/services/escrow.service')
        await EscrowService.autoCompleteOrders()
      } catch (error) {
        console.error('[Cron] Auto-complete failed:', error)
      }
    })

    console.log('[Cron] Auto-complete cron registered (every hour)')
  })
})
```

- [ ] **Step 2: Add dev:server script to package.json**

Add to `package.json` scripts:
```json
{
  "scripts": {
    "dev:server": "tsx watch server.ts",
    "start:server": "node server.js"
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add server.ts package.json
git commit -m "feat: add custom server.ts with node-cron for auto-complete"
```

---

## Task 13: Minimal Root Layout & Landing Placeholder

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update root layout with Thai metadata**

Edit `src/app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import { Noto_Sans_Thai } from 'next/font/google'
import './globals.css'

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  variable: '--font-noto-sans-thai',
})

export const metadata: Metadata = {
  title: 'SafePay - ระบบ Escrow สำหรับซื้อขายออนไลน์',
  description: 'ระบบกลางพักเงินสำหรับการซื้อขายออนไลน์ ปลอดภัย มั่นใจทุกดีล',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className={`${notoSansThai.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Update landing page placeholder**

Edit `src/app/page.tsx`:
```typescript
export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">SafePay</h1>
        <p className="mt-2 text-gray-600">ระบบ Escrow สำหรับซื้อขายออนไลน์</p>
        <p className="mt-1 text-sm text-gray-400">อยู่ระหว่างพัฒนา</p>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Update tailwind config for Thai font**

Ensure `tailwind.config.ts` includes the font variable:
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans-thai)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx tailwind.config.ts
git commit -m "feat: add root layout with Thai font and landing placeholder"
```

---

## Task 14: Docker Compose (Database Only for Dev)

**Files:**
- Create: `docker-compose.yml`

- [ ] **Step 1: Create docker-compose.yml**

Create `docker-compose.yml`:
```yaml
services:
  db:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: safepay
      POSTGRES_USER: safepay
      POSTGRES_PASSWORD: ${DB_PASSWORD:-changeme}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U safepay"]
      interval: 5s
      retries: 5

  db-test:
    image: postgres:16-alpine
    ports:
      - "5433:5432"
    environment:
      POSTGRES_DB: safepay_test
      POSTGRES_USER: safepay
      POSTGRES_PASSWORD: changeme
    tmpfs:
      - /var/lib/postgresql/data
    profiles:
      - test

volumes:
  pgdata:
```

Note: Full production Docker (app container, Dockerfile, migrate/seed profiles) will be in Plan 3.

- [ ] **Step 2: Update .env.example with DB_PASSWORD**

Already done in Task 1.

- [ ] **Step 3: Commit**

```bash
git add docker-compose.yml
git commit -m "feat: add docker-compose with dev and test PostgreSQL"
```

---

## Task 15: Verify Everything Works End-to-End

- [ ] **Step 1: Start database**

```bash
docker compose up db -d
```

- [ ] **Step 2: Run migration**

```bash
npx prisma migrate dev --name init
```

- [ ] **Step 3: Seed database**

```bash
npx prisma db seed
```

- [ ] **Step 4: Start test database and run tests**

```bash
docker compose --profile test up db-test -d
DATABASE_URL="postgresql://safepay:changeme@localhost:5433/safepay_test" npx prisma db push
npx vitest run
```

Note: `prisma db push` is appropriate for test DB (applies schema without migration history). Migration files must exist from Task 2 Step 4 before this point.

Expected: All service tests pass.

- [ ] **Step 5: Start dev server and verify**

```bash
npm run dev
```

Visit `http://localhost:3000` — should see SafePay landing placeholder.
Visit `http://localhost:3000/api/auth/providers` — should return Facebook provider config (will error without real FB credentials, but route should exist).

- [ ] **Step 6: Final commit if any fixes needed**

```bash
git add -A
git commit -m "chore: verify end-to-end setup and fix any issues"
```

---

## Summary

After completing Plan 1, you will have:

| Component | Status |
|-----------|--------|
| Next.js project scaffold | Done |
| PostgreSQL + Prisma schema (all 12 tables) | Done |
| Seed data (admin, settings, providers) | Done |
| NextAuth + Facebook OAuth | Done |
| Role-based middleware | Done |
| Shared types, errors, API response helpers | Done |
| Zod validation schemas | Done |
| DealService (CRUD, lifecycle, validation) | Done + Tests |
| OrderService (generate-link, claim, list) | Done + Tests |
| EscrowService (state machine, auto-complete) | Done + Tests |
| Deal API routes (5 endpoints) | Done |
| Order API routes (3 endpoints) | Done |
| Custom server.ts with cron | Done |
| Docker Compose (dev + test DB) | Done |
| Landing page placeholder | Done |

**Next:** Plan 2 will add Payment, Shipping, Dispute, Notification, and Point services + API routes.
