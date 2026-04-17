import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getShopByUserId } from '@/services/shop.service'
import { getProductsByShop } from '@/services/product.service'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import DeleteButton from './components/DeleteButton'
import PageBreadcrumb from '@/components/PageBreadcrumb'

export const metadata: Metadata = { title: 'สินค้า' }

const TYPE_META: Record<string, { icon: string; label: string; cls: string }> = {
  PHYSICAL: {
    icon: 'mdi:package-variant-closed',
    label: 'สินค้าจับต้องได้',
    cls: 'bg-primary/10 text-primary',
  },
  DIGITAL: {
    icon: 'mdi:cloud-download-outline',
    label: 'ดิจิทัล',
    cls: 'bg-info/10 text-info',
  },
  SERVICE: {
    icon: 'mdi:wrench-outline',
    label: 'บริการ',
    cls: 'bg-success/10 text-success',
  },
}

function formatPrice(price: unknown) {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(
    Number(price),
  )
}

export default async function ProductsPage() {
  const session = await getServerSession(authOptions)
  const user = (session as any)?.user
  if (!user) return null

  let shop: any = null
  try {
    shop = await getShopByUserId(user.id)
  } catch {
    shop = null
  }

  if (!shop) {
    return (
      <div className="card p-10 rounded-xl text-center max-w-2xl mx-auto">
        <Icon icon="mdi:storefront-off-outline" width={64} height={64} className="text-warning mx-auto mb-4" />
        <h2 className="text-xl font-bold text-dark mb-2">ยังไม่มีร้านค้า</h2>
        <p className="text-default-400 mb-6">ต้องสร้างร้านก่อนจึงจะเพิ่มสินค้าได้</p>
        <Link href="/shop" className="btn bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover inline-flex items-center gap-2">
          <Icon icon="mdi:plus" width={18} height={18} />
          สร้างร้านค้า
        </Link>
      </div>
    )
  }

  let products: any[] = []
  try {
    products = await getProductsByShop(shop.id)
  } catch {
    products = []
  }

  return (
    <>
      <PageBreadcrumb title="สินค้า" subtitle="ผู้ขาย" />
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark">สินค้า</h1>
          <p className="text-default-400 mt-1">จัดการสินค้าของร้าน {shop.shopName}</p>
        </div>
        <Link
          href="/products/new"
          className="btn bg-primary text-white hover:bg-primary-hover inline-flex items-center gap-2 px-4 py-2"
        >
          <Icon icon="mdi:plus" width={18} height={18} />
          เพิ่มสินค้า
        </Link>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="card p-12 rounded-xl text-center">
          <Icon icon="mdi:package-variant-closed-remove" width={64} height={64} className="text-default-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-dark mb-2">ยังไม่มีสินค้า</h3>
          <p className="text-default-400 mb-6">
            —{' '}
            <Link href="/products/new" className="text-primary underline font-medium">
              เพิ่มสินค้าแรก
            </Link>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product: any) => {
            const meta = TYPE_META[product.type] ?? TYPE_META.PHYSICAL
            return (
              <div key={product.id} className="card rounded-xl flex flex-col">
                {/* Card body */}
                <div className="p-5 flex-1">
                  {/* Type badge */}
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium mb-3 ${meta.cls}`}
                  >
                    <Icon icon={meta.icon} width={12} height={12} />
                    {meta.label}
                  </span>

                  <h3 className="text-dark font-semibold text-sm leading-snug mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  {product.description && (
                    <p className="text-default-400 text-xs line-clamp-2 mb-3">{product.description}</p>
                  )}

                  <div className="text-primary font-bold text-base">{formatPrice(product.price)}</div>
                </div>

                {/* Card footer */}
                <div className="border-t border-default-100 p-4 flex items-center gap-2">
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="btn btn-sm flex-1 border border-default-300 bg-card hover:bg-default-50 text-default-700 text-xs inline-flex items-center justify-center gap-1.5"
                  >
                    <Icon icon="mdi:pencil-outline" width={14} height={14} />
                    แก้ไข
                  </Link>
                  <DeleteButton productId={product.id} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
