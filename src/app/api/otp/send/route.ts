import { NextRequest, NextResponse } from "next/server";
import * as v from "valibot";
import { SendOtpSchema } from "@/lib/validations";
import { storeOtp } from "@/lib/otp";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = v.safeParse(SendOtpSchema, body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { contact, type } = parsed.output;
  const otp = storeOtp(contact);

  // MVP: log OTP to console (replace with SMS/email gateway)
  console.log(`[OTP] ${type}:${contact} → ${otp}`);

  return NextResponse.json({ message: "OTP sent", contact });
}
