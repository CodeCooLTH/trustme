// Component Imports
import ManageReviewsTable from './ManageReviewsTable'
import type { BuyerReviewRow } from './ManageReviewsTable'

/**
 * Buyer "My Reviews" shell.
 *
 * Base: theme/vuexy/typescript-version/full-version/src/app/[lang]/(dashboard)/(private)/apps/ecommerce/manage-reviews/page.tsx
 * Dropped: <TotalReviews /> and <ReviewsStatistics /> (seller-side aggregates;
 *   no buyer-side stats defined yet).
 */
const ManageReviews = ({ reviewsData }: { reviewsData: BuyerReviewRow[] }) => {
  return (
    <div className='flex flex-col gap-6'>
      <ManageReviewsTable reviewsData={reviewsData} />
    </div>
  )
}

export default ManageReviews
