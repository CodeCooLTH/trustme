import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { reviewVerification } from "@/services/verification.service";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await request.json();
  const record = await reviewVerification(id, admin.id, body);
  return NextResponse.json(record);
}
