import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Addr = {
  name: string; phone: string; line1: string; line2?: string;
  district: string; amphoe: string; province: string; postalCode: string; note?: string;
}

const BKK_ADDR: Addr = {
  name: 'สมชาย ใจดี', phone: '0812345678',
  line1: '99/123 ถนนสุขุมวิท', line2: 'คอนโด Example Residence ห้อง 1505',
  district: 'คลองเตย', amphoe: 'คลองเตย', province: 'กรุงเทพมหานคร', postalCode: '10110',
  note: 'ฝากไว้กับ รปภ. ได้ครับ',
}
const UPCOUNTRY_ADDR: Addr = {
  name: 'วิภา สุวรรณ', phone: '0823456789',
  line1: '45 หมู่ 7 บ้านสวน',
  district: 'แม่เหียะ', amphoe: 'เมืองเชียงใหม่', province: 'เชียงใหม่', postalCode: '50100',
}
const SUBURB_ADDR: Addr = {
  name: 'ธีรพงษ์ รักษ์ดี', phone: '0834567890',
  line1: '222/34 หมู่บ้านเอ็มเมอรัลด์',
  district: 'บางบอน', amphoe: 'บางบอน', province: 'กรุงเทพมหานคร', postalCode: '10150',
}
const PHYSICAL_ADDRS: Addr[] = [BKK_ADDR, UPCOUNTRY_ADDR, SUBURB_ADDR];

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

  // Seed mock data for the test user — skip if already seeded (idempotent)
  const existingShop = await prisma.shop.findUnique({
    where: { userId: testUser.id },
  });
  if (!existingShop) {
    const shop = await prisma.shop.create({
      data: {
        userId: testUser.id,
        shopName: "BT Premium Auto Xeon - สาขาสุขสวัสดิ์",
        description:
          "ร้านทำไฟหน้ารถยนต์ครบวงจร รับอัพเกรด ซ่อมแซม ติดตั้งไฟซีนอน LED โปรเจคเตอร์ เดย์ไลท์ ทุกรุ่น",
        category: "ยานยนต์",
        address: "สาขาสุขสวัสดิ์ กรุงเทพมหานคร",
        businessType: "COMPANY",
      },
    });

    const products = await Promise.all(
      [
        { name: "หลอดไฟซีนอน HID 6000K (คู่)", price: 2500, type: "PHYSICAL", description: "หลอดไฟซีนอน แสงขาว 6000K รับประกัน 1 ปี ใช้ได้ H1/H4/H7/H11/9005/9006" },
        { name: "ชุด LED Headlight H4/H7 (คู่)", price: 3200, type: "PHYSICAL", description: "หลอด LED headlight ความสว่างสูง ระบายความร้อนด้วยพัดลม รับประกัน 2 ปี" },
        { name: "ไฟเดย์ไลท์ DRL LED (คู่)", price: 1800, type: "PHYSICAL", description: "ไฟ Daytime Running Light LED ติดตั้งง่าย รับประกัน 1 ปี" },
        { name: "บัลลาสซีนอน Slim Ballast (คู่)", price: 1500, type: "PHYSICAL", description: "บัลลาสไฟซีนอน slim 35W กันน้ำ IP67 รับประกัน 1 ปี" },
        { name: "โคมไฟหน้า Projector Bi-Xenon", price: 8900, type: "PHYSICAL", description: "โคมไฟหน้าโปรเจคเตอร์ Bi-Xenon พร้อม shroud angle eye สำหรับรถทุกรุ่น" },
        { name: "บริการติดตั้งไฟซีนอน", price: 800, type: "SERVICE", description: "บริการติดตั้งชุดไฟซีนอน HID ที่ร้าน ใช้เวลา 30-45 นาที" },
        { name: "บริการโมไฟหน้ารถ Projector", price: 3500, type: "SERVICE", description: "บริการโมไฟหน้าใส่โคมโปรเจคเตอร์ พร้อมงานประกอบ ใช้เวลา 1-2 วัน" },
        { name: "บริการซ่อมโคมไฟหน้าเบลอ/ขุ่น", price: 1200, type: "SERVICE", description: "ขัดและเคลือบโคมไฟหน้ารถที่เบลอหรือขุ่น คืนความใส เหมือนใหม่ ใช้เวลา 1-2 ชม." },
      ].map((p) =>
        prisma.product.create({
          data: { shopId: shop.id, ...p },
        }),
      ),
    );

    const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000);

    const orderRecipes: Array<{
      status: string;
      type: string;
      buyerContact: string;
      productIdx: number;
      qty: number;
      createdDaysAgo: number;
      addr?: Addr;
      tracking?: { provider: string; trackingNo: string };
      review?: { rating: number; comment: string; reviewerContact: string };
    }> = [
      { status: "CREATED", type: "PHYSICAL", buyerContact: "0812345678", productIdx: 0, qty: 1, createdDaysAgo: 0, addr: BKK_ADDR },
      { status: "CREATED", type: "SERVICE", buyerContact: "0823456789", productIdx: 7, qty: 1, createdDaysAgo: 1 },
      { status: "CONFIRMED", type: "PHYSICAL", buyerContact: "0834567890", productIdx: 1, qty: 1, createdDaysAgo: 2, addr: SUBURB_ADDR },
      { status: "CONFIRMED", type: "SERVICE", buyerContact: "0845678901", productIdx: 6, qty: 1, createdDaysAgo: 3 },
      {
        status: "SHIPPED",
        type: "PHYSICAL",
        buyerContact: "0856789012",
        productIdx: 2,
        qty: 1,
        createdDaysAgo: 4,
        addr: UPCOUNTRY_ADDR,
        tracking: { provider: "Kerry Express", trackingNo: "KEX123456789TH" },
      },
      {
        status: "SHIPPED",
        type: "PHYSICAL",
        buyerContact: "0867890123",
        productIdx: 4,
        qty: 1,
        createdDaysAgo: 5,
        addr: BKK_ADDR,
        tracking: { provider: "Flash Express", trackingNo: "FL987654321TH" },
      },
      {
        status: "COMPLETED",
        type: "PHYSICAL",
        buyerContact: "0878901234",
        productIdx: 1,
        qty: 1,
        createdDaysAgo: 7,
        addr: SUBURB_ADDR,
        tracking: { provider: "Thailand Post", trackingNo: "EY112233445TH" },
        review: { rating: 5, comment: "ไฟสว่างมาก ติดตั้งง่าย ร้านบริการดี!", reviewerContact: "0878901234" },
      },
      {
        status: "COMPLETED",
        type: "SERVICE",
        buyerContact: "0889012345",
        productIdx: 5,
        qty: 1,
        createdDaysAgo: 9,
        review: { rating: 5, comment: "ทีมช่างชำนาญ ติดตั้งเร็ว แนะนำเลย", reviewerContact: "0889012345" },
      },
      {
        status: "COMPLETED",
        type: "SERVICE",
        buyerContact: "0892345678",
        productIdx: 7,
        qty: 1,
        createdDaysAgo: 10,
        review: { rating: 4, comment: "โคมใสขึ้นเยอะ รอดูว่าจะอยู่ได้นานแค่ไหน", reviewerContact: "0892345678" },
      },
      { status: "CANCELLED", type: "PHYSICAL", buyerContact: "0890123456", productIdx: 3, qty: 2, createdDaysAgo: 1, addr: UPCOUNTRY_ADDR },
    ];

    let orderCount = 0;
    for (const r of orderRecipes) {
      const product = products[r.productIdx];
      const total = Number(product.price) * r.qty;
      const created = daysAgo(r.createdDaysAgo);
      const order = await prisma.order.create({
        data: {
          shopId: shop.id,
          type: r.type,
          status: r.status,
          buyerContact: r.buyerContact,
          totalAmount: total,
          shippingAddress: r.type === 'PHYSICAL' && r.addr ? (r.addr as object) : undefined,
          createdAt: created,
          updatedAt: created,
          items: {
            create: {
              productId: product.id,
              name: product.name,
              description: product.description,
              qty: r.qty,
              price: product.price,
            },
          },
        },
      });
      if (r.tracking) {
        await prisma.shipmentTracking.create({
          data: {
            orderId: order.id,
            provider: r.tracking.provider,
            trackingNo: r.tracking.trackingNo,
            status: r.status === "SHIPPED" ? "SHIPPED" : "DELIVERED",
          },
        });
      }
      if (r.review) {
        await prisma.review.create({
          data: {
            orderId: order.id,
            rating: r.review.rating,
            comment: r.review.comment,
            reviewerContact: r.review.reviewerContact,
          },
        });
      }
      orderCount++;
    }
    console.log(
      `Seeded mock data: shop "${shop.shopName}" + ${products.length} products + ${orderCount} orders`,
    );
  } else {
    console.log(`Mock data already present for test user — skipping`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
