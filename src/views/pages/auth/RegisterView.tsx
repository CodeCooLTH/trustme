'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Third-party Imports
import { signIn } from 'next-auth/react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Styled Component Imports
import AuthIllustrationWrapper from './AuthIllustrationWrapper'

type Step = 'idle' | 'otp-sent' | 'loading'

const RegisterView = () => {
  // States
  const [displayName, setDisplayName] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<Step>('idle')
  const [error, setError] = useState('')
  const [fbLoading, setFbLoading] = useState(false)

  // Hooks
  const router = useRouter()

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
    <AuthIllustrationWrapper>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='sm:!p-12'>
          <Link href='/' className='flex justify-center mbe-6'>
            <Logo />
          </Link>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>{`สมัครสมาชิก ${themeConfig.templateName}`}</Typography>
            <Typography>สร้างบัญชีเพื่อเริ่มสร้างความน่าเชื่อถือของคุณ</Typography>
          </div>

          {error && (
            <Alert severity='error' className='mbe-6'>
              {error}
            </Alert>
          )}

          <div className='flex flex-col gap-6'>
            {/* Display Name */}
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
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
            </form>

            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>มีบัญชีอยู่แล้ว?</Typography>
              <Typography component={Link} href='/login' color='primary.main'>
                เข้าสู่ระบบ
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </AuthIllustrationWrapper>
  )
}

export default RegisterView
