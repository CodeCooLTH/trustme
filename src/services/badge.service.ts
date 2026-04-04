import { prisma } from "@/lib/prisma";
import { recalculateTrustScore } from "@/services/trust-score.service";

const DEFAULT_BADGES = [
  { name: "\u0E40\u0E1B\u0E34\u0E14\u0E2B\u0E19\u0E49\u0E32\u0E23\u0E49\u0E32\u0E19", nameEN: "First Sale", icon: "\uD83C\uDFEA", type: "ACHIEVEMENT", criteria: { type: "FIRST_ORDER" } },
  { name: "\u0E23\u0E49\u0E32\u0E19\u0E04\u0E49\u0E32\u0E22\u0E2D\u0E14\u0E19\u0E34\u0E22\u0E21", nameEN: "Trusted Seller 50", icon: "\u2B50", type: "ACHIEVEMENT", criteria: { type: "ORDER_COUNT", count: 50 } },
  { name: "\u0E23\u0E49\u0E2D\u0E22\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C", nameEN: "Century Club", icon: "\uD83D\uDCAF", type: "ACHIEVEMENT", criteria: { type: "ORDER_COUNT", count: 100 } },
  { name: "\u0E23\u0E49\u0E32\u0E19\u0E04\u0E30\u0E41\u0E19\u0E19\u0E40\u0E15\u0E47\u0E21", nameEN: "Perfect Rating", icon: "\uD83D\uDC8E", type: "ACHIEVEMENT", criteria: { type: "PERFECT_RATING", minReviews: 10 } },
  { name: "\u0E23\u0E49\u0E32\u0E19\u0E04\u0E30\u0E41\u0E19\u0E19\u0E2A\u0E39\u0E07", nameEN: "Highly Rated", icon: "\uD83C\uDF1F", type: "ACHIEVEMENT", criteria: { type: "HIGH_RATING", minRating: 4.8, minReviews: 20 } },
  { name: "\u0E44\u0E23\u0E49\u0E02\u0E49\u0E2D\u0E23\u0E49\u0E2D\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19", nameEN: "Zero Complaint", icon: "\uD83D\uDEE1\uFE0F", type: "ACHIEVEMENT", criteria: { type: "ZERO_COMPLAINT", minOrders: 50 } },
  { name: "\u0E23\u0E49\u0E32\u0E19\u0E04\u0E49\u0E32\u0E40\u0E01\u0E48\u0E32\u0E41\u0E01\u0E48", nameEN: "Veteran", icon: "\uD83C\uDFC6", type: "ACHIEVEMENT", criteria: { type: "VETERAN", minDays: 365 } },
  { name: "\u0E08\u0E31\u0E14\u0E2A\u0E48\u0E07\u0E2A\u0E32\u0E22\u0E1F\u0E49\u0E32", nameEN: "Speed Demon", icon: "\u26A1", type: "ACHIEVEMENT", criteria: { type: "FAST_SHIPPING", maxHours: 24, minOrders: 20 } },
  { name: "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19", nameEN: "Fully Verified", icon: "\u2705", type: "VERIFICATION", criteria: { type: "FULL_VERIFICATION" } },
  { name: "\u0E02\u0E27\u0E31\u0E0D\u0E43\u0E08\u0E0A\u0E38\u0E21\u0E0A\u0E19", nameEN: "Community Favorite", icon: "\u2764\uFE0F", type: "ACHIEVEMENT", criteria: { type: "UNIQUE_REVIEWERS", count: 50 } },
];

export async function seedDefaultBadges() {
  for (const badge of DEFAULT_BADGES) {
    const existing = await prisma.badge.findFirst({ where: { nameEN: badge.nameEN } });
    if (!existing) {
      await prisma.badge.create({ data: badge });
    }
  }
}

async function awardBadge(userId: string, badgeNameEN: string) {
  const badge = await prisma.badge.findFirst({ where: { nameEN: badgeNameEN } });
  if (!badge) return;

  await prisma.userBadge.upsert({
    where: { userId_badgeId: { userId, badgeId: badge.id } },
    update: {},
    create: { userId, badgeId: badge.id },
  });
}

async function getShopForUser(userId: string) {
  return prisma.shop.findUnique({ where: { userId } });
}

async function getCompletedOrderCount(shopId: string): Promise<number> {
  return prisma.order.count({ where: { shopId, status: "COMPLETED" } });
}

async function getCancelledOrderCount(shopId: string): Promise<number> {
  return prisma.order.count({ where: { shopId, status: "CANCELLED" } });
}

async function checkFirstSale(userId: string): Promise<boolean> {
  const shop = await getShopForUser(userId);
  if (!shop) return false;
  const count = await getCompletedOrderCount(shop.id);
  return count >= 1;
}

