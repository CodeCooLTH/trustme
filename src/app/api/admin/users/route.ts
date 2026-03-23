import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { paginatedResponse, errorResponse } from '@/lib/api-response'
import { parsePagination } from '@/lib/utils'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

export async function GET(req: NextRequest) {
  try {
    await requireRole(UserRole.ADMIN)
    const pagination = parsePagination(req.nextUrl.searchParams)
    const role = req.nextUrl.searchParams.get('role') as UserRole | null
    const skip = (pagination.page - 1) * pagination.limit

    const where = role ? { role } : {}

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true, name: true, email: true, avatar: true,
          role: true, points: true, isActive: true, createdAt: true,
          _count: { select: { deals: true, buyerOrders: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pagination.limit,
      }),
      prisma.user.count({ where }),
    ])

    return paginatedResponse(users, total, pagination.page, pagination.limit)
  } catch (error) {
    return errorResponse(error)
  }
}
