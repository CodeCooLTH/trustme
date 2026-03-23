import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

export async function GET(req: NextRequest) {
  try {
    await requireRole(UserRole.ADMIN)
    const settings = await prisma.systemSetting.findMany()
    const result: Record<string, any> = {}
    for (const s of settings) {
      try { result[s.key] = JSON.parse(s.value) } catch { result[s.key] = s.value }
    }
    return successResponse(result)
  } catch (error) {
    return errorResponse(error)
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireRole(UserRole.ADMIN)
    const body = await req.json()

    for (const [key, value] of Object.entries(body)) {
      const strValue = typeof value === 'string' ? value : JSON.stringify(value)
      await prisma.systemSetting.upsert({
        where: { key },
        update: { value: strValue },
        create: { key, value: strValue },
      })
    }

    return successResponse({ success: true })
  } catch (error) {
    return errorResponse(error)
  }
}
