import { prisma } from '@/lib/prisma'
import { OrderStatus } from '@prisma/client'
import { AppError } from '@/lib/errors'
import { ORDER_STATUS_TRANSITIONS } from '@/types'

export class EscrowService {
  /**
   * Atomic state transition with conditional update.
   * Only succeeds if current DB status matches expectedStatus.
   */
  static async transition(
    orderId: string,
    expectedStatus: OrderStatus,
    newStatus: OrderStatus
  ) {
    const allowed = ORDER_STATUS_TRANSITIONS[expectedStatus]
    if (!allowed?.includes(newStatus)) {
      throw new AppError(
        `ไม่สามารถเปลี่ยนสถานะจาก ${expectedStatus} เป็น ${newStatus}`,
        400
      )
    }

    const additionalData: Record<string, unknown> = {}

    if (newStatus === OrderStatus.DELIVERED) {
      const setting = await prisma.systemSetting.findUnique({
        where: { key: 'confirm_deadline_days' },
      })
      const days = parseInt(setting?.value ?? '3', 10)
      additionalData.confirmDeadline = new Date(
        Date.now() + days * 24 * 60 * 60 * 1000
      )
    }

    if (newStatus === OrderStatus.COMPLETED) {
      additionalData.completedAt = new Date()
    }

    // Atomic conditional update — prevents race conditions
    const result = await prisma.order.updateMany({
      where: {
        id: orderId,
        status: expectedStatus,
      },
      data: {
        status: newStatus,
        ...additionalData,
      },
    })

    if (result.count === 0) {
      throw new AppError(
        'สถานะออเดอร์ถูกเปลี่ยนแปลงแล้ว กรุณาลองใหม่',
        409
      )
    }

    return prisma.order.findUniqueOrThrow({ where: { id: orderId } })
  }

  /**
   * Cron job: auto-complete DELIVERED orders past deadline
   * that do NOT have an open dispute.
   */
  static async autoCompleteOrders(): Promise<number> {
    const now = new Date()

    const eligibleOrders = await prisma.order.findMany({
      where: {
        status: OrderStatus.DELIVERED,
        confirmDeadline: { lte: now },
        NOT: {
          dispute: { status: 'OPEN' },
        },
      },
      select: { id: true },
    })

    let completed = 0

    for (const order of eligibleOrders) {
      try {
        await this.transition(
          order.id,
          OrderStatus.DELIVERED,
          OrderStatus.COMPLETED
        )
        completed++
      } catch {
        continue
      }
    }

    if (completed > 0) {
      console.log(`[Cron] Auto-completed ${completed} orders`)
    }

    return completed
  }
}
