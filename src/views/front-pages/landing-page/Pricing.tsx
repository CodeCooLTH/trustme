// React Imports
import { useState } from 'react'
import type { ChangeEvent } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'
import styles from './styles.module.css'

const pricingPlans = [
  {
    title: 'เริ่มต้น',
    img: '/images/front-pages/landing-page/pricing-basic.png',
    monthlyPay: 0,
    annualPay: 0,
    perYearPay: 0,
    features: [
      'ยืนยันตัวตนด้วย OTP',
      'Trust Score พื้นฐาน',
      'สร้าง Order ได้ 20 รายการ/เดือน',
      'Badge ผู้เริ่มต้น',
      'ดูประวัติย้อนหลัง 30 วัน',
      'Email สนับสนุน'
    ],
    current: false
  },
  {
    title: 'ธุรกิจ',
    img: '/images/front-pages/landing-page/pricing-team.png',
    monthlyPay: 290,
    annualPay: 219,
    perYearPay: 2628,
    features: [
      'รวมทุกสิทธิ์ของแพ็กเริ่มต้น',
      'ยืนยันเอกสารระดับ L2',
      'Trust Score แบบละเอียด',
      'Order ไม่จำกัด',
      'Achievement Badge ครบชุด',
      'รายงานยอดขายและรีวิว'
    ],
    current: true
  },
  {
    title: 'องค์กร',
    img: '/images/front-pages/landing-page/pricing-enterprise.png',
    monthlyPay: 990,
    annualPay: 790,
    perYearPay: 9480,
    features: [
      'รวมทุกสิทธิ์ของแพ็กธุรกิจ',
      'ยืนยันจดทะเบียนธุรกิจ L3',
      'หลายร้านต่อบัญชี',
      'Priority support 24/7',
      'API integration',
      'รายงานเชิงลึกแบบกำหนดเอง'
    ],
    current: false
  }
]

const PricingPlan = () => {
  // States
  const [pricingPlan, setPricingPlan] = useState<'monthly' | 'annually'>('annually')

  const handleChange = (e: ChangeEvent<{ checked: boolean }>) => {
    if (e.target.checked) {
      setPricingPlan('annually')
    } else {
      setPricingPlan('monthly')
    }
  }

  return (
    <section
      id='pricing-plans'
      className={classnames(
        'flex flex-col gap-8 lg:gap-12 plb-[100px] bg-backgroundDefault rounded-[60px]',
        styles.sectionStartRadius
      )}
    >
      <div className={classnames('is-full', frontCommonStyles.layoutSpacing)}>
        <div className='flex flex-col gap-y-4 items-center justify-center'>
          <Chip size='small' variant='tonal' color='primary' label='แพ็กเกจราคา' />
          <div className='flex flex-col items-center gap-y-1 justify-center flex-wrap'>
            <div className='flex items-center gap-x-2'>
              <Typography color='text.primary' variant='h4' className='text-center'>
                <span className='relative z-[1] font-extrabold'>
                  เลือกแพ็กเกจ
                  <img
                    src='/images/front-pages/landing-page/bg-shape.png'
                    alt='bg-shape'
                    className='absolute block-end-0 z-[1] bs-[40%] is-[125%] sm:is-[132%] -inline-start-[10%] sm:inline-start-[-19%] block-start-[17px]'
                  />
                </span>{' '}
                ที่เหมาะกับคุณ
              </Typography>
            </div>
            <Typography className='text-center'>
              ทุกแพ็กเกจมาพร้อมฟีเจอร์สร้างความน่าเชื่อถือครบครัน
              <br />
              เริ่มต้นฟรี ยกระดับเมื่อธุรกิจเติบโต
            </Typography>
          </div>
        </div>
        <div className='flex justify-center items-center max-sm:mlb-3 mbe-6'>
          <InputLabel htmlFor='pricing-switch' className='cursor-pointer'>
            รายเดือน
          </InputLabel>
          <Switch id='pricing-switch' onChange={handleChange} checked={pricingPlan === 'annually'} />
          <InputLabel htmlFor='pricing-switch' className='cursor-pointer'>
            รายปี
          </InputLabel>
          <div className='flex gap-x-1 items-start max-sm:hidden mis-2 mbe-5'>
            <img src='/images/front-pages/landing-page/pricing-arrow.png' width='50' />
            <Typography className='font-medium'>ประหยัด 25%</Typography>
          </div>
        </div>
        <Grid container spacing={6}>
          {pricingPlans.map((plan, index) => (
            <Grid key={index} size={{ xs: 12, lg: 4 }}>
              <Card className={`${plan.current && 'border-2 border-[var(--mui-palette-primary-main)] shadow-xl'}`}>
                <CardContent className='flex flex-col gap-8 p-8'>
                  <div className='is-full flex flex-col items-center gap-3'>
                    <img src={plan.img} alt={plan.img} height='88' width='86' className='text-center' />
                  </div>
                  <div className='flex flex-col items-center gap-y-[2px] relative'>
                    <Typography className='text-center' variant='h4'>
                      {plan.title}
                    </Typography>
                    <div className='flex items-baseline gap-x-1'>
                      <Typography variant='h2' color='primary.main' className='font-extrabold'>
                        ฿{pricingPlan === 'monthly' ? plan.monthlyPay : plan.annualPay}
                      </Typography>
                      <Typography color='text.disabled' className='font-medium'>
                        /เดือน
                      </Typography>
                    </div>
                    {pricingPlan === 'annually' && plan.perYearPay > 0 && (
                      <Typography color='text.disabled' className='absolute block-start-[100%]'>
                        ฿{plan.perYearPay.toLocaleString('th-TH')} / ปี
                      </Typography>
                    )}
                  </div>
                  <div>
                    <div className='flex flex-col gap-3 mbs-3'>
                      {plan.features.map((feature, index) => (
                        <div key={index} className='flex items-center gap-[12px]'>
                          <CustomAvatar color='primary' skin={plan.current ? 'filled' : 'light'} size={20}>
                            <i className='tabler-check text-sm' />
                          </CustomAvatar>
                          <Typography variant='h6'>{feature}</Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button component={Link} href='#contact-us' variant={plan.current ? 'contained' : 'tonal'}>
                    เริ่มใช้งาน
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  )
}

export default PricingPlan
