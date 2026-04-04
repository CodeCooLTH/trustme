// MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Rating from '@mui/material/Rating'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useKeenSlider } from 'keen-slider/react'
import classnames from 'classnames'

// Component Imports
import CustomIconButton from '@core/components/mui/IconButton'
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
import AppKeenSlider from '@/libs/styles/AppKeenSlider'

// SVG Imports
import HubSpot from '@assets/svg/front-pages/landing-page/HubSpot'
import Pinterest from '@assets/svg/front-pages/landing-page/Pinterest'
import Dribbble from '@assets/svg/front-pages/landing-page/Dribbble'
import Airbnb from '@assets/svg/front-pages/landing-page/Airbnb'
import Coinbase from '@assets/svg/front-pages/landing-page/Coinbase'
import Netflix from '@assets/svg/front-pages/landing-page/Netflix'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'
import styles from './styles.module.css'

// Data
const data = [
  {
    desc: 'SafePay ช่วยให้ลูกค้ามั่นใจในการซื้อสินค้าจากร้านเรามากขึ้น ยอดขายเพิ่มขึ้นอย่างเห็นได้ชัดหลังจากใช้ระบบ Trust Score',
    svg: <Pinterest color='#ee7676' />,
    rating: 5,
    name: 'สมชาย พาณิชย์',
    position: 'เจ้าของร้านค้าออนไลน์',
    avatarSrc: '/images/avatars/1.png'
  },
  {
    desc: 'ระบบ Escrow ของ SafePay ทำให้ไม่ต้องกังวลเรื่องโดนโกงอีกต่อไป ทุกธุรกรรมปลอดภัยและโปร่งใส',
    svg: <Netflix color='#d34c4d' />,
    rating: 5,
    name: 'วิภา ทรัพย์มาก',
    position: 'นักช้อปออนไลน์',
    avatarSrc: '/images/avatars/2.png'
  },
  {
    desc: 'Deal Link ใช้ง่ายมาก แค่ส่งลิงก์ให้ลูกค้า ลูกค้าก็เห็นข้อมูลครบ ไม่ต้องอธิบายอะไรเพิ่ม ประหยัดเวลาได้เยอะ',
    svg: <Airbnb color='#FF5A60' />,
    rating: 5,
    name: 'ธนา ออนไลน์',
    position: 'พ่อค้าออนไลน์',
    avatarSrc: '/images/avatars/3.png'
  },
  {
    desc: 'Badge ที่ได้รับจาก SafePay ช่วยสร้างความน่าเชื่อถือให้ร้านเรามากขึ้น ลูกค้าใหม่กล้าซื้อมากขึ้น',
    svg: <Coinbase color='#0199ff' />,
    rating: 4,
    name: 'มานี สุขใจ',
    position: 'เจ้าของร้านเสื้อผ้า',
    avatarSrc: '/images/avatars/4.png'
  },
  {
    desc: 'สมัครง่าย ใช้งานง่าย ไม่ต้องติดตั้งอะไรเพิ่ม ทำงานบนเว็บได้เลย แนะนำเลยสำหรับคนขายของออนไลน์',
    svg: <Dribbble color='#ea4c89' />,
    rating: 5,
    name: 'ปรีชา ค้าขาย',
    position: 'ผู้ขายใน Facebook',
    avatarSrc: '/images/avatars/5.png'
  },
  {
    desc: 'Trust Score ช่วยให้เราดูได้ว่าผู้ขายคนไหนน่าเชื่อถือ ซื้อของออนไลน์ได้อย่างสบายใจมากขึ้น',
    svg: <Pinterest color='#ee7676' />,
    rating: 5,
    name: 'รัตนา ช้อปปิ้ง',
    position: 'นักช้อปออนไลน์',
    avatarSrc: '/images/avatars/6.png'
  },
  {
    desc: 'ระบบรีวิวที่ตรวจสอบได้จริงช่วยให้ร้านเราดูน่าเชื่อถือ ลูกค้าเชื่อมั่นมากขึ้นเยอะเลย',
    svg: <HubSpot color='#FF5C35' />,
    rating: 5,
    name: 'ณัฐพล ขายดี',
    position: 'เจ้าของร้านใน Shopee',
    avatarSrc: '/images/avatars/7.png'
  },
  {
    desc: 'SafePay ทำให้เรามั่นใจในการซื้อของจากคนแปลกหน้า ดู Trust Score แล้วรู้เลยว่าน่าเชื่อถือแค่ไหน',
    svg: <Airbnb color='#FF5A60' />,
    rating: 4,
    name: 'พิมพ์ใจ ช้อปเก่ง',
    position: 'นักช้อปตัวยง',
    avatarSrc: '/images/avatars/8.png'
  },
  {
    desc: 'ใช้ SafePay มาครึ่งปี ธุรกรรมราบรื่นทุกครั้ง ไม่เคยมีปัญหาเรื่องโกงเลย',
    svg: <Coinbase color='#0199ff' />,
    rating: 5,
    name: 'อภิชาติ ค้าออนไลน์',
    position: 'พ่อค้าออนไลน์อาชีพ',
    avatarSrc: '/images/avatars/9.png'
  },
  {
    desc: 'แนะนำ SafePay ให้เพื่อนๆ ที่ขายของออนไลน์ทุกคน ช่วยสร้างความมั่นใจให้ลูกค้าได้จริง',
    svg: <Dribbble color='#ea4c89' />,
    rating: 5,
    name: 'สุดา รีวิวจริง',
    position: 'เจ้าของร้านเครื่องสำอาง',
    avatarSrc: '/images/avatars/10.png'
  }
]

