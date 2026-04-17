// MUI Imports
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

// Third-party Imports
import classnames from 'classnames'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

// Types
type faqsDataTypes = {
  id: string
  question: string
  answer: string
  defaultExpanded?: boolean
}

// Data
const faqsData: faqsDataTypes[] = [
  {
    id: 'panel1',
    question: 'แพ็กเริ่มต้นใช้งานได้ฟรีจริงหรือไม่?',
    answer:
      'ใช่ แพ็กเริ่มต้นใช้งานได้ฟรีตลอดชีพ รองรับการสร้าง Order สูงสุด 20 รายการต่อเดือน ยืนยันตัวตนด้วย OTP และ Trust Score พื้นฐาน เหมาะสำหรับผู้เริ่มต้นเปิดร้าน',
    defaultExpanded: true
  },
  {
    id: 'panel2',
    question: 'สามารถอัปเกรดแพ็กเกจเมื่อไรก็ได้หรือไม่?',
    answer:
      'อัปเกรดได้ทันทีจากหน้าตั้งค่าบัญชี ระบบคิดค่าใช้จ่ายตามสัดส่วนของรอบบิล และเปิดใช้งานฟีเจอร์ใหม่ทันทีหลังชำระเงินสำเร็จ'
  },
  {
    id: 'panel3',
    question: 'รองรับการชำระเงินช่องทางใดบ้าง?',
    answer: 'รองรับบัตรเครดิต/เดบิต (Visa, Mastercard), พร้อมเพย์ และโอนผ่านธนาคารไทยทุกแห่ง'
  },
  {
    id: 'panel4',
    question: 'มีการการันตีคืนเงินหรือไม่?',
    answer:
      'ใช่ Deep การันตีคืนเงินเต็มจำนวนภายใน 30 วันแรกของการอัปเกรด หากไม่พอใจกับบริการ สามารถแจ้งคืนเงินได้โดยไม่ต้องระบุเหตุผล'
  },
  {
    id: 'panel5',
    question: 'มีค่าใช้จ่ายแอบแฝงหรือไม่?',
    answer:
      'ไม่มี ราคาที่แสดงเป็นราคาสุทธิทั้งหมด รวม VAT แล้ว ไม่มีค่าธรรมเนียมเปิดใช้งาน ค่าระบบ หรือค่าธรรมเนียมต่อธุรกรรมเพิ่มเติม'
  },
  {
    id: 'panel6',
    question: 'ต้องการสอบถามเพิ่มเติม ติดต่อได้ที่ไหน?',
    answer:
      'ติดต่อทีมงาน Deep ได้ที่ hello@deepthailand.app หรือผ่านแบบฟอร์มในหน้าติดต่อเรา เราตอบกลับภายใน 24 ชั่วโมง'
  }
]

const Faqs = () => {
  return (
    <section className={classnames('md:plb-[100px] plb-[50px]', frontCommonStyles.layoutSpacing)}>
      <div className='flex flex-col text-center gap-2 mbe-6'>
        <Typography variant='h4'>คำถามที่พบบ่อย</Typography>
        <Typography>รวบรวมคำถามที่พบบ่อยเกี่ยวกับการใช้งานและแพ็กเกจของ Deep</Typography>
      </div>
      <div>
        {faqsData.map((data, index) => {
          return (
            <Accordion key={index} defaultExpanded={data.defaultExpanded}>
              <AccordionSummary aria-controls={data.id + '-content'} id={data.id + '-header'} className='font-medium'>
                <Typography component='span'>{data.question}</Typography>
              </AccordionSummary>
              <AccordionDetails className='text-textSecondary'>{data.answer}</AccordionDetails>
            </Accordion>
          )
        })}
      </div>
    </section>
  )
}

export default Faqs
