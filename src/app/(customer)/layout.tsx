'use client'
import { Sidebar } from '@/components/layouts/Sidebar'
import { Topbar } from '@/components/layouts/Topbar'
import { LayoutDashboard, Tag, Package, Scale, Bell, UserCircle } from 'lucide-react'

const customerNav = [
  { href: '/dashboard', label: 'แดชบอร์ด', icon: LayoutDashboard },
  { href: '/deals', label: 'ดีลของฉัน', icon: Tag },
  { href: '/orders', label: 'ออเดอร์', icon: Package },
  { href: '/disputes', label: 'ข้อพิพาท', icon: Scale },
  { href: '/notifications', label: 'แจ้งเตือน', icon: Bell },
  { href: '/profile', label: 'โปรไฟล์', icon: UserCircle },
]

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar items={customerNav} title="SafePay" />
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-60">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
