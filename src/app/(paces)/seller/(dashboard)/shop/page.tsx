import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getShopByUserId } from '@/services/shop.service'
import { redirect } from 'next/navigation'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import ShopForm from './components/ShopForm'
import PageBreadcrumb from '@/components/PageBreadcrumb'

export const metadata: Metadata = { title: 'ตั้งค่าร้าน' }

function formatShopAge(createdAt: Date): string {
  const now = new Date()
  const diff = now.getTime() - new Date(createdAt).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return 'เปิดร้านวันนี้'
  if (days < 30) return `เปิดร้านมา ${days} วัน`
  if (days < 365) {
    const months = Math.floor(days / 30)
    return `เปิดร้านมา ${months} เดือน`
  }
  const years = Math.floor(days / 365)
  const remainMonths = Math.floor((days % 365) / 30)
  return remainMonths > 0
    ? `เปิดร้านมา ${years} ปี ${remainMonths} เดือน`
    : `เปิดร้านมา ${years} ปี`
}

export default async function ShopSettingsPage() {
  const session = await getServerSession(authOptions)
  const user = (session as any)?.user
  if (!user) redirect('/auth/sign-in')

  let shop: any = null
  try {
    shop = await getShopByUserId(user.id)
  } catch {
    shop = null
  }

  const isExisting = !!shop
  const pageTitle = isExisting ? 'ตั้งค่าร้านค้า' : 'สร้างร้านค้า'
  const pageSubtext = isExisting
    ? `เปิดร้านเมื่อ ${new Date(shop.createdAt).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })} — ${formatShopAge(shop.createdAt)}`
    : 'ตั้งค่าร้านค้าของคุณเพื่อเริ่มรับออเดอร์และสร้าง Trust Score'

  return (
    <>
      <PageBreadcrumb title="ตั้งค่าร้าน" trail={[{ label: 'Setting' }]} />
      {/* Page header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
          <Icon
            icon={isExisting ? 'mdi:store-settings-outline' : 'mdi:storefront-plus-outline'}
            width={24}
            height={24}
            className="text-primary"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-dark">{pageTitle}</h1>
          <p className="text-default-400 text-sm mt-0.5">{pageSubtext}</p>
        </div>
      </div>

      <ShopForm shop={shop} />
    </>
  )
}
