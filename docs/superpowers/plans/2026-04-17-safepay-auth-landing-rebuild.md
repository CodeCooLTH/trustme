# SafePay Auth + Landing Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild sign-in, sign-up, verify-otp pages and landing page on the Paces scaffold. Extend the existing NextAuth `phone-otp` provider so sign-up captures `displayName` + `username` upfront. Preserve backend (API routes, services, Prisma).

**Architecture:** Copy Paces auth templates (`theme/paces/Admin/TS/src/app/auth/(basic)/{sign-in,sign-up,two-factor}/`), strip unused elements (Google/GitHub OAuth, email+password fields), and swap in phone-first forms wired to the existing `/api/otp/send` + NextAuth `phone-otp` CredentialsProvider. Routes follow Paces convention: `/auth/sign-in`, `/auth/sign-up`, `/auth/verify-otp`.

**Tech Stack:** Next.js 16 App Router, TypeScript strict, Tailwind 4 + Preline 4, NextAuth v4 (Facebook OAuth + Phone OTP credentials), React Hook Form + `@hookform/resolvers` + Yup, `@iconify/react`, `react-toastify`, Prisma + PostgreSQL.

**Spec:** `docs/superpowers/specs/2026-04-17-safepay-auth-landing-rebuild-design.md`

---

## File Map

| Path | Action | Responsibility |
|---|---|---|
| `src/components/wrappers/AppProvidersWrapper.tsx` | modify | Mount `ToastContainer` once, globally |
| `src/app/page.tsx` | modify | Minimal app-entry landing (AuthLogo + tagline + 2 CTAs) |
| `src/app/auth/layout.tsx` | create | Passthrough layout for `/auth/*` route group |
| `src/app/auth/sign-in/page.tsx` | create | Server page — card + Facebook button + embed `<SignInForm />` |
| `src/app/auth/sign-in/components/SignInForm.tsx` | create | Phone field → POST `/api/otp/send` → navigate to verify-otp |
| `src/app/auth/sign-up/page.tsx` | create | Server page — card + Facebook button + embed `<SignUpForm />` |
| `src/app/auth/sign-up/components/SignUpForm.tsx` | create | phone + displayName + username form with debounced username check |
| `src/app/auth/verify-otp/page.tsx` | create | Server page — card + embed `<VerifyOtpForm />` |
| `src/app/auth/verify-otp/components/VerifyOtpForm.tsx` | create | Read query params → 6-digit input → `signIn('phone-otp', {...})` |
| `src/app/api/users/check-username/route.ts` | create | GET — returns `{available, reason?}` |
| `src/lib/auth.ts` | modify | `pages.signIn` → `/auth/sign-in`; extend `phone-otp` credentials with `mode/displayName/username` |

No files deleted in this plan. (`reset-pass`, `new-pass`, `login-pin`, `lock-screen`, `delete-account`, `success-mail` templates live in `theme/paces/` only — never copied into `src/`.)

---

## Task 1: Wire global ToastContainer

**Why:** Forms and flows use `react-toastify` for "ส่ง OTP ไม่สำเร็จ" / "ส่งรหัสใหม่แล้ว" / Facebook OAuth error. Need a single `<ToastContainer />` mount. `react-toastify@11` is already installed.

**Files:**
- Modify: `src/components/wrappers/AppProvidersWrapper.tsx`

- [ ] **Step 1.1: Update AppProvidersWrapper**

Replace contents of `src/components/wrappers/AppProvidersWrapper.tsx` with:

```tsx
'use client'

import { SessionProvider } from 'next-auth/react'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { LayoutProvider } from '@/context/useLayoutContext'
import { preline } from '@/utils/preline'

const AppProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    preline.init()
  }, [])

  return (
    <SessionProvider>
      <LayoutProvider>{children}</LayoutProvider>
      <ToastContainer position="top-right" autoClose={4000} theme="colored" />
    </SessionProvider>
  )
}

export default AppProvidersWrapper
```

- [ ] **Step 1.2: Type-check and start dev server**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run dev`
Expected: server starts at `http://localhost:3000`. Open it in a browser — the current placeholder landing renders. Keep the server running for later tasks; restart only if a change requires it.

- [ ] **Step 1.3: Commit**

```bash
git add src/components/wrappers/AppProvidersWrapper.tsx
git commit -m "feat(auth): mount global ToastContainer in AppProvidersWrapper"
```

---

## Task 2: Rebuild landing page

**Why:** Current `src/app/page.tsx` is a placeholder using raw Tailwind. Replace with Paces-style card layout using `AuthLogo` + `META_DATA` so it matches the auth pages visually and satisfies "ห้ามเขียน UI จาก scratch" by reusing Paces primitives.

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 2.1: Replace landing page**

Overwrite `src/app/page.tsx`:

```tsx
import AuthLogo from '@/components/AuthLogo'
import { currentYear, META_DATA } from '@/config/constants'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen items-center p-12.5">
      <div className="container">
        <div className="flex justify-center px-2.5">
          <div className="2xl:w-4/10 md:w-1/2 sm:w-2/3 w-full">
            <div className="card p-7.5 rounded-2xl">
              <div className="mb-3 flex flex-col items-center justify-center text-center">
                <AuthLogo />
                <h4 className="font-bold text-base text-dark mt-5 mb-2">
                  {META_DATA.name}
                </h4>
                <p className="text-default-400 mx-auto w-full lg:w-3/4 mb-6">
                  ระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/auth/sign-in"
                  className="btn bg-primary py-3 font-semibold text-white hover:bg-primary-hover text-center"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="btn border border-default-300 text-default-900 hover:border-default-400 hover:bg-default-50 py-3 font-semibold text-center"
                >
                  สมัครสมาชิก
                </Link>
              </div>
            </div>

            <p className="text-default-400 mt-7.5 text-center">
              &copy; {currentYear} {META_DATA.name} - by <span>{META_DATA.author}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2.2: Manual browser verification**

With dev server running, open `http://localhost:3000/`.

