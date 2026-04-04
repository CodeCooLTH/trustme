# SafePay Trust Platform — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a trust & reputation platform where users verify identity, earn badges, build order history, and showcase a public trust profile.

**Architecture:** Profile-Centric — Trust Profile is the center. Verification, OMS orders, reviews, and badges all feed into a calculated Trust Score. Three subdomains (buyer, seller, admin) share one database but have separate sessions and UIs.

**Tech Stack:** Next.js 15 (App Router), TypeScript, PostgreSQL 16, Prisma, NextAuth.js v4, Zod, TailwindCSS, Vitest, Docker Compose

**PRD:** `docs/PRD.md`

---

## File Structure

```
safepay/
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── .env.example
├── .env
├── vitest.config.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── middleware.ts
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                          # Landing
│   │   ├── login/page.tsx                    # Buyer login
│   │   ├── register/page.tsx
│   │   ├── u/[username]/page.tsx             # Public profile
│   │   ├── o/[token]/page.tsx                # Public order link
│   │   ├── (buyer)/                          # Buyer group (requires auth)
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   ├── reviews/page.tsx
│   │   │   └── settings/
│   │   │       ├── profile/page.tsx
│   │   │       └── verification/page.tsx
│   │   ├── seller/                           # Seller subdomain
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── products/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   ├── orders/create/page.tsx
│   │   │   ├── reviews/page.tsx
│   │   │   └── settings/
│   │   │       ├── shop/page.tsx
│   │   │       └── verification/page.tsx
│   │   ├── admin/                            # Admin subdomain
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── page.tsx                      # Dashboard
│   │   │   ├── users/page.tsx
│   │   │   ├── verifications/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   └── badges/page.tsx
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── otp/send/route.ts
│   │       ├── otp/verify/route.ts
│   │       ├── users/me/route.ts
│   │       ├── shops/route.ts
│   │       ├── shops/[id]/route.ts
│   │       ├── verification/route.ts
│   │       ├── verification/[id]/review/route.ts
│   │       ├── products/route.ts
│   │       ├── products/[id]/route.ts
│   │       ├── orders/route.ts
│   │       ├── orders/[token]/route.ts
│   │       ├── orders/[token]/confirm/route.ts
│   │       ├── orders/[token]/ship/route.ts
│   │       ├── orders/[token]/complete/route.ts
│   │       ├── orders/[token]/review/route.ts
│   │       ├── public/profile/[username]/route.ts
│   │       ├── public/reviews/[username]/route.ts
│   │       ├── upload/route.ts
│   │       ├── files/[fileId]/route.ts
│   │       └── admin/
│   │           ├── dashboard/route.ts
│   │           ├── users/route.ts
│   │           ├── verifications/route.ts
│   │           ├── verifications/[id]/route.ts
│   │           ├── orders/route.ts
│   │           └── badges/route.ts
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── table.tsx
│   │   │   ├── select.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── loading.tsx
│   │   │   └── empty-state.tsx
│   │   ├── layouts/
│   │   │   ├── sidebar.tsx
│   │   │   ├── buyer-sidebar.tsx
│   │   │   ├── seller-sidebar.tsx
│   │   │   └── admin-sidebar.tsx
│   │   ├── trust-score-badge.tsx
│   │   ├── verification-badges.tsx
│   │   ├── achievement-badges.tsx
│   │   ├── review-list.tsx
│   │   ├── order-status-badge.tsx
│   │   └── star-rating.tsx
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── otp.ts
│   │   ├── upload.ts
│   │   ├── subdomain.ts
│   │   └── validations.ts
│   ├── services/
│   │   ├── user.service.ts
│   │   ├── shop.service.ts
│   │   ├── verification.service.ts
│   │   ├── trust-score.service.ts
│   │   ├── badge.service.ts
│   │   ├── product.service.ts
│   │   ├── order.service.ts
│   │   ├── review.service.ts
│   │   └── history-linking.service.ts
│   └── types/
│       └── index.ts
├── tests/
│   ├── setup.ts
│   └── services/
│       ├── trust-score.test.ts
│       ├── badge.test.ts
│       ├── order.test.ts
│       ├── review.test.ts
│       └── history-linking.test.ts
└── uploads/                                   # Git-ignored, file uploads
```

---

## Task 1: Project Setup & Docker

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `.env.example`
- Create: `.env`
- Create: `docker-compose.yml`
- Create: `Dockerfile`
- Create: `vitest.config.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/craftman/Projects/safepay
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```

Note: If prompted about existing files, say yes to overwrite. CLAUDE.md, AGENTS.md, and docs/ will be preserved.

- [ ] **Step 2: Install core dependencies**

```bash
npm install prisma @prisma/client next-auth@4 zod uuid clsx
npm install -D vitest @types/uuid
```

- [ ] **Step 3: Create docker-compose.yml**

```yaml
# docker-compose.yml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: safepay
      POSTGRES_PASSWORD: safepay
      POSTGRES_DB: safepay
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U safepay"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
```

- [ ] **Step 4: Create .env.example and .env**

```bash
# .env.example
DATABASE_URL="postgresql://safepay:safepay@localhost:5432/safepay"
NEXTAUTH_SECRET="change-me-in-production"
NEXTAUTH_URL="http://localhost:3000"
FACEBOOK_ID=""
FACEBOOK_SECRET=""
```

Copy `.env.example` to `.env` with real values for local dev.

- [ ] **Step 5: Create vitest.config.ts**

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

- [ ] **Step 6: Update .gitignore**

Append to existing `.gitignore`:

```
node_modules/
.next/
.env
uploads/
```

- [ ] **Step 7: Start Docker and verify**

```bash
docker compose up -d
docker compose ps
```

Expected: `db` service running, healthy.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js 15 project with Docker Compose"
```

---

## Task 2: Prisma Schema & Database

**Files:**
- Create: `prisma/schema.prisma`
- Create: `src/lib/prisma.ts`
- Create: `tests/setup.ts`

- [ ] **Step 1: Initialize Prisma**

```bash
npx prisma init --datasource-provider postgresql
```

- [ ] **Step 2: Write the complete Prisma schema**

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          String   @id @default(uuid())
  displayName String
  username    String   @unique
  avatar      String?
  phone       String?  @unique
  email       String?  @unique
  trustScore  Int      @default(0)
  isShop      Boolean  @default(false)
  isAdmin     Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  authAccounts      AuthAccount[]
  shop              Shop?
  verifications     VerificationRecord[]
  userBadges        UserBadge[]
  trustScoreHistory TrustScoreHistory[]
  ordersAsBuyer     Order[]              @relation("BuyerOrders")
  reviewsGiven      Review[]             @relation("ReviewerReviews")

  // Admin relations
  verificationsReviewed VerificationRecord[] @relation("ReviewedBy")
}

model AuthAccount {
  id                String   @id @default(uuid())
  userId            String
  provider          String   // FACEBOOK, PHONE, EMAIL
  providerAccountId String
  accessToken       String?
  refreshToken      String?
  createdAt         DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Shop {
  id           String   @id @default(uuid())
  userId       String   @unique
  shopName     String
  description  String?
  logo         String?
  category     String?
  address      String?
  businessType String   @default("INDIVIDUAL") // INDIVIDUAL, COMPANY
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  user     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  products Product[]
  orders   Order[]
}

model VerificationRecord {
  id             String   @id @default(uuid())
  userId         String
  type           String   // EMAIL_OTP, PHONE_OTP, ID_CARD, SHOP_PROOF, BUSINESS_REG
  level          Int      // 1, 2, 3
  status         String   @default("PENDING") // PENDING, APPROVED, REJECTED
  documents      Json?
  rejectedReason String?
  reviewedById   String?
  reviewedAt     DateTime?
  createdAt      DateTime @default(now())

  user       User  @relation(fields: [userId], references: [id], onDelete: Cascade)
  reviewedBy User? @relation("ReviewedBy", fields: [reviewedById], references: [id])
}

model Badge {
  id        String   @id @default(uuid())
  name      String
  nameEN    String
  icon      String
  type      String   // VERIFICATION, ACHIEVEMENT
  criteria  Json
  createdAt DateTime @default(now())

  userBadges UserBadge[]
}

model UserBadge {
  id       String   @id @default(uuid())
  userId   String
  badgeId  String
  earnedAt DateTime @default(now())

  user  User  @relation(fields: [userId], references: [id], onDelete: Cascade)
  badge Badge @relation(fields: [badgeId], references: [id], onDelete: Cascade)

  @@unique([userId, badgeId])
}

model Product {
  id          String   @id @default(uuid())
  shopId      String
  name        String
  description String?
  price       Decimal  @db.Decimal(12, 2)
  images      Json     @default("[]")
  type        String   @default("PHYSICAL") // PHYSICAL, DIGITAL, SERVICE
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  shop       Shop        @relation(fields: [shopId], references: [id], onDelete: Cascade)
  orderItems OrderItem[]
}

model Order {
  id           String   @id @default(uuid())
  publicToken  String   @unique @default(uuid())
  shopId       String
  buyerUserId  String?
  buyerContact String?  // phone or email for non-registered buyers
  type         String   @default("PHYSICAL") // PHYSICAL, DIGITAL, SERVICE
  totalAmount  Decimal  @db.Decimal(12, 2)
  status       String   @default("CREATED") // CREATED, CONFIRMED, SHIPPED, COMPLETED, CANCELLED
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  shop             Shop              @relation(fields: [shopId], references: [id])
  buyer            User?             @relation("BuyerOrders", fields: [buyerUserId], references: [id])
  items            OrderItem[]
  shipmentTracking ShipmentTracking?
  review           Review?
}

model OrderItem {
  id          String  @id @default(uuid())
  orderId     String
  productId   String?
  name        String
  description String?
  qty         Int
  price       Decimal @db.Decimal(12, 2)

  order   Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product Product? @relation(fields: [productId], references: [id], onDelete: SetNull)
}

model ShipmentTracking {
  id         String    @id @default(uuid())
  orderId    String    @unique
  provider   String
  trackingNo String
  status     String    @default("SHIPPED") // SHIPPED, IN_TRANSIT, DELIVERED
  lastSyncAt DateTime?
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt

  order Order @relation(fields: [orderId], references: [id], onDelete: Cascade)
}

model Review {
  id              String   @id @default(uuid())
  orderId         String   @unique
  reviewerUserId  String?
  reviewerContact String?
  rating          Int      // 1-5
  comment         String?
  createdAt       DateTime @default(now())

  order    Order @relation(fields: [orderId], references: [id], onDelete: Cascade)
  reviewer User? @relation("ReviewerReviews", fields: [reviewerUserId], references: [id])
}

model TrustScoreHistory {
  id           String   @id @default(uuid())
  userId       String
  score        Int
  breakdown    Json
  calculatedAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

- [ ] **Step 3: Create Prisma client singleton**

```typescript
// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

