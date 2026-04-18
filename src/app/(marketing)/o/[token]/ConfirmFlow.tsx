'use client'

/**
 * ConfirmFlow — public order OTP confirmation
 *
 * Base:
 *   - theme/vuexy/typescript-version/full-version/src/views/pages/auth/TwoStepsV1.tsx
 *     (OTPInput with Slot + FakeCaret, input-otp library, inputOtp.module.css styles)
 *
 * Same pattern used in R10: src/app/(marketing)/auth/verify-otp/VerifyOtpCard.tsx.
 *
 * Two phases preserved from previous implementation:
 *   1. 'contact' — user enters phone (0XXXXXXXXX) or email, hits POST /api/otp/send
 *   2. 'otp'     — user enters 6-digit code, hits POST /api/orders/[token]/confirm
 * On success: window.location.reload() so the server page re-fetches and renders
 * the next state (review form or post-review thank-you).
 */

import { useState, type FormEvent } from 'react'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import classnames from 'classnames'
import { OTPInput, type SlotProps } from 'input-otp'
import { toast } from 'react-toastify'

import CustomTextField from '@core/components/mui/TextField'

import styles from '@/libs/styles/inputOtp.module.css'

type Props = { token: string }

type Phase = 'contact' | 'otp'

const FakeCaret = () => (
  <div className={styles.fakeCaret}>
    <div className='w-px h-5 bg-textPrimary' />
  </div>
)

const Slot = (props: SlotProps) => (
  <div className={classnames(styles.slot, { [styles.slotActive]: props.isActive })}>
    {props.char !== null && <div>{props.char}</div>}
    {props.hasFakeCaret && <FakeCaret />}
  </div>
)

export default function ConfirmFlow({ token }: Props) {
  const [phase, setPhase] = useState<Phase>('contact')
  const [contact, setContact] = useState('')
  const [contactType, setContactType] = useState<'PHONE' | 'EMAIL'>('PHONE')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)

  const sendOtp = async (e: FormEvent) => {
    e.preventDefault()
    if (!contact) {
      toast.error('กรุณากรอกเบอร์โทรหรืออีเมล')
      return
    }
    const isEmail = contact.includes('@')
    const type: 'PHONE' | 'EMAIL' = isEmail ? 'EMAIL' : 'PHONE'
    if (!isEmail && !/^0[0-9]{9}$/.test(contact)) {
      toast.error('เบอร์ต้องขึ้นต้นด้วย 0 และมี 10 หลัก')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact, type }),
      })
      if (!res.ok) {
        toast.error('ส่ง OTP ไม่สำเร็จ')
        return
      }
      setContactType(type)
      setPhase('otp')
      toast.success('ส่ง OTP แล้ว')
    } finally {
      setLoading(false)
    }
  }

  const confirmOrder = async (e: FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) {
      toast.error('กรุณากรอก OTP 6 หลัก')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/orders/${token}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact, contactType, otp }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'ยืนยันไม่สำเร็จ')
        return
      }
      toast.success('ยืนยันคำสั่งซื้อแล้ว')
      window.location.reload()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className='flex flex-col gap-6 sm:!p-10'>
        <div className='flex flex-col gap-1'>
          <Typography variant='h5'>ยืนยันคำสั่งซื้อ 💬</Typography>
          <Typography color='text.secondary'>
            ยืนยันผ่านเบอร์โทรหรืออีเมลของคุณ โดยไม่จำเป็นต้องสมัครสมาชิก
          </Typography>
        </div>

        {phase === 'contact' && (
          <form onSubmit={sendOtp} noValidate autoComplete='off' className='flex flex-col gap-6'>
            <CustomTextField
              fullWidth
              label='เบอร์โทรหรืออีเมล'
              placeholder='08xxxxxxxx หรือ you@example.com'
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              autoFocus
            />
            <Button
              type='submit'
              variant='contained'
              fullWidth
              disabled={loading || !contact}
            >
              {loading ? 'กำลังส่งรหัส…' : 'รับรหัส OTP'}
            </Button>
          </form>
        )}

        {phase === 'otp' && (
          <form onSubmit={confirmOrder} noValidate autoComplete='off' className='flex flex-col gap-6'>
            <Typography>
              ส่ง OTP ไปยัง{' '}
              <Typography component='span' className='font-medium' color='text.primary'>
                {contact}
              </Typography>
            </Typography>

            <div className='flex flex-col gap-2'>
              <Typography>กรอกรหัสความปลอดภัย 6 หลัก</Typography>
              <OTPInput
                onChange={setOtp}
                value={otp}
                maxLength={6}
                autoFocus
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
              type='submit'
              variant='contained'
              fullWidth
              disabled={loading || otp.length !== 6}
            >
              {loading ? 'กำลังยืนยัน…' : 'ยืนยันคำสั่งซื้อ'}
            </Button>

            <div className='flex justify-center'>
              <Button
                type='button'
                variant='text'
                size='small'
                onClick={() => {
                  setPhase('contact')
                  setOtp('')
                }}
                disabled={loading}
              >
                เปลี่ยนเบอร์/อีเมล
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
