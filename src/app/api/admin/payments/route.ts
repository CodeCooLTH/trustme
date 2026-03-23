import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { paginatedResponse, errorResponse } from '@/lib/api-response'
import { parsePagination } from '@/lib/utils'
import { PaymentService } from '@/services/payment.service'
import { UserRole } from '@prisma/client'

export async function GET(req: NextRequest) {
  try {
    await requireRole(UserRole.ADMIN)
    const pagination = parsePagination(req.nextUrl.searchParams)
    const { payments, total } = await PaymentService.listPending(pagination.page, pagination.limit)
    return paginatedResponse(payments, total, pagination.page, pagination.limit)
  } catch (error) {
    return errorResponse(error)
  }
}
