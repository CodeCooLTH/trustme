// MUI Imports
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { SystemMode } from '@core/types'

// Component Imports
import { LinkButton } from '@/app/(marketing)/_components/mui-link'

// Hooks Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

const GetStarted = ({ mode }: { mode: SystemMode }) => {
  // Vars
  const getStartedImageLight = '/images/front-pages/landing-page/get-started-bg-light.png'
  const getStartedImageDark = '/images/front-pages/landing-page/get-started-bg-dark.png'

  // Hooks
  const getStartedImage = useImageVariant(mode, getStartedImageLight, getStartedImageDark)

  return (
    <section className='relative py-8 md:py-0'>
      <img
        src={getStartedImage}
        alt='background-image'
        className='absolute is-full flex pointer-events-none bs-full block-end-0'
      />
      <div
        className={classnames(
          'flex items-center flex-wrap justify-center lg:justify-between gap-y-4 gap-x-28',
          frontCommonStyles.layoutSpacing
        )}
      >
        <div className='flex flex-col items-center lg:items-start gap-y-8 py-6 lg:py-9 z-1'>
          <div className='flex flex-col gap-1 items-center lg:items-start'>
            <Typography variant='h3' color='primary.main' className='font-bold text-[2.125rem] text-center sm:text-start'>
              พร้อมเริ่มต้นกับ Deep หรือยัง?
            </Typography>
            <Typography variant='h5' color='text.secondary' className='text-center sm:text-start'>
              สมัครฟรีวันนี้ ทดลองใช้ฟีเจอร์ระดับธุรกิจ 14 วัน
            </Typography>
          </div>
          <div className='flex flex-col sm:flex-row gap-3 flex-wrap is-full sm:is-auto'>
            <LinkButton
              href='/auth/sign-up'
              variant='contained'
              size='large'
              fullWidth
              className='sm:!w-auto'
            >
              สมัครใช้งาน
            </LinkButton>
            <LinkButton href='/auth/sign-in' variant='outlined' size='large' className='sm:!w-auto'>
              เข้าสู่ระบบ
            </LinkButton>
          </div>
        </div>
        <div className='flex pbs-4 lg:pbs-[60px] md:pie-4 z-1'>
          <img
            src='/images/front-pages/landing-page/crm-dashboard.png'
            alt='dashboard-image'
            className='max-is-[600px] is-full rounded-bs'
            loading='lazy'
            sizes='(max-width: 600px) 100vw, 600px'
          />
        </div>
      </div>
    </section>
  )
}

export default GetStarted
