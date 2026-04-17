import { authOptions } from '@/lib/auth'
import { Icon } from '@iconify/react'
import { getServerSession } from 'next-auth'
import type { Metadata } from 'next'
import SignOutButton from './components/SignOutButton'

export const metadata: Metadata = { title: 'แดชบอร์ด' }

export default async function SellerDashboard() {
  const session = await getServerSession(authOptions)
  const user = (session as any)?.user

  const stats = [
    { label: 'ออเดอร์ทั้งหมด', value: 0, icon: 'mdi:receipt-text-outline' },
    { label: 'รายได้รวม (฿)', value: 0, icon: 'mdi:cash-multiple' },
    { label: 'รอดำเนินการ', value: 0, icon: 'mdi:clock-outline' },
    { label: 'รีวิวเฉลี่ย', value: '—', icon: 'mdi:star-outline' },
  ]

  return (
    <div className="min-h-screen p-6 md:p-10 bg-default-50">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-dark">
              แดชบอร์ดผู้ขาย
            </h1>
            <p className="text-default-400 mt-1">
              สวัสดี {user?.displayName ?? 'ผู้ขาย'}
            </p>
          </div>
          <SignOutButton />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="card p-5 rounded-xl">
              <div className="flex items-center gap-3">
                <Icon icon={s.icon} width={28} height={28} className="text-primary" />
                <div>
                  <div className="text-default-400 text-sm">{s.label}</div>
                  <div className="text-dark font-bold text-xl">{s.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-dark mb-3">ออเดอร์ล่าสุด</h2>
          <div className="text-default-400 text-sm py-8 text-center">
            ยังไม่มีออเดอร์ — สร้างออเดอร์แรกของคุณเพื่อเริ่มต้น
          </div>
        </div>
      </div>
    </div>
  )
}
