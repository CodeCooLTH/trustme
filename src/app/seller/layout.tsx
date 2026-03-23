'use client'
import { Sidebar } from '@/components/layouts/Sidebar'
import { LayoutDashboard, Package, Scale, Settings } from 'lucide-react'

const sellerNav = [
  { href: '/seller/dashboard', label: 'แดชบอร์ด', icon: LayoutDashboard },
  { href: '/seller/orders', label: 'ออเดอร์', icon: Package },
  { href: '/seller/disputes', label: 'ข้อพิพาท', icon: Scale },
  { href: '/seller/settings', label: 'ตั้งค่า', icon: Settings },
]

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar items={sellerNav} title="SafePay" />
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-60">
        {children}
      </div>
    </div>
  )
}
