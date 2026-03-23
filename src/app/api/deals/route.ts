import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { successResponse, paginatedResponse, errorResponse } from '@/lib/api-response'
import { parsePagination } from '@/lib/utils'
import { DealService } from '@/services/deal.service'
import { createDealSchema } from '@/lib/validations/deal.schema'
import { UserRole } from '@prisma/client'

export async function GET(req: NextRequest) {
  try {
    const user = await requireRole(UserRole.SELLER)
    const pagination = parsePagination(req.nextUrl.searchParams)
    const { deals, total } = await DealService.list(user.id, pagination)
    return paginatedResponse(deals, total, pagination.page, pagination.limit)
  } catch (error) {
    return errorResponse(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole(UserRole.SELLER)
    const body = await req.json()
    const input = createDealSchema.parse(body)
    const deal = await DealService.create(user.id, input)
    return successResponse(deal, 201)
  } catch (error) {
    return errorResponse(error)
  }
}
