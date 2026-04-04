import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function cleanDatabase() {
  // Delete in dependency order - sequential to avoid FK constraint violations
  await prisma.trustScoreHistory.deleteMany();
  await prisma.userBadge.deleteMany();
  await prisma.review.deleteMany();
  await prisma.shipmentTracking.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.shop.deleteMany();
  await prisma.verificationRecord.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.authAccount.deleteMany();
  await prisma.user.deleteMany();
}
