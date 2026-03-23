import type { User, Deal, Order, Payment, Shipment, Dispute } from '@prisma/client'

export {
  UserRole, DealStatus, OrderStatus, PaymentStatus, DisputeStatus, ShipmentStatus,
} from '@prisma/client'

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: { total: number; page: number; limit: number; totalPages: number }
}

export interface PaginationParams {
  page: number
  limit: number
}

export const ORDER_STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING_PAYMENT: ['PAYMENT_UPLOADED', 'CANCELLED'],
  PAYMENT_UPLOADED: ['PAYMENT_RECEIVED', 'PENDING_PAYMENT', 'CANCELLED'],
  PAYMENT_RECEIVED: ['SHIPPING'],
  SHIPPING: ['DELIVERED'],
  DELIVERED: ['COMPLETED', 'DISPUTE'],
  DISPUTE: ['REFUNDED', 'RELEASED'],
}

export const DEAL_STATUS_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['ACTIVE'],
  ACTIVE: ['CLOSED'],
}
