import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import Typography from '@mui/material/Typography'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { getReviewsByBuyer } from '@/services/review.service'

import { LinkButton } from '@/app/(marketing)/_components/mui-link'
import ManageReviews from '@views/apps/ecommerce/manage-reviews'
import type { BuyerReviewRow } from '@views/apps/ecommerce/manage-reviews/ManageReviewsTable'

/**
 * Buyer "My Reviews" list.
 *
 * Base:
 *   theme/vuexy/typescript-version/full-version/src/app/[lang]/(dashboard)/(private)/apps/ecommerce/manage-reviews/page.tsx
 * Adapted: server-side session + Prisma fetch via getReviewsByBuyer; flatten
 *   Date → ISO string so the row payload is JSON-serialisable across the RSC
 *   boundary. Dropped <TotalReviews /> / <ReviewsStatistics /> in the view shell.
 */

export const metadata: Metadata = { title: 'รีวิวที่ให้' }

export default async function MyReviewsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) redirect('/auth/sign-in?callbackUrl=/reviews')

  const userId = (session.user as { id: string }).id
  const reviews = await getReviewsByBuyer(userId)

  // Date is not JSON-safe across the server/client boundary — flatten to ISO.
  const reviewsData: BuyerReviewRow[] = reviews.map(r => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment,
    createdAt: r.createdAt.toISOString(),
    order: {
      publicToken: r.order.publicToken,
      items: r.order.items.map(it => ({ id: it.id, name: it.name })),
      shop: {
        user: {
          displayName: r.order.shop.user.displayName,
          username: r.order.shop.user.username
        }
      }
    }
  }))

  return (
    <div className='p-6 lg:p-10 min-bs-[100dvh] bg-[var(--mui-palette-background-default)]'>
      <div className='mx-auto max-w-6xl flex flex-col gap-6'>
        <div className='flex items-center justify-between gap-3 flex-wrap'>
          <div>
            <Typography variant='h5'>รีวิวที่ให้</Typography>
            <Typography color='text.secondary' className='text-sm'>
              รวม {reviewsData.length} รีวิว
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

        <ManageReviews reviewsData={reviewsData} />
      </div>
    </div>
  )
}
