import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { OrderService } from '@/services/order.service'
import { UserRole } from '@prisma/client'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole(UserRole.SELLER)
    const { id } = await params
    const order = await OrderService.generateLink(id, user.id)

    const orderUrl = `${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.publicToken}`

    return successResponse({ order, orderUrl }, 201)
  } catch (error) {
    return errorResponse(error)
  }
}
