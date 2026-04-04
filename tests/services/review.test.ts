import { describe, it, expect, beforeEach } from "vitest";
import { prisma, cleanDatabase } from "../setup";
import { createReview } from "@/services/review.service";

describe("ReviewService", () => {
  let orderId: string;
  let orderToken: string;

  beforeEach(async () => {
    await cleanDatabase();
    const user = await prisma.user.create({
      data: { displayName: "Seller", username: "rev_seller", isShop: true },
    });
    const shop = await prisma.shop.create({
      data: { userId: user.id, shopName: "Shop", businessType: "INDIVIDUAL" },
    });
    const order = await prisma.order.create({
      data: {
        shopId: shop.id, type: "DIGITAL", totalAmount: 100, status: "CONFIRMED",
        buyerContact: "0811111111",
        items: { create: { name: "Item", qty: 1, price: 100 } },
      },
    });
    orderId = order.id;
    orderToken = order.publicToken;
  });

  it("creates review for order", async () => {
    const review = await createReview(orderToken, {
      rating: 5,
      comment: "Great!",
      reviewerContact: "0811111111",
    });
    expect(review.rating).toBe(5);
    expect(review.orderId).toBe(orderId);
  });

  it("rejects duplicate review for same order", async () => {
    await createReview(orderToken, { rating: 5, reviewerContact: "0811111111" });
    await expect(
      createReview(orderToken, { rating: 4, reviewerContact: "0811111111" })
    ).rejects.toThrow();
  });
});
