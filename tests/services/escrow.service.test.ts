import { describe, it, expect, beforeEach } from 'vitest'
import {
  createTestUser,
  createTestSellerWithBank,
  createTestDeal,
  seedSystemSettings,
} from '../helpers'
import { EscrowService } from '@/services/escrow.service'
import { DealStatus, OrderStatus, UserRole } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { OrderService } from '@/services/order.service'

async function createOrderInStatus(status: OrderStatus) {
  const seller = await createTestSellerWithBank()
  const buyer = await createTestUser({ role: UserRole.BUYER })
  const deal = await createTestDeal(seller.id, { status: DealStatus.ACTIVE })
  const order = await OrderService.generateLink(deal.id, seller.id)
  await OrderService.claim(order.publicToken, buyer.id)

  if (status !== OrderStatus.PENDING_PAYMENT) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status, buyerId: buyer.id },
    })
  }

  return { seller, buyer, deal, order: { ...order, status, buyerId: buyer.id } }
}

describe('EscrowService', () => {
  beforeEach(async () => {
    await seedSystemSettings()
  })

  describe('transition', () => {
    it('should allow valid transition: PENDING_PAYMENT → PAYMENT_UPLOADED', async () => {
      const { order } = await createOrderInStatus(OrderStatus.PENDING_PAYMENT)

      const result = await EscrowService.transition(
        order.id,
        OrderStatus.PENDING_PAYMENT,
        OrderStatus.PAYMENT_UPLOADED
      )

      expect(result.status).toBe(OrderStatus.PAYMENT_UPLOADED)
    })

    it('should allow valid transition: PENDING_PAYMENT → CANCELLED', async () => {
      const { order } = await createOrderInStatus(OrderStatus.PENDING_PAYMENT)

      const result = await EscrowService.transition(
        order.id,
        OrderStatus.PENDING_PAYMENT,
        OrderStatus.CANCELLED
      )

      expect(result.status).toBe(OrderStatus.CANCELLED)
    })

    it('should reject invalid transition: PENDING_PAYMENT → COMPLETED', async () => {
      const { order } = await createOrderInStatus(OrderStatus.PENDING_PAYMENT)

      await expect(
        EscrowService.transition(
          order.id,
          OrderStatus.PENDING_PAYMENT,
          OrderStatus.COMPLETED
        )
      ).rejects.toThrow('ไม่สามารถเปลี่ยนสถานะ')
    })

    it('should use atomic conditional update (race condition prevention)', async () => {
      const { order } = await createOrderInStatus(OrderStatus.PENDING_PAYMENT)

      await prisma.order.update({
        where: { id: order.id },
        data: { status: OrderStatus.CANCELLED },
      })

      await expect(
        EscrowService.transition(
          order.id,
          OrderStatus.PENDING_PAYMENT,
          OrderStatus.PAYMENT_UPLOADED
        )
      ).rejects.toThrow()
    })
  })

  describe('transition to DELIVERED', () => {
    it('should set confirmDeadline when transitioning to DELIVERED', async () => {
      const { order } = await createOrderInStatus(OrderStatus.SHIPPING)

      const result = await EscrowService.transition(
        order.id,
        OrderStatus.SHIPPING,
        OrderStatus.DELIVERED
      )

      expect(result.status).toBe(OrderStatus.DELIVERED)
      expect(result.confirmDeadline).toBeDefined()
      expect(result.confirmDeadline!.getTime()).toBeGreaterThan(Date.now())
    })
  })

  describe('transition to COMPLETED', () => {
    it('should set completedAt when transitioning to COMPLETED', async () => {
      const { order } = await createOrderInStatus(OrderStatus.DELIVERED)

      const result = await EscrowService.transition(
        order.id,
        OrderStatus.DELIVERED,
        OrderStatus.COMPLETED
      )

      expect(result.status).toBe(OrderStatus.COMPLETED)
      expect(result.completedAt).toBeDefined()
    })
  })

  describe('autoCompleteOrders', () => {
    it('should auto-complete orders past deadline with no open dispute', async () => {
      const { order } = await createOrderInStatus(OrderStatus.DELIVERED)

      await prisma.order.update({
        where: { id: order.id },
        data: { confirmDeadline: new Date(Date.now() - 1000) },
      })

      const count = await EscrowService.autoCompleteOrders()

      expect(count).toBe(1)
      const updated = await prisma.order.findUnique({ where: { id: order.id } })
      expect(updated?.status).toBe(OrderStatus.COMPLETED)
      expect(updated?.completedAt).toBeDefined()
    })

    it('should NOT auto-complete orders with open dispute', async () => {
      const { order, buyer } = await createOrderInStatus(OrderStatus.DELIVERED)

      await prisma.order.update({
        where: { id: order.id },
        data: {
          confirmDeadline: new Date(Date.now() - 1000),
          status: OrderStatus.DISPUTE,
        },
      })
      await prisma.dispute.create({
        data: {
          orderId: order.id,
          openedBy: buyer.id,
          reason: 'สินค้าเสียหาย',
          status: 'OPEN',
        },
      })

      const count = await EscrowService.autoCompleteOrders()
      expect(count).toBe(0)
    })
  })
})
