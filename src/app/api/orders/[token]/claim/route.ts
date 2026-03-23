import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { OrderService } from '@/services/order.service'
import { UserRole } from '@prisma/client'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const user = await requireRole(UserRole.BUYER)
    const { token } = await params
    const order = await OrderService.claim(token, user.id)
    return successResponse(order)
  } catch (error) {
    return errorResponse(error)
  }
}
