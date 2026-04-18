import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import * as v from "valibot";
import { authOptions } from "@/lib/auth";
import { ConfirmOrderSchema } from "@/lib/validations";
import { confirmOrder } from "@/services/order.service";

// POST /api/orders/[token]/confirm
// Body: { contact: string } (UX ใหม่ 2026-04-18 — ไม่ต้องใช้ OTP แล้ว
// phone match ผ่าน lock screen ก่อน, endpoint นี้ถูกเรียกจาก detail page)
// Service confirmOrder re-validate เบอร์ match กับ order.buyerContact เป็นชั้นที่สอง
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  const body = await request.json();
  const parsed = v.safeParse(ConfirmOrderSchema, body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { contact } = parsed.output;

  const session = await getServerSession(authOptions);
  const buyerUserId = session?.user ? (session.user as { id: string }).id : undefined;

  try {
    const order = await confirmOrder(token, contact, buyerUserId);
    return NextResponse.json(order);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
