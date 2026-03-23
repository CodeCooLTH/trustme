import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { DisputeService } from '@/services/dispute.service'
import { z } from 'zod'

const messageSchema = z.object({
  message: z.string().min(1),
  attachments: z.array(z.string()).default([]),
})

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth()
    const { id } = await params
    const body = await req.json()
    const { message, attachments } = messageSchema.parse(body)
    const msg = await DisputeService.addMessage(id, user.id, message, attachments)
    return successResponse(msg, 201)
  } catch (error) {
    return errorResponse(error)
  }
}
