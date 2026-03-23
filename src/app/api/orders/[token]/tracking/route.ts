import { NextRequest } from 'next/server'
import { successResponse, errorResponse } from '@/lib/api-response'
import { ShipmentService } from '@/services/shipment.service'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params
    const shipment = await ShipmentService.getTracking(token)
    return successResponse(shipment)
  } catch (error) {
    return errorResponse(error)
  }
}
