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
    desc: 'ตั้งแต่ใช้ Deep ไม่มีลูกค้าคนไหนถามเรื่องความน่าเชื่อถืออีกเลย Trust Score ช่วยเพิ่มยอดขายได้จริง',
    svg: <Pinterest color='#ee7676' />,
    rating: 5,
    name: 'พิมพ์ชนก ศรีสวัสดิ์',
    position: 'เจ้าของร้าน Preorder แฟชั่น',
    avatarSrc: '/images/avatars/1.png'
  },
  {
    desc: 'ก่อนใช้ Deep ต้องโชว์สลิปให้ลูกค้าดูทุกคน ตอนนี้ไม่ต้องแล้ว ลูกค้าเชื่อตั้งแต่ยังไม่โอน',
    svg: <Netflix color='#d34c4d' />,
    rating: 5,
    name: 'ณัฐพล วงศ์อนันต์',
    position: 'ร้านอุปกรณ์ไอทีมือสอง',
    avatarSrc: '/images/avatars/2.png'
  },
  {
    desc: 'Badge ยืนยันตัวตนช่วยให้มั่นใจว่าไม่ได้คุยกับมิจฉาชีพ ระบบออกแบบมาดีมาก',
    svg: <Airbnb color='#FF5A60' />,
    rating: 5,
    name: 'ศิริพร จันทร์เจริญ',
    position: 'ลูกค้าประจำของร้านออนไลน์',
    avatarSrc: '/images/avatars/3.png'
  },
  {
    desc: 'เปิดร้านใหม่ สร้าง Trust Score ได้ภายในเดือนเดียว ลูกค้าใหม่ไม่ลังเลที่จะกดซื้อ',
    svg: <Coinbase color='#0199ff' />,
    rating: 5,
    name: 'ธนภัทร เหลืองทอง',
    position: 'แอดมินเพจขายเครื่องสำอาง',
    avatarSrc: '/images/avatars/4.png'
  },
  {
    desc: 'ชอบที่ไม่ต้องสมัครก่อนก็กดยืนยัน OTP ได้ เพิ่งรู้ทีหลังว่าประวัติทั้งหมดถูกเก็บให้ตอนสมัคร',
    svg: <Dribbble color='#ea4c89' />,
    rating: 5,
    name: 'วรเมธ ปัญญาดี',
    position: 'ผู้ซื้อสินค้า Digital',
    avatarSrc: '/images/avatars/5.png'
  },
  {
    desc: 'ใช้ Deep กับลูกค้าต่างจังหวัดโดยเฉพาะ ช่วยลดคำถามซ้ำๆ เรื่องความน่าเชื่อถือไปเยอะ',
    svg: <Pinterest color='#ee7676' />,
    rating: 5,
    name: 'สุภาวดี แก้วใส',
    position: 'ร้านต้นไม้ออนไลน์',
    avatarSrc: '/images/avatars/6.png'
  },
  {
    desc: 'ระบบ Order History ละเอียด ลูกค้าดูได้หมดว่าเราเคยขายอะไรไปแล้วบ้าง ทำให้เชื่อมือ',
    svg: <HubSpot color='#FF5C35' />,
    rating: 5,
    name: 'กิตติชัย ภักดีกุล',
    position: 'ร้านของสะสม',
    avatarSrc: '/images/avatars/7.png'
  },
  {
    desc: 'เห็น Badge จดทะเบียนธุรกิจบนโปรไฟล์ก็สบายใจ ตัดสินใจซื้อได้ทันทีไม่ต้องคุยนาน',
    svg: <Airbnb color='#FF5A60' />,
    rating: 5,
    name: 'อรวรรณ พงษ์สุข',
    position: 'ลูกค้าใหม่',
    avatarSrc: '/images/avatars/8.png'
  },
  {
    desc: 'Trust Score ดูเข้าใจง่าย ไม่ต้องคิดเยอะ เลือกร้านที่คะแนนสูงก่อนก็พอ',
    svg: <Coinbase color='#0199ff' />,
    rating: 5,
    name: 'ชลธิชา ศรีโสภา',
    position: 'นักช้อปออนไลน์',
    avatarSrc: '/images/avatars/9.png'
  },
  {
    desc: 'ตั้งแต่ย้ายมาใช้ Deep ยอดเคลมเรื่องมิจฉาชีพลดลงเกินครึ่ง ประหยัดเวลาได้มาก',
    svg: <Dribbble color='#ea4c89' />,
    rating: 5,
    name: 'ภาคิน ทิพย์โสภณ',
    position: 'ผู้ประกอบการรายใหม่',
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
          <Chip label='รีวิวจากผู้ใช้จริง' variant='tonal' color='primary' size='small' className='mbe-3' />
          <div className='flex flex-col gap-y-1 flex-wrap max-lg:text-center '>
            <Typography color='text.primary' variant='h4'>
              <span className='relative z-[1] font-extrabold'>
                ผู้ใช้พูดถึง
                <img
                  src='/images/front-pages/landing-page/bg-shape.png'
                  alt='bg-shape'
                  className='absolute block-end-0 z-[1] bs-[40%] is-[132%] inline-start-[-8%] block-start-[17px]'
                />
              </span>
            </Typography>
            <Typography>เสียงตอบรับจากผู้ซื้อและผู้ขายที่เลือกใช้ Deep</Typography>
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
