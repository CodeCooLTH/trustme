import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { ShipmentService } from '@/services/shipment.service'
import { UserRole } from '@prisma/client'
import { z } from 'zod'

const addTrackingSchema = z.object({
  provider: z.string().min(1),
  trackingNo: z.string().min(1),
})

const updateTrackingSchema = z.object({
  trackingNo: z.string().min(1).optional(),
  status: z.enum(['SHIPPED', 'IN_TRANSIT', 'DELIVERED']).optional(),
})

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const user = await requireRole(UserRole.SELLER)
    const { token } = await params
    const body = await req.json()
    const { provider, trackingNo } = addTrackingSchema.parse(body)
    const shipment = await ShipmentService.addTracking(token, user.id, provider, trackingNo)
    return successResponse(shipment, 201)
  } catch (error) {
    return errorResponse(error)
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const user = await requireRole(UserRole.SELLER)
    const { token } = await params
    const body = await req.json()
    const data = updateTrackingSchema.parse(body)
    const shipment = await ShipmentService.updateTracking(token, user.id, data as any)
    return successResponse(shipment)
  } catch (error) {
    return errorResponse(error)
  }
}
