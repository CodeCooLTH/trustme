import { prisma } from "@/lib/prisma";

export async function createProduct(shopId: string, data: {
  name: string;
  description?: string;
  price: number;
  type: string;
  images?: string[];
}) {
  return prisma.product.create({
    data: {
      shopId,
      name: data.name,
      description: data.description,
      price: data.price,
      type: data.type,
      images: data.images || [],
    },
  });
}

export async function updateProduct(productId: string, data: {
  name?: string;
  description?: string;
  price?: number;
  type?: string;
  images?: string[];
  isActive?: boolean;
}) {
  return prisma.product.update({ where: { id: productId }, data });
}

export async function deleteProduct(productId: string) {
  return prisma.product.update({ where: { id: productId }, data: { isActive: false } });
}

export async function getProductsByShop(shopId: string) {
  return prisma.product.findMany({
    where: { shopId, isActive: true },
    orderBy: { createdAt: "desc" },
  });
}
