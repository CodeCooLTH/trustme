import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import * as v from "valibot";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CreateReviewSchema } from "@/lib/validations";
import { createReview } from "@/services/review.service";

export async function POST(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const body = await request.json();
  const parsed = v.safeParse(CreateReviewSchema, body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  // Logged-in buyer → link review to their user. Guest → fall back to order.buyerContact.
  const session = await getServerSession(authOptions);
  const reviewerUserId = session?.user ? (session.user as { id: string }).id : undefined;
  let reviewerContact: string | undefined;
  if (!reviewerUserId) {
    const order = await prisma.order.findUnique({
      where: { publicToken: token },
      select: { buyerContact: true },
    });
    reviewerContact = order?.buyerContact ?? undefined;
  }

  try {
    const review = await createReview(token, {
      ...parsed.output,
      reviewerContact,
      reviewerUserId,
    });
    return NextResponse.json(review, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