Expected:
- Logo appears
- "SafePay" heading + Thai tagline
- Two buttons: "เข้าสู่ระบบ" (primary) and "สมัครสมาชิก" (outlined)
- Clicking "เข้าสู่ระบบ" navigates to `/auth/sign-in` (will 404 until Task 6 — that's OK for now)
- Clicking "สมัครสมาชิก" navigates to `/auth/sign-up` (will 404 until Task 7 — OK)

- [ ] **Step 2.3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(landing): rebuild minimal app-entry landing on Paces card"
```

---

## Task 3: Create auth route group layout

**Why:** `/auth/*` pages share no common chrome (each page supplies its own full-screen card layout), but Next.js still expects a `layout.tsx` for the group so we can set group-level metadata and future-proof for shared components.

**Files:**
- Create: `src/app/auth/layout.tsx`

- [ ] **Step 3.1: Create layout**

Create `src/app/auth/layout.tsx`:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Auth',
    template: '%s | SafePay',
  },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

- [ ] **Step 3.2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3.3: Commit**

```bash
git add src/app/auth/layout.tsx
git commit -m "feat(auth): add /auth route group layout"
```

---

## Task 4: check-username API endpoint

**Why:** Sign-up form needs to flag username collisions before sending OTP so the user isn't stuck on `/auth/verify-otp` when their chosen handle is taken. The spec specifies `GET /api/users/check-username?u=<username>` returning `{available, reason?}`.

**Files:**
- Create: `src/app/api/users/check-username/route.ts`

- [ ] **Step 4.1: Create route**

Create `src/app/api/users/check-username/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const USERNAME_RE = /^[a-zA-Z0-9_]{3,30}$/
const RESERVED = new Set(['admin', 'root', 'api', 'seller', 'safepay', 'www'])

export async function GET(request: NextRequest) {
  const u = request.nextUrl.searchParams.get('u') ?? ''

  if (!USERNAME_RE.test(u)) {
    return NextResponse.json({ available: false, reason: 'invalid' })
  }
  if (RESERVED.has(u.toLowerCase())) {
    return NextResponse.json({ available: false, reason: 'reserved' })
  }

  const existing = await prisma.user.findUnique({
    where: { username: u },
    select: { id: true },
  })
  if (existing) {
    return NextResponse.json({ available: false, reason: 'taken' })
  }

  return NextResponse.json({ available: true })
}
```

- [ ] **Step 4.2: Manual verification with curl**

With dev server running:

```bash
# Missing param
curl -s "http://localhost:3000/api/users/check-username" | cat
# Expected: {"available":false,"reason":"invalid"}

# Too short
curl -s "http://localhost:3000/api/users/check-username?u=ab" | cat
# Expected: {"available":false,"reason":"invalid"}

# Reserved
curl -s "http://localhost:3000/api/users/check-username?u=admin" | cat
# Expected: {"available":false,"reason":"reserved"}

# Valid + free (assuming this username doesn't exist in dev DB)
curl -s "http://localhost:3000/api/users/check-username?u=free_handle_xyz_$(date +%s)" | cat
# Expected: {"available":true}
```

If "Valid + free" unexpectedly returns taken, try a different random handle — the dev DB may already have that username.

- [ ] **Step 4.3: Commit**

```bash
git add src/app/api/users/check-username/route.ts
git commit -m "feat(users): add GET /api/users/check-username endpoint"
```

---

## Task 5: Extend auth.ts — accept displayName/username, switch signIn path

**Why:** The sign-up flow sends `displayName` + `username` through NextAuth `signIn('phone-otp', {...})`. The `authorize` callback must accept these optional fields and use them when creating a brand-new user. Also switch the NextAuth-managed signIn redirect to the new path `/auth/sign-in`.

**Files:**
- Modify: `src/lib/auth.ts`

- [ ] **Step 5.1: Update credentials + authorize**

Replace the `CredentialsProvider(...)` block in `src/lib/auth.ts` with:

```ts
    CredentialsProvider({
      id: "phone-otp",
      name: "Phone OTP",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
        mode: { label: "Mode", type: "text" },
        displayName: { label: "DisplayName", type: "text" },
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.otp) return null;

        const { verifyOtp } = await import("@/lib/otp");
        if (!verifyOtp(credentials.phone, credentials.otp)) return null;

        let user = await prisma.user.findFirst({
          where: { phone: credentials.phone },
        });

        if (!user) {
          const displayName =
            credentials.displayName?.trim() ||
            `User_${credentials.phone.slice(-4)}`;
          const username =
            credentials.username?.trim() || `user_${Date.now()}`;

          try {
            user = await prisma.user.create({
              data: {
                phone: credentials.phone,
                displayName,
                username,
                authAccounts: {
                  create: {
                    provider: "PHONE",
                    providerAccountId: credentials.phone,
                  },
                },
              },
            });
          } catch (err: any) {
            // P2002 = unique constraint on username or phone; surface as auth failure
            if (err?.code === "P2002") return null;
            throw err;
          }
        }
        return { id: user.id, name: user.displayName, email: user.email };
      },
    }),
```

- [ ] **Step 5.2: Update signIn page path**

In the same file, change:

```ts
  pages: {
    signIn: "/login",
  },
```

to:

```ts
  pages: {
    signIn: "/auth/sign-in",
  },
```

- [ ] **Step 5.3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5.4: Commit**

```bash
git add src/lib/auth.ts
git commit -m "feat(auth): extend phone-otp credentials with signup fields"
```

---

## Task 6: Sign-in page + SignInForm

**Why:** `/auth/sign-in` collects a phone number, posts to `/api/otp/send`, then navigates to `/auth/verify-otp?mode=signin&phone=...`. Facebook OAuth button lives on this page too. Copy the Paces sign-in template and strip Google/GitHub + email/password.

**Files:**
- Create: `src/app/auth/sign-in/page.tsx`
- Create: `src/app/auth/sign-in/components/SignInForm.tsx`
- Create: `src/app/auth/sign-in/components/FacebookButton.tsx`

- [ ] **Step 6.1: Create SignInForm**

Create `src/app/auth/sign-in/components/SignInForm.tsx`:

```tsx
'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const schema = Yup.object({
  phone: Yup.string()
    .matches(/^0[0-9]{9}$/, 'เบอร์ต้องขึ้นต้นด้วย 0 และมี 10 หลัก')
    .required('กรุณากรอกเบอร์โทร'),
})

type FormValues = Yup.InferType<typeof schema>

export default function SignInForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { phone: '' },
  })

  const onSubmit = async ({ phone }: FormValues) => {
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: phone, type: 'PHONE' }),
      })
      if (!res.ok) {
        toast.error('ส่ง OTP ไม่สำเร็จ กรุณาลองใหม่')
        return
      }
      router.push(
        `/auth/verify-otp?mode=signin&phone=${encodeURIComponent(phone)}`
      )
    } catch {
      toast.error('ส่ง OTP ไม่สำเร็จ กรุณาลองใหม่')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-5">
        <label htmlFor="phone" className="form-label">
          เบอร์โทรศัพท์
          <span className="text-danger">*</span>
        </label>
        <div className="input-group">
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="08xxxxxxxx"
            className="form-input"
            {...register('phone')}
          />
        </div>
        {errors.phone && (
          <p className="text-danger mt-1 text-sm">{errors.phone.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn bg-primary w-full py-3 font-semibold text-white hover:bg-primary-hover disabled:opacity-60"
      >
        {isSubmitting ? 'กำลังส่งรหัส...' : 'ส่งรหัส OTP'}
      </button>
    </form>
  )
}
```

- [ ] **Step 6.2: Create sign-in page**

Create `src/app/auth/sign-in/page.tsx`:

```tsx
import authCard from '@/assets/images/auth-card-bg.svg'
import AuthLogo from '@/components/AuthLogo'
import { currentYear, META_DATA } from '@/config/constants'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FacebookButton from './components/FacebookButton'
import SignInForm from './components/SignInForm'

export const metadata: Metadata = { title: 'เข้าสู่ระบบ' }

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center p-12.5">
      <div className="container">
        <div className="flex justify-center px-2.5">
          <div className="2xl:w-4/10 md:w-1/2 sm:w-2/3 w-full">
            <div className="absolute end-0 top-0">
              <Image src={authCard} alt="auth-card-bg" />
            </div>
            <div className="absolute start-0 bottom-0 rotate-180">
              <Image src={authCard} alt="auth-card-bg" />
            </div>

            <div className="card p-7.5 rounded-2xl">
              <div className="mb-3 flex flex-col items-center justify-center text-center">
                <AuthLogo />
                <h4 className="font-bold text-base text-dark mt-5 mb-2">
                  ยินดีต้อนรับ 👋
                </h4>
                <p className="text-default-400 mx-auto w-full lg:w-3/4 mb-4">
                  กรอกเบอร์โทรเพื่อรับรหัส OTP เข้าสู่ระบบ
                </p>
              </div>

              <FacebookButton />

              <p className="relative my-5 text-center text-default-400 after:absolute after:start-0 after:end-0 after:top-2.75 after:h-0.75 after:border-t after:border-b after:border-dashed after:border-default-300">
                <span className="relative z-10 font-medium bg-card px-4">
                  หรือเข้าสู่ระบบด้วยเบอร์โทร
                </span>
              </p>

              <SignInForm />

              <p className="text-default-400 mt-7.5 text-center">
                ยังไม่มีบัญชี?&nbsp;
                <Link
                  href="/auth/sign-up"
                  className="text-primary font-semibold underline underline-offset-4"
                >
                  สมัครสมาชิก
                </Link>
              </p>
            </div>

            <p className="text-default-400 mt-7.5 text-center">
              &copy; {currentYear} {META_DATA.name} - by <span>{META_DATA.author}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 6.3: Create FacebookButton client component**

Create `src/app/auth/sign-in/components/FacebookButton.tsx`:

```tsx
'use client'

import { Icon } from '@iconify/react'
import { signIn } from 'next-auth/react'

export default function FacebookButton() {
  return (
    <button
      type="button"
      onClick={() => signIn('facebook', { callbackUrl: '/' })}
      className="btn border border-default-300 text-default-900 hover:border-default-400 hover:bg-default-50 w-full flex items-center justify-center gap-2"
    >
      <Icon icon="mdi:facebook" width={18} height={18} className="text-[#1877F2]" />
      <span>เข้าสู่ระบบด้วย Facebook</span>
    </button>
  )
}
```

- [ ] **Step 6.4: Manual browser verification**

Navigate to `http://localhost:3000/auth/sign-in`.

Expected:
- Card renders with logo + Thai welcome text
- Facebook button visible with blue Facebook icon
- Phone field with Thai label, placeholder `08xxxxxxxx`
- "ส่งรหัส OTP" primary button
- "สมัครสมาชิก" link at bottom points to `/auth/sign-up`

Form validation check:
- Submit empty → inline "กรุณากรอกเบอร์โทร"
- Submit `12345` → inline "เบอร์ต้องขึ้นต้นด้วย 0 และมี 10 หลัก"
- Submit `0812345678` → button becomes "กำลังส่งรหัส..." → navigates to `/auth/verify-otp?mode=signin&phone=0812345678` (page will 404 until Task 8 — OK)
- In the terminal where dev server runs, you should see a line like `[OTP] PHONE:0812345678 → <6 digits>`

- [ ] **Step 6.5: Commit**

```bash
git add src/app/auth/sign-in/
git commit -m "feat(auth): add sign-in page with phone OTP + Facebook"
```

---

## Task 7: Sign-up page + SignUpForm

**Why:** `/auth/sign-up` collects phone + displayName + username. The username field checks availability on debounced blur via `/api/users/check-username` so the user gets immediate feedback. On submit, send OTP and navigate to verify-otp with all fields in query params.

**Files:**
- Create: `src/app/auth/sign-up/page.tsx`
- Create: `src/app/auth/sign-up/components/SignUpForm.tsx`
- Create: `src/app/auth/sign-up/components/FacebookButton.tsx`

- [ ] **Step 7.1: Create FacebookButton (same as sign-in)**

Create `src/app/auth/sign-up/components/FacebookButton.tsx`:

```tsx
'use client'

import { Icon } from '@iconify/react'
import { signIn } from 'next-auth/react'

export default function FacebookButton() {
  return (
    <button
      type="button"
      onClick={() => signIn('facebook', { callbackUrl: '/' })}
      className="btn border border-default-300 text-default-900 hover:border-default-400 hover:bg-default-50 w-full flex items-center justify-center gap-2"
    >
      <Icon icon="mdi:facebook" width={18} height={18} className="text-[#1877F2]" />
      <span>สมัครด้วย Facebook</span>
    </button>
  )
}
```

(Intentionally duplicated with different label text rather than abstracted — spec allows this small duplication to keep each page self-contained. Extract if a third usage appears.)

- [ ] **Step 7.2: Create SignUpForm**

Create `src/app/auth/sign-up/components/SignUpForm.tsx`:

```tsx
'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const schema = Yup.object({
  phone: Yup.string()
    .matches(/^0[0-9]{9}$/, 'เบอร์ต้องขึ้นต้นด้วย 0 และมี 10 หลัก')
    .required('กรุณากรอกเบอร์โทร'),
  displayName: Yup.string()
    .min(2, 'อย่างน้อย 2 ตัวอักษร')
    .max(50, 'ไม่เกิน 50 ตัวอักษร')
    .required('กรุณากรอกชื่อที่แสดง'),
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_]{3,30}$/, 'ใช้ a-z, 0-9, _ ได้ 3-30 ตัว')
    .required('กรุณาตั้งชื่อผู้ใช้'),
})

type FormValues = Yup.InferType<typeof schema>

type UsernameStatus =
  | { state: 'idle' }
  | { state: 'checking' }
  | { state: 'ok' }
  | { state: 'error'; reason: 'taken' | 'reserved' | 'invalid' | 'network' }

const REASON_MESSAGE: Record<'taken' | 'reserved' | 'invalid' | 'network', string> = {
  taken: 'ชื่อผู้ใช้นี้ถูกใช้แล้ว',
  reserved: 'ชื่อผู้ใช้นี้สงวนไว้',
  invalid: 'รูปแบบชื่อผู้ใช้ไม่ถูกต้อง',
  network: 'ตรวจสอบชื่อผู้ใช้ไม่สำเร็จ ลองใหม่อีกครั้ง',
}

export default function SignUpForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { phone: '', displayName: '', username: '' },
  })

  const username = watch('username')
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>({
    state: 'idle',
  })

  // Debounce check-username on value change
  useEffect(() => {
    if (!username) {
      setUsernameStatus({ state: 'idle' })
      return
    }
    // Client regex pre-check — don't hit API for obviously invalid input
    if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
      setUsernameStatus({ state: 'idle' })
      return
    }
    setUsernameStatus({ state: 'checking' })
    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/users/check-username?u=${encodeURIComponent(username)}`
        )
        const data: { available: boolean; reason?: 'taken' | 'reserved' | 'invalid' } =
          await res.json()
        if (data.available) {
          setUsernameStatus({ state: 'ok' })
        } else {
          setUsernameStatus({ state: 'error', reason: data.reason ?? 'invalid' })
        }
      } catch {
        setUsernameStatus({ state: 'error', reason: 'network' })
      }
    }, 400)
    return () => clearTimeout(t)
  }, [username])

  const onSubmit = async (values: FormValues) => {
    if (usernameStatus.state === 'error') {
      toast.error(REASON_MESSAGE[usernameStatus.reason])
      return
    }
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: values.phone, type: 'PHONE' }),
      })
      if (!res.ok) {
        toast.error('ส่ง OTP ไม่สำเร็จ กรุณาลองใหม่')
        return
      }
      const params = new URLSearchParams({
        mode: 'signup',
        phone: values.phone,
        name: values.displayName,
        username: values.username,
      })
      router.push(`/auth/verify-otp?${params.toString()}`)
    } catch {
      toast.error('ส่ง OTP ไม่สำเร็จ กรุณาลองใหม่')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-5">
        <label htmlFor="phone" className="form-label">
          เบอร์โทรศัพท์<span className="text-danger">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="08xxxxxxxx"
          className="form-input"
          {...register('phone')}
        />
        {errors.phone && (
          <p className="text-danger mt-1 text-sm">{errors.phone.message}</p>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="displayName" className="form-label">
          ชื่อที่แสดง<span className="text-danger">*</span>
        </label>
        <input
          id="displayName"
          type="text"
          placeholder="ชื่อ-นามสกุล หรือชื่อเล่น"
          className="form-input"
          {...register('displayName')}
        />
        {errors.displayName && (
          <p className="text-danger mt-1 text-sm">{errors.displayName.message}</p>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="username" className="form-label">
          ชื่อผู้ใช้ (username)<span className="text-danger">*</span>
        </label>
        <input
          id="username"
          type="text"
          autoComplete="off"
          placeholder="a-z, 0-9, _ เท่านั้น"
          className="form-input"
          {...register('username')}
        />
        {errors.username && (
          <p className="text-danger mt-1 text-sm">{errors.username.message}</p>
        )}
        {!errors.username && usernameStatus.state === 'checking' && (
          <p className="text-default-400 mt-1 text-sm">กำลังตรวจสอบ...</p>
        )}
        {!errors.username && usernameStatus.state === 'ok' && (
          <p className="text-success mt-1 text-sm">ใช้ชื่อนี้ได้</p>
        )}
        {!errors.username && usernameStatus.state === 'error' && (
          <p className="text-danger mt-1 text-sm">
            {REASON_MESSAGE[usernameStatus.reason]}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || usernameStatus.state === 'checking'}
        className="btn bg-primary w-full py-3 font-semibold text-white hover:bg-primary-hover disabled:opacity-60"
      >
        {isSubmitting ? 'กำลังส่งรหัส...' : 'สร้างบัญชีและรับรหัส OTP'}
      </button>
    </form>
  )
}
```

- [ ] **Step 7.3: Create sign-up page**

Create `src/app/auth/sign-up/page.tsx`:

```tsx
import authCard from '@/assets/images/auth-card-bg.svg'
import AuthLogo from '@/components/AuthLogo'
import { currentYear, META_DATA } from '@/config/constants'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FacebookButton from './components/FacebookButton'
import SignUpForm from './components/SignUpForm'

export const metadata: Metadata = { title: 'สมัครสมาชิก' }

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center p-12.5">
      <div className="container">
        <div className="flex justify-center px-2.5">
          <div className="2xl:w-4/10 md:w-1/2 sm:w-2/3 w-full">
            <div className="absolute end-0 top-0">
              <Image src={authCard} alt="auth-card-bg" />
            </div>
            <div className="absolute start-0 bottom-0 rotate-180">
              <Image src={authCard} alt="auth-card-bg" />
            </div>

            <div className="card p-7.5 rounded-2xl">
              <div className="mb-3 flex flex-col items-center justify-center text-center">
                <AuthLogo />
                <p className="text-default-400 mx-auto mt-6 mb-4 w-full lg:w-3/4">
                  เริ่มต้นใช้งาน SafePay — กรอกข้อมูลด้านล่างเพื่อสร้างบัญชี
                </p>
              </div>

              <FacebookButton />

              <p className="relative my-5 text-center text-default-400 after:absolute after:start-0 after:end-0 after:top-2.75 after:h-0.75 after:border-t after:border-b after:border-dashed after:border-default-300">
                <span className="relative z-10 bg-card px-4 font-medium">
                  หรือสมัครด้วยเบอร์โทร
                </span>
              </p>

              <SignUpForm />

              <p className="text-default-400 mt-7.5 text-center">
                มีบัญชีอยู่แล้ว?&nbsp;
                <Link
                  href="/auth/sign-in"
                  className="text-primary font-semibold underline underline-offset-4"
                >
                  เข้าสู่ระบบ
                </Link>
              </p>
            </div>

            <p className="text-default-400 mt-7.5 text-center">
              &copy; {currentYear} {META_DATA.name} - by <span>{META_DATA.author}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 7.4: Manual browser verification**

Navigate to `http://localhost:3000/auth/sign-up`.

Expected:
- Card + logo + Thai intro
- Facebook button labeled "สมัครด้วย Facebook"
- Three fields: phone, displayName, username
- Type `admin` in username → after ~400ms see "ชื่อผู้ใช้นี้สงวนไว้"
- Type `ab` in username → "ใช้ a-z, 0-9, _ ได้ 3-30 ตัว" (Yup error — client-side, no API call)
- Type a random handle like `demo_${timestamp}` → "ใช้ชื่อนี้ได้"
- Fill phone=`0812345678`, displayName=`Test User`, username=`demo_xxx` → submit
- Navigates to `/auth/verify-otp?mode=signup&phone=0812345678&name=Test%20User&username=demo_xxx`

- [ ] **Step 7.5: Commit**

```bash
git add src/app/auth/sign-up/
git commit -m "feat(auth): add sign-up page with phone + displayName + username"
```

---

## Task 8: Verify-OTP page + VerifyOtpForm

**Why:** `/auth/verify-otp` is the convergence point for both sign-in and sign-up flows. It reads query params, displays a masked phone, accepts 6 digits, and calls `signIn('phone-otp', {...})`. On success → redirect `/`. On failure → inline error. Resend button re-fires `/api/otp/send`.

**Files:**
- Create: `src/app/auth/verify-otp/page.tsx`
- Create: `src/app/auth/verify-otp/components/VerifyOtpForm.tsx`

- [ ] **Step 8.1: Create VerifyOtpForm**

Create `src/app/auth/verify-otp/components/VerifyOtpForm.tsx`:

```tsx
'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, type FormEvent } from 'react'
import { toast } from 'react-toastify'

export default function VerifyOtpForm() {
  const router = useRouter()
  const params = useSearchParams()

  const phone = params.get('phone') ?? ''
  const mode = (params.get('mode') ?? 'signin') as 'signin' | 'signup'
  const displayName = params.get('name') ?? ''
  const username = params.get('username') ?? ''

  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [resending, setResending] = useState(false)

  // Redirect if no phone context
  useEffect(() => {
    if (!phone) router.replace('/auth/sign-in')
  }, [phone, router])

  const masked = phone
    ? `${'*'.repeat(Math.max(0, phone.length - 4))}${phone.slice(-4)}`
    : ''

  const handleDigit = (i: number, v: string) => {
    const clean = v.replace(/\D/g, '').slice(0, 1)
    const next = [...digits]
    next[i] = clean
    setDigits(next)
    // auto-focus next input
    if (clean && i < 5) {
      const nextEl = document.getElementById(`otp-${i + 1}`) as HTMLInputElement | null
      nextEl?.focus()
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    const otp = digits.join('')
    if (otp.length !== 6) {
      setErrorMsg('กรุณากรอกรหัส 6 หลัก')
      return
    }
    setSubmitting(true)
    const result = await signIn('phone-otp', {
      phone,
      otp,
      mode,
      displayName,
      username,
      redirect: false,
    })
    setSubmitting(false)
    if (result?.ok) {
      router.push('/')
      return
    }
    setErrorMsg('รหัสไม่ถูกต้องหรือหมดอายุ ลองอีกครั้ง')
  }

  const onResend = async () => {
    if (!phone) return
    setResending(true)
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: phone, type: 'PHONE' }),
      })
      if (res.ok) {
        toast.success('ส่งรหัสใหม่แล้ว')
        setDigits(['', '', '', '', '', ''])
        setErrorMsg(null)
      } else {
        toast.error('ส่งรหัสใหม่ไม่สำเร็จ')
      }
    } catch {
      toast.error('ส่งรหัสใหม่ไม่สำเร็จ')
    } finally {
      setResending(false)
    }
  }

  if (!phone) return null

  return (
    <>
      <div className="mb-3 flex flex-col items-center justify-center text-center">
        <p className="text-default-400 mx-auto mt-6 mb-4 w-full lg:w-3/4">
          เราได้ส่งรหัส 6 หลักไปที่เบอร์
        </p>
      </div>

      <div className="mb-9">
        <div className="text-center text-2xl font-bold">{masked}</div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mb-5">
          <label className="form-label">
            กรอกรหัส 6 หลัก<span className="text-danger">*</span>
          </label>
          <div className="two-factor flex gap-2">
            {digits.map((d, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleDigit(i, e.target.value)}
                className="form-input text-center"
                required
              />
            ))}
          </div>
          {errorMsg && (
            <p className="text-danger mt-2 text-sm text-center">{errorMsg}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn bg-primary w-full py-3 font-semibold text-white hover:bg-primary-hover disabled:opacity-60"
        >
          {submitting ? 'กำลังยืนยัน...' : 'ยืนยัน'}
        </button>
      </form>

      <p className="text-default-400 my-9 text-center">
        ไม่ได้รับรหัส?&nbsp;
        <button
          type="button"
          onClick={onResend}
          disabled={resending}
          className="text-primary font-semibold underline underline-offset-3 disabled:opacity-60"
        >
          {resending ? 'กำลังส่ง...' : 'ส่งรหัสใหม่'}
        </button>
      </p>

      <p className="text-default-400 text-center">
        {mode === 'signup' ? (
          <>
            ต้องการ&nbsp;
            <Link
              href="/auth/sign-up"
              className="text-primary font-semibold underline underline-offset-3"
            >
              แก้ไขข้อมูล
            </Link>
          </>
        ) : (
          <>
            กลับไป&nbsp;
            <Link
              href="/auth/sign-in"
              className="text-primary font-semibold underline underline-offset-3"
            >
              เข้าสู่ระบบ
            </Link>
          </>
        )}
      </p>
    </>
  )
}
```

- [ ] **Step 8.2: Create verify-otp page**

Create `src/app/auth/verify-otp/page.tsx`:

```tsx
import authCard from '@/assets/images/auth-card-bg.svg'
import AuthLogo from '@/components/AuthLogo'
import { currentYear, META_DATA } from '@/config/constants'
import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import VerifyOtpForm from './components/VerifyOtpForm'

export const metadata: Metadata = { title: 'ยืนยันรหัส OTP' }

export default function VerifyOtpPage() {
  return (
    <div className="flex min-h-screen items-center p-12.5">
      <div className="container">
        <div className="flex justify-center px-2.5">
          <div className="2xl:w-4/10 md:w-1/2 sm:w-2/3 w-full">
            <div className="absolute end-0 top-0">
              <Image src={authCard} alt="auth-card-bg" />
            </div>
            <div className="absolute start-0 bottom-0 rotate-180">
              <Image src={authCard} alt="auth-card-bg" />
            </div>

            <div className="card p-7.5 rounded-2xl">
              <div className="mb-3 flex flex-col items-center justify-center text-center">
                <AuthLogo />
              </div>

              <Suspense fallback={<p className="text-center text-default-400">กำลังโหลด...</p>}>
                <VerifyOtpForm />
              </Suspense>
            </div>

            <p className="text-default-400 mt-7.5 text-center">
              &copy; {currentYear} {META_DATA.name} - by <span>{META_DATA.author}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

The `<Suspense>` boundary is required because `useSearchParams()` in `VerifyOtpForm` needs it in Next.js 16 App Router to avoid build-time prerender errors.

- [ ] **Step 8.3: Manual browser verification (golden path — sign-up)**

Walk through the entire sign-up golden path:

1. Start at `http://localhost:3000/`
2. Click "สมัครสมาชิก" → lands on `/auth/sign-up`
3. Fill phone=`0812345678`, displayName=`Test User`, username=`demo_${Date.now()}` → submit
4. Lands on `/auth/verify-otp?mode=signup&phone=0812345678&name=Test%20User&username=demo_...`
5. Masked phone displayed (e.g., `******5678`)
6. Check dev server terminal for `[OTP] PHONE:0812345678 → 123456`
7. Enter those 6 digits → click "ยืนยัน"
8. Should redirect to `/` (landing again) with `session` active — you can confirm via `document.cookie` in DevTools (look for `next-auth.session-token`)
9. In Prisma Studio or psql: a new `User` row with `phone=0812345678`, `displayName=Test User`, `username=demo_...` exists. `AuthAccount` row with `provider=PHONE` exists too.

- [ ] **Step 8.4: Manual browser verification (golden path — sign-in)**

1. `http://localhost:3000/auth/sign-in`
2. Enter the phone from Task 8.3 step 3 → submit
3. Lands on `/auth/verify-otp?mode=signin&phone=...` (no name/username in URL)
4. Enter OTP from dev terminal → ยืนยัน
5. Redirects to `/` — session active. **No** duplicate User row created.

- [ ] **Step 8.5: Edge case — direct URL without phone**

Navigate directly to `http://localhost:3000/auth/verify-otp` (no query).
Expected: `router.replace('/auth/sign-in')` fires immediately; URL becomes `/auth/sign-in`.

- [ ] **Step 8.6: Edge case — test bypass**

`http://localhost:3000/auth/sign-in` → phone `0920791649` → OTP `000000` → authenticates (test bypass in `src/lib/otp.ts`).

- [ ] **Step 8.7: Commit**

```bash
git add src/app/auth/verify-otp/
git commit -m "feat(auth): add verify-otp page with 6-digit input + resend"
```

---

## Task 9: Facebook OAuth error toast on sign-in

**Why:** When Facebook OAuth fails, NextAuth redirects back to `signIn` page with `?error=<code>`. The user should see a toast rather than silent failure.

**Files:**
- Create: `src/app/auth/sign-in/components/OAuthErrorToast.tsx`
- Modify: `src/app/auth/sign-in/page.tsx` (embed new client component)

- [ ] **Step 9.1: Create OAuthErrorToast**

Create `src/app/auth/sign-in/components/OAuthErrorToast.tsx`:

```tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const MESSAGES: Record<string, string> = {
  OAuthSignin: 'เชื่อมต่อ Facebook ไม่สำเร็จ ลองอีกครั้ง',
  OAuthCallback: 'Facebook ปฏิเสธการเข้าสู่ระบบ',
  OAuthCreateAccount: 'สร้างบัญชีจาก Facebook ไม่สำเร็จ',
  AccessDenied: 'การเข้าสู่ระบบถูกปฏิเสธ',
}

export default function OAuthErrorToast() {
  const params = useSearchParams()
  const err = params.get('error')

  useEffect(() => {
    if (!err) return
    toast.error(MESSAGES[err] ?? 'เข้าสู่ระบบไม่สำเร็จ ลองอีกครั้ง')
  }, [err])

  return null
}
```

- [ ] **Step 9.2: Embed in sign-in page (under Suspense)**

Modify `src/app/auth/sign-in/page.tsx` — add import and include it wrapped in Suspense near the top of the card. Replace the existing file with:

```tsx
import authCard from '@/assets/images/auth-card-bg.svg'
import AuthLogo from '@/components/AuthLogo'
import { currentYear, META_DATA } from '@/config/constants'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import FacebookButton from './components/FacebookButton'
import OAuthErrorToast from './components/OAuthErrorToast'
import SignInForm from './components/SignInForm'

export const metadata: Metadata = { title: 'เข้าสู่ระบบ' }

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center p-12.5">
      <Suspense fallback={null}>
        <OAuthErrorToast />
      </Suspense>
      <div className="container">
        <div className="flex justify-center px-2.5">
          <div className="2xl:w-4/10 md:w-1/2 sm:w-2/3 w-full">
            <div className="absolute end-0 top-0">
              <Image src={authCard} alt="auth-card-bg" />
            </div>
            <div className="absolute start-0 bottom-0 rotate-180">
              <Image src={authCard} alt="auth-card-bg" />
            </div>

            <div className="card p-7.5 rounded-2xl">
              <div className="mb-3 flex flex-col items-center justify-center text-center">
                <AuthLogo />
                <h4 className="font-bold text-base text-dark mt-5 mb-2">
                  ยินดีต้อนรับ 👋
                </h4>
                <p className="text-default-400 mx-auto w-full lg:w-3/4 mb-4">
                  กรอกเบอร์โทรเพื่อรับรหัส OTP เข้าสู่ระบบ
                </p>
              </div>

              <FacebookButton />

              <p className="relative my-5 text-center text-default-400 after:absolute after:start-0 after:end-0 after:top-2.75 after:h-0.75 after:border-t after:border-b after:border-dashed after:border-default-300">
                <span className="relative z-10 font-medium bg-card px-4">
                  หรือเข้าสู่ระบบด้วยเบอร์โทร
                </span>
              </p>

              <SignInForm />

              <p className="text-default-400 mt-7.5 text-center">
                ยังไม่มีบัญชี?&nbsp;
                <Link
                  href="/auth/sign-up"
                  className="text-primary font-semibold underline underline-offset-4"
                >
                  สมัครสมาชิก
                </Link>
              </p>
            </div>

            <p className="text-default-400 mt-7.5 text-center">
              &copy; {currentYear} {META_DATA.name} - by <span>{META_DATA.author}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 9.3: Manual verification**

Navigate to `http://localhost:3000/auth/sign-in?error=OAuthCallback`.
Expected: a red toast "Facebook ปฏิเสธการเข้าสู่ระบบ" appears in the top-right, then auto-closes.

- [ ] **Step 9.4: Commit**

```bash
git add src/app/auth/sign-in/
git commit -m "feat(auth): toast Facebook OAuth errors on sign-in mount"
```

---

## Task 10: Full regression pass + lint + type-check

**Why:** Catch any drift or broken flow before handing off.

- [ ] **Step 10.1: TypeScript check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 10.2: Lint**

Run: `npm run lint`
Expected: no new errors in touched files. Warnings about `<img>` vs `<Image />` inside `AuthLogo` are pre-existing — ignore.

- [ ] **Step 10.3: Production build**

Run: `npm run build`
Expected: build succeeds. Note any route-level warnings (e.g., missing Suspense) — if verify-otp or sign-in fail to build, the Suspense boundary was not wrapped correctly; fix and rebuild.

- [ ] **Step 10.4: Edge case — 3 wrong OTPs**

1. Sign-in with a registered phone
2. On verify-otp page, enter `000001` → "รหัสไม่ถูกต้องหรือหมดอายุ"
3. Enter `000002` → same error
4. Enter `000003` → same error
5. The OTP store entry is now deleted by `verifyOtp` in `src/lib/otp.ts` (attempts >= 3 branch). Click "ส่งรหัสใหม่" → get a fresh OTP from the dev server terminal → enter correctly → success.

- [ ] **Step 10.5: Edge case — username race**

1. Open two browser tabs at `/auth/sign-up`
2. In both, fill the same never-used username (e.g., `race_${Date.now()}`) + different phones
3. Submit tab 1 → sign-up → verify OTP → success
4. Submit tab 2 → navigates to verify-otp → enter OTP (from tab 2's phone) → `signIn` returns `{ok: false}` because authorize returned `null` after P2002
5. Inline error "รหัสไม่ถูกต้องหรือหมดอายุ ลองอีกครั้ง" shown, plus "แก้ไขข้อมูล" link back to sign-up
6. Click link → pick different username → retry

- [ ] **Step 10.6: Commit if anything changed in 10.1–10.3**

If lint/type-check/build flagged anything and you fixed it:

```bash
git add -A
git commit -m "chore(auth): address lint/type issues from regression pass"
```

Otherwise skip.

- [ ] **Step 10.7: Final status check**

Run: `git status`
Expected: clean working tree.

Run: `git log --oneline -12`
Expected output (from top):
```
<sha> chore(auth): address lint/type issues from regression pass   (or skipped)
<sha> feat(auth): toast Facebook OAuth errors on sign-in mount
<sha> feat(auth): add verify-otp page with 6-digit input + resend
<sha> feat(auth): add sign-up page with phone + displayName + username
<sha> feat(auth): add sign-in page with phone OTP + Facebook
<sha> feat(auth): extend phone-otp credentials with signup fields
<sha> feat(users): add GET /api/users/check-username endpoint
<sha> feat(auth): add /auth route group layout
<sha> feat(landing): rebuild minimal app-entry landing on Paces card
<sha> feat(auth): mount global ToastContainer in AppProvidersWrapper
27b878f docs: add design spec for auth + landing rebuild
3c52f84 chore: migrate UI stack from Vuexy to Paces scaffold
```

---

## Post-plan summary

Once every task above is checked off:
- Landing page reflects Paces styling; both CTAs route to working auth pages.
- `/auth/sign-in` accepts a phone or falls through to Facebook OAuth.
- `/auth/sign-up` collects displayName + username with live availability check.
- `/auth/verify-otp` is the single OTP entry point for both flows.
- Existing backend (`/api/otp/*`, Prisma, services) is untouched apart from the auth.ts extension.
- No Vuexy residue in the auth flow.

**Deferred (tracked in spec §Known scope gaps):** Facebook username onboarding, SMS gateway, rate limiting, i18n extraction, seller + admin subdomain auth.
