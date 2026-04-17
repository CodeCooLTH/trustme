import { authOptions } from '@/lib/auth'
import { getOrdersByShop } from '@/services/order.service'
import { getShopByUserId } from '@/services/shop.service'
import Icon from '@/components/wrappers/Icon'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import type { Metadata } from 'next'
import type { OrderRow } from './components/data'
import OrdersList from './components/OrdersList'
import StatStrip from '../_shared/StatStrip'

export const metadata: Metadata = { title: 'ออเดอร์' }

function maskContact(c: string | null | undefined): string {
  if (!c || c.length <= 4) return c ?? '—'
  return '•'.repeat(Math.max(0, c.length - 4)) + c.slice(-4)
}

interface PageProps {
  searchParams: Promise<{ status?: string }>
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const sp = await searchParams

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
        <Icon icon="building-store" className="size-16 text-warning mx-auto mb-4" />
        <h2 className="text-xl font-bold text-dark mb-2">ยังไม่มีร้านค้า</h2>
        <p className="text-default-400 mb-6">ต้องสร้างร้านก่อนจึงจะดูออเดอร์ได้</p>
        <Link
          href="/shop"
          className="btn bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover inline-flex items-center gap-2"
        >
          <Icon icon="plus" />
          สร้างร้านค้า
        </Link>
      </div>
    )
  }

  let rawOrders: any[] = []
  try {
    // Fetch all orders — client component does status filtering
    rawOrders = await getOrdersByShop(shop.id)
  } catch {
    rawOrders = []
  }

  // Coerce Decimal → Number and shape into OrderRow
  const orders: OrderRow[] = rawOrders.map((o: any) => ({
    id: (o.publicToken ?? o.id).slice(0, 8),
    publicToken: o.publicToken ?? o.id,
    buyer: maskContact(o.buyerContact),
    product: o.items?.[0]?.name ?? '—',
    qty: o.items?.reduce((sum: number, i: any) => sum + (i.qty ?? 1), 0) ?? 0,
    total: Number(o.totalAmount ?? 0),
    status: o.status,
    date: o.createdAt
      ? new Date(o.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })
      : '—',
  }))

  // Compute stat card values
  const totalCount = orders.length
  const pendingCount = orders.filter((o) => o.status === 'CREATED').length
  const activeCount = orders.filter((o) => o.status === 'CONFIRMED' || o.status === 'SHIPPED').length
  const completedCount = orders.filter((o) => o.status === 'COMPLETED').length

  const activeStatus = sp.status ?? 'all'

  return (
    <>
      <PageBreadcrumb title="ออเดอร์" subtitle="ผู้ขาย" />

      <div className="mb-base">
        <StatStrip
          items={[
            { title: 'ออเดอร์ทั้งหมด', value: totalCount,     change: 0, icon: 'shopping-cart',  iconClass: 'bg-primary/15 text-primary' },
            { title: 'รอยืนยัน',        value: pendingCount,   change: 0, icon: 'clock',          iconClass: 'bg-warning/15 text-warning' },
            { title: 'กำลังดำเนินการ',  value: activeCount,    change: 0, icon: 'truck-delivery', iconClass: 'bg-info/15 text-info' },
            { title: 'สำเร็จแล้ว',      value: completedCount, change: 0, icon: 'check',          iconClass: 'bg-success/15 text-success' },
          ]}
        />
      </div>

      <OrdersList orders={orders} activeStatus={activeStatus} />
    </>
  )
}
