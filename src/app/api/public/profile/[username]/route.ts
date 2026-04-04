import { NextRequest, NextResponse } from "next/server";
import { findByUsername } from "@/services/user.service";

export async function GET(request: NextRequest, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const user = await findByUsername(username);
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    displayName: user.displayName,
    username: user.username,
    avatar: user.avatar,
    trustScore: user.trustScore,
    isShop: user.isShop,
    shop: user.shop,
    badges: user.userBadges.map((ub) => ub.badge),
    memberSince: user.createdAt,
  });
}
