import { NextRequest, NextResponse } from "next/server";
import { getReviewsByUsername } from "@/services/review.service";

export async function GET(request: NextRequest, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const take = Number(request.nextUrl.searchParams.get("take") || "10");
  const skip = Number(request.nextUrl.searchParams.get("skip") || "0");

  const reviews = await getReviewsByUsername(username, take, skip);
  return NextResponse.json(reviews);
}
