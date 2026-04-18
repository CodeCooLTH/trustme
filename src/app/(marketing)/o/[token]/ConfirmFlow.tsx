'use client'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useState, type FormEvent } from 'react'
import { toast } from 'react-toastify'

import CustomTextField from '@core/components/mui/TextField'

type Props = { token: string }

type Phase = 'contact' | 'otp'

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
      <CardContent className='flex flex-col gap-4'>
        <Typography variant='h6'>ยืนยันคำสั่งซื้อ</Typography>
        <Typography color='text.secondary' className='text-sm'>
          ยืนยันผ่านเบอร์โทรหรืออีเมลของคุณ โดยไม่จำเป็นต้องสมัครสมาชิก
        </Typography>

        {phase === 'contact' && (
          <form onSubmit={sendOtp} noValidate className='flex flex-col gap-4'>
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
          <form onSubmit={confirmOrder} noValidate className='flex flex-col gap-4'>
            <Typography className='text-sm'>ส่ง OTP ไปยัง {contact}</Typography>
            <CustomTextField
              fullWidth
              label='รหัส OTP 6 หลัก'
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              autoFocus
              slotProps={{
                htmlInput: { inputMode: 'numeric', maxLength: 6, className: 'text-center !text-xl' },
              }}
            />
            <Button
              type='submit'
              variant='contained'
              fullWidth
              disabled={loading || otp.length !== 6}
            >
              {loading ? 'กำลังยืนยัน…' : 'ยืนยันคำสั่งซื้อ'}
            </Button>
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
          </form>
        )}
      </CardContent>
    </Card>
  )
}
