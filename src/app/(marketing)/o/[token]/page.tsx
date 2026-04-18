/**
 * Public order page — /o/[token]
 *
 * Base:
 *   - theme/vuexy/typescript-version/full-version/src/views/apps/invoice/preview/PreviewCard.tsx
 *     (order-detail card: Invoice meta header, item table with tableStyles, totals block)
 *   - theme/vuexy/typescript-version/full-version/src/views/pages/user-profile/UserProfileHeader.tsx
 *     (seller hero: avatar + name + meta row)
 *
 * Composes the server page from three sections:
 *   1. Seller trust card (UserProfileHeader hero shape)
 *   2. Order detail card (PreviewCard layout, item table, totals)
 *   3. Action area — ConfirmFlow (CREATED) / ReviewForm (CONFIRMED..COMPLETED, no review) /
 *      existing review readback / CANCELLED notice
 *
 * Server Component — no 'use client'. Uses LinkButton wrapper (mui-link) for SPA
 * nav to /u/[username] to avoid `component={Link}` RSC boundary error
 * (see docs/conventions/rsc-mui-navigation.md).
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import tableStyles from '@core/styles/table.module.css'

import { getOrderByToken } from '@/services/order.service'
import { getTrustLevel } from '@/services/trust-score.service'

import { LinkButton } from '../../_components/mui-link'
import ConfirmFlow from './ConfirmFlow'
import ReviewForm from './ReviewForm'

type Props = { params: Promise<{ token: string }> }

export const metadata: Metadata = { title: 'คำสั่งซื้อ' }

const STATUS_LABEL: Record<string, string> = {
  CREATED: 'รอยืนยัน',
  CONFIRMED: 'ยืนยันแล้ว',
  SHIPPED: 'จัดส่งแล้ว',
  COMPLETED: 'สำเร็จ',
  CANCELLED: 'ยกเลิก',
}

const STATUS_COLOR: Record<string, 'default' | 'info' | 'warning' | 'success' | 'error'> = {
  CREATED: 'warning',
  CONFIRMED: 'info',
  SHIPPED: 'info',
  COMPLETED: 'success',
  CANCELLED: 'error',
}

const TYPE_LABEL: Record<string, string> = {
  PHYSICAL: 'สินค้า',
  DIGITAL: 'สินค้าดิจิทัล',
  SERVICE: 'บริการ',
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

const dateFmt = new Intl.DateTimeFormat('th-TH', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

export default async function PublicOrderPage({ params }: Props) {
  const { token } = await params
  const order = await getOrderByToken(token)
  if (!order) notFound()

  const seller = order.shop.user
  const trustScore = seller.trustScore
  const trustLevel = getTrustLevel(trustScore)
  const trustColor = TRUST_COLOR[trustLevel] ?? 'info'

  const createdAtIso = order.createdAt.toISOString()
  const createdAtLabel = dateFmt.format(new Date(createdAtIso))
  const total = Number(order.totalAmount)

  const statusLabel = STATUS_LABEL[order.status] ?? order.status
  const statusColor = STATUS_COLOR[order.status] ?? 'default'
  const typeLabel = TYPE_LABEL[order.type] ?? order.type

  const canConfirm = order.status === 'CREATED'
  const canReview =
    !order.review &&
    (order.status === 'CONFIRMED' || order.status === 'COMPLETED' || order.status === 'SHIPPED')
  const isShipped = order.status === 'SHIPPED' && !!order.shipmentTracking
  const isCancelled = order.status === 'CANCELLED'

  const avatarLetter = seller.displayName?.slice(0, 1) ?? '?'

  return (
    <div className='p-4 sm:p-6 lg:p-10 min-bs-[100dvh] bg-[var(--mui-palette-background-default)]'>
      <div className='mx-auto max-w-3xl flex flex-col gap-5'>
        {/* 1. Seller trust card — shape from UserProfileHeader */}
        <Card>
          <CardContent className='flex gap-5 flex-col sm:flex-row sm:items-center'>
            <div className='flex items-center gap-4 is-full'>
              <Avatar sx={{ width: 64, height: 64 }}>{avatarLetter}</Avatar>
              <div className='flex-1 min-w-0 flex flex-col gap-1'>
                <Typography variant='h5' className='truncate'>
                  {seller.displayName}
                </Typography>
                <div className='flex flex-wrap items-center gap-x-4 gap-y-1'>
                  <div className='flex items-center gap-2'>
                    <i className='tabler-building-store text-base' />
                    <Typography className='font-medium truncate'>
                      {order.shop.shopName}
                    </Typography>
                  </div>
                  <div className='flex items-center gap-2'>
                    <i className='tabler-at text-base' />
                    <Typography color='text.secondary' className='text-sm truncate'>
                      {seller.username}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center sm:items-end gap-1 shrink-0'>
              <Typography color='text.disabled' className='text-xs'>
                Trust Score
              </Typography>
              <div className='flex items-center gap-2'>
                <Typography variant='h4' color={`${trustColor}.main`} className='!font-bold'>
                  {trustScore}
                </Typography>
                <Chip size='small' color={trustColor} label={trustLevel} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Order detail card — shape from PreviewCard */}
        <Card>
          <CardContent className='sm:!p-10'>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <div className='p-6 bg-actionHover rounded'>
                  <div className='flex justify-between gap-y-4 flex-col sm:flex-row sm:items-center'>
                    <div className='flex flex-col gap-2'>
                      <Typography variant='h5'>
                        คำสั่งซื้อ #{order.publicToken.slice(0, 8)}
                      </Typography>
                      <Typography color='text.primary'>วันที่: {createdAtLabel}</Typography>
                      <div className='flex items-center gap-2'>
                        <Chip size='small' label={typeLabel} variant='outlined' />
                      </div>
                    </div>
                    <div className='flex flex-col sm:items-end gap-2'>
                      <Chip size='medium' color={statusColor} label={statusLabel} />
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <div className='overflow-x-auto border rounded'>
                  <table className={tableStyles.table}>
                    <thead className='border-bs-0'>
                      <tr>
                        <th className='!bg-transparent'>รายการ</th>
                        <th className='!bg-transparent'>รายละเอียด</th>
                        <th className='!bg-transparent'>จำนวน</th>
                        <th className='!bg-transparent'>ราคา/หน่วย</th>
                        <th className='!bg-transparent'>รวม</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((it) => {
                        const unit = Number(it.price)
                        const line = unit * it.qty
                        return (
                          <tr key={it.id}>
                            <td>
                              <Typography color='text.primary' className='font-medium'>
                                {it.name}
                              </Typography>
                            </td>
                            <td>
                              <Typography color='text.secondary' className='text-sm'>
                                {it.description ?? '-'}
                              </Typography>
                            </td>
                            <td>
                              <Typography color='text.primary'>{it.qty}</Typography>
                            </td>
                            <td>
                              <Typography color='text.primary'>{baht.format(unit)}</Typography>
                            </td>
                            <td>
                              <Typography color='text.primary' className='font-medium'>
                                {baht.format(line)}
                              </Typography>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <div className='flex justify-between flex-col gap-y-4 sm:flex-row'>
                  <div className='flex flex-col gap-1 order-2 sm:order-[unset]'>
                    {isShipped && order.shipmentTracking && (
                      <>
                        <Typography className='font-medium' color='text.primary'>
                          ข้อมูลการจัดส่ง
                        </Typography>
                        <Typography color='text.secondary' className='text-sm'>
                          {order.shipmentTracking.provider} — {order.shipmentTracking.trackingNo}
                        </Typography>
                      </>
                    )}
                  </div>
                  <div className='min-is-[200px]'>
                    <Divider className='mlb-2' />
                    <div className='flex items-center justify-between'>
                      <Typography className='font-medium'>ยอดรวม:</Typography>
                      <Typography variant='h5' className='!font-bold' color='text.primary'>
                        {baht.format(total)}
                      </Typography>
                    </div>
                  </div>
                </div>
              </Grid>

              {isCancelled && (
                <Grid size={{ xs: 12 }}>
                  <Divider className='border-dashed' />
                  <Typography color='error.main' className='text-sm mt-4'>
                    คำสั่งซื้อนี้ถูกยกเลิกแล้ว
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>

        {/* 3. Action area */}
        {canConfirm && <ConfirmFlow token={token} />}

        {!canConfirm && canReview && !isCancelled && <ReviewForm token={token} />}

        {order.review && (
          <Card>
            <CardContent className='flex flex-col gap-3'>
              <Typography variant='h6'>ขอบคุณสำหรับรีวิว</Typography>
              <div className='flex items-center gap-1 text-[var(--mui-palette-warning-main)]'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <i
                    key={i}
                    className={
                      order.review && i < order.review.rating
                        ? 'tabler-star-filled text-xl'
                        : 'tabler-star text-[var(--mui-palette-text-disabled)] text-xl'
                    }
                  />
                ))}
              </div>
              {order.review.comment && (
                <Typography className='text-sm whitespace-pre-wrap'>
                  {order.review.comment}
                </Typography>
              )}
              <Typography color='text.disabled' className='text-xs'>
                ความคิดเห็นของคุณช่วยให้ชุมชน Deep เชื่อใจกันมากขึ้น
              </Typography>
            </CardContent>
          </Card>
        )}

        <div className='text-center'>
          <LinkButton
            href={`/u/${seller.username}`}
            variant='text'
            size='small'
            endIcon={<i className='tabler-external-link' />}
          >
            ดูโปรไฟล์ร้านค้า
          </LinkButton>
        </div>
      </div>
    </div>
  )
}
