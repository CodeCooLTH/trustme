import { describe, it, expect, beforeEach } from "vitest";
import { prisma, cleanDatabase } from "../setup";
import { createOrder, confirmOrder, shipOrder, completeOrder, VALID_TRANSITIONS } from "@/services/order.service";

describe("OrderService", () => {
  let shopId: string;

  beforeEach(async () => {
    await cleanDatabase();
    const user = await prisma.user.create({
      data: { displayName: "Seller", username: "seller_order", isShop: true },
    });
    const shop = await prisma.shop.create({
      data: { userId: user.id, shopName: "TestShop", businessType: "INDIVIDUAL" },
    });
    shopId = shop.id;
  });

  it("creates order with CREATED status and public token", async () => {
    const order = await createOrder(shopId, {
      items: [{ name: "Widget", qty: 2, price: 100 }],
      type: "PHYSICAL",
    });
    expect(order.status).toBe("CREATED");
    expect(order.publicToken).toBeDefined();
    expect(order.totalAmount.toString()).toBe("200");
  });

  it("confirms order and sets buyer contact", async () => {
    const order = await createOrder(shopId, {
      items: [{ name: "Widget", qty: 1, price: 50 }],
      type: "DIGITAL",
    });
    const confirmed = await confirmOrder(order.publicToken, "0812345678");
    expect(confirmed.status).toBe("CONFIRMED");
    expect(confirmed.buyerContact).toBe("0812345678");
  });

  it("rejects invalid status transition", async () => {
    const order = await createOrder(shopId, {
      items: [{ name: "Widget", qty: 1, price: 50 }],
      type: "PHYSICAL",
    });
    await expect(shipOrder(order.publicToken, { provider: "Kerry", trackingNo: "123" }))
      .rejects.toThrow();
  });

  it("allows digital order to complete directly from CONFIRMED", async () => {
    const order = await createOrder(shopId, {
      items: [{ name: "E-book", qty: 1, price: 299 }],
      type: "DIGITAL",
    });
    await confirmOrder(order.publicToken, "test@example.com");
    const completed = await completeOrder(order.publicToken);
    expect(completed.status).toBe("COMPLETED");
  });

  it("validates transition rules", () => {
    expect(VALID_TRANSITIONS["CREATED"]).toContain("CONFIRMED");
    expect(VALID_TRANSITIONS["CREATED"]).toContain("CANCELLED");
    expect(VALID_TRANSITIONS["CONFIRMED"]).toContain("SHIPPED");
    expect(VALID_TRANSITIONS["CONFIRMED"]).toContain("COMPLETED");
    expect(VALID_TRANSITIONS["SHIPPED"]).toContain("COMPLETED");
    expect(VALID_TRANSITIONS["COMPLETED"]).toBeUndefined();
  });
});
