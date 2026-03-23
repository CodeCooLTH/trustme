import { describe, it, expect, beforeEach } from 'vitest'
import { createTestUser, createTestSellerWithBank, createTestDeal, seedSystemSettings } from '../helpers'
import { DealService } from '@/services/deal.service'
import { DealStatus, UserRole } from '@prisma/client'

describe('DealService', () => {
  beforeEach(async () => {
    await seedSystemSettings()
  })

  describe('create', () => {
    it('should create a deal in DRAFT status', async () => {
      const seller = await createTestSellerWithBank()
      const deal = await DealService.create(seller.id, {
        productName: 'MacBook Pro',
        description: 'M3 chip, 16GB RAM',
        price: 45000,
        images: [],
        shippingMethod: 'Kerry Express',
      })

      expect(deal.productName).toBe('MacBook Pro')
      expect(deal.status).toBe(DealStatus.DRAFT)
      expect(deal.sellerId).toBe(seller.id)
    })

    it('should reject if seller has no bank account', async () => {
      const seller = await createTestUser({ role: UserRole.SELLER })
      await expect(
        DealService.create(seller.id, {
          productName: 'Test',
          description: 'Test',
          price: 100,
          images: [],
          shippingMethod: 'Kerry Express',
        })
      ).rejects.toThrow('กรุณาเพิ่มบัญชีธนาคารก่อนสร้างดีล')
    })

    it('should reject invalid shipping method', async () => {
      const seller = await createTestSellerWithBank()
      await expect(
        DealService.create(seller.id, {
          productName: 'Test',
          description: 'Test',
          price: 100,
          images: [],
          shippingMethod: 'Invalid Provider',
        })
      ).rejects.toThrow('ขนส่งไม่ถูกต้อง')
    })
  })

  describe('publish', () => {
    it('should change DRAFT to ACTIVE', async () => {
      const seller = await createTestSellerWithBank()
      const deal = await createTestDeal(seller.id)

      const updated = await DealService.update(deal.id, seller.id, { status: 'ACTIVE' })
      expect(updated.status).toBe(DealStatus.ACTIVE)
    })

    it('should reject publishing a non-DRAFT deal', async () => {
      const seller = await createTestSellerWithBank()
      const deal = await createTestDeal(seller.id, { status: DealStatus.ACTIVE })

      await expect(
        DealService.update(deal.id, seller.id, { status: 'ACTIVE' })
      ).rejects.toThrow()
    })
  })

  describe('list', () => {
    it('should return only seller own deals', async () => {
      const seller1 = await createTestSellerWithBank({ name: 'Seller 1' })
      const seller2 = await createTestSellerWithBank({ name: 'Seller 2' })

      await createTestDeal(seller1.id)
      await createTestDeal(seller1.id)
      await createTestDeal(seller2.id)

      const { deals, total } = await DealService.list(seller1.id, { page: 1, limit: 20 })
      expect(total).toBe(2)
      expect(deals).toHaveLength(2)
      expect(deals.every((d) => d.sellerId === seller1.id)).toBe(true)
    })
  })

  describe('getById', () => {
    it('should return deal if seller owns it', async () => {
      const seller = await createTestSellerWithBank()
      const deal = await createTestDeal(seller.id)

      const result = await DealService.getById(deal.id, seller.id)
      expect(result.id).toBe(deal.id)
    })

    it('should throw if seller does not own it', async () => {
      const seller1 = await createTestSellerWithBank({ name: 'S1' })
      const seller2 = await createTestSellerWithBank({ name: 'S2' })
      const deal = await createTestDeal(seller1.id)

      await expect(DealService.getById(deal.id, seller2.id)).rejects.toThrow()
    })
  })
})
