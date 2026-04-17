import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getShopByUserId } from '@/services/shop.service'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import ProductForm from '@/app/seller/(dashboard)/products/components/ProductForm'
import FullscreenPageHeader from '@/app/seller/(fullscreen)/_shared/FullscreenPageHeader'

export const metadata: Metadata = { title: 'เพิ่มสินค้า' }

const FORM_ID = 'product-form'

export default async function NewProductPage() {
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
        <Icon icon="mdi:storefront-off-outline" width={64} height={64} className="text-warning mx-auto mb-4" />
        <h2 className="text-xl font-bold text-dark mb-2">ยังไม่มีร้านค้า</h2>
        <p className="text-default-400 mb-6">ต้องสร้างร้านก่อนจึงจะเพิ่มสินค้าได้</p>
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

  return (
    <>
      <FullscreenPageHeader
        title="เพิ่มสินค้า"
        subtitle="กรอกข้อมูลสินค้าใหม่"
        cancelHref="/products"
        saveFormId={FORM_ID}
      />
      <ProductForm shopId={shop.id} formId={FORM_ID} />
    </>
  )
}
