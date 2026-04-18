/**
 * Admin dashboard — 5 real stat cards from DB.
 *
 * Base: theme/paces/Admin/TS/src/app/(admin)/dashboard/ecommerce/page.tsx
 *       + theme/paces/Admin/TS/src/app/(admin)/dashboard/ecommerce/components/StatisticCard.tsx
 * Adaptations:
 *   - Server component; data fetched directly via Prisma (uses the same
 *     queries as /api/admin/dashboard) to avoid the HTTP roundtrip.
 *   - Dropped every non-applicable widget (UserCard, StorePerformanceOverview,
 *     WeeklyPerformanceInsights, SalesReport, TopSellingProducts, RecentOrder,
 *     RevenueByLocation, RecentActivity) — we don't have the source data yet.
 *   - Welcome sub-header: "สวัสดี {displayName}".
 *   - 5 stats: total users, shops, orders, pending verifications, avg trust.
 */
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import StatisticCard, { type AdminStat } from '@/views/dashboards/ecommerce/StatisticCard'
import { getServerSession } from 'next-auth'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'แดชบอร์ดผู้ดูแล' }

async function getAdminStats() {
  // Same queries as /api/admin/dashboard (src/app/api/admin/dashboard/route.ts)
  const [totalUsers, totalShops, totalOrders, pendingVerifications, avgTrustScore] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { isShop: true } }),
    prisma.order.count(),
    prisma.verificationRecord.count({ where: { status: 'PENDING' } }),
    prisma.user.aggregate({ _avg: { trustScore: true } }),
  ])
  return {
    totalUsers,
    totalShops,
    totalOrders,
    pendingVerifications,
    avgTrustScore: Math.round(avgTrustScore._avg.trustScore || 0),
  }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  const user = (session as any)?.user as { displayName?: string } | undefined

  const stats = await getAdminStats()

  const cards: AdminStat[] = [
    { title: 'ผู้ใช้ทั้งหมด', value: stats.totalUsers, icon: 'users', tone: 'primary' },
    { title: 'ร้านค้า', value: stats.totalShops, icon: 'building-store', tone: 'info' },
    { title: 'ออเดอร์ทั้งหมด', value: stats.totalOrders, icon: 'receipt', tone: 'success' },
    { title: 'รอตรวจสอบ', value: stats.pendingVerifications, icon: 'shield-exclamation', tone: 'warning' },
    { title: 'คะแนนเฉลี่ย', value: stats.avgTrustScore, icon: 'star', tone: 'secondary' },
  ]

  return (
    <>
      <PageBreadcrumb title="แดชบอร์ดผู้ดูแล" subtitle="ภาพรวม" />

      <div className="card mb-base">
        <div className="card-body">
          <h4 className="text-lg font-semibold mb-1">
            สวัสดี {user?.displayName ?? 'Admin'}
          </h4>
          <p className="text-default-400 text-sm mb-0">
            ภาพรวมระบบ Deep — ข้อมูลสรุปจากฐานข้อมูลแบบเรียลไทม์
          </p>
        </div>
      </div>

      <div className="grid xl:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-base">
        {cards.map((stat) => (
          <StatisticCard key={stat.title} stat={stat} />
        ))}
      </div>
    </>
  )
}
