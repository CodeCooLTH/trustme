import { prisma } from "@/lib/prisma";
import { evaluateBadges } from "@/services/badge.service";
import { recalculateTrustScore } from "@/services/trust-score.service";

export async function createReview(orderToken: string, data: {
  rating: number;
  comment?: string;
  reviewerContact?: string;
  reviewerUserId?: string;
}) {
  const order = await prisma.order.findUnique({
    where: { publicToken: orderToken },
    include: { review: true, shop: true },
  });
  if (!order) throw new Error("Order not found");
  if (order.review) throw new Error("Review already exists for this order");

  const review = await prisma.review.create({
    data: {
      orderId: order.id,
      rating: data.rating,
      comment: data.comment,
      reviewerContact: data.reviewerContact,
      reviewerUserId: data.reviewerUserId,
    },
  });

  await evaluateBadges(order.shop.userId);
  await recalculateTrustScore(order.shop.userId);

  return review;
}

export async function getReviewsByShopUser(userId: string) {
  return prisma.review.findMany({
    where: { order: { shop: { userId } } },
    include: { order: { select: { publicToken: true, items: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getReviewsByUsername(username: string, take = 10, skip = 0) {
  return prisma.review.findMany({
    where: { order: { shop: { user: { username } } } },
    include: { order: { select: { publicToken: true, items: true } } },
    orderBy: { createdAt: "desc" },
    take,
    skip,
  });
}
