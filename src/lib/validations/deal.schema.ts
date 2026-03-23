import { z } from 'zod'

export const createDealSchema = z.object({
  productName: z.string().min(1, 'กรุณาใส่ชื่อสินค้า').max(200),
  description: z.string().min(1, 'กรุณาใส่รายละเอียด').max(5000),
  price: z.number().positive('ราคาต้องมากกว่า 0'),
  images: z.array(z.string()).default([]),
  shippingMethod: z.string().min(1, 'กรุณาเลือกวิธีจัดส่ง'),
})

export const updateDealSchema = z.object({
  productName: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(5000).optional(),
  price: z.number().positive().optional(),
  images: z.array(z.string()).optional(),
  shippingMethod: z.string().min(1).optional(),
  status: z.enum(['ACTIVE', 'CLOSED']).optional(),
})

export type CreateDealInput = z.infer<typeof createDealSchema>
export type UpdateDealInput = z.infer<typeof updateDealSchema>
