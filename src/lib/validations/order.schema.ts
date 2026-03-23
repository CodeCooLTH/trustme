import { z } from 'zod'

export const claimOrderSchema = z.object({})

export const confirmReceiveSchema = z.object({
  photos: z.array(z.string()).min(1, 'กรุณาอัพโหลดรูปหลักฐานอย่างน้อย 1 รูป'),
})

export type ConfirmReceiveInput = z.infer<typeof confirmReceiveSchema>
