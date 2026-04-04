import { describe, it, expect, beforeEach } from "vitest";
import { prisma, cleanDatabase } from "../setup";
import { linkHistoryToUser } from "@/services/history-linking.service";

describe("HistoryLinkingService", () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  it("links orders by phone to new user", async () => {
    const seller = await prisma.user.create({
      data: { displayName: "Seller", username: "link_seller", isShop: true },
    });
    const shop = await prisma.shop.create({
      data: { userId: seller.id, shopName: "Shop", businessType: "INDIVIDUAL" },
    });
    await prisma.order.create({
      data: {
        shopId: shop.id, type: "DIGITAL", totalAmount: 100, status: "CONFIRMED",
        buyerContact: "0899999999",
        items: { create: { name: "Item", qty: 1, price: 100 } },
      },
    });

    const buyer = await prisma.user.create({
      data: { displayName: "Buyer", username: "link_buyer", phone: "0899999999" },
    });

    await linkHistoryToUser(buyer.id);

    const orders = await prisma.order.findMany({ where: { buyerUserId: buyer.id } });
    expect(orders).toHaveLength(1);
  });

  it("links reviews by email to new user", async () => {
    const seller = await prisma.user.create({
      data: { displayName: "Seller", username: "link_seller2", isShop: true },
    });
    const shop = await prisma.shop.create({
      data: { userId: seller.id, shopName: "Shop", businessType: "INDIVIDUAL" },
    });
    const order = await prisma.order.create({
      data: {
        shopId: shop.id, type: "DIGITAL", totalAmount: 100, status: "CONFIRMED",
        buyerContact: "buyer@test.com",
        items: { create: { name: "Item", qty: 1, price: 100 } },
      },
    });
    await prisma.review.create({
      data: { orderId: order.id, reviewerContact: "buyer@test.com", rating: 5 },
    });

    const buyer = await prisma.user.create({
      data: { displayName: "Buyer", username: "link_buyer2", email: "buyer@test.com" },
    });

    await linkHistoryToUser(buyer.id);

    const reviews = await prisma.review.findMany({ where: { reviewerUserId: buyer.id } });
    expect(reviews).toHaveLength(1);
  });
});
