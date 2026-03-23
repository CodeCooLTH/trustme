import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { paginatedResponse, errorResponse } from '@/lib/api-response'
import { parsePagination } from '@/lib/utils'
import { prisma } from '@/lib/prisma'
import { UserRole, DealStatus } from '@prisma/client'

export async function GET(req: NextRequest) {
  try {
    await requireRole(UserRole.ADMIN)
    const pagination = parsePagination(req.nextUrl.searchParams)
    const status = req.nextUrl.searchParams.get('status') as DealStatus | null
    const skip = (pagination.page - 1) * pagination.limit

    const where = status ? { status } : {}

    const [deals, total] = await Promise.all([
      prisma.deal.findMany({
        where,
        include: {
          seller: { select: { name: true, avatar: true } },
          _count: { select: { orders: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pagination.limit,
      }),
      prisma.deal.count({ where }),
    ])

    return paginatedResponse(deals, total, pagination.page, pagination.limit)
  } catch (error) {
    return errorResponse(error)
  }
}
