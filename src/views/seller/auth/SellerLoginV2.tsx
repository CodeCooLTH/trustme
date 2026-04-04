'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// Third-party Imports
import classnames from 'classnames'
import { signIn } from 'next-auth/react'

// Type Imports
import type { SystemMode } from '@core/types'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Styled Custom Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 680,
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
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

type Step = 'idle' | 'otp-sent' | 'loading'

const SellerLoginV2 = ({ mode }: { mode: SystemMode }) => {
  const router = useRouter()

  // States
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<Step>('idle')
  const [error, setError] = useState('')
  const [fbLoading, setFbLoading] = useState(false)

  // Shop creation state
  const [showOpenShop, setShowOpenShop] = useState(false)
  const [shopName, setShopName] = useState('')
  const [businessType, setBusinessType] = useState('INDIVIDUAL')
  const [category, setCategory] = useState('')
  const [shopSaving, setShopSaving] = useState(false)
  const [shopError, setShopError] = useState('')

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  // Hooks
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

  const handleVerifyOtp = async () => {
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
        setError('OTP ไม่ถูกต้องหรือหมดอายุ')
        setStep('otp-sent')
      } else {
        const shopRes = await fetch('/api/shops')
        const shopData = await shopRes.json()

        if (shopData && shopData.id) {
          router.push('/dashboard')
        } else {
          setShowOpenShop(true)
          setStep('idle')
        }
      }
    } catch {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่')
      setStep('otp-sent')
    }
  }

  const handleFacebookLogin = async () => {
    setFbLoading(true)
    setError('')

    try {
      await signIn('facebook', { callbackUrl: '/dashboard' })
    } catch {
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบด้วย Facebook')
      setFbLoading(false)
    }
  }

  const handleOpenShop = async () => {
    if (!shopName.trim()) {
      setShopError('กรุณากรอกชื่อร้านค้า')

      return
    }

    setShopError('')
    setShopSaving(true)

    try {
      const res = await fetch('/api/shops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shopName: shopName.trim(), businessType, category: category.trim() })
      })

      if (!res.ok) {
        const data = await res.json()

        throw new Error(data.error || 'ไม่สามารถสร้างร้านค้าได้')
      }

      router.push('/dashboard')
    } catch (err: any) {
      setShopError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่')
    } finally {
      setShopSaving(false)
    }
  }

  // Shop creation form (shown after login if user has no shop)
  if (showOpenShop) {
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
          <LoginIllustration src={characterIllustration} alt='character-illustration' />
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
              <Typography variant='h4'>เปิดร้านค้า</Typography>
              <Typography>กรอกข้อมูลร้านค้าของคุณเพื่อเริ่มขาย</Typography>
            </div>

            {shopError && <Alert severity='error'>{shopError}</Alert>}

            <div className='flex flex-col gap-6'>
              <CustomTextField
                autoFocus
                fullWidth
                label='ชื่อร้านค้า'
                value={shopName}
                onChange={e => setShopName(e.target.value)}
              />
              <CustomTextField
                select
                fullWidth
                label='ประเภทธุรกิจ'
                value={businessType}
                onChange={e => setBusinessType(e.target.value)}
              >
                <MenuItem value='INDIVIDUAL'>บุคคลทั่วไป</MenuItem>
                <MenuItem value='COMPANY'>บริษัท / องค์กร</MenuItem>
              </CustomTextField>
              <CustomTextField
                fullWidth
                label='หมวดหมู่สินค้า'
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder='เช่น อิเล็กทรอนิกส์, แฟชั่น, อาหาร'
              />
              <Button
                fullWidth
                variant='contained'
                onClick={handleOpenShop}
                disabled={shopSaving || !shopName.trim()}
                startIcon={shopSaving ? <CircularProgress size={18} color='inherit' /> : null}
              >
                {shopSaving ? 'กำลังสร้างร้านค้า...' : 'เปิดร้านค้า'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
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
        <LoginIllustration src={characterIllustration} alt='character-illustration' />
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
            <Typography variant='h4'>{`ยินดีต้อนรับสู่ ${themeConfig.templateName}! 👋🏻`}</Typography>
            <Typography>เข้าสู่ระบบเพื่อจัดการร้านค้าของคุณ</Typography>
          </div>

          {error && <Alert severity='error'>{error}</Alert>}

          <div className='flex flex-col gap-6'>
            {/* Facebook Login */}
            <Button
              fullWidth
              variant='contained'
              onClick={handleFacebookLogin}
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
              {fbLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบด้วย Facebook'}
            </Button>

            <Divider className='gap-2 text-textPrimary'>หรือ</Divider>

            {/* Phone OTP */}
            <CustomTextField
              autoFocus
              fullWidth
              label='เบอร์โทรศัพท์'
              placeholder='เช่น 0812345678'
              value={phone}
              onChange={e => setPhone(e.target.value)}
              disabled={step === 'otp-sent' || isLoading}
              type='tel'
              slotProps={{ htmlInput: { maxLength: 10 } }}
            />

            {step !== 'otp-sent' && (
              <Button
                fullWidth
                variant='outlined'
                onClick={handleSendOtp}
                disabled={isLoading || !phone.trim()}
                startIcon={isLoading ? <CircularProgress size={18} color='inherit' /> : null}
              >
                {isLoading ? 'กำลังส่ง OTP...' : 'ส่ง OTP'}
              </Button>
            )}

            {step === 'otp-sent' && (
              <>
                <CustomTextField
                  fullWidth
                  label='รหัส OTP'
                  placeholder='กรอกรหัส OTP 6 หลัก'
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  type='number'
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
                    onClick={handleVerifyOtp}
                    disabled={isLoading || !otp.trim()}
                    startIcon={isLoading ? <CircularProgress size={18} color='inherit' /> : null}
                    className='flex-[2]'
                  >
                    {isLoading ? 'กำลังยืนยัน...' : 'ยืนยัน'}
                  </Button>
                </div>
                <Typography
                  className='text-center cursor-pointer'
                  color='primary.main'
                  onClick={handleSendOtp}
                >
                  ส่ง OTP ใหม่อีกครั้ง
                </Typography>
              </>
            )}

            <Divider />

            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>ต้องการซื้อสินค้า?</Typography>
              <Typography component={Link} href='/login' color='primary.main'>
                เข้าสู่ระบบผู้ซื้อ
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerLoginV2
