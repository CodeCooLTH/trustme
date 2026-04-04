import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const status = request.nextUrl.searchParams.get("status") || undefined;
  const orders = await prisma.order.findMany({
    where: status ? { status } : {},
    include: { shop: { include: { user: true } }, items: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json(orders);
}
