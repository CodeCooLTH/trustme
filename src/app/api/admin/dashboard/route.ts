import { NextRequest } from 'next/server'
import { requireRole } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { UserRole, OrderStatus } from '@prisma/client'

export async function GET(req: NextRequest) {
  try {
    await requireRole(UserRole.ADMIN)

    const [totalDeals, totalOrders, completedOrders, totalUsers, pendingPayments, openDisputes] = await Promise.all([
      prisma.deal.count(),
      prisma.order.count(),
      prisma.order.count({ where: { status: OrderStatus.COMPLETED } }),
      prisma.user.count(),
      prisma.payment.count({ where: { status: 'PENDING' } }),
      prisma.dispute.count({ where: { status: 'OPEN' } }),
    ])

    const gmvResult = await prisma.order.aggregate({
      where: { status: { in: [OrderStatus.COMPLETED, OrderStatus.RELEASED] } },
      _sum: { amount: true },
    })

    const gmv = gmvResult._sum.amount || 0
    const successRate = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0

    return successResponse({
      totalDeals,
      totalOrders,
      completedOrders,
      totalUsers,
      pendingPayments,
      openDisputes,
      gmv,
      successRate,
    })
  } catch (error) {
    return errorResponse(error)
  }
}
