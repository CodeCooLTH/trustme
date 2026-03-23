# Login Page Trust Images — Design Spec

## Goal

Improve the Login page by adding trustworthy images and visual elements that convey safety and reliability. SafePay locks users' money (escrow), so the design must communicate that clearly.

## Approach: Hybrid Trust Layer

Combine real photos (Unsplash), process illustration (escrow flow), and social proof across both panels.

## Design

### Left Panel (Branding) — Changes

1. **Hero image background**: Unsplash photo of person shopping online safely, rendered as background with low opacity (~12%) + existing gradient overlay. Adds a "real people use this" feel without obscuring text.

2. **SafePay Flow Card** (new element): Replaces conceptual "Escrow" wording with branded "SafePay" language. Shows 3 steps visually:
   - ผู้ซื้อชำระเงิน (💳)
   - SafePay ล็อคเงิน (🔒)
   - ได้ของ → ปล่อยเงิน (✅)
   - Styled as a frosted card (`bg-white/8`, `border-white/12`, rounded-xl)
   - Title: "SafePay ปกป้องเงินคุณอย่างไร"

3. **Heading change**: "ด้วยระบบ Escrow" → "ด้วย SafePay"

4. **Existing elements retained**: Trust badges, TestimonialSlider, Stats — layout adjusted to accommodate the flow card.

### Right Panel (Login Form) — Changes

1. **Trust badge strip** (new): Green-tinted bar below the Facebook login button with two badges:
   - 🔒 SafePay คุ้มครอง
   - 🛡️ ข้อมูลเข้ารหัส
   - Styled: `bg-green-50`, `border-green-200`, rounded-lg

2. **Avatar stack + social proof** (new): 4 Unsplash face photos in overlapping circles + text "ผู้ใช้ 10,000+ คนไว้วางใจ"

3. **Trust indicator text updates**:
   - "ระบบ Escrow ค้ำประกันทุกธุรกรรม" → "SafePay ค้ำประกันทุกธุรกรรม"

4. **Existing elements retained**: Header, Facebook button, terms/privacy links.

## Branding Change: "Escrow" → "SafePay"

Replace the technical term "Escrow" with "SafePay" in user-facing copy across the login page to strengthen brand recognition:

| Location | Before | After |
|----------|--------|-------|
| Left heading | ด้วยระบบ Escrow | ด้วย SafePay |
| Flow card title | ระบบ Escrow ทำงานอย่างไร | SafePay ปกป้องเงินคุณอย่างไร |
| Right trust badge | Escrow ปลอดภัย | SafePay คุ้มครอง |
| Right trust text | ระบบ Escrow ค้ำประกันทุกธุรกรรม | SafePay ค้ำประกันทุกธุรกรรม |

## Image Sources

All images from Unsplash (free, no attribution required for web use):

- **Hero background (left panel)**: `photo-1556742049-0cfed4f6a45d` — person shopping online
- **Avatar faces (right panel)**: 4 face crops for the social proof stack:
  - `photo-1507003211169-0a1dd7228f2d`
  - `photo-1494790108377-be9c29b29330`
  - `photo-1472099645785-5658abf4ff4e`
  - `photo-1438761681033-6461ffad8d80`

Images loaded via Unsplash URL with `w=` sizing parameter for performance.

## Files to Modify

1. `src/app/login/layout.tsx` — Add hero image background, add SafePay flow card, update "Escrow" text
2. `src/app/login/page.tsx` — Add trust badge strip, avatar stack, update "Escrow" text
3. `next.config.ts` — Add `images.remotePatterns` for `images.unsplash.com` to allow `next/image` usage

## Design Tone

- Clean, professional
- Emphasize money safety ("เงินถูกล็อคไว้")
- Use SafePay brand name prominently
- Green accents for trust/safety elements on right panel
- Blue gradient maintained on left panel

## Implementation Notes

- Hero image uses `next/image` with `fill` + `object-cover` for performance (requires `next.config.ts` remote pattern)
- Avatar images use `next/image` with fixed width/height
- SafePay Flow Card and Avatar Stack are small enough to be inline in layout/page — no separate components needed
- "10,000+" is static marketing copy, not a live count

## Out of Scope

- Mobile layout changes (existing mobile layout works fine)
- Animation/motion beyond existing TestimonialSlider
- Extracting new reusable components
