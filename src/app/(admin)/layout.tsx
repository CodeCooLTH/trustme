import { Sidebar } from '@/components/layouts/Sidebar'
import { Topbar } from '@/components/layouts/Topbar'

const adminNav = [
  { href: '/admin/dashboard', label: 'แดชบอร์ด', icon: '📊' },
  { href: '/admin/users', label: 'ผู้ใช้', icon: '👥' },
  { href: '/admin/deals', label: 'ดีล', icon: '🏷️' },
  { href: '/admin/payments', label: 'ตรวจสลิป', icon: '💳' },
  { href: '/admin/disputes', label: 'ข้อพิพาท', icon: '⚖️' },
  { href: '/admin/settings', label: 'ตั้งค่า', icon: '⚙️' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar items={adminNav} title="SafePay Admin" />
      <div className="lg:ml-64">
        <Topbar userName="Admin" />
        <main className="p-4 lg:p-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  )
}
