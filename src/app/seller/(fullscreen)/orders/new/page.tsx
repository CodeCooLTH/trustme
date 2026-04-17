import { authOptions } from '@/lib/auth'
import { getProductsByShop } from '@/services/product.service'
import { getShopByUserId } from '@/services/shop.service'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import OrderCreateForm, { type CatalogProduct } from '@/app/seller/(dashboard)/orders/new/components/OrderCreateForm'

export const metadata: Metadata = { title: 'สร้างออเดอร์' }

export default async function NewOrderPage() {
  const session = await getServerSession(authOptions)
  const user = (session as any)?.user
  if (!user) redirect('/auth/sign-in')

  let shop: any = null
  try {
    shop = await getShopByUserId(user.id)
  } catch {
    shop = null
  }

  if (!shop) {
    return (
      <div className="card p-10 rounded-xl text-center max-w-2xl mx-auto">
        <Icon
          icon="mdi:storefront-off-outline"
          width={64}
          height={64}
          className="text-warning mx-auto mb-4"
        />
        <h2 className="text-xl font-bold text-dark mb-2">ยังไม่มีร้านค้า</h2>
        <p className="text-default-400 mb-6">ต้องสร้างร้านก่อนจึงจะสร้างออเดอร์ได้</p>
        <Link
          href="/shop"
          className="btn bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover inline-flex items-center gap-2"
        >
          <Icon icon="mdi:plus" width={18} height={18} />
          สร้างร้านค้า
        </Link>
      </div>
    )
  }

  let catalog: CatalogProduct[] = []
  try {
    const products = await getProductsByShop(shop.id)
    catalog = products.map((p: any) => ({
      id: p.id,
      name: p.name,
      description: p.description ?? null,
      price: Number(p.price),
      type: p.type,
    }))
  } catch {
    catalog = []
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark">สร้างออเดอร์</h1>
        <p className="text-default-400 mt-0.5">
          ร้าน {shop.shopName} — ระบบจะสร้างลิงก์สาธารณะให้แชร์แก่ผู้ซื้อ
        </p>
      </div>

      <OrderCreateForm shopId={shop.id} catalog={catalog} />
    </>
  )
}