const CustomerReviews = () => {
  // Hooks
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: {
        perView: 3,
        origin: 'auto'
      },
      breakpoints: {
        '(max-width: 1200px)': {
          slides: {
            perView: 2,
            spacing: 10,
            origin: 'auto'
          }
        },
        '(max-width: 900px)': {
          slides: {
            perView: 2,
            spacing: 10
          }
        },
        '(max-width: 600px)': {
          slides: {
            perView: 1,
            spacing: 10,
            origin: 'center'
          }
        }
      }
    },
    [
      slider => {
        let timeout: ReturnType<typeof setTimeout>
        const mouseOver = false

        function clearNextTimeout() {
          clearTimeout(timeout)
        }

        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }

        slider.on('created', nextTimeout)
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      }
    ]
  )

  return (
    <section className={classnames('flex flex-col gap-8 plb-[100px] bg-backgroundDefault', styles.sectionStartRadius)}>
      <div
        className={classnames('flex max-md:flex-col max-sm:flex-wrap is-full gap-6', frontCommonStyles.layoutSpacing)}
      >
        <div className='flex flex-col gap-1 bs-full justify-center items-center lg:items-start is-full md:is-[30%] mlb-auto sm:pbs-2'>
          <Chip label='รีวิวจากผู้ใช้งานจริง' variant='tonal' color='primary' size='small' className='mbe-3' />
          <div className='flex flex-col gap-y-1 flex-wrap max-lg:text-center '>
            <Typography color='text.primary' variant='h4'>
              <span className='relative z-[1] font-extrabold'>
                เสียงจากผู้ใช้งาน
                <img
                  src='/images/front-pages/landing-page/bg-shape.png'
                  alt='bg-shape'
                  className='absolute block-end-0 z-[1] bs-[40%] is-[132%] inline-start-[-8%] block-start-[17px]'
                />
              </span>
            </Typography>
            <Typography>ดูว่าผู้ใช้งานของเราพูดถึง SafePay อย่างไร</Typography>
          </div>
          <div className='flex gap-x-4 mbs-11'>
            <CustomIconButton color='primary' variant='tonal' onClick={() => instanceRef.current?.prev()}>
              <i className='tabler-chevron-left' />
            </CustomIconButton>
            <CustomIconButton color='primary' variant='tonal' onClick={() => instanceRef.current?.next()}>
              <i className='tabler-chevron-right' />
            </CustomIconButton>
          </div>
        </div>
        <div className='is-full md:is-[70%]'>
          <AppKeenSlider>
            <div ref={sliderRef} className='keen-slider mbe-6'>
              {data.map((item, index) => (
                <div key={index} className='keen-slider__slide flex p-4 sm:p-3'>
                  <Card elevation={8} className='flex items-start'>
                    <CardContent className='p-8 items-center mlb-auto'>
                      <div className='flex flex-col gap-4 items-start'>
                        {item.svg}
                        <Typography>{item.desc}</Typography>
                        <Rating value={item.rating} readOnly />
                        <div className='flex items-center gap-x-3'>
                          <CustomAvatar size={32} src={item.avatarSrc} alt={item.name} />
                          <div className='flex flex-col items-start'>
                            <Typography color='text.primary' className='font-medium'>
                              {item.name}
                            </Typography>
                            <Typography variant='body2' color='text.disabled'>
                              {item.position}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </AppKeenSlider>
        </div>
      </div>
      <Divider />
      <div className='flex flex-wrap items-center justify-center gap-x-16 gap-y-6 mli-3'>
        <Airbnb color='var(--mui-palette-text-secondary)' />
        <Netflix color='var(--mui-palette-text-secondary)' />
        <Dribbble color='var(--mui-palette-text-secondary)' />
        <Coinbase color='var(--mui-palette-text-secondary)' />
        <Pinterest color='var(--mui-palette-text-secondary)' />
      </div>
    </section>
  )
}

export default CustomerReviews
