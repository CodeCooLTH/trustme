import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { OrderService } from '@/services/order.service'
import { confirmReceiveSchema } from '@/lib/validations/order.schema'
import { UserRole } from '@prisma/client'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const user = await requireRole(UserRole.BUYER)
    const { token } = await params
    const body = await req.json()
    const { photos } = confirmReceiveSchema.parse(body)
    const order = await OrderService.confirmReceive(token, user.id, photos)
    return successResponse(order)
  } catch (error) {
    return errorResponse(error)
  }
}
