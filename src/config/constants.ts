export const META_DATA = {
  name: 'SafePay',
  title: 'SafePay — ระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์',
  description: 'SafePay ช่วยสร้างความน่าเชื่อถือผ่านระบบ Verify ตัวตน, Trust Score, Badge และ Order History เพื่อแก้ปัญหามิจฉาชีพ',
  author: 'SafePay',
  username: 'safepay',
  keywords: 'safepay, trust, verification, trust score, order verification, anti-scam',
  version: '0.2.0',
}

export const currentYear = new Date().getFullYear()

type CurrencyType = '฿' | '$' | '€'

export const currency: CurrencyType = '฿'
