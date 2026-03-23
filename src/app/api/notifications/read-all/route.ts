import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { NotificationService } from '@/services/notification.service'

export async function PATCH(req: NextRequest) {
  try {
    const user = await requireAuth()
    await NotificationService.markAllRead(user.id)
    return successResponse({ success: true })
  } catch (error) {
    return errorResponse(error)
  }
}
