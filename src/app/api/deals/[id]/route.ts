import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { DealService } from '@/services/deal.service'
import { updateDealSchema } from '@/lib/validations/deal.schema'
import { UserRole } from '@prisma/client'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole(UserRole.SELLER)
    const { id } = await params
    const deal = await DealService.getById(id, user.id)
    return successResponse(deal)
  } catch (error) {
    return errorResponse(error)
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole(UserRole.SELLER)
    const { id } = await params
    const body = await req.json()
    const input = updateDealSchema.parse(body)
    const deal = await DealService.update(id, user.id, input)
    return successResponse(deal)
  } catch (error) {
    return errorResponse(error)
  }
}
