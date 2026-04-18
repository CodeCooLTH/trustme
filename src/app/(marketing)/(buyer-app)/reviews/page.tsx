import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { getReviewsByBuyer } from '@/services/review.service'

import { LinkButton } from '@/app/(marketing)/_components/mui-link'

export const metadata: Metadata = { title: 'รีวิวที่ให้' }

const dateFmt = new Intl.DateTimeFormat('th-TH', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

export default async function MyReviewsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/auth/sign-in?callbackUrl=/reviews')

  const userId = (session.user as { id: string }).id
  const reviews = await getReviewsByBuyer(userId)

  return (
    <div className='p-6 lg:p-10 min-bs-[100dvh] bg-[var(--mui-palette-background-default)]'>
      <div className='mx-auto max-w-4xl flex flex-col gap-6'>
        <div className='flex items-center justify-between gap-3 flex-wrap'>
          <div>
            <Typography variant='h5'>รีวิวที่ให้</Typography>
            <Typography color='text.secondary' className='text-sm'>
              รวม {reviews.length} รีวิว
            </Typography>
          </div>
          <LinkButton
            href='/dashboard'
            variant='outlined'
            startIcon={<i className='tabler-arrow-left' />}
          >
            กลับหน้าหลัก
          </LinkButton>
        </div>

        <Card>
          <CardContent>
            {reviews.length === 0 ? (
              <Typography color='text.secondary' className='text-sm py-12 text-center'>
                ยังไม่มีรีวิวที่ให้
              </Typography>
            ) : (
              <div className='flex flex-col'>
                {reviews.map((r, idx) => {
                  const seller = r.order.shop.user
                  const firstItem = r.order.items[0]
                  return (
                    <div key={r.id}>
                      <div className='py-4 flex flex-col gap-2'>
                        <div className='flex items-center justify-between gap-3 flex-wrap'>
                          <Link
                            href={`/u/${seller.username}`}
                            className='text-base font-medium hover:text-[var(--mui-palette-primary-main)]'
                          >
                            {seller.displayName}
                            <span className='text-sm font-normal text-[var(--mui-palette-text-secondary)]'>
                              {' '}@{seller.username}
                            </span>
                          </Link>
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
                        </div>

                        {firstItem && (
                          <Typography color='text.secondary' className='text-xs'>
                            คำสั่งซื้อ: {firstItem.name}
                          </Typography>
                        )}

                        {r.comment && (
                          <Typography className='text-sm whitespace-pre-wrap'>
                            {r.comment}
                          </Typography>
                        )}

                        <div className='flex items-center justify-between mt-1'>
                          <Typography color='text.disabled' className='text-xs'>
                            {dateFmt.format(r.createdAt)}
                          </Typography>
                          <Link
                            href={`/o/${r.order.publicToken}`}
                            className='text-xs text-[var(--mui-palette-primary-main)] hover:underline'
                          >
                            ดูคำสั่งซื้อ →
                          </Link>
                        </div>
                      </div>
                      {idx < reviews.length - 1 && <Divider />}
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
