# SafePay Auth + Landing Rebuild — Design Spec

**Date:** 2026-04-17
**Scope:** Rebuild auth pages (sign-in, sign-up, verify-otp) + landing page on Paces (Preline + Tailwind 4) scaffold after Vuexy wipe.
**Depends on:** `chore: migrate UI stack from Vuexy to Paces scaffold` (commit `3c52f84`).

---

## Goal

Restore login, registration, OTP verification, and landing page on the main (buyer) domain using Paces templates as the base. Preserve existing backend: NextAuth v4 `phone-otp` CredentialsProvider + Facebook OAuth + OTP API routes.

## Non-goals

- Seller subdomain auth (`seller.safepay.co/auth/*`) — deferred to seller rebuild phase.
- Admin subdomain auth — deferred.
- Marketing landing page with hero/features/testimonials — deferred; MVP uses minimal app-entry landing.
- SMS gateway integration (`/api/otp/send` keeps MVP `console.log` behavior).
- Rate limiting on OTP send / username check.
- Facebook user profile onboarding (auto-generated username stays until profile settings page exists).
- i18n extraction — Thai strings hardcoded for now.

## Confirmed decisions

| # | Decision | Chosen |
|---|---|---|
| 1 | Auth providers | Phone OTP + Facebook OAuth only. No email/password, no Google/GitHub. |
| 2 | Sign-up strategy | Separate `/auth/sign-up` page collecting **phone + displayName + username** before OTP verify |
| 3 | OTP verify UX | Separate page `/auth/verify-otp` (not inline, not modal) |
| 4 | Landing page | Minimal app-entry: logo + tagline + login/register CTAs (not marketing) |
| 5 | Route paths | Paces convention: `/auth/sign-in`, `/auth/sign-up`, `/auth/verify-otp` (update `auth.ts`) |

---

## Route map & file structure

```
src/app/
├── page.tsx                              [modify]  Landing minimal app-entry
├── auth/
│   ├── layout.tsx                        [new]     Auth group — bg + container
│   ├── sign-in/
│   │   ├── page.tsx                      [new]     Copy from theme/paces/.../sign-in/page.tsx
│   │   └── components/SignInForm.tsx     [new]     Phone form → send OTP → navigate
│   ├── sign-up/
│   │   ├── page.tsx                      [new]     Copy from theme/paces/.../sign-up/page.tsx
│   │   └── components/SignUpForm.tsx     [new]     phone + displayName + username → send OTP → navigate
│   └── verify-otp/
│       ├── page.tsx                      [new]     Copy from theme/paces/.../two-factor/page.tsx
│       └── components/VerifyOtpForm.tsx  [new]     6-digit input → signIn('phone-otp') → redirect
```

Templates ที่ **ไม่ copy** (ไม่ใช้): `reset-pass`, `new-pass`, `login-pin`, `lock-screen`, `delete-account`, `success-mail`.

## End-to-end flows

### Landing → Auth entry

```
GET /
  - Display AuthLogo + "SafePay" + tagline + 2 buttons
  - "เข้าสู่ระบบ" → /auth/sign-in
  - "สมัครสมาชิก" → /auth/sign-up
```

### Sign-in (returning user)

```
GET /auth/sign-in
  - Form: phone field only
  - Facebook button

On Facebook click:
  signIn('facebook', { callbackUrl: '/' })

On phone form submit:
  POST /api/otp/send { contact: phone, type: 'PHONE' }
  - 200: router.push(`/auth/verify-otp?mode=signin&phone=${encodeURIComponent(phone)}`)
  - non-200: toast error, stay on page
```

### Sign-up (new user)

```
GET /auth/sign-up
  - Form: phone + displayName + username

On username blur (debounced):
  GET /api/users/check-username?u=<username>
  - { available: false } → inline "ชื่อผู้ใช้นี้ถูกใช้แล้ว"

On submit (all client validation passed + username available):
  POST /api/otp/send { contact: phone, type: 'PHONE' }
  - 200: router.push(
      `/auth/verify-otp?mode=signup&phone=${enc(phone)}&name=${enc(displayName)}&username=${enc(username)}`
    )
  - non-200: toast error
```

