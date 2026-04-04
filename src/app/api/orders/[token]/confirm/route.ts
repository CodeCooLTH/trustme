import { NextRequest, NextResponse } from "next/server";
import * as v from "valibot";
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

  const { contact, contactType, otp } = parsed.output;

  const otpValid = verifyOtp(contact, otp);
  if (!otpValid) return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });

  try {
    const order = await confirmOrder(token, contact);
    return NextResponse.json(order);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
