import { Sidebar } from '@/components/layouts/Sidebar'
import { Topbar } from '@/components/layouts/Topbar'

const customerNav = [
  { href: '/dashboard', label: 'แดชบอร์ด', icon: '📊' },
  { href: '/deals', label: 'ดีลของฉัน', icon: '🏷️' },
  { href: '/orders', label: 'ออเดอร์', icon: '📦' },
  { href: '/disputes', label: 'ข้อพิพาท', icon: '⚖️' },
  { href: '/notifications', label: 'แจ้งเตือน', icon: '🔔' },
  { href: '/profile', label: 'โปรไฟล์', icon: '👤' },
]

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar items={customerNav} title="SafePay" />
      <div className="lg:ml-64">
        <Topbar />
        <main className="p-4 lg:p-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  )
}
