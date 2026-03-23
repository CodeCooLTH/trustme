import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { saveFile } from '@/lib/upload'

export async function POST(req: NextRequest) {
  try {
    await requireAuth()
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return errorResponse(new Error('กรุณาเลือกไฟล์'))
    }

    const fileId = await saveFile(file)
    return successResponse({ fileId }, 201)
  } catch (error) {
    return errorResponse(error)
  }
}
