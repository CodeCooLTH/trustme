import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getShopByUserId } from '@/services/shop.service'
import { getOrdersByShop } from '@/services/order.service'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'ออเดอร์' }

const STATUS_TABS = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'CREATED', label: 'รอยืนยัน' },
  { value: 'CONFIRMED', label: 'ยืนยันแล้ว' },
  { value: 'SHIPPED', label: 'จัดส่งแล้ว' },
  { value: 'COMPLETED', label: 'สำเร็จ' },
  { value: 'CANCELLED', label: 'ยกเลิก' },
]

const STATUS_META: Record<string, { label: string; cls: string }> = {
  CREATED: { label: 'รอยืนยัน', cls: 'bg-warning/10 text-warning' },
  CONFIRMED: { label: 'ยืนยันแล้ว', cls: 'bg-info/10 text-info' },
  SHIPPED: { label: 'จัดส่งแล้ว', cls: 'bg-primary/10 text-primary' },
  COMPLETED: { label: 'สำเร็จ', cls: 'bg-success/10 text-success' },
  CANCELLED: { label: 'ยกเลิก', cls: 'bg-danger/10 text-danger' },
}

const TYPE_META: Record<string, { label: string; cls: string }> = {
  PHYSICAL: { label: 'สินค้าจับต้องได้', cls: 'bg-primary/10 text-primary' },
  DIGITAL: { label: 'ดิจิทัล', cls: 'bg-info/10 text-info' },
  SERVICE: { label: 'บริการ', cls: 'bg-success/10 text-success' },
}

function maskContact(c: string) {
  if (!c || c.length <= 4) return c || '—'
  return '•'.repeat(Math.max(0, c.length - 4)) + c.slice(-4)
}

function formatAmount(amount: unknown) {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(Number(amount))
}

interface PageProps {
  searchParams: Promise<{ status?: string }>
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const { status } = await searchParams

  const session = await getServerSession(authOptions)
  const user = (session as any)?.user
  if (!user) return null

  let shop: any = null
  try {
    shop = await getShopByUserId(user.id)
  } catch {
    shop = null
  }

  if (!shop) {
    return (
      <div className="card p-10 rounded-xl text-center max-w-2xl mx-auto">
        <Icon icon="mdi:storefront-off-outline" width={64} height={64} className="text-warning mx-auto mb-4" />
        <h2 className="text-xl font-bold text-dark mb-2">ยังไม่มีร้านค้า</h2>
        <p className="text-default-400 mb-6">ต้องสร้างร้านก่อนจึงจะดูออเดอร์ได้</p>
        <Link
          href="/shop"
          className="btn bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover inline-flex items-center gap-2"
        >
          <Icon icon="mdi:plus" width={18} height={18} />
          สร้างร้านค้า
        </Link>
      </div>
    )
  }

  let orders: any[] = []
  try {
    orders = await getOrdersByShop(shop.id, status || undefined)
  } catch {
    orders = []
  }

  const activeStatus = status || ''

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark">ออเดอร์</h1>
          <p className="text-default-400 mt-1">จัดการออเดอร์ของร้าน {shop.shopName}</p>
        </div>
        <Link
          href="/orders/new"
          className="btn bg-primary text-white hover:bg-primary-hover inline-flex items-center gap-2 px-4 py-2"
        >
          <Icon icon="mdi:plus" width={18} height={18} />
          สร้างออเดอร์
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUS_TABS.map((tab) => (
          <Link
            key={tab.value}
            href={tab.value ? `?status=${tab.value}` : '/orders'}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeStatus === tab.value
                ? 'bg-primary text-white'
                : 'bg-default-100 text-default-900 hover:bg-default-200'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Orders Table */}
      {orders.length === 0 ? (
        <div className="card p-12 rounded-xl text-center">
          <Icon icon="mdi:receipt-text-remove-outline" width={64} height={64} className="text-default-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-dark mb-2">ยังไม่มีออเดอร์</h3>
          {activeStatus ? (
            <p className="text-default-400">ไม่มีออเดอร์ในสถานะนี้</p>
          ) : (
            <p className="text-default-400 mb-6">
              —{' '}
              <Link href="/orders/new" className="text-primary underline font-medium">
                สร้างออเดอร์แรก
              </Link>
            </p>
          )}
        </div>
      ) : (
        <div className="card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-default-400 text-left border-b border-default-200 bg-default-50">
                  <th className="px-5 py-3 font-medium">Order #</th>
                  <th className="px-5 py-3 font-medium">ผู้ซื้อ</th>
                  <th className="px-5 py-3 font-medium">ประเภท</th>
                  <th className="px-5 py-3 font-medium text-right">ยอดรวม</th>
                  <th className="px-5 py-3 font-medium">สถานะ</th>
                  <th className="px-5 py-3 font-medium text-right">วันที่</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any) => {
                  const s = STATUS_META[order.status] ?? { label: order.status, cls: 'bg-default-100 text-default-700' }
                  const t = TYPE_META[order.type] ?? { label: order.type, cls: 'bg-default-100 text-default-700' }
                  const tokenPrefix = order.publicToken ? order.publicToken.slice(0, 8) : order.id.slice(0, 8)
                  return (
                    <tr key={order.id} className="border-b border-default-100 last:border-0 hover:bg-default-50 transition-colors">
                      <td className="px-5 py-3">
                        <Link
                          href={`/orders/${order.publicToken}`}
                          className="text-primary font-semibold hover:underline font-mono text-xs"
                        >
                          #{tokenPrefix}
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-default-900">
                        {order.buyerContact ? maskContact(order.buyerContact) : '—'}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${t.cls}`}>
                          {t.label}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right font-medium text-dark">
                        {formatAmount(order.totalAmount)}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${s.cls}`}>
                          {s.label}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right text-default-400">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('th-TH') : '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}
