import { prisma } from '@/lib/prisma'
import { DealStatus, OrderStatus, UserRole } from '@prisma/client'
import { AppError, NotFoundError, ForbiddenError, ConflictError } from '@/lib/errors'
import type { PaginationParams } from '@/types'

export class OrderService {
  static async generateLink(dealId: string, sellerId: string) {
    const deal = await prisma.deal.findUnique({ where: { id: dealId } })

    if (!deal) throw new NotFoundError('ดีล')
    if (deal.sellerId !== sellerId) throw new ForbiddenError('ไม่ใช่ดีลของคุณ')
    if (deal.status !== DealStatus.ACTIVE) {
      throw new AppError('ดีลต้องเป็นสถานะ ACTIVE ก่อนสร้างลิงก์', 400)
    }

    return prisma.order.create({
      data: {
        dealId: deal.id,
        amount: deal.price,
        status: OrderStatus.PENDING_PAYMENT,
      },
    })
  }

  static async getByToken(publicToken: string) {
    const order = await prisma.order.findUnique({
      where: { publicToken },
      include: {
        deal: {
          include: {
            seller: {
              select: { id: true, name: true, avatar: true, points: true },
            },
          },
        },
        buyer: {
          select: { id: true, name: true, avatar: true },
        },
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        shipment: {
          include: { trackingUpdates: { orderBy: { createdAt: 'desc' } } },
        },
        dispute: true,
      },
    })

    if (!order) throw new NotFoundError('ออเดอร์')

    return order
  }

  static async claim(publicToken: string, buyerId: string) {
    const order = await prisma.order.findUnique({
      where: { publicToken },
      include: { deal: true },
    })

    if (!order) throw new NotFoundError('ออเดอร์')

    if (order.deal.sellerId === buyerId) {
      throw new AppError('ไม่สามารถซื้อสินค้าของตัวเอง', 400)
    }

    if (order.buyerId && order.buyerId !== buyerId) {
      throw new ConflictError('ออเดอร์นี้มีผู้ซื้อแล้ว')
    }

    if (order.buyerId === buyerId) {
      return order
    }

    return prisma.order.update({
      where: { id: order.id },
      data: { buyerId },
    })
  }

  static async listByUser(
    userId: string,
    role: UserRole,
    pagination: PaginationParams
  ) {
    const { page, limit } = pagination
    const skip = (page - 1) * limit

    const where =
      role === UserRole.BUYER
        ? { buyerId: userId }
        : { deal: { sellerId: userId } }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          deal: {
            select: { productName: true, images: true, shippingMethod: true },
          },
          buyer: { select: { name: true, avatar: true } },
          payments: { orderBy: { createdAt: 'desc' }, take: 1 },
          shipment: true,
        },
      }),
      prisma.order.count({ where }),
    ])

    return { orders, total }
  }

  static async confirmReceive(publicToken: string, buyerId: string, photos: string[]) {
    const order = await prisma.order.findUnique({
      where: { publicToken },
      include: { deal: true },
    })

    if (!order) throw new NotFoundError('ออเดอร์')
    if (order.buyerId !== buyerId) throw new ForbiddenError('คุณไม่ใช่ผู้ซื้อของออเดอร์นี้')
    if (order.status !== OrderStatus.DELIVERED) {
      throw new AppError('สามารถยืนยันรับได้เฉพาะเมื่อสถานะเป็น DELIVERED', 400)
    }

    const { EscrowService } = await import('./escrow.service')
    return EscrowService.transition(order.id, OrderStatus.DELIVERED, OrderStatus.COMPLETED)
  }
}
