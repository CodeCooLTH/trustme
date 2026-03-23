import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { NotificationService } from '@/services/notification.service'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth()
    const { id } = await params
    await NotificationService.markRead(id, user.id)
    return successResponse({ success: true })
  } catch (error) {
    return errorResponse(error)
  }
}
