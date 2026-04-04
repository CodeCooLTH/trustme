import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const badges = await prisma.badge.findMany({
    include: { _count: { select: { userBadges: true } } },
    orderBy: { type: "asc" },
  });
  return NextResponse.json(badges);
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const badge = await prisma.badge.create({ data: body });
  return NextResponse.json(badge, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const { id, ...data } = body;
  const badge = await prisma.badge.update({ where: { id }, data });
  return NextResponse.json(badge);
}
