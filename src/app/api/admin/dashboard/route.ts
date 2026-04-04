import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const [totalUsers, totalShops, totalOrders, pendingVerifications, avgTrustScore] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { isShop: true } }),
    prisma.order.count(),
    prisma.verificationRecord.count({ where: { status: "PENDING" } }),
    prisma.user.aggregate({ _avg: { trustScore: true } }),
  ]);

  return NextResponse.json({
    totalUsers,
    totalShops,
    totalOrders,
    pendingVerifications,
    avgTrustScore: Math.round(avgTrustScore._avg.trustScore || 0),
  });
}