- [ ] **Step 4: Create test setup**

```typescript
// tests/setup.ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function cleanDatabase() {
  await prisma.$transaction([
    prisma.trustScoreHistory.deleteMany(),
    prisma.userBadge.deleteMany(),
    prisma.review.deleteMany(),
    prisma.shipmentTracking.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),
    prisma.product.deleteMany(),
    prisma.shop.deleteMany(),
    prisma.verificationRecord.deleteMany(),
    prisma.badge.deleteMany(),
    prisma.authAccount.deleteMany(),
    prisma.user.deleteMany(),
  ]);
}
```

- [ ] **Step 5: Run migration**

```bash
npx prisma migrate dev --name init
```

Expected: Migration created and applied successfully.

- [ ] **Step 6: Verify with Prisma Studio**

```bash
npx prisma studio
```

Expected: Opens browser, all tables visible and empty.

- [ ] **Step 7: Commit**

```bash
git add prisma/ src/lib/prisma.ts tests/setup.ts
git commit -m "feat: add Prisma schema with all models and migration"
```

---

## Task 3: Subdomain Middleware & Auth Config

**Files:**
- Create: `src/middleware.ts`
- Create: `src/lib/subdomain.ts`
- Create: `src/lib/auth.ts`
- Create: `src/app/api/auth/[...nextauth]/route.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Create subdomain utility**

```typescript
// src/lib/subdomain.ts
export type SubdomainType = "main" | "seller" | "admin";

export function getSubdomain(host: string): SubdomainType {
  const hostname = host.split(":")[0]; // remove port

  if (hostname.startsWith("seller.")) return "seller";
  if (hostname.startsWith("admin.")) return "admin";
  return "main";
}

