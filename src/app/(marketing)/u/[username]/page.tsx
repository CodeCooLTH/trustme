import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { prisma } from '@/lib/prisma'
import { findByUsername } from '@/services/user.service'
import { getReviewsByUsername } from '@/services/review.service'
import { getTrustLevel } from '@/services/trust-score.service'

type Props = { params: Promise<{ username: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const user = await findByUsername(username)
  if (!user) return { title: 'ไม่พบผู้ใช้' }
  return {
    title: `${user.displayName} (@${user.username})`,
    description: user.shop?.description ?? `โปรไฟล์ความน่าเชื่อถือของ ${user.displayName} บน Deep`,
  }
}

const TRUST_COLOR: Record<string, 'success' | 'info' | 'warning' | 'error'> = {
  'A+': 'success',
  A: 'success',
  'B+': 'info',
  B: 'info',
  C: 'warning',
  D: 'error',
}

const dateFmt = new Intl.DateTimeFormat('th-TH', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const relativeDateFmt = new Intl.DateTimeFormat('th-TH', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params
  const user = await findByUsername(username)
  if (!user) notFound()

  const [reviews, approvedVerifications, orderStats] = await Promise.all([
    getReviewsByUsername(username, 10, 0),
    prisma.verificationRecord.findMany({
      where: { userId: user.id, status: 'APPROVED' },
      select: { level: true, type: true, reviewedAt: true },
      orderBy: { level: 'desc' },
    }),
    user.shop
      ? prisma.order.groupBy({
          by: ['status'],
          where: { shopId: user.shop.id },
          _count: { _all: true },
        })
      : Promise.resolve([] as Array<{ status: string; _count: { _all: number } }>),
  ])

  const trustLevel = getTrustLevel(user.trustScore)
  const trustColor = TRUST_COLOR[trustLevel] ?? 'info'
  const maxVerifyLevel = approvedVerifications.length
    ? Math.max(...approvedVerifications.map((v) => v.level))
    : 0

  const completedOrders =
    orderStats.find((s) => s.status === 'COMPLETED')?._count._all ?? 0
  const totalOrders = orderStats.reduce((acc, s) => acc + s._count._all, 0)

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  return (
    <div className='p-6 lg:p-10 min-bs-[100dvh] bg-[var(--mui-palette-background-default)]'>
      <div className='mx-auto max-w-5xl flex flex-col gap-6'>
        {/* Hero card */}
        <Card>
          <CardContent>
            <div className='flex flex-col md:flex-row gap-6 items-start'>
              <Avatar
                src={user.avatar ?? undefined}
                alt={user.displayName}
                sx={{ width: 120, height: 120 }}
              >
                {user.displayName.slice(0, 1)}
              </Avatar>
              <div className='flex-1 min-w-0 flex flex-col gap-2'>
                <div className='flex flex-wrap items-center gap-2'>
                  <Typography variant='h4' className='!font-bold'>
                    {user.displayName}
                  </Typography>
                  {maxVerifyLevel >= 1 && (
                    <Tooltip title='ยืนยันตัวตนแล้ว'>
                      <span className='inline-flex items-center text-[var(--mui-palette-primary-main)]'>
                        <i className='tabler-rosette-discount-check text-2xl' />
                      </span>
                    </Tooltip>
                  )}
                </div>
                <Typography color='text.secondary'>@{user.username}</Typography>
                <div className='flex items-center gap-2 flex-wrap mt-1'>
                  {user.isShop && user.shop && (
                    <Chip
                      size='small'
                      color='warning'
                      icon={<i className='tabler-building-store' />}
                      label={user.shop.shopName}
                    />
                  )}
                  <Chip
                    size='small'
                    variant='outlined'
                    icon={<i className='tabler-calendar' />}
                    label={`สมาชิกตั้งแต่ ${dateFmt.format(user.createdAt)}`}
                  />
                </div>
              </div>

              {/* Trust score */}
              <div className='flex flex-col items-center text-center gap-1 bg-[var(--mui-palette-action-hover)] rounded-xl p-5 w-full md:w-56'>
                <Typography color='text.secondary' className='text-xs'>
                  Trust Score
                </Typography>
                <Typography
                  variant='h2'
                  color={`${trustColor}.main`}
                  className='!font-bold !leading-none'
                >
                  {user.trustScore}
                </Typography>
                <Chip
                  color={trustColor}
                  size='medium'
                  label={`ระดับ ${trustLevel}`}
                  className='mt-1'
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification badges */}
        <Card>
          <CardContent>
            <Typography variant='h6' className='mb-4'>
              ยืนยันตัวตน
            </Typography>
            <div className='flex flex-wrap gap-3'>
              <VerifyBadge
                active={approvedVerifications.some((v) => v.level === 1) || !!user.trustScore}
                level={1}
                label='ยืนยันเบอร์/อีเมล'
                icon='tabler-phone-check'
              />
              <VerifyBadge
                active={approvedVerifications.some((v) => v.level === 2)}
                level={2}
                label='ยืนยันบัตรประชาชน'
                icon='tabler-id-badge-2'
              />
              <VerifyBadge
                active={approvedVerifications.some((v) => v.level === 3)}
                level={3}
                label='ยืนยันจดทะเบียนธุรกิจ'
                icon='tabler-briefcase'
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        {user.isShop && user.shop && (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <StatCard icon='tabler-shopping-bag' label='คำสั่งซื้อทั้งหมด' value={`${totalOrders}`} />
            <StatCard icon='tabler-circle-check' label='สำเร็จแล้ว' value={`${completedOrders}`} />
            <StatCard
              icon='tabler-star-filled'
              label='คะแนนเฉลี่ย'
              value={reviews.length ? avgRating.toFixed(1) : '-'}
            />
            <StatCard icon='tabler-message-2' label='รีวิว' value={`${reviews.length}+`} />
          </div>
        )}

        {/* Achievement badges */}
        {user.userBadges.length > 0 && (
          <Card>
            <CardContent>
              <Typography variant='h6' className='mb-4'>
                Badge ที่ได้รับ
              </Typography>
              <div className='flex flex-wrap gap-3'>
                {user.userBadges.map((ub) => (
                  <Tooltip key={ub.id} title={ub.badge.nameEN}>
                    <div className='flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-action-hover)]'>
                      <i className={`${ub.badge.icon} text-xl text-[var(--mui-palette-primary-main)]`} />
                      <Typography className='text-sm font-medium'>
                        {ub.badge.name}
                      </Typography>
                    </div>
                  </Tooltip>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Shop info */}
        {user.isShop && user.shop && (
          <Card>
            <CardContent>
              <Typography variant='h6' className='mb-2'>
                เกี่ยวกับร้าน
              </Typography>
              <Typography className='mb-3'>{user.shop.shopName}</Typography>
              {user.shop.description && (
                <Typography color='text.secondary' className='text-sm whitespace-pre-wrap'>
                  {user.shop.description}
                </Typography>
              )}
              {user.shop.category && (
                <Chip size='small' label={user.shop.category} className='mt-3' />
              )}
            </CardContent>
          </Card>
        )}

        {/* Reviews */}
        <Card>
          <CardContent>
            <div className='flex items-center justify-between mb-4'>
              <Typography variant='h6'>รีวิวล่าสุด</Typography>
              {reviews.length > 0 && (
                <div className='flex items-center gap-1 text-[var(--mui-palette-warning-main)]'>
                  <i className='tabler-star-filled' />
                  <Typography className='text-sm font-medium'>
                    {avgRating.toFixed(1)} · {reviews.length}+ รีวิว
                  </Typography>
                </div>
              )}
            </div>
            {reviews.length === 0 ? (
              <Typography color='text.secondary' className='text-sm py-8 text-center'>
                ยังไม่มีรีวิว
              </Typography>
            ) : (
              <div className='flex flex-col'>
                {reviews.map((r, idx) => (
                  <div key={r.id}>
                    <div className='py-4'>
                      <div className='flex items-center justify-between gap-3 mb-2'>
                        <div className='flex items-center gap-1 text-[var(--mui-palette-warning-main)]'>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <i
                              key={i}
                              className={
                                i < r.rating
                                  ? 'tabler-star-filled'
                                  : 'tabler-star text-[var(--mui-palette-text-disabled)]'
                              }
                            />
                          ))}
                        </div>
                        <Typography color='text.disabled' className='text-xs'>
                          {relativeDateFmt.format(r.createdAt)}
                        </Typography>
                      </div>
                      {r.order.items[0] && (
                        <Typography color='text.secondary' className='text-xs mb-1'>
                          {r.order.items[0].name}
                        </Typography>
                      )}
                      {r.comment && (
                        <Typography className='text-sm whitespace-pre-wrap'>
                          {r.comment}
                        </Typography>
                      )}
                    </div>
                    {idx < reviews.length - 1 && <Divider />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function VerifyBadge({
  active,
  level,
  label,
  icon,
}: {
  active: boolean
  level: number
  label: string
  icon: string
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${
        active
          ? 'border-[var(--mui-palette-success-main)] bg-[var(--mui-palette-success-lightOpacity)]'
          : 'border-[var(--mui-palette-divider)] opacity-60'
      }`}
    >
      <i
        className={`${icon} text-2xl ${
          active
            ? 'text-[var(--mui-palette-success-main)]'
            : 'text-[var(--mui-palette-text-disabled)]'
        }`}
      />
      <div>
        <Typography className='text-xs' color='text.secondary'>
          ระดับ {level}
        </Typography>
        <Typography className='text-sm font-medium'>{label}</Typography>
      </div>
      {active && (
        <i className='tabler-check text-lg text-[var(--mui-palette-success-main)] ms-2' />
      )}
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: string
  label: string
  value: string
}) {
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
