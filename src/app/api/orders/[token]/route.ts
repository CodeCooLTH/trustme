import { NextRequest } from 'next/server'
import { getSession } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { OrderService } from '@/services/order.service'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params
    const order = await OrderService.getByToken(token)
    const session = await getSession()
    const userId = session?.user?.id

    const isBuyer = userId === order.buyerId
    const isSeller = userId === order.deal.sellerId

    let bankAccount = null
    if (isBuyer) {
      const setting = await prisma.systemSetting.findUnique({
        where: { key: 'bank_account' },
      })
      bankAccount = setting ? JSON.parse(setting.value) : null
    }

    const publicData = {
      publicToken: order.publicToken,
      productName: order.deal.productName,
      description: order.deal.description,
      price: order.amount,
      images: order.deal.images,
      shippingMethod: order.deal.shippingMethod,
      status: order.status,
      seller: order.deal.seller,
      createdAt: order.createdAt,
    }

    if (!userId || (!isBuyer && !isSeller)) {
      return successResponse({ ...publicData, viewLevel: 'public' })
    }

    if (isBuyer) {
      return successResponse({
        ...publicData,
        viewLevel: 'buyer',
        bankAccount,
        buyer: order.buyer,
        payments: order.payments,
        shipment: order.shipment,
        dispute: order.dispute,
        confirmDeadline: order.confirmDeadline,
      })
    }

    return successResponse({
      ...publicData,
      viewLevel: 'seller',
      buyer: order.buyer,
      payments: order.payments,
      shipment: order.shipment,
      dispute: order.dispute,
      paymentAttempts: order.paymentAttempts,
    })
  } catch (error) {
    return errorResponse(error)
  }
}