export function getLoginPath(subdomain: SubdomainType): string {
  switch (subdomain) {
    case "seller":
      return "/seller/login";
    case "admin":
      return "/admin/login";
    default:
      return "/login";
  }
}
```

- [ ] **Step 2: Create middleware for subdomain routing**

```typescript
// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getSubdomain } from "@/lib/subdomain";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "localhost:3000";
  const subdomain = getSubdomain(host);
  const { pathname } = request.nextUrl;

  // Seller subdomain: rewrite to /seller/* paths
  if (subdomain === "seller") {
    if (pathname.startsWith("/seller") || pathname.startsWith("/api") || pathname.startsWith("/_next")) {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = `/seller${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Admin subdomain: rewrite to /admin/* paths
  if (subdomain === "admin") {
    if (pathname.startsWith("/admin") || pathname.startsWith("/api") || pathname.startsWith("/_next")) {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = `/admin${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Main domain: block direct access to /seller/* and /admin/*
  if (pathname.startsWith("/seller") || pathname.startsWith("/admin")) {
    if (pathname.startsWith("/api")) return NextResponse.next();
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

- [ ] **Step 3: Create NextAuth config**

```typescript
// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || "",
      clientSecret: process.env.FACEBOOK_SECRET || "",
    }),
    CredentialsProvider({
      id: "phone-otp",
      name: "Phone OTP",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.otp) return null;
        // OTP verification handled by /api/otp/verify before this
        const user = await prisma.user.findFirst({
          where: { phone: credentials.phone },
        });
        if (!user) return null;
        return { id: user.id, name: user.displayName, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.userId = user.id;
      }
      if (account?.provider === "facebook") {
        // Find or create user + auth account
        let dbUser = await prisma.user.findFirst({
          where: {
            authAccounts: {
              some: {
                provider: "FACEBOOK",
                providerAccountId: account.providerAccountId,
              },
            },
          },
        });
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              displayName: user.name || "User",
              username: `user_${Date.now()}`,
              avatar: user.image,
              authAccounts: {
                create: {
                  provider: "FACEBOOK",
                  providerAccountId: account.providerAccountId,
                  accessToken: account.access_token,
                },
              },
            },
          });
        }
        token.userId = dbUser.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.userId) {
        const user = await prisma.user.findUnique({
          where: { id: token.userId as string },
          select: {
            id: true,
            displayName: true,
            username: true,
            avatar: true,
            isShop: true,
            isAdmin: true,
            trustScore: true,
          },
        });
        if (user) {
          (session as any).user = user;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
```

- [ ] **Step 4: Create NextAuth route**

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

- [ ] **Step 5: Update next.config.ts for subdomain support**

Read `node_modules/next/dist/docs/` for any relevant API changes first. Then configure:

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.fbcdn.net" },
      { protocol: "https", hostname: "platform-lookaside.fbsbx.com" },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 6: Commit**

```bash
git add src/middleware.ts src/lib/subdomain.ts src/lib/auth.ts src/app/api/auth/ next.config.ts
git commit -m "feat: add subdomain middleware and NextAuth config"
```

---

## Task 4: OTP System

**Files:**
- Create: `src/lib/otp.ts`
- Create: `src/app/api/otp/send/route.ts`
- Create: `src/app/api/otp/verify/route.ts`
- Create: `src/lib/validations.ts`

- [ ] **Step 1: Create Zod validations**

```typescript
// src/lib/validations.ts
import { z } from "zod";

export const sendOtpSchema = z.object({
  contact: z.string().min(1),
  type: z.enum(["phone", "email"]),
});

export const verifyOtpSchema = z.object({
  contact: z.string().min(1),
  type: z.enum(["phone", "email"]),
  otp: z.string().length(6),
});

export const createShopSchema = z.object({
  shopName: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  category: z.string().max(50).optional(),
  address: z.string().max(200).optional(),
  businessType: z.enum(["INDIVIDUAL", "COMPANY"]),
});

export const createProductSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  price: z.number().positive(),
  type: z.enum(["PHYSICAL", "DIGITAL", "SERVICE"]),
});

export const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().uuid().optional(),
    name: z.string().min(1),
    description: z.string().optional(),
    qty: z.number().int().positive(),
    price: z.number().positive(),
  })).min(1),
  type: z.enum(["PHYSICAL", "DIGITAL", "SERVICE"]),
});

export const confirmOrderSchema = z.object({
  contact: z.string().min(1),
  contactType: z.enum(["phone", "email"]),
  otp: z.string().length(6),
});

export const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(500).optional(),
});

export const shipOrderSchema = z.object({
  provider: z.string().min(1),
  trackingNo: z.string().min(1),
});
```

- [ ] **Step 2: Create OTP utility (in-memory for MVP)**

```typescript
// src/lib/otp.ts

// In-memory OTP store (MVP — replace with Redis in production)
const otpStore = new Map<string, { otp: string; expiresAt: number; attempts: number }>();

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeOtp(contact: string): string {
  const otp = generateOtp();
  otpStore.set(contact, {
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    attempts: 0,
  });
  return otp;
}

export function verifyOtp(contact: string, otp: string): boolean {
  const stored = otpStore.get(contact);
  if (!stored) return false;
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(contact);
    return false;
  }
  if (stored.attempts >= 3) {
    otpStore.delete(contact);
    return false;
  }
  stored.attempts++;
  if (stored.otp !== otp) return false;
  otpStore.delete(contact);
  return true;
}
```

- [ ] **Step 3: Create OTP send endpoint**

```typescript
// src/app/api/otp/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendOtpSchema } from "@/lib/validations";
import { storeOtp } from "@/lib/otp";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = sendOtpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { contact, type } = parsed.data;
  const otp = storeOtp(contact);

  // MVP: log OTP to console (replace with SMS/email gateway)
  console.log(`[OTP] ${type}:${contact} → ${otp}`);

  return NextResponse.json({ message: "OTP sent", contact });
}
```

- [ ] **Step 4: Create OTP verify endpoint**

```typescript
// src/app/api/otp/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyOtpSchema } from "@/lib/validations";
import { verifyOtp } from "@/lib/otp";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = verifyOtpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { contact, type, otp } = parsed.data;
  const valid = verifyOtp(contact, otp);

  if (!valid) {
    return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 });
  }

  return NextResponse.json({ verified: true, contact, type });
}
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/otp.ts src/lib/validations.ts src/app/api/otp/
git commit -m "feat: add OTP system and Zod validations"
```

---

## Task 5: User & Shop Services + API

**Files:**
- Create: `src/services/user.service.ts`
- Create: `src/services/shop.service.ts`
- Create: `src/app/api/users/me/route.ts`
- Create: `src/app/api/shops/route.ts`
- Create: `src/app/api/shops/[id]/route.ts`

- [ ] **Step 1: Create user service**

```typescript
// src/services/user.service.ts
import { prisma } from "@/lib/prisma";

export async function findOrCreateByPhone(phone: string, displayName?: string) {
  let user = await prisma.user.findUnique({ where: { phone } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        phone,
        displayName: displayName || `User_${phone.slice(-4)}`,
        username: `user_${Date.now()}`,
        authAccounts: {
          create: { provider: "PHONE", providerAccountId: phone },
        },
      },
    });
  }
  return user;
}

export async function findByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
    include: { shop: true, userBadges: { include: { badge: true } } },
  });
}

export async function updateProfile(userId: string, data: { displayName?: string; username?: string; avatar?: string }) {
  return prisma.user.update({ where: { id: userId }, data });
}

export async function linkBuyerHistory(userId: string, phone?: string, email?: string) {
  const conditions = [];
  if (phone) conditions.push({ buyerContact: phone });
  if (email) conditions.push({ buyerContact: email });
  if (conditions.length === 0) return;

  // Link orders
  await prisma.order.updateMany({
    where: { buyerUserId: null, OR: conditions },
    data: { buyerUserId: userId },
  });

  // Link reviews
  await prisma.review.updateMany({
    where: { reviewerUserId: null, OR: conditions.map(c => ({ reviewerContact: c.buyerContact })) },
    data: { reviewerUserId: userId },
  });
}
```

- [ ] **Step 2: Create shop service**

```typescript
// src/services/shop.service.ts
import { prisma } from "@/lib/prisma";

export async function createShop(userId: string, data: {
  shopName: string;
  description?: string;
  category?: string;
  address?: string;
  businessType: string;
}) {
  const shop = await prisma.shop.create({
    data: { userId, ...data },
  });
  await prisma.user.update({
    where: { id: userId },
    data: { isShop: true },
  });
  return shop;
}

export async function updateShop(shopId: string, data: {
  shopName?: string;
  description?: string;
  logo?: string;
  category?: string;
  address?: string;
  businessType?: string;
}) {
  return prisma.shop.update({ where: { id: shopId }, data });
}

export async function getShopByUserId(userId: string) {
  return prisma.shop.findUnique({ where: { userId } });
}
```

- [ ] **Step 3: Create users/me API**

```typescript
// src/app/api/users/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateProfile } from "@/services/user.service";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    include: { shop: true, userBadges: { include: { badge: true } } },
  });
  return NextResponse.json(user);
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const user = await updateProfile((session.user as any).id, body);
  return NextResponse.json(user);
}
```

- [ ] **Step 4: Create shops API**

```typescript
// src/app/api/shops/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createShopSchema } from "@/lib/validations";
import { createShop, getShopByUserId } from "@/services/shop.service";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const shop = await getShopByUserId((session.user as any).id);
  return NextResponse.json(shop);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = createShopSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const shop = await createShop((session.user as any).id, parsed.data);
  return NextResponse.json(shop, { status: 201 });
}
```

```typescript
// src/app/api/shops/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateShop } from "@/services/shop.service";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const shop = await prisma.shop.findUnique({ where: { id } });
  if (!shop || shop.userId !== (session.user as any).id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json();
  const updated = await updateShop(id, body);
  return NextResponse.json(updated);
}
```

- [ ] **Step 5: Commit**

```bash
git add src/services/user.service.ts src/services/shop.service.ts src/app/api/users/ src/app/api/shops/
git commit -m "feat: add user and shop services with API routes"
```

---

## Task 6: Verification Service + API

**Files:**
- Create: `src/services/verification.service.ts`
- Create: `src/app/api/verification/route.ts`
- Create: `src/app/api/verification/[id]/review/route.ts`

- [ ] **Step 1: Create verification service**

```typescript
// src/services/verification.service.ts
import { prisma } from "@/lib/prisma";
import { evaluateBadges } from "@/services/badge.service";
import { recalculateTrustScore } from "@/services/trust-score.service";

export async function submitVerification(userId: string, data: {
  type: string;
  level: number;
  documents?: any;
}) {
  // Level 1 (OTP) auto-approves
  const isOtp = data.type === "EMAIL_OTP" || data.type === "PHONE_OTP";

  return prisma.verificationRecord.create({
    data: {
      userId,
      type: data.type,
      level: data.level,
      status: isOtp ? "APPROVED" : "PENDING",
      documents: data.documents,
      reviewedAt: isOtp ? new Date() : undefined,
    },
  });
}

export async function reviewVerification(recordId: string, adminId: string, data: {
  status: "APPROVED" | "REJECTED";
  rejectedReason?: string;
}) {
  const record = await prisma.verificationRecord.update({
    where: { id: recordId },
    data: {
      status: data.status,
      rejectedReason: data.rejectedReason,
      reviewedById: adminId,
      reviewedAt: new Date(),
    },
  });

  if (data.status === "APPROVED") {
    await evaluateBadges(record.userId);
    await recalculateTrustScore(record.userId);
  }

  return record;
}

export async function getUserVerifications(userId: string) {
  return prisma.verificationRecord.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getMaxVerificationLevel(userId: string): Promise<number> {
  const approved = await prisma.verificationRecord.findMany({
    where: { userId, status: "APPROVED" },
    select: { level: true },
  });
  if (approved.length === 0) return 0;
  return Math.max(...approved.map((v) => v.level));
}

export async function getPendingVerifications() {
  return prisma.verificationRecord.findMany({
    where: { status: "PENDING" },
    include: { user: true },
    orderBy: { createdAt: "asc" },
  });
}
```

- [ ] **Step 2: Create verification API**

```typescript
// src/app/api/verification/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { submitVerification, getUserVerifications } from "@/services/verification.service";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const records = await getUserVerifications((session.user as any).id);
  return NextResponse.json(records);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const record = await submitVerification((session.user as any).id, body);
  return NextResponse.json(record, { status: 201 });
}
```

```typescript
// src/app/api/verification/[id]/review/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { reviewVerification } from "@/services/verification.service";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !(session.user as any).isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const record = await reviewVerification(id, (session.user as any).id, body);
  return NextResponse.json(record);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/services/verification.service.ts src/app/api/verification/
git commit -m "feat: add verification service with multi-level support"
```

---

## Task 7: Trust Score Service (TDD)

**Files:**
- Create: `src/services/trust-score.service.ts`
- Create: `tests/services/trust-score.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/services/trust-score.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { prisma, cleanDatabase } from "../setup";
import { recalculateTrustScore, getTrustLevel } from "@/services/trust-score.service";

describe("TrustScoreService", () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  it("returns 0 for new user with no activity", async () => {
    const user = await prisma.user.create({
      data: { displayName: "Test", username: "test1" },
    });
    const score = await recalculateTrustScore(user.id);
    expect(score).toBe(0);
  });

  it("adds verification score for level 1 approval", async () => {
    const user = await prisma.user.create({
      data: { displayName: "Test", username: "test2" },
    });
    await prisma.verificationRecord.create({
      data: { userId: user.id, type: "PHONE_OTP", level: 1, status: "APPROVED" },
    });
    const score = await recalculateTrustScore(user.id);
    expect(score).toBe(10); // verification level 1 = 10
  });

  it("gives max 35 for level 3 verification", async () => {
    const user = await prisma.user.create({
      data: { displayName: "Test", username: "test3" },
    });
    await prisma.verificationRecord.createMany({
      data: [
        { userId: user.id, type: "PHONE_OTP", level: 1, status: "APPROVED" },
        { userId: user.id, type: "ID_CARD", level: 2, status: "APPROVED" },
        { userId: user.id, type: "BUSINESS_REG", level: 3, status: "APPROVED" },
      ],
    });
    const score = await recalculateTrustScore(user.id);
    expect(score).toBeGreaterThanOrEqual(35);
  });

  it("includes rating score when 3+ reviews exist", async () => {
    const seller = await prisma.user.create({
      data: { displayName: "Seller", username: "seller1", isShop: true },
    });
    const shop = await prisma.shop.create({
      data: { userId: seller.id, shopName: "Shop", businessType: "INDIVIDUAL" },
    });
    // Create 3 completed orders with 5-star reviews
    for (let i = 0; i < 3; i++) {
      const order = await prisma.order.create({
        data: {
          shopId: shop.id, type: "DIGITAL", totalAmount: 100, status: "COMPLETED",
          items: { create: { name: "Item", qty: 1, price: 100 } },
        },
      });
      await prisma.review.create({
        data: { orderId: order.id, reviewerContact: `buyer${i}@test.com`, rating: 5 },
      });
    }
    const score = await recalculateTrustScore(seller.id);
    expect(score).toBeGreaterThanOrEqual(20); // rating component
  });

  it("getTrustLevel returns correct level", () => {
    expect(getTrustLevel(95)).toBe("A+");
    expect(getTrustLevel(85)).toBe("A");
    expect(getTrustLevel(75)).toBe("B+");
    expect(getTrustLevel(65)).toBe("B");
    expect(getTrustLevel(50)).toBe("C");
    expect(getTrustLevel(20)).toBe("D");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run tests/services/trust-score.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement trust score service**

```typescript
// src/services/trust-score.service.ts
import { prisma } from "@/lib/prisma";

export type TrustLevel = "A+" | "A" | "B+" | "B" | "C" | "D";

export function getTrustLevel(score: number): TrustLevel {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B+";
  if (score >= 60) return "B";
  if (score >= 40) return "C";
  return "D";
}

async function calcVerificationScore(userId: string): Promise<number> {
  const approved = await prisma.verificationRecord.findMany({
    where: { userId, status: "APPROVED" },
    select: { level: true },
  });
  const maxLevel = approved.length > 0 ? Math.max(...approved.map((v) => v.level)) : 0;
  // Level 1 = 10, Level 2 = 25, Level 3 = 35
  if (maxLevel >= 3) return 35;
  if (maxLevel >= 2) return 25;
  if (maxLevel >= 1) return 10;
  return 0;
}

async function calcOrderScore(userId: string): Promise<number> {
  // Count completed orders where user's shop is the seller
  const shop = await prisma.shop.findUnique({ where: { userId } });
  if (!shop) return 0;

  const count = await prisma.order.count({
    where: { shopId: shop.id, status: "COMPLETED" },
  });
  // Scale: 0→0, 10→10, 50→20, 100+→25 (capped at 25)
  return Math.min(25, Math.round(Math.sqrt(count) * 2.5));
}

async function calcRatingScore(userId: string): Promise<number> {
  const shop = await prisma.shop.findUnique({ where: { userId } });
  if (!shop) return 0;

  const reviews = await prisma.review.findMany({
    where: { order: { shopId: shop.id } },
    select: { rating: true },
  });
  if (reviews.length < 3) return 0; // minimum 3 reviews

  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  // Scale: avg 1→0, avg 3→10, avg 5→20
  return Math.round((avg - 1) * 5);
}

function calcAgeScore(createdAt: Date): number {
  const daysOld = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  // Cap at 365 days = 10 points
  return Math.min(10, Math.round((daysOld / 365) * 10));
}

async function calcBadgeScore(userId: string): Promise<number> {
  const count = await prisma.userBadge.count({ where: { userId } });
  // Each badge = 1 point, cap at 10
  return Math.min(10, count);
}

export async function recalculateTrustScore(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return 0;

  const verification = await calcVerificationScore(userId);
  const orders = await calcOrderScore(userId);
  const rating = await calcRatingScore(userId);
  const age = calcAgeScore(user.createdAt);
  const badges = await calcBadgeScore(userId);

  const score = verification + orders + rating + age + badges;

  // Update user and store history
  await prisma.user.update({ where: { id: userId }, data: { trustScore: score } });
  await prisma.trustScoreHistory.create({
    data: {
      userId,
      score,
      breakdown: { verification, orders, rating, age, badges },
    },
  });

  return score;
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run tests/services/trust-score.test.ts
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/services/trust-score.service.ts tests/services/trust-score.test.ts
git commit -m "feat: add trust score calculation service with TDD"
```

---

## Task 8: Badge Service (TDD)

**Files:**
- Create: `src/services/badge.service.ts`
- Create: `tests/services/badge.test.ts`
- Create: `prisma/seed.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/services/badge.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { prisma, cleanDatabase } from "../setup";
import { evaluateBadges, seedDefaultBadges } from "@/services/badge.service";

describe("BadgeService", () => {
  beforeEach(async () => {
    await cleanDatabase();
    await seedDefaultBadges();
  });

  it("awards Fully Verified badge when all levels approved", async () => {
    const user = await prisma.user.create({
      data: { displayName: "Test", username: "badge1" },
    });
    await prisma.verificationRecord.createMany({
      data: [
        { userId: user.id, type: "PHONE_OTP", level: 1, status: "APPROVED" },
        { userId: user.id, type: "ID_CARD", level: 2, status: "APPROVED" },
        { userId: user.id, type: "BUSINESS_REG", level: 3, status: "APPROVED" },
      ],
    });
    await evaluateBadges(user.id);
    const badges = await prisma.userBadge.findMany({
      where: { userId: user.id },
      include: { badge: true },
    });
    const names = badges.map((b) => b.badge.nameEN);
    expect(names).toContain("Fully Verified");
  });

  it("awards First Sale badge on first completed order", async () => {
    const user = await prisma.user.create({
      data: { displayName: "Seller", username: "badge2", isShop: true },
    });
    const shop = await prisma.shop.create({
      data: { userId: user.id, shopName: "Shop", businessType: "INDIVIDUAL" },
    });
    await prisma.order.create({
      data: {
        shopId: shop.id, type: "DIGITAL", totalAmount: 100, status: "COMPLETED",
        items: { create: { name: "Item", qty: 1, price: 100 } },
      },
    });
    await evaluateBadges(user.id);
    const badges = await prisma.userBadge.findMany({
      where: { userId: user.id },
      include: { badge: true },
    });
    const names = badges.map((b) => b.badge.nameEN);
    expect(names).toContain("First Sale");
  });

  it("does not duplicate badges", async () => {
    const user = await prisma.user.create({
      data: { displayName: "Test", username: "badge3", isShop: true },
    });
    const shop = await prisma.shop.create({
      data: { userId: user.id, shopName: "Shop", businessType: "INDIVIDUAL" },
    });
    await prisma.order.create({
      data: {
        shopId: shop.id, type: "DIGITAL", totalAmount: 100, status: "COMPLETED",
        items: { create: { name: "Item", qty: 1, price: 100 } },
      },
    });
    await evaluateBadges(user.id);
    await evaluateBadges(user.id); // run twice
    const count = await prisma.userBadge.count({ where: { userId: user.id } });
    expect(count).toBe(1); // First Sale only, not duplicated
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run tests/services/badge.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement badge service**

```typescript
// src/services/badge.service.ts
import { prisma } from "@/lib/prisma";

export async function seedDefaultBadges() {
  const badges = [
    { name: "เปิดหน้าร้าน", nameEN: "First Sale", icon: "🏪", type: "ACHIEVEMENT", criteria: { type: "FIRST_ORDER" } },
    { name: "ร้านค้ายอดนิยม", nameEN: "Trusted Seller 50", icon: "⭐", type: "ACHIEVEMENT", criteria: { type: "ORDER_COUNT", count: 50 } },
    { name: "ร้อยออเดอร์", nameEN: "Century Club", icon: "💯", type: "ACHIEVEMENT", criteria: { type: "ORDER_COUNT", count: 100 } },
    { name: "ร้านคะแนนเต็ม", nameEN: "Perfect Rating", icon: "💎", type: "ACHIEVEMENT", criteria: { type: "PERFECT_RATING", minReviews: 10 } },
    { name: "ร้านคะแนนสูง", nameEN: "Highly Rated", icon: "🌟", type: "ACHIEVEMENT", criteria: { type: "HIGH_RATING", minRating: 4.8, minReviews: 20 } },
    { name: "ไร้ข้อร้องเรียน", nameEN: "Zero Complaint", icon: "🛡️", type: "ACHIEVEMENT", criteria: { type: "ZERO_COMPLAINT", minOrders: 50 } },
    { name: "ร้านค้าเก่าแก่", nameEN: "Veteran", icon: "🏆", type: "ACHIEVEMENT", criteria: { type: "VETERAN", minDays: 365 } },
    { name: "จัดส่งสายฟ้า", nameEN: "Speed Demon", icon: "⚡", type: "ACHIEVEMENT", criteria: { type: "FAST_SHIPPING", maxHours: 24, minOrders: 20 } },
    { name: "ยืนยันครบถ้วน", nameEN: "Fully Verified", icon: "✅", type: "VERIFICATION", criteria: { type: "FULL_VERIFICATION" } },
    { name: "ขวัญใจชุมชน", nameEN: "Community Favorite", icon: "❤️", type: "ACHIEVEMENT", criteria: { type: "UNIQUE_REVIEWERS", count: 50 } },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { id: badge.nameEN }, // Use nameEN as lookup
      update: badge,
      create: badge,
    });
  }
}

async function awardBadge(userId: string, badgeNameEN: string) {
  const badge = await prisma.badge.findFirst({ where: { nameEN: badgeNameEN } });
  if (!badge) return;

  await prisma.userBadge.upsert({
    where: { userId_badgeId: { userId, badgeId: badge.id } },
    update: {},
    create: { userId, badgeId: badge.id },
  });
}

export async function evaluateBadges(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  // --- Verification Badges ---
  const verifications = await prisma.verificationRecord.findMany({
    where: { userId, status: "APPROVED" },
  });
  const levels = new Set(verifications.map((v) => v.level));
  if (levels.has(1) && levels.has(2) && levels.has(3)) {
    await awardBadge(userId, "Fully Verified");
  }

  // --- Achievement Badges (require shop) ---
  const shop = await prisma.shop.findUnique({ where: { userId } });
  if (!shop) return;

  const completedOrders = await prisma.order.count({
    where: { shopId: shop.id, status: "COMPLETED" },
  });
  const cancelledOrders = await prisma.order.count({
    where: { shopId: shop.id, status: "CANCELLED" },
  });

  // First Sale
  if (completedOrders >= 1) await awardBadge(userId, "First Sale");

  // Trusted Seller 50
  if (completedOrders >= 50) await awardBadge(userId, "Trusted Seller 50");

  // Century Club
  if (completedOrders >= 100) await awardBadge(userId, "Century Club");

  // Zero Complaint
  if (completedOrders >= 50 && cancelledOrders === 0) {
    await awardBadge(userId, "Zero Complaint");
  }

  // Rating-based badges
  const reviews = await prisma.review.findMany({
    where: { order: { shopId: shop.id } },
    select: { rating: true },
  });
  if (reviews.length > 0) {
    const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    if (avg === 5 && reviews.length >= 10) await awardBadge(userId, "Perfect Rating");
    if (avg >= 4.8 && reviews.length >= 20) await awardBadge(userId, "Highly Rated");
  }

  // Unique reviewers
  const uniqueReviewers = await prisma.review.findMany({
    where: { order: { shopId: shop.id }, reviewerContact: { not: null } },
    distinct: ["reviewerContact"],
  });
  const uniqueRegistered = await prisma.review.findMany({
    where: { order: { shopId: shop.id }, reviewerUserId: { not: null } },
    distinct: ["reviewerUserId"],
  });
  if (uniqueReviewers.length + uniqueRegistered.length >= 50) {
    await awardBadge(userId, "Community Favorite");
  }

  // Veteran (1 year + active)
  const daysSinceCreation = (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceCreation >= 365) {
    const recentOrder = await prisma.order.findFirst({
      where: { shopId: shop.id, createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
    });
    if (recentOrder) await awardBadge(userId, "Veteran");
  }

  // Speed Demon (avg confirmed→shipped ≤ 24h, min 20 orders)
  const shippedOrders = await prisma.order.findMany({
    where: { shopId: shop.id, status: { in: ["SHIPPED", "COMPLETED"] }, shipmentTracking: { isNot: null } },
    include: { shipmentTracking: true },
  });
  if (shippedOrders.length >= 20) {
    const avgHours = shippedOrders.reduce((sum, o) => {
      if (!o.shipmentTracking) return sum;
      const diff = o.shipmentTracking.createdAt.getTime() - o.updatedAt.getTime();
      return sum + diff / (1000 * 60 * 60);
    }, 0) / shippedOrders.length;
    if (avgHours <= 24) await awardBadge(userId, "Speed Demon");
  }
}
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run tests/services/badge.test.ts
```

Expected: All PASS.

- [ ] **Step 5: Create seed script**

```typescript
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed badges
  const badges = [
    { name: "เปิดหน้าร้าน", nameEN: "First Sale", icon: "🏪", type: "ACHIEVEMENT", criteria: { type: "FIRST_ORDER" } },
    { name: "ร้านค้ายอดนิยม", nameEN: "Trusted Seller 50", icon: "⭐", type: "ACHIEVEMENT", criteria: { type: "ORDER_COUNT", count: 50 } },
    { name: "ร้อยออเดอร์", nameEN: "Century Club", icon: "💯", type: "ACHIEVEMENT", criteria: { type: "ORDER_COUNT", count: 100 } },
    { name: "ร้านคะแนนเต็ม", nameEN: "Perfect Rating", icon: "💎", type: "ACHIEVEMENT", criteria: { type: "PERFECT_RATING", minReviews: 10 } },
    { name: "ร้านคะแนนสูง", nameEN: "Highly Rated", icon: "🌟", type: "ACHIEVEMENT", criteria: { type: "HIGH_RATING", minRating: 4.8, minReviews: 20 } },
    { name: "ไร้ข้อร้องเรียน", nameEN: "Zero Complaint", icon: "🛡️", type: "ACHIEVEMENT", criteria: { type: "ZERO_COMPLAINT", minOrders: 50 } },
    { name: "ร้านค้าเก่าแก่", nameEN: "Veteran", icon: "🏆", type: "ACHIEVEMENT", criteria: { type: "VETERAN", minDays: 365 } },
    { name: "จัดส่งสายฟ้า", nameEN: "Speed Demon", icon: "⚡", type: "ACHIEVEMENT", criteria: { type: "FAST_SHIPPING", maxHours: 24, minOrders: 20 } },
    { name: "ยืนยันครบถ้วน", nameEN: "Fully Verified", icon: "✅", type: "VERIFICATION", criteria: { type: "FULL_VERIFICATION" } },
    { name: "ขวัญใจชุมชน", nameEN: "Community Favorite", icon: "❤️", type: "ACHIEVEMENT", criteria: { type: "UNIQUE_REVIEWERS", count: 50 } },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { id: badge.nameEN },
      update: badge,
      create: badge,
    });
  }
  console.log(`Seeded ${badges.length} badges`);

  // Seed admin user
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      displayName: "Admin",
      username: "admin",
      isAdmin: true,
      authAccounts: {
        create: { provider: "EMAIL", providerAccountId: "admin@safepay.co" },
      },
    },
  });
  console.log(`Seeded admin user: ${admin.id}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Add to `package.json`:

```json
{
  "prisma": {
    "seed": "npx tsx prisma/seed.ts"
  }
}
```

- [ ] **Step 6: Run seed**

```bash
npm install -D tsx
npx prisma db seed
```

Expected: "Seeded 10 badges" + "Seeded admin user".

- [ ] **Step 7: Commit**

```bash
git add src/services/badge.service.ts tests/services/badge.test.ts prisma/seed.ts package.json
git commit -m "feat: add badge service with 10 achievement badges and seed"
```

---

## Task 9: Product Service + API

**Files:**
- Create: `src/services/product.service.ts`
- Create: `src/app/api/products/route.ts`
- Create: `src/app/api/products/[id]/route.ts`

- [ ] **Step 1: Create product service**

```typescript
// src/services/product.service.ts
import { prisma } from "@/lib/prisma";

export async function createProduct(shopId: string, data: {
  name: string;
  description?: string;
  price: number;
  type: string;
  images?: string[];
}) {
  return prisma.product.create({
    data: {
      shopId,
      name: data.name,
      description: data.description,
      price: data.price,
      type: data.type,
      images: data.images || [],
    },
  });
}

export async function updateProduct(productId: string, data: {
  name?: string;
  description?: string;
  price?: number;
  type?: string;
  images?: string[];
  isActive?: boolean;
}) {
  return prisma.product.update({ where: { id: productId }, data });
}

export async function deleteProduct(productId: string) {
  return prisma.product.update({ where: { id: productId }, data: { isActive: false } });
}

export async function getProductsByShop(shopId: string) {
  return prisma.product.findMany({
    where: { shopId, isActive: true },
    orderBy: { createdAt: "desc" },
  });
}
```

- [ ] **Step 2: Create products API**

```typescript
// src/app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createProductSchema } from "@/lib/validations";
import { createProduct, getProductsByShop } from "@/services/product.service";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const shop = await prisma.shop.findUnique({ where: { userId: (session.user as any).id } });
  if (!shop) return NextResponse.json({ error: "No shop" }, { status: 404 });

  const products = await getProductsByShop(shop.id);
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const shop = await prisma.shop.findUnique({ where: { userId: (session.user as any).id } });
  if (!shop) return NextResponse.json({ error: "No shop" }, { status: 404 });

  const body = await request.json();
  const parsed = createProductSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const product = await createProduct(shop.id, parsed.data);
  return NextResponse.json(product, { status: 201 });
}
```

```typescript
// src/app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateProduct, deleteProduct } from "@/services/product.service";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id }, include: { shop: true } });
  if (!product || product.shop.userId !== (session.user as any).id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json();
  const updated = await updateProduct(id, body);
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id }, include: { shop: true } });
  if (!product || product.shop.userId !== (session.user as any).id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await deleteProduct(id);
  return NextResponse.json({ deleted: true });
}
```

- [ ] **Step 3: Commit**

```bash
git add src/services/product.service.ts src/app/api/products/
git commit -m "feat: add product catalog service and API"
```

---

## Task 10: Order Service + API (TDD)

**Files:**
- Create: `src/services/order.service.ts`
- Create: `tests/services/order.test.ts`
- Create: `src/app/api/orders/route.ts`
- Create: `src/app/api/orders/[token]/route.ts`
- Create: `src/app/api/orders/[token]/confirm/route.ts`
- Create: `src/app/api/orders/[token]/ship/route.ts`
- Create: `src/app/api/orders/[token]/complete/route.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/services/order.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { prisma, cleanDatabase } from "../setup";
import {
  createOrder, confirmOrder, shipOrder, completeOrder,
  VALID_TRANSITIONS,
} from "@/services/order.service";

describe("OrderService", () => {
  let shopId: string;
  let userId: string;

  beforeEach(async () => {
    await cleanDatabase();
    const user = await prisma.user.create({
      data: { displayName: "Seller", username: "seller_order", isShop: true },
    });
    userId = user.id;
    const shop = await prisma.shop.create({
      data: { userId: user.id, shopName: "TestShop", businessType: "INDIVIDUAL" },
    });
    shopId = shop.id;
  });

  it("creates order with CREATED status and public token", async () => {
    const order = await createOrder(shopId, {
      items: [{ name: "Widget", qty: 2, price: 100 }],
      type: "PHYSICAL",
    });
    expect(order.status).toBe("CREATED");
    expect(order.publicToken).toBeDefined();
    expect(order.totalAmount.toString()).toBe("200");
  });

  it("confirms order and sets buyer contact", async () => {
    const order = await createOrder(shopId, {
      items: [{ name: "Widget", qty: 1, price: 50 }],
      type: "DIGITAL",
    });
    const confirmed = await confirmOrder(order.publicToken, "0812345678");
    expect(confirmed.status).toBe("CONFIRMED");
    expect(confirmed.buyerContact).toBe("0812345678");
  });

  it("rejects invalid status transition", async () => {
    const order = await createOrder(shopId, {
      items: [{ name: "Widget", qty: 1, price: 50 }],
      type: "PHYSICAL",
    });
    // Cannot ship CREATED order (must be CONFIRMED first)
    await expect(shipOrder(order.publicToken, { provider: "Kerry", trackingNo: "123" }))
      .rejects.toThrow();
  });

  it("allows digital order to complete directly from CONFIRMED", async () => {
    const order = await createOrder(shopId, {
      items: [{ name: "E-book", qty: 1, price: 299 }],
      type: "DIGITAL",
    });
    await confirmOrder(order.publicToken, "test@example.com");
    const completed = await completeOrder(order.publicToken);
    expect(completed.status).toBe("COMPLETED");
  });

  it("validates transition rules", () => {
    expect(VALID_TRANSITIONS["CREATED"]).toContain("CONFIRMED");
    expect(VALID_TRANSITIONS["CREATED"]).toContain("CANCELLED");
    expect(VALID_TRANSITIONS["CONFIRMED"]).toContain("SHIPPED");
    expect(VALID_TRANSITIONS["CONFIRMED"]).toContain("COMPLETED");
    expect(VALID_TRANSITIONS["SHIPPED"]).toContain("COMPLETED");
    expect(VALID_TRANSITIONS["COMPLETED"]).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run tests/services/order.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement order service**

```typescript
// src/services/order.service.ts
import { prisma } from "@/lib/prisma";
import { evaluateBadges } from "@/services/badge.service";
import { recalculateTrustScore } from "@/services/trust-score.service";

export const VALID_TRANSITIONS: Record<string, string[]> = {
  CREATED: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["SHIPPED", "COMPLETED"],
  SHIPPED: ["COMPLETED"],
};

function assertTransition(currentStatus: string, newStatus: string) {
  const allowed = VALID_TRANSITIONS[currentStatus];
  if (!allowed || !allowed.includes(newStatus)) {
    throw new Error(`Invalid transition: ${currentStatus} → ${newStatus}`);
  }
}

export async function createOrder(shopId: string, data: {
  items: { productId?: string; name: string; description?: string; qty: number; price: number }[];
  type: string;
}) {
  const totalAmount = data.items.reduce((sum, item) => sum + item.qty * item.price, 0);

  return prisma.order.create({
    data: {
      shopId,
      type: data.type,
      totalAmount,
      items: { create: data.items },
    },
    include: { items: true },
  });
}

export async function confirmOrder(publicToken: string, buyerContact: string, buyerUserId?: string) {
  const order = await prisma.order.findUnique({ where: { publicToken } });
  if (!order) throw new Error("Order not found");
  assertTransition(order.status, "CONFIRMED");

  return prisma.order.update({
    where: { publicToken },
    data: { status: "CONFIRMED", buyerContact, buyerUserId },
  });
}

export async function shipOrder(publicToken: string, data: { provider: string; trackingNo: string }) {
  const order = await prisma.order.findUnique({ where: { publicToken } });
  if (!order) throw new Error("Order not found");
  assertTransition(order.status, "SHIPPED");

  return prisma.$transaction(async (tx) => {
    await tx.shipmentTracking.create({
      data: { orderId: order.id, provider: data.provider, trackingNo: data.trackingNo },
    });
    return tx.order.update({
      where: { publicToken },
      data: { status: "SHIPPED" },
    });
  });
}

export async function completeOrder(publicToken: string) {
  const order = await prisma.order.findUnique({ where: { publicToken }, include: { shop: true } });
  if (!order) throw new Error("Order not found");
  assertTransition(order.status, "COMPLETED");

  const updated = await prisma.order.update({
    where: { publicToken },
    data: { status: "COMPLETED" },
  });

  // Recalculate seller's trust score and badges
  await evaluateBadges(order.shop.userId);
  await recalculateTrustScore(order.shop.userId);

  return updated;
}

export async function cancelOrder(publicToken: string) {
  const order = await prisma.order.findUnique({ where: { publicToken } });
  if (!order) throw new Error("Order not found");
  assertTransition(order.status, "CANCELLED");

  return prisma.order.update({
    where: { publicToken },
    data: { status: "CANCELLED" },
  });
}

export async function getOrderByToken(publicToken: string) {
  return prisma.order.findUnique({
    where: { publicToken },
    include: {
      items: true,
      shop: { include: { user: { select: { id: true, displayName: true, username: true, trustScore: true, userBadges: { include: { badge: true } } } } } },
      shipmentTracking: true,
      review: true,
    },
  });
}

export async function getOrdersByShop(shopId: string, status?: string) {
  return prisma.order.findMany({
    where: { shopId, ...(status ? { status } : {}) },
    include: { items: true, shipmentTracking: true, review: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrdersByBuyer(userId: string) {
  return prisma.order.findMany({
    where: { buyerUserId: userId },
    include: { items: true, shop: true, review: true },
    orderBy: { createdAt: "desc" },
  });
}
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run tests/services/order.test.ts
```

Expected: All PASS.

- [ ] **Step 5: Create order API routes**

```typescript
// src/app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createOrderSchema } from "@/lib/validations";
import { createOrder, getOrdersByShop, getOrdersByBuyer } from "@/services/order.service";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const role = request.nextUrl.searchParams.get("role") || "buyer";

  if (role === "seller") {
    const shop = await prisma.shop.findUnique({ where: { userId } });
    if (!shop) return NextResponse.json([]);
    const status = request.nextUrl.searchParams.get("status") || undefined;
    const orders = await getOrdersByShop(shop.id, status);
    return NextResponse.json(orders);
  }

  const orders = await getOrdersByBuyer(userId);
  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const shop = await prisma.shop.findUnique({ where: { userId: (session.user as any).id } });
  if (!shop) return NextResponse.json({ error: "No shop" }, { status: 404 });

  const body = await request.json();
  const parsed = createOrderSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const order = await createOrder(shop.id, parsed.data);
  return NextResponse.json(order, { status: 201 });
}
```

```typescript
// src/app/api/orders/[token]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getOrderByToken } from "@/services/order.service";

export async function GET(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await getOrderByToken(token);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(order);
}
```

```typescript
// src/app/api/orders/[token]/confirm/route.ts
import { NextRequest, NextResponse } from "next/server";
import { confirmOrderSchema } from "@/lib/validations";
import { verifyOtp } from "@/lib/otp";
import { confirmOrder } from "@/services/order.service";

export async function POST(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const body = await request.json();
  const parsed = confirmOrderSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { contact, otp } = parsed.data;
  if (!verifyOtp(contact, otp)) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
  }

  const order = await confirmOrder(token, contact);
  return NextResponse.json(order);
}
```

```typescript
// src/app/api/orders/[token]/ship/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { shipOrderSchema } from "@/lib/validations";
import { shipOrder } from "@/services/order.service";

export async function POST(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { token } = await params;
  const body = await request.json();
  const parsed = shipOrderSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const order = await shipOrder(token, parsed.data);
  return NextResponse.json(order);
}
```

```typescript
// src/app/api/orders/[token]/complete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { completeOrder } from "@/services/order.service";

export async function POST(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { token } = await params;
  const order = await completeOrder(token);
  return NextResponse.json(order);
}
```

- [ ] **Step 6: Commit**

```bash
git add src/services/order.service.ts tests/services/order.test.ts src/app/api/orders/
git commit -m "feat: add order service with state machine and API routes"
```

---

## Task 11: Review Service + History Linking (TDD)

**Files:**
- Create: `src/services/review.service.ts`
- Create: `src/services/history-linking.service.ts`
- Create: `tests/services/review.test.ts`
- Create: `tests/services/history-linking.test.ts`
- Create: `src/app/api/orders/[token]/review/route.ts`
- Create: `src/app/api/public/profile/[username]/route.ts`
- Create: `src/app/api/public/reviews/[username]/route.ts`

- [ ] **Step 1: Write review tests**

```typescript
// tests/services/review.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { prisma, cleanDatabase } from "../setup";
import { createReview } from "@/services/review.service";

describe("ReviewService", () => {
  let orderId: string;
  let orderToken: string;

  beforeEach(async () => {
    await cleanDatabase();
    const user = await prisma.user.create({
      data: { displayName: "Seller", username: "rev_seller", isShop: true },
    });
    const shop = await prisma.shop.create({
      data: { userId: user.id, shopName: "Shop", businessType: "INDIVIDUAL" },
    });
    const order = await prisma.order.create({
      data: {
        shopId: shop.id, type: "DIGITAL", totalAmount: 100, status: "CONFIRMED",
        buyerContact: "0811111111",
        items: { create: { name: "Item", qty: 1, price: 100 } },
      },
    });
    orderId = order.id;
    orderToken = order.publicToken;
  });

  it("creates review for order", async () => {
    const review = await createReview(orderToken, {
      rating: 5,
      comment: "Great!",
      reviewerContact: "0811111111",
    });
    expect(review.rating).toBe(5);
    expect(review.orderId).toBe(orderId);
  });

  it("rejects duplicate review for same order", async () => {
    await createReview(orderToken, { rating: 5, reviewerContact: "0811111111" });
    await expect(
      createReview(orderToken, { rating: 4, reviewerContact: "0811111111" })
    ).rejects.toThrow();
  });
});
```

- [ ] **Step 2: Write history linking tests**

```typescript
// tests/services/history-linking.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { prisma, cleanDatabase } from "../setup";
import { linkHistoryToUser } from "@/services/history-linking.service";

describe("HistoryLinkingService", () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  it("links orders by phone to new user", async () => {
    const seller = await prisma.user.create({
      data: { displayName: "Seller", username: "link_seller", isShop: true },
    });
    const shop = await prisma.shop.create({
      data: { userId: seller.id, shopName: "Shop", businessType: "INDIVIDUAL" },
    });
    // Create order without user
    await prisma.order.create({
      data: {
        shopId: shop.id, type: "DIGITAL", totalAmount: 100, status: "CONFIRMED",
        buyerContact: "0899999999",
        items: { create: { name: "Item", qty: 1, price: 100 } },
      },
    });

    // New user registers with same phone
    const buyer = await prisma.user.create({
      data: { displayName: "Buyer", username: "link_buyer", phone: "0899999999" },
    });

    await linkHistoryToUser(buyer.id);

    const orders = await prisma.order.findMany({ where: { buyerUserId: buyer.id } });
    expect(orders).toHaveLength(1);
  });

  it("links reviews by email to new user", async () => {
    const seller = await prisma.user.create({
      data: { displayName: "Seller", username: "link_seller2", isShop: true },
    });
    const shop = await prisma.shop.create({
      data: { userId: seller.id, shopName: "Shop", businessType: "INDIVIDUAL" },
    });
    const order = await prisma.order.create({
      data: {
        shopId: shop.id, type: "DIGITAL", totalAmount: 100, status: "CONFIRMED",
        buyerContact: "buyer@test.com",
        items: { create: { name: "Item", qty: 1, price: 100 } },
      },
    });
    await prisma.review.create({
      data: { orderId: order.id, reviewerContact: "buyer@test.com", rating: 5 },
    });

    const buyer = await prisma.user.create({
      data: { displayName: "Buyer", username: "link_buyer2", email: "buyer@test.com" },
    });

    await linkHistoryToUser(buyer.id);

    const reviews = await prisma.review.findMany({ where: { reviewerUserId: buyer.id } });
    expect(reviews).toHaveLength(1);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
npx vitest run tests/services/review.test.ts tests/services/history-linking.test.ts
```

Expected: FAIL.

- [ ] **Step 4: Implement review service**

```typescript
// src/services/review.service.ts
import { prisma } from "@/lib/prisma";
import { evaluateBadges } from "@/services/badge.service";
import { recalculateTrustScore } from "@/services/trust-score.service";

export async function createReview(orderToken: string, data: {
  rating: number;
  comment?: string;
  reviewerContact?: string;
  reviewerUserId?: string;
}) {
  const order = await prisma.order.findUnique({
    where: { publicToken: orderToken },
    include: { review: true, shop: true },
  });
  if (!order) throw new Error("Order not found");
  if (order.review) throw new Error("Review already exists for this order");

  const review = await prisma.review.create({
    data: {
      orderId: order.id,
      rating: data.rating,
      comment: data.comment,
      reviewerContact: data.reviewerContact,
      reviewerUserId: data.reviewerUserId,
    },
  });

  // Recalculate seller trust
  await evaluateBadges(order.shop.userId);
  await recalculateTrustScore(order.shop.userId);

  return review;
}

export async function getReviewsByShopUser(userId: string) {
  return prisma.review.findMany({
    where: { order: { shop: { userId } } },
    include: { order: { select: { publicToken: true, items: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getReviewsByUsername(username: string, take = 10, skip = 0) {
  return prisma.review.findMany({
    where: { order: { shop: { user: { username } } } },
    include: { order: { select: { publicToken: true, items: true } } },
    orderBy: { createdAt: "desc" },
    take,
    skip,
  });
}
```

- [ ] **Step 5: Implement history linking service**

```typescript
// src/services/history-linking.service.ts
import { prisma } from "@/lib/prisma";

export async function linkHistoryToUser(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  const contacts: string[] = [];
  if (user.phone) contacts.push(user.phone);
  if (user.email) contacts.push(user.email);
  if (contacts.length === 0) return;

  // Link orders
  await prisma.order.updateMany({
    where: {
      buyerUserId: null,
      buyerContact: { in: contacts },
    },
    data: { buyerUserId: userId },
  });

  // Link reviews
  await prisma.review.updateMany({
    where: {
      reviewerUserId: null,
      reviewerContact: { in: contacts },
    },
    data: { reviewerUserId: userId },
  });
}
```

- [ ] **Step 6: Run tests**

```bash
npx vitest run tests/services/review.test.ts tests/services/history-linking.test.ts
```

Expected: All PASS.

- [ ] **Step 7: Create API routes**

```typescript
// src/app/api/orders/[token]/review/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createReviewSchema } from "@/lib/validations";
import { createReview } from "@/services/review.service";

export async function POST(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const body = await request.json();
  const parsed = createReviewSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const review = await createReview(token, {
    ...parsed.data,
    reviewerContact: body.reviewerContact,
    reviewerUserId: body.reviewerUserId,
  });
  return NextResponse.json(review, { status: 201 });
}
```

```typescript
// src/app/api/public/profile/[username]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { findByUsername } from "@/services/user.service";

export async function GET(request: NextRequest, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const user = await findByUsername(username);
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    displayName: user.displayName,
    username: user.username,
    avatar: user.avatar,
    trustScore: user.trustScore,
    isShop: user.isShop,
    shop: user.shop,
    badges: user.userBadges.map((ub) => ub.badge),
    memberSince: user.createdAt,
  });
}
```

```typescript
// src/app/api/public/reviews/[username]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getReviewsByUsername } from "@/services/review.service";

export async function GET(request: NextRequest, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const take = Number(request.nextUrl.searchParams.get("take") || "10");
  const skip = Number(request.nextUrl.searchParams.get("skip") || "0");

  const reviews = await getReviewsByUsername(username, take, skip);
  return NextResponse.json(reviews);
}
```

- [ ] **Step 8: Commit**

```bash
git add src/services/review.service.ts src/services/history-linking.service.ts tests/services/ src/app/api/orders/\[token\]/review/ src/app/api/public/
git commit -m "feat: add review, history linking, and public profile API"
```

---

## Task 12: File Upload API

**Files:**
- Create: `src/lib/upload.ts`
- Create: `src/app/api/upload/route.ts`
- Create: `src/app/api/files/[fileId]/route.ts`

- [ ] **Step 1: Create upload utility**

```typescript
// src/lib/upload.ts
import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function saveFile(file: File): Promise<string> {
  if (file.size > MAX_SIZE) throw new Error("File too large");
  if (!ALLOWED_TYPES.includes(file.type)) throw new Error("Invalid file type");

  if (!existsSync(UPLOAD_DIR)) await mkdir(UPLOAD_DIR, { recursive: true });

  const ext = file.name.split(".").pop() || "bin";
  const fileId = `${uuid()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, fileId), buffer);

  return fileId;
}

export async function getFile(fileId: string): Promise<{ buffer: Buffer; ext: string } | null> {
  const filePath = path.join(UPLOAD_DIR, fileId);
  if (!existsSync(filePath)) return null;

  // Prevent path traversal
  if (!filePath.startsWith(UPLOAD_DIR)) return null;

  const buffer = await readFile(filePath);
  const ext = fileId.split(".").pop() || "bin";
  return { buffer, ext };
}
```

- [ ] **Step 2: Create upload API**

```typescript
// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { saveFile } from "@/lib/upload";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const fileId = await saveFile(file);
  return NextResponse.json({ fileId }, { status: 201 });
}
```

```typescript
// src/app/api/files/[fileId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getFile } from "@/lib/upload";

const MIME: Record<string, string> = {
  jpg: "image/jpeg", jpeg: "image/jpeg",
  png: "image/png", webp: "image/webp",
};

export async function GET(request: NextRequest, { params }: { params: Promise<{ fileId: string }> }) {
  const { fileId } = await params;
  const result = await getFile(fileId);
  if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return new NextResponse(result.buffer, {
    headers: {
      "Content-Type": MIME[result.ext] || "application/octet-stream",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/upload.ts src/app/api/upload/ src/app/api/files/
git commit -m "feat: add file upload and serve API"
```

---

## Task 13: Admin API Routes

**Files:**
- Create: `src/app/api/admin/dashboard/route.ts`
- Create: `src/app/api/admin/users/route.ts`
- Create: `src/app/api/admin/verifications/route.ts`
- Create: `src/app/api/admin/verifications/[id]/route.ts`
- Create: `src/app/api/admin/orders/route.ts`
- Create: `src/app/api/admin/badges/route.ts`

- [ ] **Step 1: Create admin middleware helper**

Add to `src/lib/auth.ts`:

```typescript
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || !(session.user as any).isAdmin) {
    return null;
  }
  return session.user as any;
}
```

- [ ] **Step 2: Create admin dashboard API**

```typescript
// src/app/api/admin/dashboard/route.ts
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const [totalUsers, totalShops, totalOrders, pendingVerifications, avgTrustScore] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { isShop: true } }),
    prisma.order.count(),
    prisma.verificationRecord.count({ where: { status: "PENDING" } }),
    prisma.user.aggregate({ _avg: { trustScore: true } }),
  ]);

  return NextResponse.json({
    totalUsers,
    totalShops,
    totalOrders,
    pendingVerifications,
    avgTrustScore: Math.round(avgTrustScore._avg.trustScore || 0),
  });
}
```

- [ ] **Step 3: Create admin users API**

```typescript
// src/app/api/admin/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const search = request.nextUrl.searchParams.get("search") || "";
  const users = await prisma.user.findMany({
    where: search ? {
      OR: [
        { displayName: { contains: search, mode: "insensitive" } },
        { username: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    } : {},
    include: { shop: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json(users);
}
```

- [ ] **Step 4: Create admin verifications API**

```typescript
// src/app/api/admin/verifications/route.ts
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getPendingVerifications } from "@/services/verification.service";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const records = await getPendingVerifications();
  return NextResponse.json(records);
}
```

```typescript
// src/app/api/admin/verifications/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { reviewVerification } from "@/services/verification.service";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await request.json();
  const record = await reviewVerification(id, admin.id, body);
  return NextResponse.json(record);
}
```

- [ ] **Step 5: Create admin orders and badges API**

```typescript
// src/app/api/admin/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const status = request.nextUrl.searchParams.get("status") || undefined;
  const orders = await prisma.order.findMany({
    where: status ? { status } : {},
    include: { shop: { include: { user: true } }, items: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json(orders);
}
```

```typescript
// src/app/api/admin/badges/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const badges = await prisma.badge.findMany({
    include: { _count: { select: { userBadges: true } } },
    orderBy: { type: "asc" },
  });
  return NextResponse.json(badges);
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const badge = await prisma.badge.create({ data: body });
  return NextResponse.json(badge, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const { id, ...data } = body;
  const badge = await prisma.badge.update({ where: { id }, data });
  return NextResponse.json(badge);
}
```

- [ ] **Step 6: Commit**

```bash
git add src/app/api/admin/ src/lib/auth.ts
git commit -m "feat: add admin API routes (dashboard, users, verifications, orders, badges)"
```

---

## Task 14: UI Components Library

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/dialog.tsx`
- Create: `src/components/ui/table.tsx`
- Create: `src/components/ui/select.tsx`
- Create: `src/components/ui/textarea.tsx`
- Create: `src/components/ui/loading.tsx`
- Create: `src/components/ui/empty-state.tsx`
- Create: `src/components/trust-score-badge.tsx`
- Create: `src/components/star-rating.tsx`
- Create: `src/components/order-status-badge.tsx`

- [ ] **Step 1: Create base UI components**

Build reusable, styled components using TailwindCSS. Each component should be a simple, focused file:

- `button.tsx` — variants: primary, secondary, outline, ghost, danger. Sizes: sm, md, lg.
- `input.tsx` — label, error state, disabled state.
- `card.tsx` — container with optional header/footer.
- `badge.tsx` — colored label, variants by color.
- `dialog.tsx` — modal dialog with overlay.
- `table.tsx` — responsive table with header/body.
- `select.tsx` — dropdown with label.
- `textarea.tsx` — multiline input.
- `loading.tsx` — spinner component.
- `empty-state.tsx` — placeholder when no data.

- [ ] **Step 2: Create domain-specific components**

- `trust-score-badge.tsx` — displays score + level (A+/A/B+/B/C/D) with correct color
- `star-rating.tsx` — displays 1-5 star rating (read-only and interactive modes)
- `order-status-badge.tsx` — colored badge for CREATED/CONFIRMED/SHIPPED/COMPLETED/CANCELLED

- [ ] **Step 3: Commit**

```bash
git add src/components/
git commit -m "feat: add UI component library and domain components"
```

---

## Task 15: Layout Components (Sidebar for Buyer/Seller/Admin)

**Files:**
- Create: `src/components/layouts/sidebar.tsx`
- Create: `src/components/layouts/buyer-sidebar.tsx`
- Create: `src/components/layouts/seller-sidebar.tsx`
- Create: `src/components/layouts/admin-sidebar.tsx`
- Create: `src/app/(buyer)/layout.tsx`
- Create: `src/app/seller/layout.tsx`
- Create: `src/app/admin/layout.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create base sidebar component**

A reusable sidebar that accepts menu items and renders a responsive sidebar (desktop) / drawer (mobile). Props: `items: { label, href, icon }[]`, `header`, `footer`.

- [ ] **Step 2: Create buyer sidebar**

Menu items: Dashboard, My Orders, My Reviews, Verification, Profile. Footer: "เปิดร้านค้า" / "ไปหน้าร้าน" button.

- [ ] **Step 3: Create seller sidebar**

Menu items: Dashboard, Products, Orders, Create Order, Reviews, Shop Settings, Verification. Footer: "กลับหน้าผู้ซื้อ" button.

- [ ] **Step 4: Create admin sidebar**

Menu items: Dashboard, Users, Verifications, Orders, Badges.

- [ ] **Step 5: Create layout files**

- `src/app/layout.tsx` — root layout with `<html>`, `<body>`, TailwindCSS globals, SessionProvider
- `src/app/(buyer)/layout.tsx` — buyer sidebar layout (requires auth)
- `src/app/seller/layout.tsx` — seller sidebar layout (requires auth + isShop)
- `src/app/admin/layout.tsx` — admin sidebar layout (requires auth + isAdmin)

- [ ] **Step 6: Commit**

```bash
git add src/components/layouts/ src/app/layout.tsx src/app/\(buyer\)/layout.tsx src/app/seller/layout.tsx src/app/admin/layout.tsx
git commit -m "feat: add sidebar layouts for buyer, seller, and admin"
```

---

## Task 16: Public Pages (Landing, Login, Register, Public Profile, Public Order)

**Files:**
- Create: `src/app/page.tsx` (Landing)
- Create: `src/app/login/page.tsx`
- Create: `src/app/register/page.tsx`
- Create: `src/app/u/[username]/page.tsx`
- Create: `src/app/o/[token]/page.tsx`

- [ ] **Step 1: Landing page**

Thai-language landing page with:
- Hero section explaining SafePay trust platform
- How it works (3 steps: สมัคร → Verify → สะสม Trust)
- CTA buttons: สมัครสมาชิก / เข้าสู่ระบบ

- [ ] **Step 2: Login page**

- Facebook login button
- Phone OTP login (input phone → send OTP → verify OTP → redirect)
- Link to register

- [ ] **Step 3: Register page**

- Registration form (displayName, phone/Facebook)
- After register → auto link history → redirect to dashboard

- [ ] **Step 4: Public profile page (`/u/[username]`)**

Fetch from `/api/public/profile/{username}`. Display:
- Avatar, name, member since
- Trust Score badge (level + score)
- Verification badges
- Achievement badges
- Stats (orders, avg rating)
- Recent reviews (fetch from `/api/public/reviews/{username}`)
- Shop info (if isShop)

Mobile-first responsive layout.

- [ ] **Step 5: Public order page (`/o/[token]`)**

Fetch from `/api/orders/{token}`. Display:
- Order details (items, amount)
- Seller trust profile (score, badges)
- OTP confirm flow (input phone/email → send OTP → verify → confirm order)
- Review form (after confirm — rating + comment)
- Order status timeline

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/app/login/ src/app/register/ src/app/u/ src/app/o/
git commit -m "feat: add public pages (landing, login, register, profile, order)"
```

---

## Task 17: Buyer Pages

**Files:**
- Create: `src/app/(buyer)/dashboard/page.tsx`
- Create: `src/app/(buyer)/orders/page.tsx`
- Create: `src/app/(buyer)/reviews/page.tsx`
- Create: `src/app/(buyer)/settings/profile/page.tsx`
- Create: `src/app/(buyer)/settings/verification/page.tsx`

- [ ] **Step 1: Buyer dashboard**

- Trust Score card (score + level + breakdown)
- Recent activity (orders, reviews)
- Badges earned
- Quick links

- [ ] **Step 2: Buyer orders page**

- List of orders confirmed by this buyer
- Status badge for each order
- Click to view order detail (`/o/{token}`)

- [ ] **Step 3: Buyer reviews page**

- List of reviews given to sellers
- Star rating + comment display

- [ ] **Step 4: Profile settings page**

- Edit displayName, username, avatar
- Linked auth providers (Facebook, phone, email)

- [ ] **Step 5: Verification settings page**

- Show current verification level
- Level 1: Email OTP + Phone OTP buttons
- Level 2: Upload ID card + selfie (if level 1 done)
- Status indicator per verification type

- [ ] **Step 6: Commit**

```bash
git add src/app/\(buyer\)/
git commit -m "feat: add buyer pages (dashboard, orders, reviews, settings)"
```

---

## Task 18: Seller Pages

**Files:**
- Create: `src/app/seller/login/page.tsx`
- Create: `src/app/seller/dashboard/page.tsx`
- Create: `src/app/seller/products/page.tsx`
- Create: `src/app/seller/orders/page.tsx`
- Create: `src/app/seller/orders/create/page.tsx`
- Create: `src/app/seller/reviews/page.tsx`
- Create: `src/app/seller/settings/shop/page.tsx`
- Create: `src/app/seller/settings/verification/page.tsx`

- [ ] **Step 1: Seller login page**

Same as buyer login but with seller branding. After login, check `isShop`. If not → redirect to create shop flow.

- [ ] **Step 2: Seller dashboard**

- Stats cards: total orders, completed orders, avg rating, total revenue
- Recent orders list
- Trust Score + badges

- [ ] **Step 3: Products page**

- Product list (name, price, type, isActive)
- Add product dialog/form
- Edit/delete product actions

- [ ] **Step 4: Orders page**

- Order list with status filter (CREATED/CONFIRMED/SHIPPED/COMPLETED/CANCELLED)
- Order detail: items, buyer contact, status actions
- Ship button (for CONFIRMED physical orders) → tracking form
- Complete button (for CONFIRMED digital/service or SHIPPED orders)
- Copy public link button

- [ ] **Step 5: Create order page**

- Select products from catalog (or add one-off item)
- Set qty for each
- Choose order type (PHYSICAL/DIGITAL/SERVICE)
- Submit → get public link → copy to clipboard

- [ ] **Step 6: Reviews and settings pages**

- Reviews: list of reviews received with star ratings
- Shop settings: edit shop name, description, logo, category, businessType
- Verification: Level 2 (SHOP_PROOF) + Level 3 (BUSINESS_REG) upload forms

- [ ] **Step 7: Commit**

```bash
git add src/app/seller/
git commit -m "feat: add seller pages (dashboard, products, orders, reviews, settings)"
```

---

## Task 19: Admin Pages

**Files:**
- Create: `src/app/admin/login/page.tsx`
- Create: `src/app/admin/page.tsx` (Dashboard)
- Create: `src/app/admin/users/page.tsx`
- Create: `src/app/admin/verifications/page.tsx`
- Create: `src/app/admin/orders/page.tsx`
- Create: `src/app/admin/badges/page.tsx`

- [ ] **Step 1: Admin login page**

Simple login form. After login, check `isAdmin`. If not → reject.

- [ ] **Step 2: Admin dashboard**

Fetch from `/api/admin/dashboard`. Display:
- Stats cards: total users, shops, orders, pending verifications, avg trust score

- [ ] **Step 3: Users page**

- Search bar (by name, username, phone, email)
- Table: displayName, username, trustScore, isShop, createdAt
- Click to view user detail

- [ ] **Step 4: Verifications page**

- Pending verifications queue
- Each card: user info, type, level, documents (view images)
- Approve / Reject buttons with reason input

- [ ] **Step 5: Orders and badges pages**

- Orders: table with status filter, order details
- Badges: list of all badges, user count per badge, add/edit badge form

- [ ] **Step 6: Commit**

```bash
git add src/app/admin/
git commit -m "feat: add admin pages (dashboard, users, verifications, orders, badges)"
```

---

## Task 20: Integration Test & Final Verification

**Files:**
- Modify: `tests/setup.ts`
- Run: all tests

- [ ] **Step 1: Run all unit tests**

```bash
npx vitest run
```

Expected: All tests pass (trust-score, badge, order, review, history-linking).

- [ ] **Step 2: Start dev server and smoke test**

```bash
npm run dev
```

Manually verify:
- Landing page loads at `http://localhost:3000`
- Public profile page works at `/u/admin`
- Seller subdomain rewrites work (configure `/etc/hosts`: `127.0.0.1 seller.localhost admin.localhost`)
- Login flow works
- API endpoints respond correctly

- [ ] **Step 3: Run build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete SafePay Trust Platform MVP"
```

---

## Dependency Graph

```
Task 1 (Setup)
  └→ Task 2 (Schema)
       ├→ Task 3 (Auth + Middleware)
       │    └→ Task 4 (OTP)
       │         └→ Task 5 (User/Shop)
       │              └→ Task 6 (Verification)
       ├→ Task 7 (Trust Score) ←── needs Task 6
       ├→ Task 8 (Badge) ←── needs Task 7
       ├→ Task 9 (Product) ←── needs Task 5
       ├→ Task 10 (Order) ←── needs Task 8, 9
       ├→ Task 11 (Review + Linking) ←── needs Task 10
       └→ Task 12 (Upload)
  Task 13 (Admin API) ←── needs Task 6, 10
  Task 14 (UI Components) ←── independent
  Task 15 (Layouts) ←── needs Task 14
  Task 16 (Public Pages) ←── needs Task 15, 3, 10, 11
  Task 17 (Buyer Pages) ←── needs Task 15, 5, 6
  Task 18 (Seller Pages) ←── needs Task 15, 9, 10
  Task 19 (Admin Pages) ←── needs Task 15, 13
  Task 20 (Final Test) ←── needs all
```

Tasks 14-19 (UI) can be parallelized if multiple agents are available, as long as Task 15 (layouts) is done first.
