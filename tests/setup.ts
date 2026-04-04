import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function cleanDatabase() {
  await prisma.$transaction([
    prisma.trustScoreHistory.deleteMany(),
    prisma.userBadge.deleteMany(),
    prisma.review.deleteMany(),
    prisma.shipmentTracking.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),
    prisma.product.deleteMany(),
    prisma.shop.deleteMany(),
    prisma.verificationRecord.deleteMany(),
    prisma.badge.deleteMany(),
    prisma.authAccount.deleteMany(),
    prisma.user.deleteMany(),
  ]);
}
