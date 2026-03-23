import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { PaymentService } from '@/services/payment.service'
import { UserRole } from '@prisma/client'
import { AppError } from '@/lib/errors'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const user = await requireRole(UserRole.BUYER)
    const { token } = await params

    const idempotencyKey = req.headers.get('Idempotency-Key')
    if (!idempotencyKey) {
      throw new AppError('ต้องส่ง Idempotency-Key header', 400)
    }

    const body = await req.json()
    const { slipImage } = body

    if (!slipImage) {
      throw new AppError('กรุณาอัพโหลดสลิป', 400)
    }

    const payment = await PaymentService.uploadSlip(token, user.id, slipImage, idempotencyKey)
    return successResponse(payment, 201)
  } catch (error) {
    return errorResponse(error)
  }
}