async function checkTrustedSeller50(userId: string): Promise<boolean> {
  const shop = await getShopForUser(userId);
  if (!shop) return false;
  const count = await getCompletedOrderCount(shop.id);
  return count >= 50;
}

async function checkCenturyClub(userId: string): Promise<boolean> {
  const shop = await getShopForUser(userId);
  if (!shop) return false;
  const count = await getCompletedOrderCount(shop.id);
  return count >= 100;
}

async function checkPerfectRating(userId: string): Promise<boolean> {
  const shop = await getShopForUser(userId);
  if (!shop) return false;
  const reviews = await prisma.review.findMany({
    where: { order: { shopId: shop.id } },
    select: { rating: true },
  });
  if (reviews.length < 10) return false;
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return avg === 5.0;
}

async function checkHighlyRated(userId: string): Promise<boolean> {
  const shop = await getShopForUser(userId);
  if (!shop) return false;
  const reviews = await prisma.review.findMany({
    where: { order: { shopId: shop.id } },
    select: { rating: true },
  });
  if (reviews.length < 20) return false;
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return avg >= 4.8;
}

async function checkZeroComplaint(userId: string): Promise<boolean> {
  const shop = await getShopForUser(userId);
  if (!shop) return false;
  const completed = await getCompletedOrderCount(shop.id);
  if (completed < 50) return false;
  const cancelled = await getCancelledOrderCount(shop.id);
  return cancelled === 0;
}

async function checkVeteran(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return false;
  const daysOld = (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24);
  if (daysOld < 365) return false;

  // Must have an order in the last 30 days
  const shop = await getShopForUser(userId);
  if (!shop) return false;
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const recentOrder = await prisma.order.findFirst({
    where: { shopId: shop.id, status: "COMPLETED", updatedAt: { gte: thirtyDaysAgo } },
  });
  return !!recentOrder;
}

async function checkSpeedDemon(userId: string): Promise<boolean> {
  const shop = await getShopForUser(userId);
  if (!shop) return false;

  const ordersWithShipment = await prisma.order.findMany({
    where: { shopId: shop.id, status: "COMPLETED", shipmentTracking: { isNot: null } },
    include: { shipmentTracking: true },
  });
  if (ordersWithShipment.length < 20) return false;

  // Calculate average time from order creation (as proxy for confirmed) to shipment creation
  let totalHours = 0;
  for (const order of ordersWithShipment) {
    if (!order.shipmentTracking) continue;
    const diffMs = order.shipmentTracking.createdAt.getTime() - order.createdAt.getTime();
    totalHours += diffMs / (1000 * 60 * 60);
  }
  const avgHours = totalHours / ordersWithShipment.length;
  return avgHours <= 24;
}

async function checkFullyVerified(userId: string): Promise<boolean> {
  const approved = await prisma.verificationRecord.findMany({
    where: { userId, status: "APPROVED" },
    select: { level: true },
  });
  const levels = new Set(approved.map((v) => v.level));
  return levels.has(1) && levels.has(2) && levels.has(3);
}

async function checkCommunityFavorite(userId: string): Promise<boolean> {
  const shop = await getShopForUser(userId);
  if (!shop) return false;

  const reviews = await prisma.review.findMany({
    where: { order: { shopId: shop.id }, reviewerUserId: { not: null } },
    select: { reviewerUserId: true },
  });
  const uniqueReviewers = new Set(reviews.map((r) => r.reviewerUserId));
  return uniqueReviewers.size >= 50;
}

const BADGE_CHECKS: Array<{ nameEN: string; check: (userId: string) => Promise<boolean> }> = [
  { nameEN: "First Sale", check: checkFirstSale },
  { nameEN: "Trusted Seller 50", check: checkTrustedSeller50 },
  { nameEN: "Century Club", check: checkCenturyClub },
  { nameEN: "Perfect Rating", check: checkPerfectRating },
  { nameEN: "Highly Rated", check: checkHighlyRated },
  { nameEN: "Zero Complaint", check: checkZeroComplaint },
  { nameEN: "Veteran", check: checkVeteran },
  { nameEN: "Speed Demon", check: checkSpeedDemon },
  { nameEN: "Fully Verified", check: checkFullyVerified },
  { nameEN: "Community Favorite", check: checkCommunityFavorite },
];

export async function evaluateBadges(userId: string): Promise<void> {
  for (const { nameEN, check } of BADGE_CHECKS) {
    const earned = await check(userId);
    if (earned) {
      await awardBadge(userId, nameEN);
    }
  }

  await recalculateTrustScore(userId);
}
