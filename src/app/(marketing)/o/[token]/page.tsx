/**
 * Public order page /o/[token] — UX ใหม่ 2026-04-18
 *
 * Sequence 3 ขั้น:
 *   1. Lock screen — PhoneUnlock (กรอกเบอร์ตรงกับ order.buyerContact)
 *   2. Order detail — mobile-first + fixed bottom "ยืนยันคำสั่งซื้อ"
 *   3. Confirm — buyer กดปุ่ม → /api/orders/[token]/confirm → status CREATED→CONFIRMED
 *
 * Server component fetches order + ส่งให้ PublicOrderClient จัดการ stage
 * ต่อใน client. Base layouts:
 *   - PhoneUnlock → theme/vuexy/.../views/pages/auth/TwoStepsV1.tsx
 *   - OrderDetailMobile → composed mobile-first shape (scrollable body + fixed CTA)
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getOrderByToken } from '@/services/order.service'

import PublicOrderClient from './PublicOrderClient'
import type { PublicOrderData } from './OrderDetailMobile'

type Props = { params: Promise<{ token: string }> }

export const metadata: Metadata = { title: 'คำสั่งซื้อ' }

export default async function PublicOrderPage({ params }: Props) {
  const { token } = await params
  const order = await getOrderByToken(token)
  if (!order) notFound()

  // Flatten Prisma → plain object ที่ข้าม RSC→client ได้ (Decimal/Date → plain)
  const data: PublicOrderData = {
    publicToken: order.publicToken,
    status: order.status as PublicOrderData['status'],
    type: order.type as PublicOrderData['type'],
    totalAmount: Number(order.totalAmount),
    createdAtIso: order.createdAt.toISOString(),
    hasReview: !!order.review,
    review: order.review
      ? { rating: order.review.rating, comment: order.review.comment }
      : null,
    items: order.items.map((it) => ({
      id: it.id,
      name: it.name,
      description: it.description,
      qty: it.qty,
      price: Number(it.price),
    })),
    shop: {
      shopName: order.shop.shopName,
      user: {
        displayName: order.shop.user.displayName,
        username: order.shop.user.username,
        trustScore: order.shop.user.trustScore,
      },
    },
    shipmentTracking: order.shipmentTracking
      ? {
          provider: order.shipmentTracking.provider,
          trackingNo: order.shipmentTracking.trackingNo,
        }
      : null,
  }

  return <PublicOrderClient order={data} />
}
