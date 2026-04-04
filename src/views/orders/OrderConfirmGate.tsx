'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'

// Third-party Imports
import { OTPInput } from 'input-otp'
import type { SlotProps } from 'input-otp'
import classnames from 'classnames'

// Component Imports
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'
import TrustScoreBadge from '@/components/trust-score-badge'

// Styled Component Imports
import AuthIllustrationWrapper from '@/views/pages/auth/AuthIllustrationWrapper'

// Style Imports
import styles from '@/libs/styles/inputOtp.module.css'

// Types
interface OrderItem {
  name: string
  qty: number
  price: number
}

interface OrderSummary {
  shopName: string
  sellerUsername: string
  sellerTrustScore: number
  items: OrderItem[]
  totalAmount: number
  token: string
}

type Step = 'phone' | 'otp'

// OTP Slot component (from TwoStepsV1)
const Slot = (props: SlotProps) => {
  return (
    <div className={classnames(styles.slot, { [styles.slotActive]: props.isActive })}>
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  )
}

const FakeCaret = () => {
  return (
    <div className={styles.fakeCaret}>
      <div className='w-px h-5 bg-textPrimary' />
    </div>
  )
}

interface Props {
  order: OrderSummary
  onConfirmed: () => void
}

const OrderConfirmGate = ({ order, onConfirmed }: Props) => {
  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSendOtp = async () => {
    if (!phone.trim() || phone.trim().length < 9) {
      setError('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง')

      return
    }

    setError('')
    setLoading(true)

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

      setStep('otp')
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 6) {
      setError('กรุณากรอก OTP 6 หลัก')

      return
    }

    setError('')
    setLoading(true)

    try {
      const res = await fetch(`/api/orders/${order.token}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: phone.trim(), contactType: 'PHONE', otp: otp.trim() })
      })

      if (!res.ok) {
        const data = await res.json()

        throw new Error(data.error || 'OTP ไม่ถูกต้องหรือหมดอายุ')
      }

      onConfirmed()
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthIllustrationWrapper>
      <Card className='flex flex-col sm:is-[480px]'>
        <CardContent className='sm:!p-12'>
          <Link href='/' className='flex justify-center mbe-6'>
            <Logo />
          </Link>

          {/* Seller info */}
          <div className='flex items-center gap-3 mbe-4'>
            <Avatar sx={{ width: 40, height: 40, bgcolor: 'var(--mui-palette-primary-main)', fontSize: '1rem' }}>
              {order.shopName.charAt(0).toUpperCase()}
            </Avatar>
            <div>
              <Typography color='text.primary' className='font-medium'>
                {order.shopName}
              </Typography>
              <TrustScoreBadge score={order.sellerTrustScore} />
            </div>
          </div>

          {/* Order summary */}
          <div className='bg-actionHover rounded p-4 mbe-6'>
            {order.items.map((item, idx) => (
              <div key={idx} className='flex justify-between items-center mbe-1'>
                <Typography variant='body2'>{item.name} x{item.qty}</Typography>
                <Typography variant='body2'>฿{(item.qty * item.price).toLocaleString('th-TH')}</Typography>
              </div>
            ))}
            <Divider className='mlb-2' />
            <div className='flex justify-between items-center'>
              <Typography className='font-medium'>ยอดรวม</Typography>
              <Typography className='font-medium' color='primary.main'>
                ฿{order.totalAmount.toLocaleString('th-TH')}
              </Typography>
            </div>
          </div>

          {/* Step 1: Phone Input */}
          {step === 'phone' && (
            <>
              <div className='flex flex-col gap-1 mbe-6'>
                <Typography variant='h4'>ยืนยันคำสั่งซื้อ 📱</Typography>
                <Typography>กรุณากรอกเบอร์โทรศัพท์ของคุณเพื่อรับรหัส OTP</Typography>
              </div>

              {error && <Alert severity='error' className='mbe-4'>{error}</Alert>}

              <form
                noValidate
                autoComplete='off'
                onSubmit={e => { e.preventDefault(); handleSendOtp() }}
                className='flex flex-col gap-6'
              >
                <CustomTextField
                  autoFocus
                  fullWidth
                  label='เบอร์โทรศัพท์'
                  placeholder='เช่น 0812345678'
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  type='tel'
                  slotProps={{ input: { inputProps: { maxLength: 10 } } }}
                />
                <Button
                  fullWidth
                  variant='contained'
                  type='submit'
                  disabled={loading || !phone.trim()}
                  startIcon={loading ? <CircularProgress size={18} color='inherit' /> : undefined}
                >
                  {loading ? 'กำลังส่ง OTP...' : 'ส่ง OTP'}
                </Button>
              </form>
            </>
          )}

          {/* Step 2: OTP Input (TwoStepsV1 pattern) */}
          {step === 'otp' && (
            <>
              <div className='flex flex-col gap-1 mbe-6'>
                <Typography variant='h4'>กรอกรหัส OTP 💬</Typography>
                <Typography>เราส่งรหัสยืนยันไปที่เบอร์โทรศัพท์ของคุณแล้ว</Typography>
                <Typography className='font-medium' color='text.primary'>
                  {phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3')}
                </Typography>
              </div>

              {error && <Alert severity='error' className='mbe-4'>{error}</Alert>}

              <form
                noValidate
                autoComplete='off'
                onSubmit={e => { e.preventDefault(); handleVerifyOtp() }}
                className='flex flex-col gap-6'
              >
                <div className='flex flex-col gap-2'>
                  <Typography>กรอกรหัส OTP 6 หลัก</Typography>
                  <OTPInput
                    onChange={setOtp}
                    value={otp ?? ''}
                    maxLength={6}
                    containerClassName='flex items-center'
                    render={({ slots }) => (
                      <div className='flex items-center justify-between w-full gap-4'>
                        {slots.slice(0, 6).map((slot, idx) => (
                          <Slot key={idx} {...slot} />
                        ))}
                      </div>
                    )}
                  />
                </div>
                <Button
                  fullWidth
                  variant='contained'
                  type='submit'
                  disabled={loading || !otp || otp.length < 6}
                  startIcon={loading ? <CircularProgress size={18} color='inherit' /> : undefined}
                >
                  {loading ? 'กำลังยืนยัน...' : 'ยืนยันคำสั่งซื้อ'}
                </Button>
                <div className='flex justify-center items-center flex-wrap gap-2'>
                  <Typography>ไม่ได้รับรหัส?</Typography>
                  <Typography
                    color='primary.main'
                    component={Link}
                    href='/'
                    onClick={e => { e.preventDefault(); handleSendOtp() }}
                  >
                    ส่งอีกครั้ง
                  </Typography>
                </div>
                <Button
                  variant='tonal'
                  color='secondary'
                  onClick={() => { setStep('phone'); setOtp(null); setError('') }}
                >
                  เปลี่ยนเบอร์โทรศัพท์
                </Button>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </AuthIllustrationWrapper>
  )
}

export default OrderConfirmGate
