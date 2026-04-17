import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { CountUp } from '@/components/wrappers/CountUp'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { getShopByUserId } from '@/services/shop.service'
import { getProductsByShop } from '@/services/product.service'
import { getOrdersByShop } from '@/services/order.service'
import Link from 'next/link'
import type { Metadata } from 'next'
import ProductCard, { type ProductCardData } from './components/ProductCard'
import ProductFilter from './components/ProductFilter'

export const metadata: Metadata = { title: 'สินค้า' }

type SP = { type?: string; minPrice?: string; maxPrice?: string; minRating?: string }

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SP>
}) {
  const sp = await searchParams

  const session = await getServerSession(authOptions)
  const user = (session as any)?.user
  if (!user) return null

  // --- Shop guard ---
  let shop: any = null
  try {
    shop = await getShopByUserId(user.id)
  } catch {
    shop = null
  }

  if (!shop) {
    return (
      <>
        <PageBreadcrumb title="สินค้า" subtitle="ผู้ขาย" />
        <div className="card p-10 rounded-xl text-center max-w-2xl mx-auto">
          <Icon icon="building-store" className="size-16 text-warning mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">ยังไม่มีร้านค้า</h2>
          <p className="text-default-400 mb-6">ต้องสร้างร้านก่อนจึงจะเพิ่มสินค้าได้</p>
          <Link
            href="/shop"
            className="btn bg-primary text-white hover:bg-primary-hover inline-flex items-center gap-2 px-6 py-3 font-semibold"
          >
            <Icon icon="plus" />
            สร้างร้านค้า
          </Link>
        </div>
      </>
    )
  }

  // --- Fetch products + orders ---
  let products: any[] = []
  let orders: any[] = []
  try {
    products = await getProductsByShop(shop.id)
  } catch {
    products = []
  }
  try {
    orders = await getOrdersByShop(shop.id)
  } catch {
    orders = []
  }

  // --- Derive sold count + reviews/rating per product ---
  const sold: Record<string, number> = {}
  const reviewsByProduct: Record<string, number[]> = {}

  orders
    .filter((o: any) => o.status === 'COMPLETED')
    .forEach((o: any) => {
      if (!Array.isArray(o.items)) return
      o.items.forEach((item: any) => {
        const pid = item.productId
        if (!pid) return
        sold[pid] = (sold[pid] ?? 0) + (item.qty ?? 1)
        if (o.review?.rating) {
          ;(reviewsByProduct[pid] ??= []).push(o.review.rating)
        }
      })
    })

  const productCards: ProductCardData[] = products.map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description ?? null,
    images: Array.isArray(p.images) ? p.images : [],
    price: Number(p.price ?? 0),
    type: (p.type as 'PHYSICAL' | 'DIGITAL' | 'SERVICE') ?? 'PHYSICAL',
    reviews: (reviewsByProduct[p.id] ?? []).length,
    rating:
      (reviewsByProduct[p.id] ?? []).length > 0
        ? (reviewsByProduct[p.id] ?? []).reduce((a: number, b: number) => a + b, 0) /
          (reviewsByProduct[p.id] ?? []).length
        : 0,
    totalSold: sold[p.id] ?? 0,
  }))

  // --- Filter ---
  let filtered = productCards
  if (sp.type) filtered = filtered.filter((p) => p.type === sp.type)
  if (sp.minPrice) filtered = filtered.filter((p) => p.price >= Number(sp.minPrice))
  if (sp.maxPrice) filtered = filtered.filter((p) => p.price <= Number(sp.maxPrice))
  if (sp.minRating) filtered = filtered.filter((p) => p.rating >= Number(sp.minRating))

  return (
    <>
      <PageBreadcrumb title="สินค้า" subtitle="ผู้ขาย" />
      <div>
        {/* Toolbar */}
        <div className="card mb-2.5">
          <div className="card-body">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                {/* Mobile filter toggle */}
                <div className="flex items-center gap-2 text-start lg:hidden">
                  <button
                    className="btn btn-icon border-default-300 border bg-white"
                    aria-haspopup="dialog"
                    aria-controls="productFillterOffcanvas"
                    data-hs-overlay="#productFillterOffcanvas"
                  >
                    <Icon icon="menu-4" className="text-default-600 size-6" />
                  </button>
                </div>
                <h3 className="text-lg">
                  จำนวนทั้งหมด:{' '}
                  <CountUp start={0} end={filtered.length} duration={0.5} className="ms-1.5 text-primary" />
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/products/new"
                  className="btn bg-primary text-white hover:bg-primary-hover inline-flex items-center gap-2 px-4 py-2"
                >
                  <Icon icon="plus" />
                  เพิ่มสินค้า
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main grid: filter sidebar + product cards */}
        <div className="grid xl:grid-cols-12 grid-cols-1 gap-base">
          {/* Filter sidebar */}
          <div className="xl:col-span-3">
            <div
              id="productFillterOffcanvas"
              className="hs-overlay hs-overlay-open:translate-x-0 fixed start-0 top-0 bottom-0 z-90 h-full w-80 -translate-x-full transform rounded-lg transition-all duration-300 [--auto-close:lg] lg:static lg:end-auto lg:bottom-0 lg:block! lg:w-full lg:translate-x-0"
              role="dialog"
              tabIndex={-1}
              aria-label="Sidebar"
            >
              <ProductFilter />
            </div>
          </div>

          {/* Products */}
          <div className="xl:col-span-9">
            {filtered.length === 0 ? (
              <div className="card p-12 rounded-xl text-center">
                <Icon icon="package-off" className="size-16 text-default-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">ยังไม่มีสินค้า</h3>
                <p className="text-default-400 mb-6">
                  {productCards.length > 0
                    ? 'ไม่พบสินค้าที่ตรงกับตัวกรอง'
                    : 'เริ่มต้นด้วยการเพิ่มสินค้าแรกของคุณ'}
                </p>
                {productCards.length === 0 && (
                  <Link
                    href="/products/new"
                    className="btn bg-primary text-white hover:bg-primary-hover inline-flex items-center gap-2 px-4 py-2 mx-auto"
                  >
                    <Icon icon="plus" />
                    เพิ่มสินค้าแรก
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-base">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
