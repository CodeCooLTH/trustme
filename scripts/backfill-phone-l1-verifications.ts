#!/usr/bin/env tsx
/**
 * Backfill PHONE_OTP L1 VerificationRecord สำหรับ user ที่สมัครก่อนจะ fix
 * BUG-AUTH-L1-MISSING (commit 1952a22 era → tracked ใน QA-TEAM-1 report 2026-04-18).
 *
 * รันครั้งเดียว หลัง deploy fix:
 *   npx tsx scripts/backfill-phone-l1-verifications.ts
 *
 * ใช้ .env.local เป็น default → ต้อง source ก่อนรันบน prod ถ้าต้องการยิง prod DB.
 */
import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  try {
    // user ที่มี phone แต่ไม่มี VerificationRecord L1 APPROVED
    const users = await prisma.user.findMany({
      where: {
        phone: { not: null },
        verifications: {
          none: {
            level: 1,
            status: "APPROVED",
          },
        },
      },
      select: { id: true, phone: true, username: true, trustScore: true },
    });

    console.log(`พบผู้ใช้ที่ต้อง backfill ${users.length} คน`);

    let created = 0;
    for (const u of users) {
      await prisma.verificationRecord.create({
        data: {
          userId: u.id,
          type: "PHONE_OTP",
          level: 1,
          status: "APPROVED",
          reviewedAt: new Date(),
        },
      });
      created += 1;
      console.log(`  ✔ ${u.username} (phone=${u.phone}, trustScore=${u.trustScore})`);
    }

    console.log(`\nสร้าง VerificationRecord L1 APPROVED เสร็จ ${created} records`);
    console.log(
      "หมายเหตุ: trust score ยังเป็นค่าเดิม — ถ้าต้องการ recalc ให้รัน recalculateTrustScore() ต่อ",
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
