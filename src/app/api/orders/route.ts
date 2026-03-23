import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { paginatedResponse, errorResponse } from '@/lib/api-response'
import { parsePagination } from '@/lib/utils'
import { OrderService } from '@/services/order.service'

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth()
    const pagination = parsePagination(req.nextUrl.searchParams)
    const { orders, total } = await OrderService.listByUser(
      user.id,
      user.role,
      pagination
    )
    return paginatedResponse(orders, total, pagination.page, pagination.limit)
  } catch (error) {
    return errorResponse(error)
  }
}
