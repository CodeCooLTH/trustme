'use client'
import { Sidebar } from '@/components/layouts/Sidebar'
import { Topbar } from '@/components/layouts/Topbar'
import { LayoutDashboard, Users, Tag, CreditCard, Scale, Settings } from 'lucide-react'

const adminNav = [
  { href: '/admin/dashboard', label: 'แดชบอร์ด', icon: LayoutDashboard },
  { href: '/admin/users', label: 'ผู้ใช้', icon: Users },
  { href: '/admin/deals', label: 'ดีล', icon: Tag },
  { href: '/admin/payments', label: 'ตรวจสลิป', icon: CreditCard },
  { href: '/admin/disputes', label: 'ข้อพิพาท', icon: Scale },
  { href: '/admin/settings', label: 'ตั้งค่า', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar items={adminNav} title="SafePay Admin" />
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-60">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
