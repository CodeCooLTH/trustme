import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import * as v from "valibot";
import { authOptions } from "@/lib/auth";
import { ConfirmOrderSchema } from "@/lib/validations";
import { verifyOtp } from "@/lib/otp";
import { confirmOrder } from "@/services/order.service";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  const body = await request.json();
  const parsed = v.safeParse(ConfirmOrderSchema, body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { contact, otp } = parsed.output;

  const otpValid = verifyOtp(contact, otp);
  if (!otpValid) return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });

  const session = await getServerSession(authOptions);
  const buyerUserId = session?.user ? (session.user as { id: string }).id : undefined;

  try {
    const order = await confirmOrder(token, contact, buyerUserId);
    return NextResponse.json(order);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
