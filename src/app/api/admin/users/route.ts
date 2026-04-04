import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const search = request.nextUrl.searchParams.get("search") || "";
  const users = await prisma.user.findMany({
    where: search ? {
      OR: [
        { displayName: { contains: search, mode: "insensitive" } },
        { username: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    } : {},
    include: { shop: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json(users);
}
