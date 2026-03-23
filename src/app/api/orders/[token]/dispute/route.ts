import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { DisputeService } from '@/services/dispute.service'
import { z } from 'zod'

const openDisputeSchema = z.object({
  reason: z.string().min(1, 'กรุณาระบุเหตุผล'),
  evidence: z.array(z.string()).default([]),
})

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const user = await requireAuth()
    const { token } = await params
    const body = await req.json()
    const { reason, evidence } = openDisputeSchema.parse(body)
    const dispute = await DisputeService.open(token, user.id, reason, evidence)
    return successResponse(dispute, 201)
  } catch (error) {
    return errorResponse(error)
  }
}
