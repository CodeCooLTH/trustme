export const META_DATA = {
  name: 'Deep',
  title: 'Deep — ระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์',
  description: 'Deep ช่วยสร้างความน่าเชื่อถือผ่านระบบ Verify ตัวตน, Trust Score, Badge และ Order History เพื่อแก้ปัญหามิจฉาชีพ',
  author: 'Deep Thailand',
  username: 'safepay',
  keywords: 'deep, deepthailand, trust, verification, trust score, order verification, anti-scam',
  version: '0.2.0',
}

export const currentYear = new Date().getFullYear()

type CurrencyType = '฿' | '$' | '€'

export const currency: CurrencyType = '฿'
