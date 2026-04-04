import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import * as v from "valibot";
import { CreateOrderSchema } from "@/lib/validations";
import { createOrder, getOrdersByShop, getOrdersByBuyer } from "@/services/order.service";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role"); // "seller" or "buyer"
  const status = searchParams.get("status") || undefined;

  if (role === "buyer") {
    const orders = await getOrdersByBuyer(userId);
    return NextResponse.json(orders);
  }

  // Default: seller orders
  const shop = await prisma.shop.findUnique({ where: { userId } });
  if (!shop) return NextResponse.json([]);

  const orders = await getOrdersByShop(shop.id, status);
  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const shop = await prisma.shop.findUnique({ where: { userId } });
  if (!shop) return NextResponse.json({ error: "No shop" }, { status: 404 });

  const body = await request.json();
  const parsed = v.safeParse(CreateOrderSchema, body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const order = await createOrder(shop.id, parsed.output);
  return NextResponse.json(order, { status: 201 });
}
