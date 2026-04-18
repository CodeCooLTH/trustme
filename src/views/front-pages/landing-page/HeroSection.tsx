// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { SystemMode } from '@core/types'

// Component Imports
import { LinkButton } from '@/app/(marketing)/_components/mui-link'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

// Styles Imports
import styles from './styles.module.css'
import frontCommonStyles from '@views/front-pages/styles.module.css'

const HeroSection = ({ mode }: { mode: SystemMode }) => {
  // States
  const [transform, setTransform] = useState('')

  // Vars
  const dashboardImageLight = '/images/front-pages/landing-page/hero-dashboard-light.png'
  const dashboardImageDark = '/images/front-pages/landing-page/hero-dashboard-dark.png'
  const elementsImageLight = '/images/front-pages/landing-page/hero-elements-light.png'
  const elementsImageDark = '/images/front-pages/landing-page/hero-elements-dark.png'
  const heroSectionBgLight = '/images/front-pages/landing-page/hero-bg-light.png'
  const heroSectionBgDark = '/images/front-pages/landing-page/hero-bg-dark.png'

  // Hooks
  const { mode: muiMode } = useColorScheme()
  const dashboardImage = useImageVariant(mode, dashboardImageLight, dashboardImageDark)
  const elementsImage = useImageVariant(mode, elementsImageLight, elementsImageDark)
  const heroSectionBg = useImageVariant(mode, heroSectionBgLight, heroSectionBgDark)

  const _mode = (muiMode === 'system' ? mode : muiMode) || mode
  const isAboveLgScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleMouseMove = (event: MouseEvent) => {
        const rotateX = (window.innerHeight - 2 * event.clientY) / 100
        const rotateY = (window.innerWidth - 2 * event.clientX) / 100

        setTransform(
          `perspective(1200px) rotateX(${rotateX < -40 ? -20 : rotateX}deg) rotateY(${rotateY}deg) scale3d(1,1,1)`
        )
      }

      // ผูก parallax mousemove เฉพาะจอ lg ขึ้นไป — mobile ไม่มี pointer เลยไม่ต้องเสีย event listener
      if (isAboveLgScreen) {
        window.addEventListener('mousemove', handleMouseMove)

        return () => {
          window.removeEventListener('mousemove', handleMouseMove)
        }
      }
    }
  }, [isAboveLgScreen])

  return (
    <section id='home' className='overflow-hidden pbs-[75px] -mbs-[75px] relative'>
      <img
        src={heroSectionBg}
        alt='hero-bg'
        className={classnames('bs-[95%] sm:bs-[85%] md:bs-[80%]', styles.heroSectionBg, {
          [styles.bgLight]: _mode === 'light',
          [styles.bgDark]: _mode === 'dark'
        })}
      />
      <div className={classnames('pbs-[72px] md:pbs-[88px] overflow-hidden', frontCommonStyles.layoutSpacing)}>
        <div className='md:max-is-[550px] mbs-0 mbe-7 mli-auto text-center relative'>
          <Typography
            className={classnames(
              'font-extrabold text-[1.75rem] sm:text-[2.625rem] mbe-4 leading-tight sm:leading-[48px]',
              styles.heroText
            )}
          >
            ซื้อขายออนไลน์อย่างมั่นใจ ไม่ต้องกลัวมิจฉาชีพ
          </Typography>
          <Typography className='font-medium' color='text.primary'>
            Deep คือระบบสร้างความน่าเชื่อถือผ่านการยืนยันตัวตน Trust Score และ Badge เพื่อให้ทุกดีลเชื่อถือได้
          </Typography>
          <div className='flex mbs-6 items-baseline justify-center relative'>
            <div className='hidden md:flex gap-2 absolute inline-start-[0%] block-start-[41%]'>
              <Typography className='font-medium'>เข้าร่วมกับเรา</Typography>
              <img src='/images/front-pages/landing-page/join-community-arrow.png' alt='arrow' height='48' width='60' />
            </div>
            <div className='flex gap-3 flex-wrap justify-center is-full sm:is-auto'>
              <LinkButton
                size='large'
                href='/auth/sign-up'
                variant='contained'
                color='primary'
                className='w-full sm:w-auto'
              >
                สมัครใช้งาน
              </LinkButton>
              <LinkButton
                size='large'
                href='/auth/sign-in'
                variant='outlined'
                color='primary'
                className='w-full sm:w-auto'
              >
                เข้าสู่ระบบ
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
      <div
        className={classnames('relative text-center', frontCommonStyles.layoutSpacing)}
        style={{ transform: isAboveLgScreen ? transform : 'none' }}
      >
        <Link href='/' target='_blank' className='block relative'>
          <img
            src={dashboardImage}
            alt='dashboard-image'
            className={classnames('mli-auto', styles.heroSecDashboard)}
            sizes='(max-width: 600px) 100vw, (max-width: 1200px) 900px, 1200px'
            fetchPriority='high'
            loading='eager'
          />
          <div className={classnames('absolute', styles.heroSectionElements)}>
            <img src={elementsImage} alt='dashboard-elements' />
          </div>
        </Link>
      </div>
    </section>
  )
}

export default HeroSection
