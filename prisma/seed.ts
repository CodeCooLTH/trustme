import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed default badges
  const badges = [
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

  for (const badge of badges) {
    const existing = await prisma.badge.findFirst({ where: { nameEN: badge.nameEN } });
    if (!existing) {
      await prisma.badge.create({ data: badge });
    }
  }
  console.log(`Seeded ${badges.length} badges`);

  // Seed admin user
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      displayName: "Admin",
      username: "admin",
      isAdmin: true,
      authAccounts: {
        create: { provider: "EMAIL", providerAccountId: "admin@safepay.co" },
      },
    },
  });
  console.log(`Seeded admin user: ${admin.id}`);

  // Seed test account — phone 0920791649 / OTP 123456 (bypass in src/lib/otp.ts)
  // Remove together with the OTP bypass before production.
  const testUser = await prisma.user.upsert({
    where: { username: "testuser" },
    update: {},
    create: {
      phone: "0920791649",
      displayName: "ผู้ใช้ทดสอบ",
      username: "testuser",
      trustScore: 50,
      authAccounts: {
        create: { provider: "PHONE", providerAccountId: "0920791649" },
      },
    },
  });
  console.log(`Seeded test user: ${testUser.id}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
