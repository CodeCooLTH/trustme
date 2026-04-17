import { type MenuItemType } from '@/types'

export const sellerMenuItems: MenuItemType[] = [
  {
    icon: 'dashboard',
    slug: 'seller-main',
    label: 'หลัก',
    isTitle: true,
    children: [
      { url: '/dashboard', slug: 'seller:dashboard', label: 'แดชบอร์ด', icon: 'dashboard' },
      { url: '/products', slug: 'seller:products', label: 'สินค้า', icon: 'package' },
      { url: '/orders', slug: 'seller:orders', label: 'ออเดอร์', icon: 'receipt-2' },
      { url: '/reviews', slug: 'seller:reviews', label: 'รีวิว', icon: 'star' },
    ],
  },
  {
    icon: 'settings',
    slug: 'seller-settings',
    label: 'ตั้งค่า',
    isTitle: true,
    children: [
      { url: '/shop', slug: 'seller:shop', label: 'ตั้งค่าร้าน', icon: 'building-store' },
      { url: '/verification', slug: 'seller:verification', label: 'ยืนยันตัวตน', icon: 'shield-check' },
    ],
  },
]