### Verify OTP (both flows converge)

```
GET /auth/verify-otp?mode=<signin|signup>&phone=...&name=...&username=...
  - Read query params
  - If phone missing → router.replace('/auth/sign-in')
  - Display masked phone (****XXXX last 4 digits)
  - 6-digit input

On submit:
  signIn('phone-otp', {
    phone, otp,
    mode: queryMode,
    displayName: queryName ?? '',
    username:    queryUsername ?? '',
    redirect: false,
  })
  - { ok: true }  → router.push('/')
  - { error: ... } → inline "รหัสไม่ถูกต้องหรือหมดอายุ ลองอีกครั้ง"
    (generic message — covers both bad OTP and P2002 username race.
     If user sees this and suspects username clash, they can click
     "แก้ไขข้อมูล" link back to /auth/sign-up)

Resend button:
  POST /api/otp/send { contact: phone, type: 'PHONE' }
  - toast "ส่งรหัสใหม่แล้ว"
```

---

## Backend changes

### `src/lib/auth.ts`

1. `pages.signIn` → `"/auth/sign-in"` (was `"/login"`).
2. Extend `phone-otp` CredentialsProvider to accept `mode`, `displayName`, `username`:

```ts
credentials: {
  phone:       { label: 'Phone',       type: 'text' },
  otp:         { label: 'OTP',         type: 'text' },
  mode:        { label: 'Mode',        type: 'text' },   // 'signin' | 'signup'
  displayName: { label: 'DisplayName', type: 'text' },
  username:    { label: 'Username',    type: 'text' },
},
async authorize(credentials) {
  if (!credentials?.phone || !credentials?.otp) return null;
  const { verifyOtp } = await import('@/lib/otp');
  if (!verifyOtp(credentials.phone, credentials.otp)) return null;

  let user = await prisma.user.findFirst({ where: { phone: credentials.phone } });
  if (!user) {
    const displayName = credentials.displayName?.trim() || `User_${credentials.phone.slice(-4)}`;
    const username    = credentials.username?.trim()    || `user_${Date.now()}`;

    try {
      user = await prisma.user.create({
        data: {
          phone: credentials.phone,
          displayName,
          username,
          authAccounts: { create: { provider: 'PHONE', providerAccountId: credentials.phone } },
        },
      });
    } catch (err: any) {
      if (err?.code === 'P2002') return null; // username or phone unique clash
      throw err;
    }
  }
  return { id: user.id, name: user.displayName, email: user.email };
}
```

Race condition handling: Prisma `P2002` (unique constraint violation on `username` or `phone`) returns `null` from `authorize`, which NextAuth maps to a generic `CredentialsSignin` error. The verify-otp page cannot distinguish this from a wrong OTP, so UI shows a single generic error plus an "แก้ไขข้อมูล" link back to sign-up. The `/api/users/check-username` debounce on the sign-up form catches the common case; P2002 only triggers under concurrent submission races.

### New: `src/app/api/users/check-username/route.ts`

```ts
// GET /api/users/check-username?u=<username>
// → 200 { available: true }
//   200 { available: false, reason: 'taken' | 'invalid' | 'reserved' }
```

- Validate regex `^[a-zA-Z0-9_]{3,30}$` → reason: `invalid`
- Reserved list: `['admin', 'root', 'api', 'seller', 'safepay', 'www']` → reason: `reserved`
- Prisma `findUnique({ where: { username } })` → reason: `taken` if exists
- Otherwise `{ available: true }`

No authentication required on this endpoint.

### Unchanged

- `src/hooks/useAuth.ts` — wrapper over `signIn/signOut/useSession`, works as-is.
- `src/lib/otp.ts` — in-memory OTP store + test bypass (`0920791649` → `000000`).
- `src/app/api/otp/send/route.ts`, `src/app/api/otp/verify/route.ts` — no changes.
- Valibot schemas in `src/lib/validations.ts` — no changes.

