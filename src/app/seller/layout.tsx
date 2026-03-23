'use client'
import { Sidebar } from '@/components/layouts/Sidebar'
import { Topbar } from '@/components/layouts/Topbar'
import { LayoutDashboard, Tag, Package, Scale, Bell, UserCircle, Settings } from 'lucide-react'

const sellerNav = [
  { href: '/seller/dashboard', label: 'แดชบอร์ด', icon: LayoutDashboard },
  { href: '/seller/deals', label: 'ดีลของฉัน', icon: Tag },
  { href: '/seller/orders', label: 'ออเดอร์', icon: Package },
  { href: '/seller/disputes', label: 'ข้อพิพาท', icon: Scale },
  { href: '/seller/notifications', label: 'แจ้งเตือน', icon: Bell },
  { href: '/seller/settings', label: 'ตั้งค่า', icon: Settings },
]

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar items={sellerNav} title="SafePay Seller" />
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-60">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
