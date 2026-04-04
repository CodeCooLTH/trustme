import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getPendingVerifications } from "@/services/verification.service";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const records = await getPendingVerifications();
  return NextResponse.json(records);
}
