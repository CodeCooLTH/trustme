import { prisma } from '@/lib/prisma'
import { OrderStatus, ShipmentStatus } from '@prisma/client'
import { AppError, NotFoundError, ForbiddenError } from '@/lib/errors'
import { EscrowService } from './escrow.service'

export class ShipmentService {
  static async addTracking(
    publicToken: string,
    sellerId: string,
    provider: string,
    trackingNo: string
  ) {
    const order = await prisma.order.findUnique({
      where: { publicToken },
      include: { deal: true, shipment: true },
    })

    if (!order) throw new NotFoundError('ออเดอร์')
    if (order.deal.sellerId !== sellerId) throw new ForbiddenError('ไม่ใช่ออเดอร์ของคุณ')
    if (order.status !== OrderStatus.PAYMENT_RECEIVED) {
      throw new AppError('ต้องชำระเงินก่อนจัดส่ง', 400)
    }
    if (order.shipment) {
      throw new AppError('ออเดอร์นี้มีข้อมูลจัดส่งแล้ว', 400)
    }

    const shipment = await prisma.shipment.create({
      data: {
        orderId: order.id,
        provider,
        trackingNo,
        status: ShipmentStatus.SHIPPED,
      },
    })

    await EscrowService.transition(order.id, OrderStatus.PAYMENT_RECEIVED, OrderStatus.SHIPPING)

    return shipment
  }

  static async updateTracking(
    publicToken: string,
    sellerId: string,
    data: { trackingNo?: string; status?: ShipmentStatus }
  ) {
    const order = await prisma.order.findUnique({
      where: { publicToken },
      include: { deal: true, shipment: true },
    })

    if (!order) throw new NotFoundError('ออเดอร์')
    if (order.deal.sellerId !== sellerId) throw new ForbiddenError('ไม่ใช่ออเดอร์ของคุณ')
    if (!order.shipment) throw new NotFoundError('ข้อมูลจัดส่ง')

    const updateData: any = {}
    if (data.trackingNo) updateData.trackingNo = data.trackingNo
    if (data.status) {
      updateData.status = data.status
      if (data.status === ShipmentStatus.DELIVERED) {
        updateData.deliveredAt = new Date()
      }
    }

    const shipment = await prisma.shipment.update({
      where: { id: order.shipment.id },
      data: updateData,
    })

    // If marked as delivered, transition order
    if (data.status === ShipmentStatus.DELIVERED && order.status === OrderStatus.SHIPPING) {
      await EscrowService.transition(order.id, OrderStatus.SHIPPING, OrderStatus.DELIVERED)
    }

    return shipment
  }

  static async getTracking(publicToken: string) {
    const order = await prisma.order.findUnique({
      where: { publicToken },
      include: {
        shipment: {
          include: {
            trackingUpdates: { orderBy: { createdAt: 'desc' } },
          },
        },
      },
    })

    if (!order) throw new NotFoundError('ออเดอร์')
    if (!order.shipment) throw new NotFoundError('ข้อมูลจัดส่ง')

    return order.shipment
  }
}
