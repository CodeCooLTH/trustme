import { prisma } from "@/lib/prisma";

export async function linkHistoryToUser(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  const contacts: string[] = [];
  if (user.phone) contacts.push(user.phone);
  if (user.email) contacts.push(user.email);
  if (contacts.length === 0) return;

  await prisma.order.updateMany({
    where: { buyerUserId: null, buyerContact: { in: contacts } },
    data: { buyerUserId: userId },
  });

  await prisma.review.updateMany({
    where: { reviewerUserId: null, reviewerContact: { in: contacts } },
    data: { reviewerUserId: userId },
  });
}
