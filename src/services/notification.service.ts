import { prisma } from '@/lib/prisma'

export class NotificationService {
  static async create(
    userId: string,
    type: string,
    title: string,
    message: string,
    relatedOrderId?: string
  ) {
    return prisma.notification.create({
      data: { userId, type, title, message, relatedOrderId },
    })
  }

  static async createMany(notifications: Array<{
    userId: string
    type: string
    title: string
    message: string
    relatedOrderId?: string
  }>) {
    return prisma.notification.createMany({ data: notifications })
  }

  static async listByUser(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit
    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.notification.count({ where: { userId } }),
      prisma.notification.count({ where: { userId, isRead: false } }),
    ])
    return { notifications, total, unreadCount }
  }

  static async markRead(id: string, userId: string) {
    return prisma.notification.updateMany({
      where: { id, userId },
      data: { isRead: true },
    })
  }

  static async markAllRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    })
  }
}
