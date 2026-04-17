import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getShopByUserId } from '@/services/shop.service'
import { getOrdersByShop } from '@/services/order.service'
import { getProductsByShop } from '@/services/product.service'
import { getTrustLevel } from '@/services/trust-score.service'
import type { Metadata } from 'next'

import StatisticCard from './components/StatisticCard'
import RecentOrder from './components/RecentOrder'
import TopSellingProducts from './components/TopSellingProducts'
import SalesReport from './components/SalesReport'
import type { OrderType, ProductType, StatType, WeeklyType } from './components/data'

export const metadata: Metadata = { title: 'แดชบอร์ด' }

export default async function SellerDashboardPage() {
  const session = await getServerSession(authOptions)
  const user = (session as any)?.user
  if (!user) return null // proxy guard — belt & suspenders

  // Shop is guaranteed to exist — the (dashboard)/layout.tsx auto-creates it
  const shop = await getShopByUserId(user.id)
  if (!shop) return null

  // Load orders and products
  let rawOrders: any[] = []
  let rawProducts: any[] = []
  try {
    rawOrders = await getOrdersByShop(shop.id)
  } catch {
    rawOrders = []
  }
  try {
    rawProducts = await getProductsByShop(shop.id)
  } catch {
    rawProducts = []
  }

  // ── Stats ──────────────────────────────────────────────────────────────────
  const pendingCount = rawOrders.filter((o) => o.status === 'CREATED').length
  const activeCount = rawOrders.filter((o) => o.status === 'CONFIRMED' || o.status === 'SHIPPED').length
  const totalRevenue = rawOrders
    .filter((o) => o.status === 'COMPLETED')
    .reduce((sum: number, o: any) => {
      const itemTotal = Array.isArray(o.items)
        ? o.items.reduce((s: number, item: any) => s + (item.price ?? 0) * (item.qty ?? item.quantity ?? 1), 0)
        : 0
      return sum + itemTotal
    }, 0)

  const stats: StatType[] = [
    { title: 'ออเดอร์ทั้งหมด', value: rawOrders.length, change: 0, icon: 'package' },
    { title: 'รอยืนยัน',       value: pendingCount,     change: 0, icon: 'clock' },
    { title: 'กำลังดำเนินการ', value: activeCount,      change: 0, icon: 'truck-delivery' },
    { title: 'รายได้รวม',      value: totalRevenue,     prefix: '฿', change: 0, icon: 'cash' },
  ]

  // ── Recent orders (top 10) ──────────────────────────────────────────────────
  function maskContact(c: string) {
    if (!c || c.length <= 4) return c || '—'
    return '•'.repeat(Math.max(0, c.length - 4)) + c.slice(-4)
  }

  const recentOrders: OrderType[] = rawOrders.slice(0, 10).map((o: any) => {
    const firstItem = Array.isArray(o.items) && o.items.length > 0 ? o.items[0] : null
    const itemTotal = Array.isArray(o.items)
      ? o.items.reduce((s: number, item: any) => s + (item.price ?? 0) * (item.qty ?? item.quantity ?? 1), 0)
      : 0
    const shortId = o.publicToken ? o.publicToken.slice(0, 8) : o.id.slice(0, 8)
    return {
      id: shortId,
      publicToken: o.publicToken ?? o.id,
      customer: {
        name: '',
        contact: o.buyerContact ? maskContact(o.buyerContact) : '—',
      },
      product: firstItem?.name ?? firstItem?.productName ?? '—',
      total: itemTotal,
      status: o.status as OrderType['status'],
      date: o.createdAt ? new Date(o.createdAt).toLocaleDateString('th-TH') : '—',
    }
  })

  // ── Top selling products ────────────────────────────────────────────────────
  // Build a sales count map from order items across all COMPLETED orders
  const salesMap: Record<string, number> = {}
  rawOrders
    .filter((o) => o.status === 'COMPLETED')
    .forEach((o: any) => {
      if (Array.isArray(o.items)) {
        o.items.forEach((item: any) => {
          const pid = item.productId ?? item.product_id
          if (pid) {
            salesMap[pid] = (salesMap[pid] ?? 0) + (item.qty ?? item.quantity ?? 1)
          }
        })
      }
    })

  const topProducts: ProductType[] = rawProducts
    .map((p: any) => ({
      id: p.id,
      name: p.name,
      image: p.imageUrl ?? p.image ?? '',
      type: (p.type as ProductType['type']) ?? 'PHYSICAL',
      price: p.price ?? 0,
      sales: salesMap[p.id] ?? 0,
    }))
    .sort((a: ProductType, b: ProductType) => b.sales - a.sales)
    .slice(0, 6)

  // ── Weekly time series (last 7 days) ──────────────────────────────────────
  const now = new Date()
  const dayLabels: string[] = []
  const dayRevenue: number[] = []
  const dayOrders: number[] = []

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const label = d.toLocaleDateString('th-TH', { weekday: 'short' })
    const dateStr = d.toISOString().slice(0, 10)

    const dayCompletedOrders = rawOrders.filter((o: any) => {
      if (o.status !== 'COMPLETED') return false
      const oDate = o.createdAt ? new Date(o.createdAt).toISOString().slice(0, 10) : ''
      return oDate === dateStr
    })

    const rev = dayCompletedOrders.reduce((sum: number, o: any) => {
      const itemTotal = Array.isArray(o.items)
        ? o.items.reduce((s: number, item: any) => s + (item.price ?? 0) * (item.qty ?? item.quantity ?? 1), 0)
        : 0
      return sum + itemTotal
    }, 0)

    dayLabels.push(label)
    dayRevenue.push(rev)
    dayOrders.push(dayCompletedOrders.length)
  }

  const weekly: WeeklyType = {
    labels: dayLabels,
    revenue: dayRevenue,
    orders: dayOrders,
  }

  return (
    <>
      {/* Greeting + Trust Score */}
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold text-dark">สวัสดี {user.displayName ?? user.name}</h1>
          <p className="text-default-400 mt-1">ภาพรวมร้าน {shop.shopName}</p>
        </div>
        <TrustScoreCard score={user.trustScore ?? 0} />
      </div>

      {/* 4 stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <StatisticCard key={stat.title} stat={stat} />
        ))}
      </div>

      {/* Sales Report + Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <SalesReport weekly={weekly} />
        </div>
        <div className="lg:col-span-1">
          <TopSellingProducts products={topProducts} />
        </div>
      </div>

      {/* Recent Orders full width */}
      <div className="mb-6">
        <RecentOrder orders={recentOrders} />
      </div>
    </>
  )
}

// ─── Helper component ──────────────────────────────────────────────────────────

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
