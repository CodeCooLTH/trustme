import { prisma } from '@/lib/prisma'

export class PointService {
  static async awardDealCompleted(orderId: string, buyerId: string, sellerId: string) {
    const POINTS_PER_DEAL = 10

    await prisma.$transaction([
      prisma.pointHistory.create({
        data: {
          userId: buyerId,
          orderId,
          amount: POINTS_PER_DEAL,
          type: 'DEAL_COMPLETED',
        },
      }),
      prisma.pointHistory.create({
        data: {
          userId: sellerId,
          orderId,
          amount: POINTS_PER_DEAL,
          type: 'DEAL_COMPLETED',
        },
      }),
      prisma.user.update({
        where: { id: buyerId },
        data: { points: { increment: POINTS_PER_DEAL } },
      }),
      prisma.user.update({
        where: { id: sellerId },
        data: { points: { increment: POINTS_PER_DEAL } },
      }),
    ])
  }
}
