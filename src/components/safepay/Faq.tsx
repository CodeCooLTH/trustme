'use client'

import { Icon } from '@iconify/react'

type FaqItem = {
  id: string
  q: string
  a: string
}

type FaqGroup = {
  title: string
  subtitle: string
  items: FaqItem[]
}

const groups: FaqGroup[] = [
  {
    title: 'เริ่มต้นใช้งาน',
    subtitle: 'คำถามที่พบบ่อยเกี่ยวกับการใช้งาน Deep',
    items: [
      {
        id: 'faq-what-is',
        q: 'Deep คืออะไร?',
        a: 'Deep เป็นระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์ ผ่านระบบยืนยันตัวตน, Trust Score, Badge และประวัติการซื้อขาย เพื่อช่วยลดปัญหามิจฉาชีพและทำให้ทุกคนซื้อขายออนไลน์ได้อย่างมั่นใจ',
      },
      {
        id: 'faq-is-free',
        q: 'ใช้ฟรีจริงมั้ย?',
        a: 'ฟรี 100% ทั้งสำหรับผู้ซื้อและผู้ขาย ไม่มีค่าธรรมเนียมแอบแฝง ไม่ต้องผูกบัตรเครดิต สมัครและใช้งานได้ทันที',
      },
      {
        id: 'faq-buyer-signup',
        q: 'ถ้าเป็นผู้ซื้อ ต้องสมัครสมาชิกมั้ย?',
        a: 'ไม่จำเป็น ผู้ซื้อสามารถ confirm order ผ่านลิงก์ที่ผู้ขายส่งให้ได้เลยด้วย OTP และถ้าสมัครสมาชิกทีหลัง ประวัติ orders เดิมจะถูกลิงก์เข้าบัญชีอัตโนมัติ',
      },
      {
        id: 'faq-open-shop',
        q: 'จะเปิดร้านค้าต้องทำอย่างไร?',
        a: 'หลังสมัครสมาชิก เข้าไปที่ seller.deepthailand.app แล้วกดเปิดร้าน กรอกชื่อร้าน ยืนยันตัวตนระดับที่ต้องการ ก็เริ่มสร้าง order ได้ทันที ไม่มีค่าเปิดร้าน',
      },
    ],
  },
  {
    title: 'Trust Score และความน่าเชื่อถือ',
    subtitle: 'เข้าใจวิธีคำนวณและยืนยันตัวตน',
    items: [
      {
        id: 'faq-trust-score',
        q: 'Trust Score คำนวณอย่างไร?',
        a: 'คำนวณจาก 5 ปัจจัย: Verification (35%), Orders (25%), Rating (20%), Account Age (10%), และ Badges (10%) ทุกปัจจัยโปร่งใส ตรวจสอบได้ และคะแนนอัปเดตทุกครั้งที่มีการเปลี่ยนแปลง',
      },
      {
        id: 'faq-verification-levels',
        q: 'การยืนยันตัวตนมีกี่ระดับ?',
        a: 'มี 3 ระดับ: L1 ยืนยันเบอร์โทรด้วย OTP, L2 ยืนยันด้วยบัตรประชาชน/เอกสารบุคคล, และ L3 ยืนยันด้วยเอกสารจดทะเบียนธุรกิจ ทุกระดับมีการตรวจสอบโดย admin team',
      },
      {
        id: 'faq-badges',
        q: 'Badge สะสมอย่างไร?',
        a: 'มี 2 ประเภท: Verification Badges (3 อัน) ได้จากการยืนยันตัวตนแต่ละระดับ และ Achievement Badges (10 อัน) ได้จากการสะสมประวัติ เช่น First Sale, Top Rated, Hot Seller ฯลฯ',
      },
      {
        id: 'faq-report-scam',
        q: 'ถ้าเจอร้านค้าน่าสงสัยทำอย่างไร?',
        a: 'ทุกโปรไฟล์มีปุ่ม Report ให้กดแจ้งได้ทันที ระบบจะส่งเรื่องให้ทีม admin review และอาจลด Trust Score หรือระงับบัญชีหากพบพฤติกรรมผิดปกติ ช่วยกันทำให้ community ปลอดภัยขึ้น',
      },
    ],
  },
]

const Faq = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {groups.map((group) => (
        <div className="card" key={group.title}>
          <div className="card-header block">
            <h4 className="card-title mb-1.25">{group.title}</h4>
            <p className="text-default-500 text-sm">{group.subtitle}</p>
          </div>
          <div className="card-body">
            <div className="hs-accordion-group flex flex-col gap-2">
              {group.items.map((item, idx) => (
                <div
                  className="hs-accordion"
                  id={`${item.id}-heading`}
                  key={item.id}
                >
                  <button
                    type="button"
                    className={`hs-accordion-toggle bg-default-100 flex w-full items-center justify-between rounded px-5 py-4 text-start text-sm font-semibold disabled:pointer-events-none disabled:opacity-50 ${idx === 0 ? 'hs-accordion-active:bg-primary/10 hs-accordion-active:text-primary' : ''}`}
                    aria-expanded={idx === 0 ? 'true' : 'false'}
                    aria-controls={`${item.id}-collapse`}
                  >
                    {item.q}
                    <Icon
                      icon="tabler:chevron-down"
                      className="hs-accordion-active:rotate-180 transition-transform text-base"
                    />
                  </button>
                  <div
                    id={`${item.id}-collapse`}
                    className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${idx === 0 ? '' : 'hidden'}`}
                    role="region"
                    aria-labelledby={`${item.id}-heading`}
                  >
                    <div className="px-5 py-4 text-default-600 text-sm leading-relaxed">
                      {item.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Faq
