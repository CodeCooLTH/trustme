'use client'

/**
 * Lock screen สำหรับหน้า /o/[token] — buyer ต้องกรอกเบอร์ที่ตรงกับ order
 * ก่อนจะเห็น order detail
 *
 * Base: theme/vuexy/typescript-version/full-version/src/views/pages/auth/TwoStepsV1.tsx
 *       (shape เดียวกัน — AuthIllustrationWrapper + Card + Logo + heading +
 *        masked hint + single input + verify button) แต่เปลี่ยน OTPInput
 *        เป็น CustomTextField เบอร์โทร
 *
 * UX ใหม่ 2026-04-18 — buyer พิสูจน์ตัวตนด้วย "การรู้เบอร์" แทน OTP full flow
 */
import { useState, type FormEvent } from 'react'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

import CustomTextField from '@core/components/mui/TextField'
import Logo from '@components/layout/shared/Logo'

import AuthIllustrationWrapper from '@/views/pages/auth/AuthIllustrationWrapper'
import { currentYear, META_DATA } from '@/config/constants'

type Props = {
  /** Short order token hint (e.g. "#546cf3c0") */
  orderHint: string
  /** เรียกเมื่อ user กรอกเบอร์ถูก — รับ phone string ที่ผ่าน API แล้ว */
  onUnlock: (phone: string) => void | Promise<void>
}

export default function PhoneUnlock({ orderHint, onUnlock }: Props) {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!/^0[0-9]{9}$/.test(phone)) {
      setError('เบอร์ต้องขึ้นต้นด้วย 0 และมี 10 หลัก')
      return
    }

    setLoading(true)
    try {
      await onUnlock(phone)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'เบอร์นี้ไม่ตรงกับคำสั่งซื้อ'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-bs-[100dvh] flex-col justify-start sm:justify-center items-start sm:items-center overflow-y-auto p-4 sm:p-6 pt-10 sm:pt-0'>
      <AuthIllustrationWrapper>
        <Card className='flex flex-col sm:is-[450px]'>
          <CardContent className='!p-6 sm:!p-12'>
            <div className='flex justify-center mbe-6'>
              <Logo />
            </div>
            <div className='flex flex-col gap-1 mbe-6'>
              <Typography variant='h4'>ยืนยันเบอร์โทร 💬</Typography>
              <Typography>
                กรอกเบอร์โทรของคุณเพื่อเข้าดูคำสั่งซื้อ {orderHint}
              </Typography>
            </div>
            <form onSubmit={handleSubmit} noValidate autoComplete='off' className='flex flex-col gap-6'>
              <CustomTextField
                autoFocus
                fullWidth
                label='เบอร์โทรศัพท์'
                placeholder='08xxxxxxxx'
                type='tel'
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                slotProps={{
                  htmlInput: { inputMode: 'numeric', autoComplete: 'tel', maxLength: 10 },
                }}
                error={!!error}
                helperText={error}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                disabled={loading || phone.length !== 10}
                startIcon={loading ? <CircularProgress size={18} color='inherit' /> : undefined}
              >
                {loading ? 'กำลังตรวจสอบ…' : 'เข้าดูคำสั่งซื้อ'}
              </Button>
            </form>

            <Typography className='mt-7 text-center text-sm' color='text.disabled'>
              &copy; {currentYear} {META_DATA.name} — by {META_DATA.author}
            </Typography>
          </CardContent>
        </Card>
      </AuthIllustrationWrapper>
    </div>
  )
}
