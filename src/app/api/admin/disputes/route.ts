import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { paginatedResponse, errorResponse } from '@/lib/api-response'
import { parsePagination } from '@/lib/utils'
import { DisputeService } from '@/services/dispute.service'
import { UserRole } from '@prisma/client'

export async function GET(req: NextRequest) {
  try {
    await requireRole(UserRole.ADMIN)
    const pagination = parsePagination(req.nextUrl.searchParams)
    const { disputes, total } = await DisputeService.list(pagination.page, pagination.limit)
    return paginatedResponse(disputes, total, pagination.page, pagination.limit)
  } catch (error) {
    return errorResponse(error)
  }
}
