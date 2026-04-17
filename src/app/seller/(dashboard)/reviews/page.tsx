import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getReviewsByShopUser } from '@/services/review.service'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import PageBreadcrumb from '@/components/PageBreadcrumb'

export const metadata: Metadata = { title: 'รีวิวจากลูกค้า' }

// ─── Helpers ─────────────────────────────────────────────────────────────────

function maskContact(c: string) {
  if (!c || c.length <= 4) return c ?? '—'
  return '•'.repeat(Math.max(0, c.length - 4)) + c.slice(-4)
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 text-warning">
      {[1, 2, 3, 4, 5].map((n) => (
        <Icon
          key={n}
          icon={n <= rating ? 'mdi:star' : 'mdi:star-outline'}
          width={16}
          height={16}
        />
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ReviewsPage() {
  const session = await getServerSession(authOptions)
  const user = (session as any)?.user
  if (!user) return null

  let reviews: Awaited<ReturnType<typeof getReviewsByShopUser>> = []
  try {
    reviews = await getReviewsByShopUser(user.id)
  } catch {
    reviews = []
  }

  // ── Aggregate stats ──
  const total = reviews.length
  const avgRating =
    total > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / total
      : 0
  const avgRatingDisplay = total > 0 ? avgRating.toFixed(1) : '—'
  const roundedAvg = Math.round(avgRating)

  // Distribution: count per star 1-5
  const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  for (const r of reviews) {
    const star = Math.min(5, Math.max(1, Math.round(r.rating)))
    dist[star] = (dist[star] ?? 0) + 1
  }

  return (
    <>
      <PageBreadcrumb title="รีวิว" subtitle="ผู้ขาย" />
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark">รีวิวจากลูกค้า</h1>
        <p className="text-default-400 mt-1">รีวิวทั้งหมดที่ลูกค้าให้ไว้หลังยืนยันออเดอร์</p>
      </div>

      {/* Summary card */}
      <div className="card p-6 rounded-xl mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Average + stars */}
          <div className="flex flex-col items-center justify-center min-w-[120px] bg-warning/10 rounded-xl p-4">
            <div className="text-4xl font-bold text-warning leading-none">{avgRatingDisplay}</div>
            <div className="flex items-center gap-0.5 mt-2 text-warning">
              {[1, 2, 3, 4, 5].map((n) => (
                <Icon
                  key={n}
                  icon={n <= roundedAvg ? 'mdi:star' : 'mdi:star-outline'}
                  width={20}
                  height={20}
                />
              ))}
            </div>
            <div className="text-default-400 text-sm mt-1">{total} รีวิว</div>
          </div>

          {/* Distribution bars */}
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = dist[star] ?? 0
              const pct = total > 0 ? (count / total) * 100 : 0
              return (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12 shrink-0">
                    <span className="text-sm text-default-400">{star}</span>
                    <Icon icon="mdi:star" width={14} height={14} className="text-warning" />
                  </div>
                  <div className="flex-1 h-2 bg-default-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-warning rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-sm text-default-400 shrink-0">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Review list */}
      {total === 0 ? (
        <div className="card p-12 rounded-xl text-center">
          <Icon icon="mdi:star-outline" width={56} height={56} className="text-default-300 mx-auto mb-4" />
          <p className="text-default-400 text-lg">ยังไม่มีรีวิว</p>
          <p className="text-default-300 text-sm mt-1">รีวิวจะปรากฏที่นี่หลังลูกค้ายืนยันออเดอร์</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => {
            const publicToken = (review.order as any)?.publicToken as string | undefined
            const reviewerLabel = review.reviewerContact
              ? maskContact(review.reviewerContact)
              : review.reviewerUserId
                ? `ผู้ใช้ที่ลงทะเบียน`
                : '—'

            return (
              <div key={review.id} className="card p-5 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  {/* Left: stars + comment */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <StarRow rating={review.rating} />
                      <span className="text-sm font-semibold text-dark">{review.rating}/5</span>
                    </div>
                    {review.comment ? (
                      <p className="text-default-900 text-sm leading-relaxed break-words">
                        {review.comment}
                      </p>
                    ) : (
                      <p className="text-default-300 text-sm italic">ไม่มีความคิดเห็น</p>
                    )}
                  </div>

                  {/* Right: meta */}
                  <div className="sm:text-right shrink-0 space-y-1">
                    <div className="flex sm:justify-end items-center gap-1 text-default-400 text-sm">
                      <Icon icon="mdi:account-outline" width={14} height={14} />
                      <span>{reviewerLabel}</span>
                    </div>
                    <div className="flex sm:justify-end items-center gap-1 text-default-400 text-xs">
                      <Icon icon="mdi:calendar-outline" width={12} height={12} />
                      <span>
                        {new Date(review.createdAt).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    {publicToken && (
                      <div className="flex sm:justify-end">
                        <Link
                          href={`/orders/${publicToken}`}
                          className="text-primary text-xs font-medium hover:underline flex items-center gap-1"
                        >
                          <Icon icon="mdi:receipt-text-outline" width={12} height={12} />
                          ดูออเดอร์
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
