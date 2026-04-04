import { NextRequest, NextResponse } from "next/server";
import { getOrderByToken } from "@/services/order.service";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const order = await getOrderByToken(token);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  return NextResponse.json(order);
}
