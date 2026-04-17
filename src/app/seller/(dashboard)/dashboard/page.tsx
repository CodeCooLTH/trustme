import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getShopByUserId } from '@/services/shop.service'
import { getOrdersByShop } from '@/services/order.service'
import { getTrustLevel } from '@/services/trust-score.service'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'แดชบอร์ด' }

export default async function SellerDashboardPage() {
  const session = await getServerSession(authOptions)
  const user = (session as any)?.user
  if (!user) return null // proxy guard — belt & suspenders

  // Shop is guaranteed to exist — the (dashboard)/layout.tsx auto-creates it
  const shop = await getShopByUserId(user.id)
  if (!shop) return null // should never happen; defensive guard

  // Load orders
  let orders: any[] = []
  try {
    orders = await getOrdersByShop(shop.id)
  } catch {
    orders = []
  }

  const stats = {
    total: orders.length,
    pending: orders.filter((o: any) => o.status === 'CREATED').length,
    active: orders.filter((o: any) => o.status === 'CONFIRMED' || o.status === 'SHIPPED').length,
    completed: orders.filter((o: any) => o.status === 'COMPLETED').length,
    // Revenue: sum OrderItem totals for COMPLETED orders (items included via getOrdersByShop)
    revenue: orders
      .filter((o: any) => o.status === 'COMPLETED')
      .reduce((sum: number, o: any) => {
        const itemTotal = Array.isArray(o.items)
          ? o.items.reduce((s: number, item: any) => s + (item.price ?? 0) * (item.qty ?? item.quantity ?? 1), 0)
          : 0
        return sum + itemTotal
      }, 0),
    avgRating: '—', // TODO: compute from reviews when service exposes them per order
  }

  const recent = orders.slice(0, 5)

  return (
    <>
      {/* Greeting + trust score card */}
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold text-dark">สวัสดี {user.displayName}</h1>
          <p className="text-default-400 mt-1">ภาพรวมร้าน {shop.shopName}</p>
        </div>
        <TrustScoreCard score={user.trustScore ?? 0} />
      </div>

      {/* 4-stat grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon="mdi:receipt-text-outline" label="ออเดอร์ทั้งหมด" value={stats.total} />
        <StatCard icon="mdi:clock-outline" label="รอยืนยัน" value={stats.pending} accent="warning" />
        <StatCard icon="mdi:truck-fast-outline" label="กำลังดำเนินการ" value={stats.active} accent="info" />
        <StatCard icon="mdi:check-circle-outline" label="สำเร็จ" value={stats.completed} accent="success" />
      </div>

      {/* Recent orders */}
      <div className="card p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-dark">ออเดอร์ล่าสุด</h2>
          <Link href="/orders" className="text-primary text-sm font-semibold hover:underline">
            ดูทั้งหมด →
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="text-default-400 text-sm py-8 text-center">
            ยังไม่มีออเดอร์ —{' '}
            <Link href="/orders/new" className="text-primary underline">
              สร้างออเดอร์แรก
            </Link>
          </div>
        ) : (
          <OrdersTable orders={recent} />
        )}
      </div>
    </>
  )
}

// ─── Helper components (co-located — small enough to not warrant separate files) ───

function TrustScoreCard({ score }: { score: number }) {
  const level = getTrustLevel(score)
  return (
    <div className="card p-5 rounded-xl flex items-center gap-4">
      <div className="flex flex-col items-center justify-center w-16 h-16 bg-primary/10 rounded-xl">
        <div className="text-2xl font-bold text-primary leading-none">{level}</div>
      </div>
      <div className="flex-1">
        <div className="text-default-400 text-sm">Trust Score</div>
        <div className="text-dark font-bold text-xl">{score}/100</div>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  accent = 'primary',
}: {
  icon: string
  label: string
  value: number | string
  accent?: 'primary' | 'warning' | 'info' | 'success'
}) {
  const accentClass = {
    primary: 'text-primary bg-primary/10',
    warning: 'text-warning bg-warning/10',
    info: 'text-info bg-info/10',
    success: 'text-success bg-success/10',
  }[accent]
  return (
    <div className="card p-5 rounded-xl">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${accentClass}`}>
          <Icon icon={icon} width={20} height={20} />
        </div>
        <div>
          <div className="text-default-400 text-sm">{label}</div>
          <div className="text-dark font-bold text-xl">{value}</div>
        </div>
      </div>
    </div>
  )
}

function OrdersTable({ orders }: { orders: any[] }) {
  const statusLabel: Record<string, { label: string; cls: string }> = {
    CREATED: { label: 'รอยืนยัน', cls: 'bg-warning/10 text-warning' },
    CONFIRMED: { label: 'ยืนยันแล้ว', cls: 'bg-info/10 text-info' },
    SHIPPED: { label: 'จัดส่งแล้ว', cls: 'bg-primary/10 text-primary' },
    COMPLETED: { label: 'สำเร็จ', cls: 'bg-success/10 text-success' },
    CANCELLED: { label: 'ยกเลิก', cls: 'bg-danger/10 text-danger' },
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-default-400 text-left border-b border-default-200">
            <th className="py-2 font-medium">Order</th>
            <th className="py-2 font-medium">ผู้ซื้อ</th>
            <th className="py-2 font-medium">สถานะ</th>
            <th className="py-2 font-medium text-right">วันที่</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o: any) => {
            const s = statusLabel[o.status] ?? { label: o.status, cls: 'bg-default-100 text-default-700' }
            return (
              <tr key={o.id} className="border-b border-default-100 last:border-0">
                <td className="py-3">
                  <Link
                    href={`/orders/${o.publicToken}`}
                    className="text-primary font-semibold hover:underline"
                  >
                    #{o.publicToken ? o.publicToken.slice(0, 8) : o.id.slice(0, 8)}
                  </Link>
                </td>
                <td className="py-3 text-default-900">
                  {o.buyerContact ? maskContact(o.buyerContact) : '—'}
                </td>
                <td className="py-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${s.cls}`}
                  >
                    {s.label}
                  </span>
                </td>
                <td className="py-3 text-right text-default-400">
                  {o.createdAt ? new Date(o.createdAt).toLocaleDateString('th-TH') : '—'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function maskContact(c: string) {
  if (c.length <= 4) return c
  return '•'.repeat(Math.max(0, c.length - 4)) + c.slice(-4)
}
