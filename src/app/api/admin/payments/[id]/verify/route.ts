import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { PaymentService } from '@/services/payment.service'
import { UserRole } from '@prisma/client'
import { z } from 'zod'

const verifySchema = z.object({
  action: z.enum(['approve', 'reject']),
  rejectedReason: z.string().optional(),
})

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole(UserRole.ADMIN)
    const { id } = await params
    const body = await req.json()
    const { action, rejectedReason } = verifySchema.parse(body)
    const result = await PaymentService.adminVerify(id, user.id, action, rejectedReason)
    return successResponse(result)
  } catch (error) {
    return errorResponse(error)
  }
}
