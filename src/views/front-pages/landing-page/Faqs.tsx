// React Imports
import { useEffect, useRef } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import { useIntersection } from '@/hooks/useIntersection'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'
import styles from './styles.module.css'

type FaqsDataTypes = {
  id: string
  question: string
  active?: boolean
  answer: string
}

const FaqsData: FaqsDataTypes[] = [
  {
    id: 'panel1',
    question: 'SafePay ใช้งานฟรีจริงหรือไม่?',
    answer:
      'แพ็กเกจเริ่มต้นใช้งานได้ฟรีตลอดชีพ รองรับการยืนยันตัวตนด้วย OTP การสร้าง Order สูงสุด 20 รายการต่อเดือน และ Trust Score พื้นฐาน เหมาะสำหรับผู้เริ่มเปิดร้าน'
  },
  {
    id: 'panel2',
    question: 'Trust Score คำนวณจากอะไรบ้าง?',
    active: true,
    answer:
      'Trust Score คำนวณจาก 5 องค์ประกอบหลัก ได้แก่ การยืนยันตัวตน 35%, จำนวน Order ที่สำเร็จ 25%, เรตติ้งจากผู้ซื้อ 20%, อายุบัญชี 10% และ Badge 10% ในเวอร์ชัน MVP คะแนนจะเพิ่มขึ้นเท่านั้น เพื่อให้ผู้ใช้ใหม่ค่อยๆ สร้างความน่าเชื่อถือ'
  },
  {
    id: 'panel3',
    question: 'ผู้ซื้อต้องสมัคร SafePay ไหม?',
    answer:
      'ไม่จำเป็น ผู้ซื้อสามารถยืนยันคำสั่งซื้อผ่านลิงก์และ OTP ได้ทันทีโดยไม่ต้องสมัครสมาชิก หากสมัครภายหลังระบบจะเชื่อมโยงประวัติคำสั่งซื้อเก่าให้อัตโนมัติผ่านเบอร์โทรศัพท์'
  },
  {
    id: 'panel4',
    question: 'Badge มีกี่ประเภทและได้มาอย่างไร?',
    answer:
      'SafePay มี Badge 2 กลุ่มหลัก คือ Verification Badge จากการยืนยันตัวตนด้วย OTP เอกสาร และจดทะเบียนธุรกิจ กับ Achievement Badge อีก 10 รายการที่ได้จากการใช้งานจริง เช่น ส่งของเร็ว ตอบลูกค้าไว ยอดขายครบ 100 รายการ'
  },
  {
    id: 'panel5',
    question: 'รองรับสินค้าประเภทไหนบ้าง?',
    answer:
      'SafePay รองรับสินค้า 3 ประเภท ได้แก่ สินค้าจริงที่ต้องจัดส่ง สินค้าดิจิทัลเช่นไฟล์หรือบัญชีบริการ และบริการเช่น รับจ้างออกแบบหรือสอนพิเศษ แต่ละประเภทมีขั้นตอนการยืนยันที่เหมาะสมกับรูปแบบสินค้า'
  },
  {
    id: 'panel6',
    question: 'หากเกิดปัญหากับผู้ขาย สามารถยกเลิก Order ได้ไหม?',
    answer:
      'ได้ ผู้ซื้อสามารถกดยกเลิก Order ก่อนยืนยันรับสินค้า และผู้ขายสามารถยกเลิกได้หากยังไม่จัดส่ง ประวัติการยกเลิกทั้งหมดจะถูกบันทึกไว้ในระบบเพื่อใช้ประกอบการพิจารณาต่อไป'
  },
  {
    id: 'panel7',
    question: 'ข้อมูลส่วนตัวของฉันปลอดภัยแค่ไหน?',
    answer:
      'SafePay ปฏิบัติตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล ข้อมูลทั้งหมดถูกเข้ารหัสระหว่างการส่ง และเอกสารยืนยันตัวตนใช้เพื่อการพิสูจน์เท่านั้น ไม่แบ่งปันให้บุคคลที่สาม'
  },
  {
    id: 'panel8',
    question: 'ต้องการอัปเกรดจากแพ็กเริ่มต้นต้องทำอย่างไร?',
    answer:
      'สามารถอัปเกรดได้ทันทีจากหน้าตั้งค่าบัญชี เลือกแพ็กเกจที่ต้องการและชำระเงิน ระบบจะเปิดใช้งานฟีเจอร์ใหม่ทันที หากมีข้อสงสัยสามารถติดต่อทีมงานผ่านแบบฟอร์มด้านล่าง'
  }
]

const Faqs = () => {
  // Refs
  const skipIntersection = useRef(true)
  const ref = useRef<null | HTMLDivElement>(null)

  // Hooks
  const { updateIntersections } = useIntersection()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (skipIntersection.current) {
          skipIntersection.current = false

          return
        }

        updateIntersections({ [entry.target.id]: entry.isIntersecting })
      },
      { threshold: 0.35 }
    )

    ref.current && observer.observe(ref.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id='faq' ref={ref} className={classnames('plb-[100px] bg-backgroundDefault', styles.sectionStartRadius)}>
      <div className={classnames('flex flex-col gap-16', frontCommonStyles.layoutSpacing)}>
        <div className='flex flex-col gap-y-4 items-center justify-center'>
          <Chip size='small' variant='tonal' color='primary' label='คำถามที่พบบ่อย' />
          <div className='flex flex-col items-center gap-y-1 justify-center flex-wrap'>
            <div className='flex items-center gap-x-2'>
              <Typography color='text.primary' variant='h4'>
                คำถาม
                <span className='relative z-[1] font-extrabold'>
                  <img
                    src='/images/front-pages/landing-page/bg-shape.png'
                    alt='bg-shape'
                    className='absolute block-end-0 z-[1] bs-[40%] is-[132%] -inline-start-[8%] block-start-[17px]'
                  />{' '}
                  ที่พบบ่อย
                </span>
              </Typography>
            </div>
            <Typography className='text-center'>
              รวบรวมคำถามที่ผู้ใช้ถามบ่อยที่สุดเกี่ยวกับการใช้งาน SafePay
            </Typography>
          </div>
        </div>
        <div>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, lg: 5 }} className='text-center'>
              <img
                src='/images/front-pages/landing-page/boy-sitting-with-laptop.png'
                alt='boy with laptop'
                className='is-[80%] max-is-[320px]'
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 7 }}>
              <div>
                {FaqsData.map((data, index) => {
                  return (
                    <Accordion key={index} defaultExpanded={data.active}>
                      <AccordionSummary
                        aria-controls={data.id + '-content'}
                        id={data.id + '-header'}
                        className='font-medium'
                        color='text.primary'
                      >
                        <Typography component='span'>{data.question}</Typography>
                      </AccordionSummary>
                      <AccordionDetails className='text-textSecondary'>{data.answer}</AccordionDetails>
                    </Accordion>
                  )
                })}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  )
}

export default Faqs
