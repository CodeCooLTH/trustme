'use client'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { toast } from 'react-toastify'

import CustomTextField from '@core/components/mui/TextField'
import Logo from '@components/layout/shared/Logo'

import { currentYear, META_DATA } from '@/config/constants'

export default function VerifyOtpCard() {
  const router = useRouter()
  const params = useSearchParams()

  const phone = params.get('phone') ?? ''
  const mode = (params.get('mode') ?? 'signin') as 'signin' | 'signup'
  const displayName = params.get('name') ?? ''
  const username = params.get('username') ?? ''

  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [resending, setResending] = useState(false)
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    if (!phone) router.replace('/auth/sign-in')
  }, [phone, router])

  const masked = phone
    ? `${'*'.repeat(Math.max(0, phone.length - 4))}${phone.slice(-4)}`
    : ''

  const handleDigit = (i: number, v: string) => {
    const clean = v.replace(/\D/g, '').slice(0, 1)
    const next = [...digits]
    next[i] = clean
    setDigits(next)
    if (clean && i < 5) inputsRef.current[i + 1]?.focus()
  }

  const handleKey = (i: number, e: ReactKeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputsRef.current[i - 1]?.focus()
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    const otp = digits.join('')
    if (otp.length !== 6) {
      setErrorMsg('กรุณากรอกรหัส 6 หลัก')
      return
    }
    setSubmitting(true)
    try {
      const result = await signIn('phone-otp', {
        phone,
        otp,
        mode,
        displayName,
        username,
        redirect: false,
      })
      if (result?.ok) {
        router.push('/')
        return
      }
      setErrorMsg('รหัสไม่ถูกต้องหรือหมดอายุ ลองอีกครั้ง')
    } catch {
      setErrorMsg('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    } finally {
      setSubmitting(false)
    }
  }

  const onResend = async () => {
    if (!phone) return
    setResending(true)
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: phone, type: 'PHONE' }),
      })
      if (res.ok) {
        toast.success('ส่งรหัสใหม่แล้ว')
        setDigits(['', '', '', '', '', ''])
        setErrorMsg(null)
        inputsRef.current[0]?.focus()
      } else {
        toast.error('ส่งรหัสใหม่ไม่สำเร็จ')
      }
    } catch {
      toast.error('ส่งรหัสใหม่ไม่สำเร็จ')
    } finally {
      setResending(false)
    }
  }

  if (!phone) return null

  return (
    <div className='flex min-bs-[100dvh] justify-center items-center p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='sm:!p-12'>
          <div className='flex justify-center mbe-6'>
            <Logo />
          </div>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>ยืนยันรหัส OTP 💬</Typography>
            <Typography>กรอกรหัส 6 หลักที่ส่งไปยังเบอร์ของคุณ</Typography>
            <Typography className='font-medium' color='text.primary'>
              {masked}
            </Typography>
          </div>

          <form onSubmit={onSubmit} noValidate className='flex flex-col gap-6'>
            <div className='flex items-center justify-between gap-3'>
              {digits.map((d, i) => (
                <CustomTextField
                  key={i}
                  inputRef={(el: HTMLInputElement | null) => {
                    inputsRef.current[i] = el
                  }}
                  value={d}
                  onChange={(e) => handleDigit(i, e.target.value)}
                  onKeyDown={(e) => handleKey(i, e)}
                  slotProps={{
                    htmlInput: {
                      inputMode: 'numeric',
                      maxLength: 1,
                      className: 'text-center !text-2xl',
                    },
                  }}
                  autoFocus={i === 0}
                />
              ))}
            </div>

            {errorMsg && (
              <Typography color='error.main' className='text-center text-sm'>
                {errorMsg}
              </Typography>
            )}

            <Button fullWidth variant='contained' type='submit' disabled={submitting}>
              {submitting ? 'กำลังยืนยัน…' : 'ยืนยัน'}
            </Button>

            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>ไม่ได้รับ SMS?</Typography>
              <Typography
                component='button'
                type='button'
                onClick={onResend}
                color='primary.main'
                sx={{
                  background: 'none',
                  border: 0,
                  padding: 0,
                  cursor: resending ? 'default' : 'pointer',
                  opacity: resending ? 0.6 : 1,
                }}
                disabled={resending}
              >
                {resending ? 'กำลังส่ง…' : 'ส่งอีกครั้ง'}
              </Typography>
            </div>
          </form>

          <Typography className='mt-7 text-center text-sm' color='text.disabled'>
            &copy; {currentYear} {META_DATA.name} — by {META_DATA.author}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
