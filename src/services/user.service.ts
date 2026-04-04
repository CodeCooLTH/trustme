import { prisma } from "@/lib/prisma";

export async function findOrCreateByPhone(phone: string, displayName?: string) {
  let user = await prisma.user.findUnique({ where: { phone } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        phone,
        displayName: displayName || `User_${phone.slice(-4)}`,
        username: `user_${Date.now()}`,
        authAccounts: {
          create: { provider: "PHONE", providerAccountId: phone },
        },
      },
    });
  }
  return user;
}

export async function findByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
    include: { shop: true, userBadges: { include: { badge: true } } },
  });
}

export async function updateProfile(userId: string, data: { displayName?: string; username?: string; avatar?: string }) {
  return prisma.user.update({ where: { id: userId }, data });
}

export async function linkBuyerHistory(userId: string, phone?: string, email?: string) {
  const conditions = [];
  if (phone) conditions.push({ buyerContact: phone });
  if (email) conditions.push({ buyerContact: email });
  if (conditions.length === 0) return;

  await prisma.order.updateMany({
    where: { buyerUserId: null, OR: conditions },
    data: { buyerUserId: userId },
  });

  await prisma.review.updateMany({
    where: { reviewerUserId: null, OR: conditions.map(c => ({ reviewerContact: c.buyerContact })) },
    data: { reviewerUserId: userId },
  });
}
