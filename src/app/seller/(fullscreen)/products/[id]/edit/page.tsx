import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getShopByUserId } from '@/services/shop.service'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import ProductForm from '@/app/seller/(dashboard)/products/components/ProductForm'

export const metadata: Metadata = { title: 'แก้ไขสินค้า' }

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params

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

  // Fetch product and verify it belongs to this shop (security: prevent editing other shops' products)
  const product = await prisma.product.findUnique({ where: { id } })

  if (!product || product.shopId !== shop.id) {
    notFound()
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark">แก้ไขสินค้า</h1>
        <p className="text-default-400 mt-0.5">{product.name}</p>
      </div>

      <ProductForm shopId={shop.id} product={product} />
    </>
  )
}
