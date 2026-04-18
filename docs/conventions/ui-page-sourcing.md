# UI Page Sourcing — Mandatory Convention

> **This convention is absolute.** Every new UI page, component, or layout in `src/app/**` or `src/views/**` MUST start by copying from the project's theme files. "Inspired by Vuexy/Paces" or "follows the pattern" is NOT compliance.
>
> Background: see `docs/retro/2026-04-18-p1-retrospective.md` (Problem 1). Shortcut of composing from MUI/Preline primitives produced a full buyer-side rework.

## The rule (one line)

**Before any `Write` to a page/component/layout file, you MUST `Read` a specific theme source file and `cp` it as the starting point.**

If you cannot name the exact theme file path, you have not researched enough. Do not write.

## Theme mapping

Which theme a route belongs to is determined by the route group:

| Route pattern | Theme | Theme source root | Notes |
|---|---|---|---|
| `src/app/(marketing)/**` (buyer + landing + public) | **Vuexy** | `theme/vuexy/typescript-version/full-version/src/` | MUI + Emotion allowed here. See `feedback_theme_rules.md` memory. |
| `src/app/(paces)/seller/**` | **Paces** | `theme/paces/Admin/TS/src/` | Preline + Tailwind only. |
| `src/app/(paces)/admin/**` | **Paces** | `theme/paces/Admin/TS/src/` | Preline + Tailwind only. |

## Required pre-write checklist

Before writing **any** new UI file (or rewriting an existing one), Claude MUST answer these 3 questions **in the response text itself**, before any `Write` tool call:

1. **Target route:** `src/app/.../<path>/page.tsx`
2. **Theme source I will copy:** `theme/<vuexy|paces>/.../<path>/<file>.tsx`
3. **Read status:** I have opened that theme source with the `Read` tool this turn? ✅ / ❌

If 3 is ❌, stop. Go `Read` first. Do not `Write`.

If 2 is missing or vague ("something like…"), stop. Research with Glob/Grep until you can name a single file.

## Page-type → theme file mapping (Vuexy, buyer side)

| SafePay page | Vuexy source to copy | Notes |
|---|---|---|
| `/auth/sign-in` | `src/views/pages/auth/LoginV1.tsx` + `AuthIllustrationWrapper.tsx` | Strip Google/Twitter/GitHub, keep Facebook |
| `/auth/sign-up` | `src/views/pages/auth/RegisterV1.tsx` | Add username field + debounced check |
| `/auth/verify-otp` | `src/views/pages/auth/TwoStepsV1.tsx` | Uses `input-otp` — install if missing |
| Authed app shell (buyer) | `src/app/[lang]/(dashboard)/(private)/layout.tsx` + `VerticalLayout` + `Navigation` + `Navbar` + `Footer` | Copy the whole shell, strip i18n dep |
| `/dashboard` (buyer home) | `src/app/[lang]/(dashboard)/(private)/apps/ecommerce/dashboard/page.tsx` + `src/views/apps/ecommerce/dashboard/*` | Keep Grid; map widgets to trust data |
| `/orders` (buyer list) | `src/app/[lang]/(dashboard)/(private)/apps/ecommerce/orders/list/page.tsx` + `OrderListTable.tsx` | Buyer-side columns |
| `/reviews` | `src/app/[lang]/(dashboard)/(private)/apps/ecommerce/manage-reviews/*` | Filter to reviews authored by user |
| `/settings/profile` | `src/views/pages/account-settings/account/AccountDetails.tsx` | Strip billing/security tabs, keep account |
| `/settings/verification` | Compose from `src/views/pages/account-settings/security/*` (card + upload patterns) | No direct template — use account-settings card primitives |
| `/u/[username]` | `src/views/pages/user-profile/*` (UserProfileHeader + AboutOverview) | Strip teams/connections |
| `/o/[token]` | `src/views/apps/invoice/preview/PreviewCard.tsx` + `TwoStepsV1` for OTP | Order card + OTP input |

## Page-type → theme file mapping (Paces, seller + admin)

| SafePay page | Paces source to copy |
|---|---|
| Seller `/auth/*` | `theme/paces/Admin/TS/src/app/auth/(basic)/{sign-in,sign-up,two-factor,reset-pass}/` |
| Admin `/auth/*` | Same |
| Dashboard (any role) | `theme/paces/Admin/TS/src/app/(admin)/dashboard/` |
| List/table pages | `theme/paces/Admin/TS/src/app/(admin)/apps/{users,invoice,ecommerce,projects}/` |
| Form pages | `theme/paces/Admin/TS/src/app/(admin)/form/` |

## Copy workflow (what "copy" actually means)

```
1. Identify theme source path     (Glob / Grep / prior knowledge)
2. Read that file with Read tool  (mandatory, verify you've seen it)
3. Copy to target location        (Bash cp OR Write after Read)
4. Edit content inline            (Edit tool for content swaps)
5. Strip unused deps              (Edit to remove imports/widgets)
6. Verify render                  (type-check + browser via Chrome MCP)
```

What "copy" does NOT mean:
- "I remember the pattern and wrote it from memory" ❌
- "I used the same MUI components" ❌
- "It looks similar" ❌
- "I stripped the deps to a minimal version" ❌ (stripping is step 5, not step 0)

## Dependency handling

Theme templates often import helpers that don't exist in `src/` yet (`getDictionary`, i18n utils, settings hooks, customizer). Do not skip the copy because of these deps.

Choose one of:

1. **Copy the dep too.** If the dep is a useful building block (e.g. `useSettings`, `CustomChip`), copy it into `src/@core/…` or `src/utils/…`.
2. **Stub it.** If the dep is demo-only (e.g. `getDictionary` that returns English strings), replace with a Thai-only constant object or a trivial stub.
3. **Strip it.** If the dep adds nothing (e.g. i18n `lang` path prefix), delete the prop and hardcode Thai.

Pick the least-invasive option. Document choice in the commit message.

## Commit message rule

Every commit that adds/modifies a file under `src/app/**`, `src/views/**`, `src/components/**` (non-trivial UI) MUST cite the theme source path in the message body:

```
feat(buyer): /dashboard using Vuexy ecommerce widgets

Base: theme/vuexy/typescript-version/full-version/src/app/[lang]/(dashboard)/(private)/apps/ecommerce/dashboard/page.tsx
Widgets adapted: Congratulations (→ welcome), StatisticsCard, Orders, Transactions.
Dropped: InvoiceListTable (not applicable to buyer).
```

If no `Base:` line exists on a UI-touching commit, treat it as a convention violation — revert or amend before merging.

## When this convention does NOT apply

- Backend-only code (`src/app/api/**`, `src/services/**`, `src/lib/**`) — no UI, no sourcing.
- Trivial tsx utilities that are not pages or visible components (e.g., `mui-link.tsx` wrapper).
- Domain components in `src/components/safepay/**` that have no direct theme equivalent — but even here, copy the nearest theme primitive (card, chip, badge) as a base.
