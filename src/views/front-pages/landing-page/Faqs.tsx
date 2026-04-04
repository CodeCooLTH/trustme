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
    question: 'SafePay คืออะไร?',
    answer:
      'SafePay คือแพลตฟอร์มสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์ ช่วยให้ผู้ซื้อและผู้ขายสามารถยืนยันตัวตน สะสมคะแนน Trust Score และทำธุรกรรมอย่างปลอดภัยผ่านระบบ Escrow'
  },
  {
    id: 'panel2',
    question: 'Trust Score คืออะไร?',
    active: true,
    answer:
      'Trust Score คือคะแนนความน่าเชื่อถือที่สะสมจากการทำธุรกรรมสำเร็จ รีวิวจากผู้ซื้อ การยืนยันตัวตน และกิจกรรมอื่นๆ บนแพลตฟอร์ม ยิ่ง Trust Score สูง ยิ่งแสดงให้เห็นว่าคุณเป็นผู้ใช้ที่น่าเชื่อถือ'
  },
  {
    id: 'panel3',
    question: 'SafePay เก็บค่าบริการไหม?',
    answer:
      'การสมัครและใช้งานพื้นฐานฟรี ไม่มีค่าใช้จ่ายใดๆ สำหรับฟีเจอร์พิเศษเพิ่มเติมจะมีแพ็กเกจให้เลือกตามความต้องการ'
  },
  {
    id: 'panel4',
    question: 'Deal Link คืออะไร?',
    answer:
      'Deal Link คือลิงก์สำหรับแชร์รายละเอียดการซื้อขายให้ลูกค้า ลูกค้าสามารถดูข้อมูลสินค้า ราคา และ Trust Score ของผู้ขายได้ทันที โดยไม่ต้องสมัครสมาชิก'
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
            <Typography className='text-center'>คำตอบสำหรับคำถามที่มักถูกถามเกี่ยวกับ SafePay</Typography>
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
