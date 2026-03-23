import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { DisputeService } from '@/services/dispute.service'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth()
    const { id } = await params
    const dispute = await DisputeService.getById(id)
    return successResponse(dispute)
  } catch (error) {
    return errorResponse(error)
  }
}
