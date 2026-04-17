import PageBreadcrumb from '@/components/PageBreadcrumb'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { getShopByUserId } from '@/services/shop.service'
import { getOrdersByShop } from '@/services/order.service'
import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import ProductDisplay from './components/ProductDisplay'
import ProductDetails from './components/ProductDetails'
import ProductReviews from './components/ProductReviews'
import type { ProductDetailProps, ReviewRow } from './components/data'

export const metadata: Metadata = { title: 'รายละเอียดสินค้า' }

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const session = await getServerSession(authOptions)
  const user = (session as any)?.user
  if (!user) redirect('/auth/sign-in')

  const shop = await getShopByUserId(user.id)
  if (!shop) redirect('/shop')

  const product = await prisma.product.findUnique({ where: { id } })
  if (!product || product.shopId !== shop.id) notFound()

  // Derive review stats + total sold from orders
  let orders: any[] = []
  try {
    orders = await getOrdersByShop(shop.id)
  } catch {
    orders = []
  }

  // Aggregate sold count and reviews for this product
  let totalSold = 0
  const reviewRows: ReviewRow[] = []

  orders
    .filter((o: any) => o.status === 'COMPLETED')
    .forEach((o: any) => {
      if (!Array.isArray(o.items)) return
      const hasThisProduct = o.items.some((item: any) => item.productId === id)
      if (!hasThisProduct) return

      // Count sold qty for this product
      o.items.forEach((item: any) => {
        if (item.productId === id) {
          totalSold += item.qty ?? 1
        }
      })

      // Collect review
      if (o.review) {
        const review = o.review
        let reviewerLabel = 'ลูกค้า'
        if (o.buyerContact) {
          // Mask: show last 4 chars of contact
          const contact = String(o.buyerContact)
          if (contact.includes('@')) {
            // Email: mask local part, show last chars before @
            const [local, domain] = contact.split('@')
            reviewerLabel = `${local.slice(0, 2)}***@${domain}`
          } else {
            // Phone: show last 4 digits
            reviewerLabel = `•••${contact.slice(-4)}`
          }
        }
        reviewRows.push({
          id: review.id,
          rating: review.rating,
          comment: review.comment ?? '',
          reviewerLabel,
          createdAt: review.createdAt instanceof Date
            ? review.createdAt.toISOString()
            : String(review.createdAt),
        })
      }
    })

  // Rating stats
  const totalReviews = reviewRows.length
  const avgRating =
    totalReviews > 0
      ? reviewRows.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0

  // Rating breakdown (1–5 stars)
  const ratingBreakdown = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviewRows.filter((r) => Math.round(r.rating) === stars).length
    const progress = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0
    return { stars, count, progress }
  })

  // Build product props (coerce Decimal → number)
  const productProps: ProductDetailProps = {
    id: product.id,
    name: product.name,
    description: product.description ?? '',
    images: Array.isArray(product.images) ? (product.images as string[]) : [],
    price: Number(product.price),
    type: (product.type as ProductDetailProps['type']) ?? 'PHYSICAL',
    totalSold,
    reviews: totalReviews,
    rating: avgRating,
    createdAt: product.createdAt instanceof Date
      ? product.createdAt.toISOString()
      : String(product.createdAt),
  }

  return (
    <>
      <PageBreadcrumb title={product.name} trail={[{ label: 'Business' }, { label: 'สินค้า', href: '/products' }]} />
      <div className="card">
        <div className="card-body">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-base">
            {/* Left: image display */}
            <div>
              <ProductDisplay product={productProps} />
            </div>
            {/* Right: details + reviews */}
            <div className="lg:col-span-2">
              <div className="md:p-7.5">
                <ProductDetails product={productProps} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Reviews section */}
      <div className="mt-base">
        <ProductReviews
          reviews={reviewRows}
          avgRating={avgRating}
          totalReviews={totalReviews}
          ratingBreakdown={ratingBreakdown}
        />
      </div>
    </>
  )
}
