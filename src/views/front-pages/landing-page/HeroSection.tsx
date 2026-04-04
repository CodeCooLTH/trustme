// Next Imports
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useColorScheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { SystemMode } from '@core/types'

// Styles Imports
import styles from './styles.module.css'
import frontCommonStyles from '@views/front-pages/styles.module.css'

const HeroSection = ({ mode }: { mode: SystemMode }) => {
  // Hooks
  const { mode: muiMode } = useColorScheme()

  const _mode = (muiMode === 'system' ? mode : muiMode) || mode

  return (
    <section id='home' className='overflow-hidden pbs-[75px] -mbs-[75px] relative'>
      <div
        className={classnames('bs-[95%] sm:bs-[85%] md:bs-[80%]', styles.heroSectionBg, {
          [styles.bgLight]: _mode === 'light',
          [styles.bgDark]: _mode === 'dark'
        })}
      />
      <div className={classnames('pbs-[88px] overflow-hidden', frontCommonStyles.layoutSpacing)}>
        <div className='md:max-is-[700px] mbs-0 mbe-7 mli-auto text-center relative'>
          <Typography className={classnames('font-extrabold sm:text-[42px] text-3xl mbe-4 leading-[48px]', styles.heroText)}>
            SafePay
          </Typography>
          <Typography variant='h5' className='font-medium mbe-2' color='text.primary'>
            ระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์
          </Typography>
          <Typography color='text.secondary' className='mbe-6 max-is-[600px] mli-auto'>
            SafePay ช่วยให้ผู้ซื้อและผู้ขายสร้างความน่าเชื่อถือผ่านการยืนยันตัวตน การสะสม Trust Score
            และการแสดง Badge เพื่อให้ทุกธุรกรรมออนไลน์ปลอดภัยและโปร่งใส
          </Typography>
          <div className='flex mbs-6 items-baseline justify-center gap-4'>
            <Button component={Link} size='large' href='/register' variant='contained' color='primary'>
              เริ่มต้นใช้งานฟรี
            </Button>
            <Button component={Link} size='large' href='/login' variant='tonal' color='primary'>
              เข้าสู่ระบบ
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
