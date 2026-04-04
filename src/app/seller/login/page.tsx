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
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Link from 'next/link'

type Step = 'idle' | 'otp-sent' | 'loading'

export default function SellerLoginPage() {
  const router = useRouter()

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
        // Check if user has a shop
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
        body: JSON.stringify({ name: shopName.trim(), businessType, category: category.trim() }),
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

  const isLoading = step === 'loading'

  if (showOpenShop) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
        <Box component='header' sx={{ py: 2, px: 3, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Typography component={Link} href='/' variant='h6' fontWeight='bold' color='primary' sx={{ textDecoration: 'none' }}>
            SafePay
          </Typography>
        </Box>
        <Container maxWidth='sm' sx={{ flex: 1, display: 'flex', alignItems: 'center', py: 6 }}>
          <Card sx={{ width: '100%', boxShadow: 4 }}>
            <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
              <Typography variant='h5' fontWeight='bold' textAlign='center' gutterBottom>
                เปิดร้านค้า
              </Typography>
              <Typography variant='body2' color='text.secondary' textAlign='center' sx={{ mb: 4 }}>
                กรอกข้อมูลร้านค้าของคุณเพื่อเริ่มขาย
              </Typography>

              {shopError && (
                <Alert severity='error' sx={{ mb: 3 }}>
                  {shopError}
                </Alert>
              )}

              <Stack spacing={3}>
                <TextField
                  label='ชื่อร้านค้า'
                  value={shopName}
                  onChange={e => setShopName(e.target.value)}
                  fullWidth
                  required
                />

                <FormControl fullWidth>
                  <InputLabel>ประเภทธุรกิจ</InputLabel>
                  <Select
                    value={businessType}
                    label='ประเภทธุรกิจ'
                    onChange={e => setBusinessType(e.target.value)}
                  >
                    <MenuItem value='INDIVIDUAL'>บุคคลทั่วไป</MenuItem>
                    <MenuItem value='SME'>SME / ธุรกิจขนาดเล็ก</MenuItem>
                    <MenuItem value='ENTERPRISE'>บริษัท / องค์กร</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label='หมวดหมู่สินค้า'
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  fullWidth
                  placeholder='เช่น อิเล็กทรอนิกส์, แฟชั่น, อาหาร'
                />

                <Button
                  fullWidth
                  variant='contained'
                  size='large'
                  onClick={handleOpenShop}
                  disabled={shopSaving || !shopName.trim()}
                  startIcon={shopSaving ? <CircularProgress size={18} color='inherit' /> : null}
                >
                  {shopSaving ? 'กำลังสร้างร้านค้า...' : 'เปิดร้านค้า'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        component='header'
        sx={{ py: 2, px: 3, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
      >
        <Typography
          component={Link}
          href='/'
          variant='h6'
          fontWeight='bold'
          color='primary'
          sx={{ textDecoration: 'none' }}
        >
          SafePay
        </Typography>
      </Box>

      {/* Main */}
      <Container maxWidth='sm' sx={{ flex: 1, display: 'flex', alignItems: 'center', py: 6 }}>
        <Card sx={{ width: '100%', boxShadow: 4 }}>
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Typography variant='h5' fontWeight='bold' textAlign='center' gutterBottom>
              เข้าสู่ระบบร้านค้า
            </Typography>
            <Typography variant='body2' color='text.secondary' textAlign='center' sx={{ mb: 4 }}>
              เข้าสู่ระบบเพื่อจัดการร้านค้าของคุณบน SafePay
            </Typography>

            {error && (
              <Alert severity='error' sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Facebook Login */}
            <Button
              fullWidth
              variant='contained'
              size='large'
              onClick={handleFacebookLogin}
              disabled={fbLoading || isLoading}
              sx={{
                mb: 3,
                bgcolor: '#1877F2',
                '&:hover': { bgcolor: '#166FE5' },
                fontWeight: 'bold',
                py: 1.5,
              }}
              startIcon={fbLoading ? <CircularProgress size={18} color='inherit' /> : null}
            >
              {fbLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบด้วย Facebook'}
            </Button>

            <Divider sx={{ mb: 3 }}>
              <Typography variant='caption' color='text.secondary'>
                หรือ
              </Typography>
            </Divider>

            {/* Phone OTP Section */}
            <Stack spacing={2}>
              <TextField
                label='เบอร์โทรศัพท์'
                placeholder='เช่น 0812345678'
                value={phone}
                onChange={e => setPhone(e.target.value)}
                disabled={step === 'otp-sent' || isLoading}
                fullWidth
                type='tel'
                inputProps={{ maxLength: 10 }}
              />

              {step !== 'otp-sent' && (
                <Button
                  fullWidth
                  variant='outlined'
                  size='large'
                  onClick={handleSendOtp}
                  disabled={isLoading || !phone.trim()}
                  startIcon={isLoading ? <CircularProgress size={18} color='inherit' /> : null}
                >
                  {isLoading ? 'กำลังส่ง OTP...' : 'ส่ง OTP'}
                </Button>
              )}

              {step === 'otp-sent' && (
                <>
                  <TextField
                    label='รหัส OTP'
                    placeholder='กรอกรหัส OTP 6 หลัก'
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    fullWidth
                    type='number'
                    inputProps={{ maxLength: 6 }}
                  />
                  <Stack direction='row' spacing={2}>
                    <Button
                      variant='text'
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
                      variant='contained'
                      size='large'
                      onClick={handleVerifyOtp}
                      disabled={isLoading || !otp.trim()}
                      startIcon={isLoading ? <CircularProgress size={18} color='inherit' /> : null}
                      sx={{ flex: 2 }}
                    >
                      {isLoading ? 'กำลังยืนยัน...' : 'ยืนยัน'}
                    </Button>
                  </Stack>
                  <Button
                    variant='text'
                    size='small'
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

            <Typography variant='body2' textAlign='center' color='text.secondary'>
              ต้องการซื้อสินค้า?{' '}
              <Typography
                component={Link}
                href='/login'
                variant='body2'
                color='primary'
                sx={{ textDecoration: 'none', fontWeight: 'bold' }}
              >
                เข้าสู่ระบบผู้ซื้อ
              </Typography>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
