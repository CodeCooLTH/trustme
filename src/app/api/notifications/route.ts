import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { parsePagination } from '@/lib/utils'
import { NotificationService } from '@/services/notification.service'

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth()
    const pagination = parsePagination(req.nextUrl.searchParams)
    const result = await NotificationService.listByUser(user.id, pagination.page, pagination.limit)
    return successResponse(result)
  } catch (error) {
    return errorResponse(error)
  }
}
