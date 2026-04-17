import type { PricingPlanType } from '@/types/pages/pricingTypes'

export const pricingData: PricingPlanType[] = [
  {
    title: 'เริ่มต้น',
    subtitle: 'เริ่มต้นใช้งานฟรี เหมาะสำหรับผู้เปิดร้านใหม่',
    imgSrc: '/images/front-pages/landing-page/pricing-basic.png',
    imgHeight: 120,
    monthlyPrice: 0,
    currentPlan: false,
    popularPlan: false,
    yearlyPlan: { monthly: 0, annually: 0 },
    planBenefits: [
      'ยืนยันตัวตนด้วย OTP',
      'Trust Score พื้นฐาน',
      'สร้าง Order ได้ 20 รายการ/เดือน',
      'Badge ผู้เริ่มต้น',
      'ดูประวัติย้อนหลัง 30 วัน',
      'Email สนับสนุน'
    ]
  },
  {
    title: 'ธุรกิจ',
    subtitle: 'เหมาะสำหรับร้านค้าที่เติบโตแล้ว',
    imgSrc: '/images/front-pages/landing-page/pricing-team.png',
    imgHeight: 120,
    monthlyPrice: 290,
    currentPlan: false,
    popularPlan: true,
    yearlyPlan: { monthly: 219, annually: 2628 },
    planBenefits: [
      'รวมทุกสิทธิ์ของแพ็กเริ่มต้น',
      'ยืนยันเอกสารระดับ L2',
      'Trust Score แบบละเอียด',
      'Order ไม่จำกัด',
      'Achievement Badge ครบชุด',
      'รายงานยอดขายและรีวิว'
    ]
  },
  {
    title: 'องค์กร',
    subtitle: 'โซลูชันสำหรับองค์กรและธุรกิจหลายสาขา',
    imgSrc: '/images/front-pages/landing-page/pricing-enterprise.png',
    imgHeight: 120,
    monthlyPrice: 990,
    currentPlan: false,
    popularPlan: false,
    yearlyPlan: { monthly: 790, annually: 9480 },
    planBenefits: [
      'รวมทุกสิทธิ์ของแพ็กธุรกิจ',
      'ยืนยันจดทะเบียนธุรกิจ L3',
      'หลายร้านต่อบัญชี',
      'Priority support 24/7',
      'API integration',
      'รายงานเชิงลึกแบบกำหนดเอง'
    ]
  }
]
