import { Icon } from '@iconify/react'
import Link from 'next/link'

const navItems = [
  { href: '/dashboard', label: 'แดชบอร์ด', icon: 'mdi:view-dashboard-outline' },
  { href: '/products', label: 'สินค้า', icon: 'mdi:package-variant-closed' },
  { href: '/orders', label: 'ออเดอร์', icon: 'mdi:receipt-text-outline' },
  { href: '/reviews', label: 'รีวิว', icon: 'mdi:star-outline' },
  { href: '/shop', label: 'ตั้งค่าร้าน', icon: 'mdi:store-outline' },
  { href: '/verification', label: 'ยืนยันตัวตน', icon: 'mdi:shield-check-outline' },
]

export default function SellerSidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-card border-r border-default-200 p-4 gap-1">
      <div className="text-default-400 text-xs font-semibold uppercase tracking-wider px-3 py-2">
        เมนูผู้ขาย
      </div>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-default-900 hover:bg-default-50 hover:text-primary transition-colors"
        >
          <Icon icon={item.icon} width={20} height={20} />
          <span className="text-sm font-medium">{item.label}</span>
        </Link>
      ))}
    </aside>
  )
}
