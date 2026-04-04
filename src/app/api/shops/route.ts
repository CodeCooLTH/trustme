import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import * as v from "valibot";
import { CreateShopSchema } from "@/lib/validations";
import { createShop, getShopByUserId } from "@/services/shop.service";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const shop = await getShopByUserId((session.user as any).id);
  return NextResponse.json(shop);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = v.safeParse(CreateShopSchema, body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const shop = await createShop((session.user as any).id, parsed.output);
  return NextResponse.json(shop, { status: 201 });
}
