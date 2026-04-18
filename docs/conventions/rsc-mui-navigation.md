# RSC + MUI + next/link — Navigation Pattern

> **Background:** On 2026-04-18, a runtime error "Functions cannot be passed directly to Client Components" blocked `/dashboard` and 5 other server pages. Root cause: passing `component={Link}` on MUI Button/Chip/Typography from a React Server Component. Fix committed in `ef4d4db`; this doc codifies the pattern so it doesn't recur.

## The rule

**In a Server Component, never use `component={Link}` on an MUI component.**

The Next.js App Router in 16+ (with React 19 RSC boundaries) refuses to serialize a function-valued prop crossing the server→client boundary. `Link` from `next/link` is a component function; MUI receives it as a prop, the prop must cross the boundary when React renders the server output, and the stringifier throws:

```
Functions cannot be passed directly to Client Components unless you explicitly
expose it by marking it with "use server". Or maybe you meant to call this
function rather than return it.
  <... component={function LinkComponent} href=... variant=... startIcon=... children=...>
```

## Allowed patterns

Pick one per navigation site:

### 1. Client wrapper (preferred for buttons/chips that need SPA routing)

```tsx
// src/app/(marketing)/_components/mui-link.tsx
'use client'

import Button, { type ButtonProps } from '@mui/material/Button'
import NextLink from 'next/link'
import type React from 'react'

type LinkOnlyProps = { href: string }

export function LinkButton({
  href,
  ...rest
}: Omit<ButtonProps, 'component' | 'href'> & LinkOnlyProps) {
  const Cmp = Button as unknown as (
    p: ButtonProps & { component: typeof NextLink; href: string },
  ) => React.ReactElement
  return <Cmp {...rest} component={NextLink} href={href} />
}
```

Use in a server component:

```tsx
// OK in server page.tsx
import { LinkButton } from '@/app/(marketing)/_components/mui-link'

<LinkButton href='/dashboard' variant='outlined'>
  กลับหน้าหลัก
</LinkButton>
```

The `'use client'` boundary is inside `mui-link.tsx`, so `Link` never crosses a boundary as a prop.

### 2. Wrap MUI with Next Link (when you don't need SPA prefetch or semantics matter)

```tsx
<NextLink href='/orders' className='no-underline'>
  <Button variant='text'>ทั้งหมด</Button>
</NextLink>
```

Downside: nests `<a>` inside `<button>` (or vice versa) — bad for a11y in some cases. Use only when the client wrapper is overkill.

### 3. Plain MUI href (non-SPA, full page navigation)

```tsx
<Button href='/dashboard'>กลับหน้าหลัก</Button>
```

MUI renders this as `<a href>` — no SPA transition. Acceptable for auth pages, cross-subdomain redirects, external links.

## Disallowed patterns

### ❌ `component={Link}` in a server component

```tsx
// page.tsx (no 'use client')
import Link from 'next/link'
import Button from '@mui/material/Button'

<Button component={Link} href='/dashboard'>...</Button>  // Runtime error
```

### ❌ `component={Link as any}` doesn't help

Type casting to `any` hides the TS error but the RSC stringifier still rejects the function prop at runtime.

### ❌ Using `component={...}` with any component function in a server component

Same issue for custom components — MUI's `component` prop expects a component reference, which is a function, which can't cross the boundary. Either wrap in a client component or use `component='a'` / `component='button'` (strings are fine).

## When the rule does NOT apply

- **Inside a `'use client'` module.** `component={Link}` works fine — no boundary to cross. E.g. our `SignInCard.tsx` uses `<Typography component={Link}>` and that's OK because the whole module is client.
- **Server Components that don't use MUI navigation.** If you render `<Link href>` directly (not through MUI), no issue.

## How to audit existing code

```bash
# find all offenders in server components
grep -rn 'component={Link' src/app --include='*.tsx' | \
  xargs -L1 -I{} sh -c 'grep -L "use client" "$(echo {} | cut -d: -f1)" && echo "{}"'
```

## Related client wrappers

- `src/app/(marketing)/_components/mui-link.tsx` — `LinkButton`, `LinkChip` for the Vuexy marketing group.
- When adding similar wrappers for Paces (seller/admin), put them under `src/app/(paces)/_components/`.
