'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import InputAdornment from '@mui/material/InputAdornment'

export default function AdminLoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('กรุณากรอกอีเมลและรหัสผ่าน')
      return
    }

    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email: email.trim(),
        password: password.trim(),
        redirect: false,
      })

      if (result?.error) {
        setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
      } else {
        // Verify admin session
        const res = await fetch('/api/admin/dashboard')

        if (res.status === 403) {
          setError('บัญชีนี้ไม่มีสิทธิ์เข้าใช้งานระบบผู้ดูแล')
          return
        }

        router.push('/admin')
      }
    } catch {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth='xs'>
        <Card sx={{ boxShadow: 6 }}>
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Stack spacing={1} alignItems='center' mb={4}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1,
                }}
              >
                <i className='tabler-shield-lock' style={{ fontSize: 28, color: 'white' }} />
              </Box>
              <Typography variant='h5' fontWeight='bold' textAlign='center'>
                เข้าสู่ระบบผู้ดูแล
              </Typography>
              <Typography variant='body2' color='text.secondary' textAlign='center'>
                SafePay Admin Panel
              </Typography>
            </Stack>

            {error && (
              <Alert severity='error' sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component='form' onSubmit={handleLogin}>
              <Stack spacing={3}>
                <TextField
                  label='อีเมล'
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  fullWidth
                  required
                  disabled={loading}
                  autoComplete='email'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='tabler-mail' />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label='รหัสผ่าน'
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  fullWidth
                  required
                  disabled={loading}
                  autoComplete='current-password'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='tabler-lock' />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  size='large'
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={18} color='inherit' /> : null}
                  sx={{ py: 1.5, fontWeight: 'bold' }}
                >
                  {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
