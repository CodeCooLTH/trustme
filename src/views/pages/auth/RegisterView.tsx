'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Third-party Imports
import { signIn } from 'next-auth/react'
import classnames from 'classnames'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

// Type Imports
import type { SystemMode } from '@core/types'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Styled Custom Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 600,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 345,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

type Step = 'idle' | 'otp-sent' | 'loading'

const RegisterView = ({ mode }: { mode: SystemMode }) => {
  // States
  const [displayName, setDisplayName] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<Step>('idle')
  const [error, setError] = useState('')
  const [fbLoading, setFbLoading] = useState(false)

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-register-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-register-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-register-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-register-light-border.png'

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const isLoading = step === 'loading'

  const handleSendOtp = async () => {
    if (!displayName.trim()) {
      setError('กรุณากรอกชื่อที่แสดง')

      return
    }

    if (!phone.trim()) {
      setError('กรุณากรอกเบอร์โทรศัพท์')

      return
    }

    setError('')
    setStep('loading')

    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: phone.trim(), type: 'PHONE' })
      })

      if (!res.ok) {
        const data = await res.json()

        throw new Error(data.error || 'ไม่สามารถส่ง OTP ได้')
      }

      setStep('otp-sent')
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่')
      setStep('idle')
    }
  }

  const handleVerifyAndRegister = async () => {
    if (!otp.trim()) {
      setError('กรุณากรอก OTP')

      return
    }

    setError('')
    setStep('loading')

    try {
      const result = await signIn('phone-otp', {
        phone: phone.trim(),
        otp: otp.trim(),
        redirect: false
      })

      if (result?.error) {
        setError('OTP ไม่ถูกต้องหรือหมดอายุ กรุณาลองใหม่')
        setStep('otp-sent')
      } else {
        router.push('/dashboard')
      }
    } catch {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่')
      setStep('otp-sent')
    }
  }

  const handleFacebookRegister = async () => {
    if (!displayName.trim()) {
      setError('กรุณากรอกชื่อที่แสดงก่อนสมัครด้วย Facebook')

      return
    }

    setFbLoading(true)
    setError('')

    try {
      await signIn('facebook', { callbackUrl: '/dashboard' })
    } catch {
      setError('เกิดข้อผิดพลาดในการสมัครด้วย Facebook')
      setFbLoading(false)
    }
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <RegisterIllustration src={characterIllustration} alt='character-illustration' />
        {!hidden && (
          <MaskImg
            alt='mask'
            src={authBackground}
            className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
          />
        )}
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link href='/' className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </Link>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>{`เริ่มต้นกับ SafePay 🚀`}</Typography>
            <Typography>สร้างความน่าเชื่อถือให้การซื้อขายออนไลน์ของคุณ</Typography>
          </div>

          {error && (
            <Alert severity='error'>
              {error}
            </Alert>
          )}

          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
            {/* Display Name */}
            <CustomTextField
              autoFocus
              fullWidth
              label='ชื่อที่แสดง'
              placeholder='เช่น สมชาย ใจดี'
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              disabled={step === 'otp-sent' || isLoading}
            />

            {/* Facebook Register */}
            <Button
              fullWidth
              variant='contained'
              onClick={handleFacebookRegister}
              disabled={fbLoading || isLoading}
              startIcon={
                fbLoading ? (
                  <CircularProgress size={18} color='inherit' />
                ) : (
                  <i className='tabler-brand-facebook-filled' />
                )
              }
              sx={{
                bgcolor: '#1877F2',
                '&:hover': { bgcolor: '#166FE5' }
              }}
            >
              {fbLoading ? 'กำลังสมัคร...' : 'สมัครด้วย Facebook'}
            </Button>

            <Divider className='gap-2 text-textPrimary'>หรือสมัครด้วยเบอร์โทรศัพท์</Divider>

            {/* Phone OTP */}
            <CustomTextField
              fullWidth
              label='เบอร์โทรศัพท์'
              placeholder='เช่น 0812345678'
              type='tel'
              value={phone}
              onChange={e => setPhone(e.target.value)}
              disabled={step === 'otp-sent' || isLoading}
              slotProps={{ htmlInput: { maxLength: 10 } }}
            />

            {step !== 'otp-sent' && (
              <Button
                fullWidth
                variant='contained'
                onClick={handleSendOtp}
                disabled={isLoading || !phone.trim() || !displayName.trim()}
                startIcon={isLoading ? <CircularProgress size={18} color='inherit' /> : null}
              >
                {isLoading ? 'กำลังส่ง OTP...' : 'ส่ง OTP'}
              </Button>
            )}

            {step === 'otp-sent' && (
              <>
                <Alert severity='info'>ส่ง OTP ไปที่ {phone} แล้ว</Alert>
                <CustomTextField
                  fullWidth
                  label='รหัส OTP'
                  placeholder='กรอกรหัส OTP 6 หลัก'
                  type='number'
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  slotProps={{ htmlInput: { maxLength: 6 } }}
                />
                <div className='flex gap-4'>
                  <Button
                    variant='tonal'
                    color='secondary'
                    onClick={() => {
                      setStep('idle')
                      setOtp('')
                    }}
                    className='flex-1'
                  >
                    เปลี่ยนเบอร์
                  </Button>
                  <Button
                    fullWidth
                    variant='contained'
                    onClick={handleVerifyAndRegister}
                    disabled={isLoading || !otp.trim()}
                    startIcon={isLoading ? <CircularProgress size={18} color='inherit' /> : null}
                    className='flex-[2]'
                  >
                    {isLoading ? 'กำลังสมัคร...' : 'ยืนยันและสมัคร'}
                  </Button>
                </div>
                <Button
                  variant='text'
                  size='small'
                  onClick={handleSendOtp}
                  disabled={isLoading}
                  className='self-center'
                >
                  ส่ง OTP ใหม่อีกครั้ง
                </Button>
              </>
            )}

            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>มีบัญชีอยู่แล้ว?</Typography>
              <Typography component={Link} href='/login' color='primary.main'>
                เข้าสู่ระบบ
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterView
