import { prisma } from '@/lib/prisma'
import { OrderStatus, PaymentStatus } from '@prisma/client'
import { AppError, NotFoundError, ForbiddenError } from '@/lib/errors'
import { EscrowService } from './escrow.service'

export class PaymentService {
  static async uploadSlip(
    publicToken: string,
    buyerId: string,
    slipImage: string,
    idempotencyKey: string
  ) {
    // Check idempotency
    const existing = await prisma.payment.findUnique({
      where: { idempotencyKey },
    })
    if (existing) {
      return existing // Return existing result
    }

    const order = await prisma.order.findUnique({
      where: { publicToken },
      include: { deal: true },
    })

    if (!order) throw new NotFoundError('ออเดอร์')
    if (order.buyerId !== buyerId) throw new ForbiddenError('คุณไม่ใช่ผู้ซื้อของออเดอร์นี้')
    if (order.status !== OrderStatus.PENDING_PAYMENT) {
      throw new AppError('ออเดอร์ไม่อยู่ในสถานะรอชำระเงิน', 400)
    }

    // Check max payment attempts
    const maxAttempts = await this.getMaxPaymentAttempts()
    if (order.paymentAttempts >= maxAttempts) {
      throw new AppError('เกินจำนวนครั้งที่อนุญาตในการส่งสลิป', 400)
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        orderId: order.id,
        amount: order.amount,
        slipImage,
        idempotencyKey,
        status: PaymentStatus.PENDING,
      },
    })

    // Update order status + increment attempts
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: OrderStatus.PAYMENT_UPLOADED,
        paymentAttempts: { increment: 1 },
      },
    })

    return payment
  }

  static async adminVerify(
    paymentId: string,
    adminId: string,
    action: 'approve' | 'reject',
    rejectedReason?: string
  ) {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { order: true },
    })

    if (!payment) throw new NotFoundError('การชำระเงิน')
    if (payment.status !== PaymentStatus.PENDING) {
      throw new AppError('สลิปนี้ถูกตรวจสอบแล้ว', 400)
    }

    if (action === 'approve') {
      await prisma.payment.update({
        where: { id: paymentId },
        data: {
          status: PaymentStatus.APPROVED,
          verifiedBy: adminId,
          verifiedAt: new Date(),
        },
      })

      await EscrowService.transition(
        payment.orderId,
        OrderStatus.PAYMENT_UPLOADED,
        OrderStatus.PAYMENT_RECEIVED
      )

      return { status: 'approved' }
    } else {
      await prisma.payment.update({
        where: { id: paymentId },
        data: {
          status: PaymentStatus.REJECTED,
          verifiedBy: adminId,
          verifiedAt: new Date(),
          rejectedReason: rejectedReason || 'สลิปไม่ถูกต้อง',
        },
      })

      // Check if max attempts reached
      const maxAttempts = await this.getMaxPaymentAttempts()
      const order = payment.order

      if (order.paymentAttempts >= maxAttempts) {
        // Auto cancel
        await prisma.order.update({
          where: { id: order.id },
          data: { status: OrderStatus.CANCELLED },
        })
        return { status: 'rejected_and_cancelled' }
      } else {
        // Allow retry
        await prisma.order.update({
          where: { id: order.id },
          data: { status: OrderStatus.PENDING_PAYMENT },
        })
        return { status: 'rejected' }
      }
    }
  }

  static async listPending(page: number, limit: number) {
    const skip = (page - 1) * limit
    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where: { status: PaymentStatus.PENDING },
        include: {
          order: {
            include: {
              deal: { select: { productName: true } },
              buyer: { select: { name: true, avatar: true } },
            },
          },
        },
        orderBy: { createdAt: 'asc' },
        skip,
        take: limit,
      }),
      prisma.payment.count({ where: { status: PaymentStatus.PENDING } }),
    ])
    return { payments, total }
  }

  private static async getMaxPaymentAttempts(): Promise<number> {
    const setting = await prisma.systemSetting.findUnique({
      where: { key: 'max_payment_attempts' },
    })
    return parseInt(setting?.value ?? '3', 10)
  }
}
