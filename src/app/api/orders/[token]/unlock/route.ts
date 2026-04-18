import { NextRequest, NextResponse } from "next/server";
import * as v from "valibot";
import { UnlockOrderSchema } from "@/lib/validations";
import { checkOrderPhone } from "@/services/order.service";

// POST /api/orders/[token]/unlock
// Body: { phone: string (^0[0-9]{9}$) }
// Return:
//   200 { ok: true } — phone ตรงกับ order (หรือ first-time unlock ได้)
//   403 { error } — phone ไม่ตรง
//   400 — invalid input
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const body = await request.json();
  const parsed = v.safeParse(UnlockOrderSchema, body);
  if (!parsed.success) {
    return NextResponse.json({ error: "รูปแบบเบอร์ไม่ถูกต้อง" }, { status: 400 });
  }
  const ok = await checkOrderPhone(token, parsed.output.phone);
  if (!ok) {
    return NextResponse.json(
      { error: "เบอร์นี้ไม่ตรงกับคำสั่งซื้อ" },
      { status: 403 },
    );
  }
  return NextResponse.json({ ok: true });
}
