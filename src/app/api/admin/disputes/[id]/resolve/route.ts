import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { DisputeService } from '@/services/dispute.service'
import { UserRole } from '@prisma/client'
import { z } from 'zod'

const resolveSchema = z.object({
  decision: z.enum(['buyer', 'seller']),
  resolution: z.string().min(1, 'กรุณาระบุเหตุผลการตัดสิน'),
})

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole(UserRole.ADMIN)
    const { id } = await params
    const body = await req.json()
    const { decision, resolution } = resolveSchema.parse(body)
    const result = await DisputeService.resolve(id, user.id, decision, resolution)
    return successResponse(result)
  } catch (error) {
    return errorResponse(error)
  }
}
