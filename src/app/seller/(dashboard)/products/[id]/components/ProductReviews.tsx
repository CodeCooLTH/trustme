'use client'

import Rating from '@/components/Rating'
import Icon from '@/components/wrappers/Icon'
import type { ReviewRow } from './data'

interface Props {
  reviews: ReviewRow[]
  avgRating: number
  totalReviews: number
  ratingBreakdown: { stars: number; count: number; progress: number }[]
}

const ProductReviews = ({ reviews, avgRating, totalReviews, ratingBreakdown }: Props) => {
  return (
    <div className="card shadow-none border border-dashed border-default-300">
      <div className="card-header">
        <h4 className="card-title">รีวิวจากลูกค้า</h4>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-default-200">
        {/* Average rating */}
        <div className="lg:col-span-5">
          <div className="flex flex-wrap items-start p-7.5 gap-7.5">
            <div className="flex flex-col gap-y-2.5">
              <h3 className="text-primary flex items-center gap-2.5 text-3xl font-bold">
                {totalReviews > 0 ? avgRating.toFixed(1) : '-'}
                <Icon icon="star-filled" className="text-warning text-2xl" />
              </h3>
              {totalReviews > 0 ? (
                <p className="text-default-500 text-sm">จากรีวิวทั้งหมด {totalReviews} รายการ</p>
              ) : (
                <p className="text-default-500 text-sm">ยังไม่มีรีวิว</p>
              )}
            </div>
          </div>
        </div>

        {/* Rating breakdown */}
        <div className="lg:col-span-7">
          <div className="space-y-2.5 p-7.5">
            {ratingBreakdown.map((r) => (
              <div className="flex items-center gap-2" key={r.stars}>
                <div className="text-default-800 text-sm text-nowrap w-12">{r.stars} ดาว</div>
                <div
                  className="bg-default-200 flex h-2 w-full overflow-hidden rounded-full"
                  role="progressbar"
                  aria-valuenow={r.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="bg-primary flex flex-col justify-center overflow-hidden rounded-s-full text-center text-xs whitespace-nowrap text-white transition duration-500"
                    style={{ width: `${r.progress}%` }}
                  />
                </div>
                <div className="text-end w-8">
                  <span className="badge bg-light text-dark text-xs">{r.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review list */}
      <div className="card-body">
        {reviews.length === 0 ? (
          <div className="py-12 text-center">
            <Icon icon="message-off" className="size-12 text-default-300 mx-auto mb-3" />
            <p className="text-default-400">ยังไม่มีรีวิว</p>
          </div>
        ) : (
          <div className="divide-y divide-default-100">
            {reviews.map((review) => (
              <div key={review.id} className="py-5 flex flex-col gap-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-default-200 flex items-center justify-center">
                      <Icon icon="user" className="size-4 text-default-400" />
                    </div>
                    <span className="text-sm font-medium">{review.reviewerLabel}</span>
                  </div>
                  <span className="text-default-400 text-xs">
                    {new Date(review.createdAt).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <Rating rating={review.rating} />
                {review.comment ? (
                  <p className="text-default-600 text-sm italic">{review.comment}</p>
                ) : (
                  <p className="text-default-400 text-sm italic">ไม่มีความคิดเห็น</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductReviews
