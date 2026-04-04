import { prisma } from "@/lib/prisma";

export async function createShop(userId: string, data: {
  shopName: string;
  description?: string;
  category?: string;
  address?: string;
  businessType: string;
}) {
  const shop = await prisma.shop.create({
    data: { userId, ...data },
  });
  await prisma.user.update({
    where: { id: userId },
    data: { isShop: true },
  });
  return shop;
}

export async function updateShop(shopId: string, data: {
  shopName?: string;
  description?: string;
  logo?: string;
  category?: string;
  address?: string;
  businessType?: string;
}) {
  return prisma.shop.update({ where: { id: shopId }, data });
}

export async function getShopByUserId(userId: string) {
  return prisma.shop.findUnique({ where: { userId } });
}
