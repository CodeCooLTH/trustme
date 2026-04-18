/**
 * Buyer-side vertical menu items.
 *
 * Base: conceptual — the Vuexy theme's VerticalMenu has a demo-menu with
 * hundreds of SubMenus; we trimmed to the 7 entries relevant to the SafePay
 * buyer side. `/u/{username}` and `ไปหน้าร้านค้า` are resolved inside the
 * VerticalMenu client component using useSession.
 *
 * Base: theme/vuexy/typescript-version/full-version/src/components/layout/vertical/VerticalMenu.tsx
 */
export type BuyerMenuItem = {
  label: string
  href: string
  icon: string
  external?: boolean
  shopOnly?: boolean
  requiresUsername?: boolean
}

export const BUYER_MENU: BuyerMenuItem[] = [
  { label: 'หน้าหลัก', href: '/dashboard', icon: 'tabler-smart-home' },
  { label: 'คำสั่งซื้อของฉัน', href: '/orders', icon: 'tabler-shopping-bag' },
  { label: 'รีวิวที่ให้', href: '/reviews', icon: 'tabler-star' },
  { label: 'ยืนยันตัวตน', href: '/settings/verification', icon: 'tabler-shield-check' },
  { label: 'แก้ไขโปรไฟล์', href: '/settings/profile', icon: 'tabler-user-cog' },
  {
    label: 'โปรไฟล์สาธารณะ',
    href: '/u/{username}',
    icon: 'tabler-external-link',
    external: true,
    requiresUsername: true,
  },
  {
    label: 'ไปหน้าร้านค้า',
    href: '{sellerUrl}',
    icon: 'tabler-building-store',
    external: true,
    shopOnly: true,
  },
]
