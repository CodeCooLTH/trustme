import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getOrdersByBuyer } from '@/services/order.service'
import { getReviewsByBuyer } from '@/services/review.service'
import { getTrustLevel } from '@/services/trust-score.service'

import SignOutButton from './SignOutButton'

export const metadata: Metadata = { title: 'หน้าหลักของฉัน' }

const ORDER_STATUS_LABEL: Record<string, string> = {
  CREATED: 'รอยืนยัน',
  CONFIRMED: 'ยืนยันแล้ว',
  SHIPPED: 'จัดส่งแล้ว',
  COMPLETED: 'สำเร็จ',
  CANCELLED: 'ยกเลิก',
}

const ORDER_STATUS_COLOR: Record<string, 'default' | 'info' | 'warning' | 'success' | 'error'> = {
  CREATED: 'warning',
  CONFIRMED: 'info',
  SHIPPED: 'info',
  COMPLETED: 'success',
  CANCELLED: 'error',
}

const TRUST_COLOR: Record<string, 'success' | 'info' | 'warning' | 'error'> = {
  'A+': 'success',
  A: 'success',
  'B+': 'info',
  B: 'info',
  C: 'warning',
  D: 'error',
}

const baht = new Intl.NumberFormat('th-TH', {
  style: 'currency',
  currency: 'THB',
  minimumFractionDigits: 0,
})

