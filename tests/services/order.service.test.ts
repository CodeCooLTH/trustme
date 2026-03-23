import { describe, it, expect, beforeEach } from 'vitest'
import {
  createTestUser,
  createTestSellerWithBank,
  createTestDeal,
  seedSystemSettings,
} from '../helpers'
import { OrderService } from '@/services/order.service'
import { DealStatus, OrderStatus, UserRole } from '@prisma/client'
import { prisma } from '@/lib/prisma'

describe('OrderService', () => {
  beforeEach(async () => {
    await seedSystemSettings()
  })

  describe('generateLink', () => {
    it('should create an order with a public token', async () => {
      const seller = await createTestSellerWithBank()
      const deal = await createTestDeal(seller.id, { status: DealStatus.ACTIVE })

      const order = await OrderService.generateLink(deal.id, seller.id)

      expect(order.publicToken).toBeDefined()
      expect(order.publicToken).toHaveLength(36)
      expect(order.status).toBe(OrderStatus.PENDING_PAYMENT)
      expect(order.amount.toString()).toBe('25000')
      expect(order.dealId).toBe(deal.id)
    })

    it('should reject if deal is not ACTIVE', async () => {
      const seller = await createTestSellerWithBank()
      const deal = await createTestDeal(seller.id)

      await expect(
        OrderService.generateLink(deal.id, seller.id)
      ).rejects.toThrow('ดีลต้องเป็นสถานะ ACTIVE')
    })

    it('should reject if seller does not own the deal', async () => {
      const seller1 = await createTestSellerWithBank({ name: 'S1' })
      const seller2 = await createTestSellerWithBank({ name: 'S2' })
      const deal = await createTestDeal(seller1.id, { status: DealStatus.ACTIVE })

      await expect(
        OrderService.generateLink(deal.id, seller2.id)
      ).rejects.toThrow()
    })
  })

  describe('getByToken', () => {
    it('should return order with deal info', async () => {
      const seller = await createTestSellerWithBank()
      const deal = await createTestDeal(seller.id, { status: DealStatus.ACTIVE })
      const order = await OrderService.generateLink(deal.id, seller.id)

      const result = await OrderService.getByToken(order.publicToken)

      expect(result.id).toBe(order.id)
      expect(result.deal).toBeDefined()
      expect(result.deal.productName).toBe('iPhone 15')
    })

    it('should throw if token does not exist', async () => {
      await expect(
        OrderService.getByToken('non-existent-token')
      ).rejects.toThrow()
    })
  })

  describe('claim', () => {
    it('should assign buyer to order', async () => {
      const seller = await createTestSellerWithBank()
      const buyer = await createTestUser({ role: UserRole.BUYER })
      const deal = await createTestDeal(seller.id, { status: DealStatus.ACTIVE })
      const order = await OrderService.generateLink(deal.id, seller.id)

      const claimed = await OrderService.claim(order.publicToken, buyer.id)

      expect(claimed.buyerId).toBe(buyer.id)
    })

    it('should reject if buyer is the seller', async () => {
      const seller = await createTestSellerWithBank()
      const deal = await createTestDeal(seller.id, { status: DealStatus.ACTIVE })
      const order = await OrderService.generateLink(deal.id, seller.id)

      await expect(
        OrderService.claim(order.publicToken, seller.id)
      ).rejects.toThrow('ไม่สามารถซื้อสินค้าของตัวเอง')
    })

    it('should reject if already claimed by another buyer', async () => {
      const seller = await createTestSellerWithBank()
      const buyer1 = await createTestUser({ role: UserRole.BUYER, name: 'B1' })
      const buyer2 = await createTestUser({ role: UserRole.BUYER, name: 'B2' })
      const deal = await createTestDeal(seller.id, { status: DealStatus.ACTIVE })
      const order = await OrderService.generateLink(deal.id, seller.id)

      await OrderService.claim(order.publicToken, buyer1.id)

      await expect(
        OrderService.claim(order.publicToken, buyer2.id)
      ).rejects.toThrow('ออเดอร์นี้มีผู้ซื้อแล้ว')
    })
  })

  describe('listByUser', () => {
    it('should return buyer orders for BUYER role', async () => {
      const seller = await createTestSellerWithBank()
      const buyer = await createTestUser({ role: UserRole.BUYER })
      const deal = await createTestDeal(seller.id, { status: DealStatus.ACTIVE })
      const order = await OrderService.generateLink(deal.id, seller.id)
      await OrderService.claim(order.publicToken, buyer.id)

      const { orders, total } = await OrderService.listByUser(
        buyer.id,
        UserRole.BUYER,
        { page: 1, limit: 20 }
      )

      expect(total).toBe(1)
      expect(orders[0].buyerId).toBe(buyer.id)
    })

    it('should return seller orders for SELLER role', async () => {
      const seller = await createTestSellerWithBank()
      const deal = await createTestDeal(seller.id, { status: DealStatus.ACTIVE })
      await OrderService.generateLink(deal.id, seller.id)

      const { orders, total } = await OrderService.listByUser(
        seller.id,
        UserRole.SELLER,
        { page: 1, limit: 20 }
      )

      expect(total).toBe(1)
    })
  })
})
