import PageBreadcrumb from '@/components/PageBreadcrumb'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getTrustLevel } from '@/services/trust-score.service'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { statData } from './components/data'
import RecentActivity from './components/RecentActivity'
import RecentOrder from './components/RecentOrder'
import RevenueByLocation from './components/RevenueByLocation'
import SalesReport from './components/SalesReport'
import StatisticCard from './components/StatisticCard'
import StorePerformanceOverview from './components/StorePerformanceOverview'
import TopSellingProducts from './components/TopSellingProducts'
import UserCard from './components/UserCard'
import AchievementLevel from './components/AchievementLevel'
import type { AchievementBadge } from './components/AchievementLevel'

export const metadata: Metadata = { title: 'แดชบอร์ด' }

function criteriaToText(c: any): string {
  if (!c || typeof c !== 'object') return ''
  switch (c.type) {
    case 'FIRST_ORDER':       return 'ปิดออเดอร์แรกได้'
    case 'ORDER_COUNT':       return `ปิด ${c.count} ออเดอร์`
    case 'PERFECT_RATING':    return `เรตติ้ง 5.0 (ต้องมี ${c.minReviews}+ รีวิว)`
    case 'HIGH_RATING':       return `เรตติ้ง ≥ ${c.minRating} (${c.minReviews}+ รีวิว)`
    case 'ZERO_COMPLAINT':    return `ปิด ${c.minOrders} ออเดอร์ ไม่มี cancel`
    case 'VETERAN':           return `เป็นสมาชิกครบ ${c.minDays ?? 365} วัน`
    case 'FAST_SHIPPING':     return `จัดส่งเฉลี่ย ≤ ${c.maxHours} ชม. (${c.minOrders}+ ออเดอร์)`
    case 'FULL_VERIFICATION': return 'ยืนยันตัวตนครบทุกระดับ'
    case 'UNIQUE_REVIEWERS':  return `ผู้รีวิว ${c.count}+ คน`
    default:                  return ''
  }
}

const LEVEL_COLOR: Record<string, string> = {
  'A+': 'text-success',
  'A':  'text-success',
  'B+': 'text-primary',
  'B':  'text-primary',
  'C':  'text-warning',
  'D':  'text-danger',
}

export default async function SellerDashboardPage() {
  const session = await getServerSession(authOptions)
  const user = (session as any)?.user

  // Fetch achievement badge data server-side
  let badges: AchievementBadge[] = []
  let score = 0
  let level = 'D'
  let levelColor = 'text-danger'
  let nextMilestone: string | undefined

  if (user?.id) {
    score = user.trustScore ?? 0
    level = getTrustLevel(score)
    levelColor = LEVEL_COLOR[level] ?? 'text-primary'

    try {
      const earnedRows = await prisma.userBadge.findMany({
        where: { userId: user.id },
        select: { badgeId: true },
      })
      const earnedBadgeIds = new Set(earnedRows.map((x: { badgeId: string }) => x.badgeId))

      const allBadges = await prisma.badge.findMany({
        where: { type: 'ACHIEVEMENT' },
        orderBy: { createdAt: 'asc' },
      })

      badges = allBadges.map((b: any) => ({
        id: b.id,
        name: b.name,
        nameEN: b.nameEN,
        icon: b.icon,
        earned: earnedBadgeIds.has(b.id),
        criteria: criteriaToText(b.criteria as any),
      }))

      const firstUnearned = badges.find((b) => !b.earned)
      nextMilestone = firstUnearned
        ? `ยังต้องการ: ${firstUnearned.criteria}`
        : 'ปลดล็อกทุก achievement แล้ว 🎉'
    } catch {
      badges = []
      nextMilestone = undefined
    }
  }

  return (
    <>
      <PageBreadcrumb title="ภาพรวมร้านค้า" trail={[{ label: 'Analytics' }]} />

      <div className="grid xl:grid-cols-12 grid-cols-1 gap-base mb-base">
        <div className="xl:col-span-5">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-base h-full">
            <UserCard />
            {statData.map((stat, idx) => (
              <StatisticCard stat={stat} key={idx} />
            ))}
          </div>
        </div>
        <div className="xl:col-span-7">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-base h-full">
            <StorePerformanceOverview />
            <AchievementLevel
              score={score}
              level={level}
              levelColor={levelColor}
              badges={badges}
              nextMilestone={nextMilestone}
            />
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 grid-cols-1 gap-base mb-base">
        <SalesReport />
        <TopSellingProducts />
      </div>

      <div className="grid xl:grid-cols-12 grid-cols-1 gap-base">
        <div className="xl:col-span-5">
          <RecentOrder />
        </div>
        <div className="xl:col-span-7">
          <div className="grid xl:grid-cols-2 grid-cols-1 gap-base h-full">
            <RevenueByLocation />
            <RecentActivity />
          </div>
        </div>
      </div>
    </>
  )
}