export default async function BuyerDashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/auth/sign-in?callbackUrl=/dashboard')

  const userId = (session.user as { id: string }).id

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      shop: { select: { id: true } },
      verifications: { select: { level: true, status: true } },
      userBadges: { include: { badge: true } },
    },
  })

  if (!user) redirect('/auth/sign-in')

  const [recentOrders, recentReviews] = await Promise.all([
    getOrdersByBuyer(userId).then((all) => all.slice(0, 5)),
    getReviewsByBuyer(userId, 5),
  ])

  const trustLevel = getTrustLevel(user.trustScore)
  const trustChipColor = TRUST_COLOR[trustLevel] ?? 'info'

  const hasL1 = !!user.phone || user.verifications.some((v) => v.level === 1 && v.status === 'APPROVED')
  const hasL2 = user.verifications.some((v) => v.level === 2 && v.status === 'APPROVED')
  const hasL3 = user.verifications.some((v) => v.level === 3 && v.status === 'APPROVED')
  const pendingL2 = user.verifications.some((v) => v.level === 2 && v.status === 'PENDING')
  const pendingL3 = user.verifications.some((v) => v.level === 3 && v.status === 'PENDING')

  const completedOrders = recentOrders.filter((o) => o.status === 'COMPLETED').length

  return (
    <div className='p-6 lg:p-10 min-bs-[100dvh] bg-[var(--mui-palette-background-default)]'>
      <div className='mx-auto max-w-6xl flex flex-col gap-6'>
        {/* Top bar */}
        <div className='flex items-center justify-between gap-4 flex-wrap'>
          <div>
            <Typography variant='h5'>หน้าหลักของฉัน</Typography>
            <Typography color='text.secondary' className='text-sm'>
              ยินดีต้อนรับสู่ Deep
            </Typography>
          </div>
          <div className='flex items-center gap-2'>
            {user.isShop && (
              <Button
                component='a'
                href={
                  process.env.NEXT_PUBLIC_SELLER_URL ??
                  'https://seller.deepthailand.app/dashboard'
                }
                variant='contained'
                color='primary'
                startIcon={<i className='tabler-building-store' />}
              >
                ไปหน้าร้านค้า
              </Button>
            )}
            {!user.isShop && (
              <Button
                component={Link}
                href='/settings/profile'
                variant='outlined'
                startIcon={<i className='tabler-user-cog' />}
              >
                เปิดร้านค้า
              </Button>
            )}
            <SignOutButton />
          </div>
        </div>

        {/* Welcome + trust score */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Welcome card */}
          <Card className='lg:col-span-2'>
            <CardContent className='flex items-center gap-5'>
              <Avatar
                src={user.avatar ?? undefined}
                alt={user.displayName}
                sx={{ width: 72, height: 72 }}
              >
                {user.displayName.slice(0, 1)}
              </Avatar>
              <div className='flex flex-col gap-1 flex-1 min-w-0'>
                <Typography variant='h5' className='truncate'>
                  สวัสดี {user.displayName}
                </Typography>
                <Typography color='text.secondary' className='text-sm'>
                  @{user.username}
                </Typography>
                <div className='flex items-center gap-2 mt-1 flex-wrap'>
                  {user.isAdmin && (
                    <Chip size='small' color='error' label='ผู้ดูแลระบบ' icon={<i className='tabler-crown' />} />
                  )}
                  {user.isShop && (
                    <Chip size='small' color='warning' label='ร้านค้า' icon={<i className='tabler-building-store' />} />
                  )}
                  <Chip
                    size='small'
                    component={Link as any}
                    href={`/u/${user.username}`}
                    clickable
                    variant='outlined'
                    label='ดูโปรไฟล์สาธารณะ'
                    icon={<i className='tabler-external-link' />}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trust score card */}
          <Card>
            <CardContent className='flex flex-col items-center text-center gap-2'>
              <Typography color='text.secondary' className='text-sm'>
                คะแนนความน่าเชื่อถือ
              </Typography>
              <Typography variant='h2' color={`${trustChipColor}.main`} className='!font-bold'>
                {user.trustScore}
              </Typography>
              <Chip size='medium' color={trustChipColor} label={`ระดับ ${trustLevel}`} />
              <Typography color='text.disabled' className='text-xs'>
                จาก 100 คะแนน
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* Verification tiles */}
        <Card>
          <CardContent>
            <div className='flex items-center justify-between gap-3 mb-4 flex-wrap'>
              <Typography variant='h6'>สถานะการยืนยันตัวตน</Typography>
              <Button
                component={Link}
                href='/settings/verification'
                variant='text'
                size='small'
                endIcon={<i className='tabler-chevron-right' />}
              >
                จัดการการยืนยัน
              </Button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <VerifyTile
                label='ระดับ 1 — เบอร์/อีเมล'
                status={hasL1 ? 'APPROVED' : 'NONE'}
                icon='tabler-phone-check'
              />
              <VerifyTile
                label='ระดับ 2 — บัตรประชาชน'
                status={hasL2 ? 'APPROVED' : pendingL2 ? 'PENDING' : 'NONE'}
                icon='tabler-id'
              />
              <VerifyTile
                label='ระดับ 3 — จดทะเบียนธุรกิจ'
                status={hasL3 ? 'APPROVED' : pendingL3 ? 'PENDING' : 'NONE'}
                icon='tabler-briefcase'
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats row */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          <StatCard
            icon='tabler-shopping-bag'
            label='คำสั่งซื้อทั้งหมด'
            value={recentOrders.length >= 5 ? '5+' : `${recentOrders.length}`}
          />
          <StatCard icon='tabler-circle-check' label='สำเร็จแล้ว' value={`${completedOrders}`} />
          <StatCard icon='tabler-star' label='รีวิวที่ให้' value={`${recentReviews.length}`} />
          <StatCard
            icon='tabler-award'
            label='Badge ที่ได้รับ'
            value={`${user.userBadges.length}`}
          />
        </div>

        {/* Recent orders + reviews */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <Card>
            <CardContent>
              <div className='flex items-center justify-between mb-3'>
                <Typography variant='h6'>คำสั่งซื้อล่าสุด</Typography>
                <Button
                  component={Link}
                  href='/orders'
                  variant='text'
                  size='small'
                  endIcon={<i className='tabler-chevron-right' />}
                >
                  ทั้งหมด
                </Button>
              </div>
              {recentOrders.length === 0 ? (
                <Typography color='text.secondary' className='text-sm py-6 text-center'>
                  ยังไม่มีคำสั่งซื้อ
                </Typography>
              ) : (
                <div className='flex flex-col'>
                  {recentOrders.map((o, idx) => {
                    const firstItem = o.items[0]
                    return (
                      <div key={o.id}>
                        <Link
                          href={`/o/${o.publicToken}`}
                          className='flex items-center justify-between gap-3 py-3 hover:bg-[var(--mui-palette-action-hover)] rounded-md px-2 -mx-2'
                        >
                          <div className='flex-1 min-w-0'>
                            <Typography className='text-sm font-medium truncate'>
                              {firstItem?.name ?? 'คำสั่งซื้อ'}
                            </Typography>
                            <Typography color='text.secondary' className='text-xs'>
                              {baht.format(Number(o.totalAmount))}
                            </Typography>
                          </div>
                          <Chip
                            size='small'
                            color={ORDER_STATUS_COLOR[o.status] ?? 'default'}
                            label={ORDER_STATUS_LABEL[o.status] ?? o.status}
                          />
                        </Link>
                        {idx < recentOrders.length - 1 && <Divider />}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className='flex items-center justify-between mb-3'>
                <Typography variant='h6'>รีวิวที่ให้ล่าสุด</Typography>
                <Button
                  component={Link}
                  href='/reviews'
                  variant='text'
                  size='small'
                  endIcon={<i className='tabler-chevron-right' />}
                >
                  ทั้งหมด
                </Button>
              </div>
              {recentReviews.length === 0 ? (
                <Typography color='text.secondary' className='text-sm py-6 text-center'>
                  ยังไม่มีรีวิวที่ให้
                </Typography>
              ) : (
                <div className='flex flex-col'>
                  {recentReviews.map((r, idx) => {
                    const seller = r.order.shop.user
                    return (
                      <div key={r.id}>
                        <div className='py-3'>
                          <div className='flex items-center justify-between gap-3'>
                            <Link
                              href={`/u/${seller.username}`}
                              className='text-sm font-medium truncate hover:text-[var(--mui-palette-primary-main)]'
                            >
                              {seller.displayName}
                            </Link>
                            <div className='flex items-center gap-1 text-[var(--mui-palette-warning-main)] text-sm'>
                              {Array.from({ length: r.rating }).map((_, i) => (
                                <i key={i} className='tabler-star-filled' />
                              ))}
                            </div>
                          </div>
                          {r.comment && (
                            <Typography color='text.secondary' className='text-xs mt-1 line-clamp-2'>
                              {r.comment}
                            </Typography>
                          )}
                        </div>
                        {idx < recentReviews.length - 1 && <Divider />}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function VerifyTile({
  label,
  status,
  icon,
}: {
  label: string
  status: 'APPROVED' | 'PENDING' | 'NONE'
  icon: string
}) {
  const color: 'success' | 'warning' | 'default' =
    status === 'APPROVED' ? 'success' : status === 'PENDING' ? 'warning' : 'default'
  const chipLabel =
    status === 'APPROVED' ? 'ยืนยันแล้ว' : status === 'PENDING' ? 'กำลังตรวจสอบ' : 'ยังไม่ยืนยัน'
  return (
    <div className='flex items-center gap-3 p-4 rounded-lg border border-[var(--mui-palette-divider)]'>
      <i className={`${icon} text-2xl text-[var(--mui-palette-primary-main)]`} />
      <div className='flex-1 min-w-0'>
        <Typography className='text-sm font-medium truncate'>{label}</Typography>
        <Chip size='small' color={color} label={chipLabel} className='mt-1' />
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <Card>
      <CardContent className='flex items-center gap-3'>
        <div className='w-10 h-10 rounded-lg bg-[var(--mui-palette-primary-lightOpacity)] flex items-center justify-center'>
          <i className={`${icon} text-xl text-[var(--mui-palette-primary-main)]`} />
        </div>
        <div className='flex-1'>
          <Typography color='text.secondary' className='text-xs'>
            {label}
          </Typography>
          <Typography variant='h6'>{value}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}
