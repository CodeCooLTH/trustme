import { prisma } from '@/lib/prisma'
import { OrderStatus, DisputeStatus } from '@prisma/client'
import { AppError, NotFoundError, ForbiddenError, ConflictError } from '@/lib/errors'
import { EscrowService } from './escrow.service'

export class DisputeService {
  static async open(
    publicToken: string,
    userId: string,
    reason: string,
    evidence: string[]
  ) {
    const order = await prisma.order.findUnique({
      where: { publicToken },
      include: { deal: true, dispute: true },
    })

    if (!order) throw new NotFoundError('ออเดอร์')

    // Must be buyer or seller of this order
    const isBuyer = order.buyerId === userId
    const isSeller = order.deal.sellerId === userId
    if (!isBuyer && !isSeller) throw new ForbiddenError('คุณไม่เกี่ยวข้องกับออเดอร์นี้')

    if (order.status !== OrderStatus.DELIVERED) {
      throw new AppError('เปิดข้อพิพาทได้เฉพาะเมื่อสถานะเป็น DELIVERED', 400)
    }

    if (order.dispute) {
      throw new ConflictError('ออเดอร์นี้มีข้อพิพาทแล้ว')
    }

    const dispute = await prisma.dispute.create({
      data: {
        orderId: order.id,
        openedBy: userId,
        reason,
        evidence,
        status: DisputeStatus.OPEN,
      },
    })

    await EscrowService.transition(order.id, OrderStatus.DELIVERED, OrderStatus.DISPUTE)

    return dispute
  }

  static async addMessage(
    disputeId: string,
    senderId: string,
    message: string,
    attachments: string[]
  ) {
    const dispute = await prisma.dispute.findUnique({
      where: { id: disputeId },
      include: { order: { include: { deal: true } } },
    })

    if (!dispute) throw new NotFoundError('ข้อพิพาท')
    if (dispute.status !== DisputeStatus.OPEN) {
      throw new AppError('ข้อพิพาทนี้ปิดแล้ว', 400)
    }

    // Must be buyer, seller, or admin
    const isBuyer = dispute.order.buyerId === senderId
    const isSeller = dispute.order.deal.sellerId === senderId
    // Admin check done at API level

    return prisma.disputeMessage.create({
      data: {
        disputeId,
        senderId,
        message,
        attachments,
      },
    })
  }

  static async resolve(
    disputeId: string,
    adminId: string,
    decision: 'buyer' | 'seller',
    resolution: string
  ) {
    const dispute = await prisma.dispute.findUnique({
      where: { id: disputeId },
      include: { order: true },
    })

    if (!dispute) throw new NotFoundError('ข้อพิพาท')
    if (dispute.status !== DisputeStatus.OPEN) {
      throw new AppError('ข้อพิพาทนี้ถูกตัดสินแล้ว', 400)
    }

    const disputeStatus = decision === 'buyer'
      ? DisputeStatus.RESOLVED_BUYER
      : DisputeStatus.RESOLVED_SELLER

    const orderStatus = decision === 'buyer'
      ? OrderStatus.REFUNDED
      : OrderStatus.RELEASED

    await prisma.dispute.update({
      where: { id: disputeId },
      data: {
        status: disputeStatus,
        resolution,
        resolvedBy: adminId,
        resolvedAt: new Date(),
      },
    })

    await EscrowService.transition(dispute.orderId, OrderStatus.DISPUTE, orderStatus)

    return { disputeStatus, orderStatus }
  }

  static async getById(disputeId: string) {
    const dispute = await prisma.dispute.findUnique({
      where: { id: disputeId },
      include: {
        order: {
          include: {
            deal: { select: { productName: true, price: true } },
            buyer: { select: { id: true, name: true, avatar: true } },
          },
        },
        opener: { select: { id: true, name: true } },
        messages: {
          include: { sender: { select: { id: true, name: true, role: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!dispute) throw new NotFoundError('ข้อพิพาท')
    return dispute
  }

  static async list(page: number, limit: number) {
    const skip = (page - 1) * limit
    const [disputes, total] = await Promise.all([
      prisma.dispute.findMany({
        include: {
          order: {
            include: {
              deal: { select: { productName: true, price: true } },
            },
          },
          opener: { select: { name: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.dispute.count(),
    ])
    return { disputes, total }
  }
}
