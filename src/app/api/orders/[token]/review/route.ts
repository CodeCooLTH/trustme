import { NextRequest, NextResponse } from "next/server";
import * as v from "valibot";
import { CreateReviewSchema } from "@/lib/validations";
import { createReview } from "@/services/review.service";

export async function POST(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const body = await request.json();
  const parsed = v.safeParse(CreateReviewSchema, body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  try {
    const review = await createReview(token, {
      ...parsed.output,
      reviewerContact: body.reviewerContact,
      reviewerUserId: body.reviewerUserId,
    });
    return NextResponse.json(review, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