---

## Frontend validation

**Yup + `@hookform/resolvers`** (paces convention per CLAUDE.md):

```ts
const phoneSchema = Yup.string()
  .matches(/^0[0-9]{9}$/, 'เบอร์ต้องขึ้นต้นด้วย 0 และมี 10 หลัก')
  .required('กรุณากรอกเบอร์โทร');

const displayNameSchema = Yup.string()
  .min(2, 'อย่างน้อย 2 ตัวอักษร')
  .max(50, 'ไม่เกิน 50 ตัวอักษร')
  .required('กรุณากรอกชื่อที่แสดง');

const usernameSchema = Yup.string()
  .matches(/^[a-zA-Z0-9_]{3,30}$/, 'ใช้ a-z, 0-9, _ ได้ 3-30 ตัว')
  .required('กรุณาตั้งชื่อผู้ใช้');

const otpSchema = Yup.string()
  .matches(/^[0-9]{6}$/, 'รหัส 6 หลัก')
  .required();
```

Backend validation (Valibot) stays — schemas already cover phone/otp/type.

## Error states

| Where | Error | UX |
|---|---|---|
| sign-in, sign-up | phone format invalid | Inline field error (Yup) |
| sign-up | username invalid / reserved / taken | Inline error after debounced blur |
| sign-up / sign-in | `/api/otp/send` non-200 | Toast "ส่ง OTP ไม่สำเร็จ", stay on page |
| verify-otp | `phone` query param missing (deep link w/o context) | `router.replace('/auth/sign-in')` |
| verify-otp | Reload with query params intact | Page renders fresh 6-digit input — user re-enters (may need resend if OTP expired) |
| verify-otp | signIn returns error (wrong/expired OTP **or** P2002 username race) | Single inline "รหัสไม่ถูกต้องหรือหมดอายุ ลองอีกครั้ง" + "แก้ไขข้อมูล" link back to sign-up (mode=signup only) |
| verify-otp resend | success | Toast "ส่งรหัสใหม่แล้ว" |
| Facebook OAuth fail | redirect `/auth/sign-in?error=...` | Toast from URL param on mount |

## Testing strategy

**MVP = manual browser testing** per CLAUDE.md guidance.

Run `npm run dev`, walk through golden path for each flow:

1. **Sign-up:** new phone + displayName + username → OTP → authenticated session on `/`
2. **Sign-in:** previously registered phone → OTP → session on `/`
3. **Facebook:** click button → OAuth → session on `/`

Edge cases to verify:
- OTP wrong 3 times → lockout ("รหัสไม่ถูกต้องหรือหมดอายุ" + resend still works after lockout clears)
- Reload `/auth/verify-otp` directly → redirect `/auth/sign-in`
- Username race: two tabs submit sign-up with same username concurrently → one succeeds, other gets race error
- Test bypass works: phone `0920791649` OTP `000000`
- Refresh `/auth/sign-up` mid-form → fields reset (OK for MVP)

No Vitest unit tests for UI pages in this scope. If any phone/username helper is extracted to `src/utils/`, cover it with Vitest.

## Known scope gaps (tracked, not addressed here)

1. Facebook user onboarding → username auto-generated (`user_<timestamp>`); fix in profile settings page (later phase).
2. SMS gateway integration → `/api/otp/send` logs to console; replace later.
3. Rate limit on `/api/otp/send` and `/api/users/check-username` → add throttle later.
4. Thai strings hardcoded → i18n extraction later.
5. Seller + admin subdomain auth → later phases.

## Dependencies & references

- Paces templates: `theme/paces/Admin/TS/src/app/auth/(basic)/{sign-in,sign-up,two-factor}/`
- Existing backend: `src/lib/auth.ts`, `src/lib/otp.ts`, `src/app/api/otp/{send,verify}/route.ts`
- Icon provider: `@iconify/react` (CLAUDE.md rule) — Facebook icon = `mdi:facebook`
- Toast: `react-toastify`
- Form: `react-hook-form` + `@hookform/resolvers` + `yup`
