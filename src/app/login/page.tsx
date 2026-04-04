'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Link from 'next/link'

type Step = 'idle' | 'otp-sent' | 'loading'

export default function LoginPage() {
  const router = useRouter()

  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<Step>('idle')
  const [error, setError] = useState('')
  const [fbLoading, setFbLoading] = useState(false)

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
        body: JSON.stringify({ contact: phone.trim(), type: 'PHONE' }),
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
        redirect: false,
      })
      if (result?.error) {
        setError('OTP ไม่ถูกต้องหรือหมดอายุ')
        setStep('otp-sent')
      } else {
        router.push('/dashboard')
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

  const isLoading = step === 'loading'

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        component="header"
        sx={{ py: 2, px: 3, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
      >
        <Typography
          component={Link}
          href="/"
          variant="h6"
          fontWeight="bold"
          color="primary"
          sx={{ textDecoration: 'none' }}
        >
          SafePay
        </Typography>
      </Box>

      {/* Main */}
      <Container maxWidth="sm" sx={{ flex: 1, display: 'flex', alignItems: 'center', py: 6 }}>
        <Card sx={{ width: '100%', boxShadow: 4 }}>
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
              เข้าสู่ระบบ
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
              เข้าสู่ระบบเพื่อใช้งาน SafePay
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Facebook Login */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleFacebookLogin}
              disabled={fbLoading || isLoading}
              sx={{
                mb: 3,
                bgcolor: '#1877F2',
                '&:hover': { bgcolor: '#166FE5' },
                fontWeight: 'bold',
                py: 1.5,
              }}
              startIcon={fbLoading ? <CircularProgress size={18} color="inherit" /> : null}
            >
              {fbLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบด้วย Facebook'}
            </Button>

            <Divider sx={{ mb: 3 }}>
              <Typography variant="caption" color="text.secondary">
                หรือ
              </Typography>
            </Divider>

            {/* Phone OTP Section */}
            <Stack spacing={2}>
              <TextField
                label="เบอร์โทรศัพท์"
                placeholder="เช่น 0812345678"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                disabled={step === 'otp-sent' || isLoading}
                fullWidth
                type="tel"
                inputProps={{ maxLength: 10 }}
              />

              {step !== 'otp-sent' && (
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={handleSendOtp}
                  disabled={isLoading || !phone.trim()}
                  startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : null}
                >
                  {isLoading ? 'กำลังส่ง OTP...' : 'ส่ง OTP'}
                </Button>
              )}

              {step === 'otp-sent' && (
                <>
                  <TextField
                    label="รหัส OTP"
                    placeholder="กรอกรหัส OTP 6 หลัก"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    fullWidth
                    type="number"
                    inputProps={{ maxLength: 6 }}
                  />
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="text"
                      onClick={() => {
                        setStep('idle')
                        setOtp('')
                      }}
                      sx={{ flex: 1 }}
                    >
                      เปลี่ยนเบอร์
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={handleVerifyOtp}
                      disabled={isLoading || !otp.trim()}
                      startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : null}
                      sx={{ flex: 2 }}
                    >
                      {isLoading ? 'กำลังยืนยัน...' : 'ยืนยัน'}
                    </Button>
                  </Stack>
                  <Button
                    variant="text"
                    size="small"
                    onClick={handleSendOtp}
                    disabled={isLoading}
                    sx={{ alignSelf: 'center' }}
                  >
                    ส่ง OTP ใหม่อีกครั้ง
                  </Button>
                </>
              )}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body2" textAlign="center" color="text.secondary">
              ยังไม่มีบัญชี?{' '}
              <Typography
                component={Link}
                href="/register"
                variant="body2"
                color="primary"
                sx={{ textDecoration: 'none', fontWeight: 'bold' }}
              >
                สมัครสมาชิก
              </Typography>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
