import * as v from "valibot";

export const SendOtpSchema = v.object({
  contact: v.pipe(v.string(), v.minLength(1)),
  type: v.picklist(["phone", "email", "PHONE", "EMAIL"]),
});

export const VerifyOtpSchema = v.object({
  contact: v.pipe(v.string(), v.minLength(1)),
  type: v.picklist(["phone", "email", "PHONE", "EMAIL"]),
  otp: v.pipe(v.string(), v.length(6)),
});

export const CreateShopSchema = v.object({
  shopName: v.pipe(v.string(), v.minLength(1), v.maxLength(100)),
  description: v.optional(v.pipe(v.string(), v.maxLength(500))),
  category: v.optional(v.pipe(v.string(), v.maxLength(50))),
  address: v.optional(v.pipe(v.string(), v.maxLength(200))),
  businessType: v.picklist(["INDIVIDUAL", "COMPANY"]),
});

export const CreateProductSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1), v.maxLength(200)),
  description: v.optional(v.pipe(v.string(), v.maxLength(1000))),
  price: v.pipe(v.number(), v.minValue(0.01)),
  type: v.picklist(["PHYSICAL", "DIGITAL", "SERVICE"]),
});

export const CreateOrderSchema = v.object({
  items: v.pipe(
    v.array(v.object({
      productId: v.optional(v.pipe(v.string(), v.uuid())),
      name: v.pipe(v.string(), v.minLength(1)),
      description: v.optional(v.string()),
      qty: v.pipe(v.number(), v.integer(), v.minValue(1)),
      price: v.pipe(v.number(), v.minValue(0.01)),
    })),
    v.minLength(1),
  ),
  type: v.picklist(["PHYSICAL", "DIGITAL", "SERVICE"]),
});

// ConfirmOrderSchema — OTP ถูกถอดออกตาม UX ใหม่ (2026-04-18) buyer เปิดลิงก์
// และพิสูจน์ตัวตนด้วยการกรอกเบอร์ที่ตรงกับ order.buyerContact (ถ้า seller ใส่
// เบอร์ไว้ตอนสร้าง order) หรือถ้า buyerContact ยังว่าง — เบอร์แรกที่กรอกจะ
// claim order นั้น. ดูเพิ่มใน order.service.confirmOrder + /api/orders/[token]/unlock
export const ConfirmOrderSchema = v.object({
  contact: v.pipe(v.string(), v.minLength(1)),
  contactType: v.optional(v.picklist(["phone", "email", "PHONE", "EMAIL"])),
});

export const UnlockOrderSchema = v.object({
  phone: v.pipe(v.string(), v.regex(/^0[0-9]{9}$/)),
});

export const CreateReviewSchema = v.object({
  rating: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(5)),
  comment: v.optional(v.pipe(v.string(), v.maxLength(500))),
});

export const ShipOrderSchema = v.object({
  provider: v.pipe(v.string(), v.minLength(1)),
  trackingNo: v.pipe(v.string(), v.minLength(1)),
});
