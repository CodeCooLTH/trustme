import { prisma } from '@/lib/prisma'
import { DealStatus } from '@prisma/client'
import { AppError, NotFoundError, ForbiddenError } from '@/lib/errors'
import { DEAL_STATUS_TRANSITIONS } from '@/types'
import type { CreateDealInput, UpdateDealInput } from '@/lib/validations/deal.schema'
import type { PaginationParams } from '@/types'

export class DealService {
  static async create(sellerId: string, input: CreateDealInput) {
    const bankAccount = await prisma.sellerBankAccount.findUnique({
      where: { userId: sellerId },
    })
    if (!bankAccount) {
      throw new AppError('กรุณาเพิ่มบัญชีธนาคารก่อนสร้างดีล', 400)
    }

    await this.validateShippingMethod(input.shippingMethod)

    return prisma.deal.create({
      data: {
        sellerId,
        productName: input.productName,
        description: input.description,
        price: input.price,
        images: input.images,
        shippingMethod: input.shippingMethod,
        status: DealStatus.DRAFT,
      },
    })
  }

  static async update(dealId: string, sellerId: string, input: UpdateDealInput) {
    const deal = await this.getById(dealId, sellerId)

    if (input.status) {
      const allowed = DEAL_STATUS_TRANSITIONS[deal.status]
      if (!allowed?.includes(input.status)) {
        throw new AppError(
          `ไม่สามารถเปลี่ยนสถานะจาก ${deal.status} เป็น ${input.status}`,
          400
        )
      }
    }

    if (deal.status === DealStatus.CLOSED) {
      throw new AppError('ไม่สามารถแก้ไขดีลที่ปิดแล้ว', 400)
    }

    if (input.shippingMethod) {
      await this.validateShippingMethod(input.shippingMethod)
    }

    return prisma.deal.update({
      where: { id: dealId },
      data: {
        ...(input.productName && { productName: input.productName }),
        ...(input.description && { description: input.description }),
        ...(input.price && { price: input.price }),
        ...(input.images && { images: input.images }),
        ...(input.shippingMethod && { shippingMethod: input.shippingMethod }),
        ...(input.status && { status: input.status as DealStatus }),
      },
    })
  }

  static async getById(dealId: string, sellerId: string) {
    const deal = await prisma.deal.findUnique({
      where: { id: dealId },
      include: { orders: true },
    })

    if (!deal) throw new NotFoundError('ดีล')
    if (deal.sellerId !== sellerId) throw new ForbiddenError('ไม่ใช่ดีลของคุณ')

    return deal
  }

  static async list(sellerId: string, pagination: PaginationParams) {
    const { page, limit } = pagination
    const skip = (page - 1) * limit

    const [deals, total] = await Promise.all([
      prisma.deal.findMany({
        where: { sellerId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: { _count: { select: { orders: true } } },
      }),
      prisma.deal.count({ where: { sellerId } }),
    ])

    return { deals, total }
  }

  private static async validateShippingMethod(method: string) {
    const setting = await prisma.systemSetting.findUnique({
      where: { key: 'shipping_providers' },
    })

    if (!setting) throw new AppError('ไม่พบการตั้งค่าขนส่ง', 500)

    const providers = JSON.parse(setting.value) as string[]
    if (!providers.includes(method)) {
      throw new AppError('ขนส่งไม่ถูกต้อง', 400)
    }
  }
}
