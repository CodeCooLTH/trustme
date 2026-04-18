import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { reviewVerification } from "@/services/verification.service";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;

  // Self-review guard — admin ห้าม approve/reject verification ของตัวเอง
  const record = await prisma.verificationRecord.findUnique({
    where: { id },
    select: { userId: true },
  });
  if (!record) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (record.userId === admin.id) {
    return NextResponse.json(
      { error: "ไม่สามารถอนุมัติ/ปฏิเสธคำขอยืนยันตัวตนของตนเองได้" },
      { status: 403 },
    );
  }

  const body = await request.json();
  const updated = await reviewVerification(id, admin.id, body);
  return NextResponse.json(updated);
}
