import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import * as v from "valibot";
import { ShipOrderSchema } from "@/lib/validations";
import { shipOrder } from "@/services/order.service";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Verify the seller owns this order
  const userId = (session.user as any).id;
  const order = await prisma.order.findUnique({ where: { publicToken: token }, include: { shop: true } });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if (order.shop.userId !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const parsed = v.safeParse(ShipOrderSchema, body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  try {
    const updated = await shipOrder(token, parsed.output);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
