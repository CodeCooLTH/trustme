import { authOptions } from '@/lib/auth'
import { getProductsByShop } from '@/services/product.service'
import { getShopByUserId } from '@/services/shop.service'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import OrderCreateForm, { type CatalogProduct } from '@/app/seller/(dashboard)/orders/new/components/OrderCreateForm'
import Icon from '@/components/wrappers/Icon'
import FullscreenCloseButton from '@/app/seller/(fullscreen)/_shared/FullscreenCloseButton'

export const metadata: Metadata = { title: 'สร้างออเดอร์' }

const FORM_ID = 'order-create-form'

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
          icon="building-store"
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
          <Icon icon="plus" width={18} height={18} />
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
      {/* ── Sticky sub-header: title + action buttons ────────────────────── */}
      {/* Stays pinned inside the fullscreen layout's scrollable <main>.      */}
      {/* The save button uses form="order-create-form" to submit the form    */}
      {/* without being nested inside it.                                     */}
      <div className="sticky top-0 z-10 bg-body-bg pb-4 -mx-4 px-4 md:-mx-8 md:px-8 pt-2 mb-4 border-b border-default-200">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-dark">สร้างออเดอร์</h1>
            <p className="text-default-400 text-sm mt-0.5">
              ร้าน {shop.shopName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FullscreenCloseButton />
            <button
              type="submit"
              form={FORM_ID}
              className="btn bg-primary px-5 py-2 font-semibold text-white hover:bg-primary-hover inline-flex items-center gap-2"
            >
              <Icon icon="device-floppy" width={18} height={18} />
              บันทึก
            </button>
          </div>
        </div>
      </div>

      <OrderCreateForm shopId={shop.id} catalog={catalog} formId={FORM_ID} />
    </>
  )
}
