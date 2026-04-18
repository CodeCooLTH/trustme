import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

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
  const trustLevel = getTrustLevel(seller.trustScore)
  const trustColor = TRUST_COLOR[trustLevel] ?? 'info'

  const canConfirm = order.status === 'CREATED'
  const canReview =
    !order.review && (order.status === 'CONFIRMED' || order.status === 'COMPLETED' || order.status === 'SHIPPED')
  const isShipped = order.status === 'SHIPPED' && !!order.shipmentTracking

  return (
    <div className='p-4 sm:p-6 lg:p-10 min-bs-[100dvh] bg-[var(--mui-palette-background-default)]'>
      <div className='mx-auto max-w-3xl flex flex-col gap-5'>
        {/* Seller trust card */}
        <Card>
          <CardContent>
            <Link
              href={`/u/${seller.username}`}
              className='flex items-center gap-4 hover:opacity-90'
            >
              <Avatar sx={{ width: 56, height: 56 }}>
                {seller.displayName.slice(0, 1)}
              </Avatar>
              <div className='flex-1 min-w-0'>
                <Typography className='font-medium truncate'>{seller.displayName}</Typography>
                <Typography color='text.secondary' className='text-sm truncate'>
                  {order.shop.shopName} · @{seller.username}
                </Typography>
              </div>
              <div className='flex flex-col items-end'>
                <Typography color='text.disabled' className='text-xs'>
                  Trust
                </Typography>
                <div className='flex items-center gap-1'>
                  <Typography
                    variant='h6'
                    color={`${trustColor}.main`}
                    className='!font-bold'
                  >
                    {seller.trustScore}
                  </Typography>
                  <Chip size='small' color={trustColor} label={trustLevel} />
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Order card */}
        <Card>
          <CardContent className='flex flex-col gap-4'>
            <div className='flex items-start justify-between gap-3 flex-wrap'>
              <div>
                <Typography variant='h6'>คำสั่งซื้อ</Typography>
                <Typography color='text.secondary' className='text-xs'>
                  {dateFmt.format(order.createdAt)} · #{order.publicToken.slice(0, 8)}
                </Typography>
              </div>
              <Chip
                size='medium'
                color={STATUS_COLOR[order.status] ?? 'default'}
                label={STATUS_LABEL[order.status] ?? order.status}
              />
            </div>

            <Divider />

            <div className='flex items-center gap-2 text-sm'>
              <Chip size='small' label={TYPE_LABEL[order.type] ?? order.type} variant='outlined' />
            </div>

            <div className='flex flex-col gap-3'>
              {order.items.map((it) => (
                <div key={it.id} className='flex items-start justify-between gap-3'>
                  <div className='flex-1 min-w-0'>
                    <Typography className='text-sm font-medium'>{it.name}</Typography>
                    {it.description && (
                      <Typography color='text.secondary' className='text-xs'>
                        {it.description}
                      </Typography>
                    )}
                    <Typography color='text.disabled' className='text-xs'>
                      จำนวน {it.qty}
                    </Typography>
                  </div>
                  <Typography className='text-sm font-medium'>
                    {baht.format(Number(it.price) * it.qty)}
                  </Typography>
                </div>
              ))}
            </div>

            <Divider />

            <div className='flex items-center justify-between'>
              <Typography className='font-medium'>ยอดรวม</Typography>
              <Typography variant='h6' className='!font-bold'>
                {baht.format(Number(order.totalAmount))}
              </Typography>
            </div>

            {isShipped && order.shipmentTracking && (
              <div className='mt-2 p-3 rounded-md bg-[var(--mui-palette-action-hover)]'>
                <Typography className='text-sm font-medium mb-1'>ข้อมูลการจัดส่ง</Typography>
                <Typography color='text.secondary' className='text-xs'>
                  {order.shipmentTracking.provider} — {order.shipmentTracking.trackingNo}
                </Typography>
              </div>
            )}

            {order.status === 'CANCELLED' && (
              <Typography color='error.main' className='text-sm'>
                คำสั่งซื้อถูกยกเลิก
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* Action area: confirm / review / completed */}
        {canConfirm && <ConfirmFlow token={token} />}

        {!canConfirm && canReview && order.status !== 'CANCELLED' && (
          <ReviewForm token={token} />
        )}

        {order.review && (
          <Card>
            <CardContent className='flex flex-col gap-2'>
              <Typography variant='h6'>รีวิวของคุณ</Typography>
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
                ขอบคุณที่แชร์ประสบการณ์ของคุณ
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
