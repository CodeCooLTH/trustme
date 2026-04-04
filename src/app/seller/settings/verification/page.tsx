'use client'

import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Step from '@mui/material/Step'
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

interface VerificationRecord {
  id: string
  type: string
  level: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
}

function statusLabel(status: string): string {
  if (status === 'APPROVED') return 'ผ่านแล้ว'
  if (status === 'PENDING') return 'รอตรวจสอบ'
  if (status === 'REJECTED') return 'ไม่ผ่าน'

  return 'ยังไม่ยืนยัน'
}

function statusColor(status: string): 'success' | 'warning' | 'error' | 'default' {
  if (status === 'APPROVED') return 'success'
  if (status === 'PENDING') return 'warning'
  if (status === 'REJECTED') return 'error'

  return 'default'
}

export default function SellerVerificationPage() {
  const [records, setRecords] = useState<VerificationRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState<string | null>(null)
  const [idCardUrl, setIdCardUrl] = useState('')
  const [shopProofUrl, setShopProofUrl] = useState('')
  const [businessRegUrl, setBusinessRegUrl] = useState('')

  useEffect(() => {
    fetchVerifications()
  }, [])

  async function fetchVerifications() {
    try {
      const res = await fetch('/api/verification')
      const data = await res.json()

      setRecords(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('fetch error', err)
    } finally {
      setLoading(false)
    }
  }

  // Determine highest approved level
  const approvedLevels = records
    .filter(r => r.status === 'APPROVED')
    .map(r => r.level)
  const maxApprovedLevel = approvedLevels.length > 0 ? Math.max(...approvedLevels) : 0

  function getTypeStatus(type: string): string {
    const rec = records.find(r => r.type === type)

    return rec ? rec.status : 'NONE'
  }

  const emailStatus = getTypeStatus('EMAIL_OTP')
  const phoneStatus = getTypeStatus('PHONE_OTP')
  const idStatus = getTypeStatus('ID_CARD')
  const shopProofStatus = getTypeStatus('SHOP_PROOF')
  const businessRegStatus = getTypeStatus('BUSINESS_REG')

  const level1Done = emailStatus === 'APPROVED' && phoneStatus === 'APPROVED'
  const level2Done = idStatus === 'APPROVED'

  async function sendOtp(type: 'EMAIL_OTP' | 'PHONE_OTP') {
    setSubmitting(type)
    try {
      await fetch('/api/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, level: 1 }),
      })
      await fetchVerifications()
    } catch (err) {
      console.error('otp error', err)
    } finally {
      setSubmitting(null)
    }
  }

  async function submitDocument(type: string, level: number, url: string) {
    if (!url.trim()) return
    setSubmitting(type)
    try {
      await fetch('/api/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, level, documents: { url } }),
      })
      if (type === 'ID_CARD') setIdCardUrl('')
      if (type === 'SHOP_PROOF') setShopProofUrl('')
      if (type === 'BUSINESS_REG') setBusinessRegUrl('')
      await fetchVerifications()
    } catch (err) {
      console.error('submit error', err)
    } finally {
      setSubmitting(null)
    }
  }

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight={300}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box maxWidth={700}>
      <Typography variant='h4' mb={2}>
        ยืนยันตัวตน
      </Typography>
      <Typography variant='body2' color='text.secondary' mb={4}>
        การยืนยันตัวตนช่วยเพิ่มความน่าเชื่อถือของร้านค้าและปลดล็อคฟีเจอร์เพิ่มเติม
      </Typography>

      <Box mb={3}>
        <Card>
          <CardContent>
            <Stack direction='row' alignItems='center' spacing={2} mb={2}>
              <Typography variant='subtitle1' fontWeight='bold'>
                ระดับปัจจุบัน
              </Typography>
              <Chip
                label={`ระดับ ${maxApprovedLevel}`}
                color={maxApprovedLevel >= 3 ? 'success' : maxApprovedLevel >= 2 ? 'info' : maxApprovedLevel === 1 ? 'warning' : 'default'}
                variant='tonal'
              />
            </Stack>
            <Divider />
          </CardContent>
        </Card>
      </Box>

      <Stepper orientation='vertical' activeStep={maxApprovedLevel}>
        {/* Step 0: Level 1 — Email + Phone */}
        <Step expanded>
          <StepLabel>
            <Stack direction='row' alignItems='center' spacing={1}>
              <Typography variant='subtitle1'>ระดับ 1 — ยืนยันอีเมลและเบอร์โทร</Typography>
              {level1Done && <Chip label='ผ่านแล้ว' color='success' size='small' variant='tonal' />}
            </Stack>
          </StepLabel>
          <StepContent>
            <Stack spacing={2} mt={1}>
              {/* Email OTP */}
              <Stack direction='row' alignItems='center' spacing={2}>
                <Typography variant='body2' sx={{ minWidth: 140 }}>
                  ยืนยันอีเมล
                </Typography>
                <Chip
                  label={statusLabel(emailStatus)}
                  color={statusColor(emailStatus)}
                  size='small'
                  variant='tonal'
                />
                {emailStatus !== 'APPROVED' && (
                  <Button
                    variant='outlined'
                    size='small'
                    onClick={() => sendOtp('EMAIL_OTP')}
                    disabled={submitting === 'EMAIL_OTP' || emailStatus === 'PENDING'}
                  >
                    {submitting === 'EMAIL_OTP' ? 'กำลังส่ง...' : 'ส่ง OTP อีเมล'}
                  </Button>
                )}
              </Stack>

              {/* Phone OTP */}
              <Stack direction='row' alignItems='center' spacing={2}>
                <Typography variant='body2' sx={{ minWidth: 140 }}>
                  ยืนยันเบอร์โทร
                </Typography>
                <Chip
                  label={statusLabel(phoneStatus)}
                  color={statusColor(phoneStatus)}
                  size='small'
                  variant='tonal'
                />
                {phoneStatus !== 'APPROVED' && (
                  <Button
                    variant='outlined'
                    size='small'
                    onClick={() => sendOtp('PHONE_OTP')}
                    disabled={submitting === 'PHONE_OTP' || phoneStatus === 'PENDING'}
                  >
                    {submitting === 'PHONE_OTP' ? 'กำลังส่ง...' : 'ส่ง OTP มือถือ'}
                  </Button>
                )}
              </Stack>
            </Stack>
          </StepContent>
        </Step>

        {/* Step 1: Level 2 — ID Card */}
        <Step expanded>
          <StepLabel>
            <Stack direction='row' alignItems='center' spacing={1}>
              <Typography variant='subtitle1'>ระดับ 2 — อัปโหลดบัตรประชาชน</Typography>
              {idStatus === 'APPROVED' && <Chip label='ผ่านแล้ว' color='success' size='small' variant='tonal' />}
              {idStatus === 'PENDING' && <Chip label='รอตรวจสอบ' color='warning' size='small' variant='tonal' />}
            </Stack>
          </StepLabel>
          <StepContent>
            {!level1Done ? (
              <Typography variant='body2' color='text.secondary' mt={1}>
                กรุณาผ่านระดับ 1 ก่อน
              </Typography>
            ) : idStatus === 'APPROVED' ? (
              <Typography variant='body2' color='success.main' mt={1}>
                การยืนยันระดับ 2 สำเร็จแล้ว
              </Typography>
            ) : idStatus === 'PENDING' ? (
              <Typography variant='body2' color='text.secondary' mt={1}>
                เอกสารถูกส่งแล้ว กำลังรอการตรวจสอบจากทีมงาน
              </Typography>
            ) : (
              <Stack spacing={2} mt={1}>
                <TextField
                  label='URL รูปบัตรประชาชน'
                  value={idCardUrl}
                  onChange={e => setIdCardUrl(e.target.value)}
                  fullWidth
                  size='small'
                  helperText='วาง URL รูปภาพบัตรประชาชนที่อัปโหลดแล้ว'
                />
                <Button
                  variant='contained'
                  size='small'
                  onClick={() => submitDocument('ID_CARD', 2, idCardUrl)}
                  disabled={submitting === 'ID_CARD' || !idCardUrl.trim()}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  {submitting === 'ID_CARD' ? 'กำลังส่ง...' : 'ส่งเอกสาร'}
                </Button>
              </Stack>
            )}
          </StepContent>
        </Step>

        {/* Step 2: Level 3 — Shop Proof */}
        <Step expanded>
          <StepLabel>
            <Stack direction='row' alignItems='center' spacing={1}>
              <Typography variant='subtitle1'>ระดับ 3 — ยืนยันร้านค้า (SHOP_PROOF)</Typography>
              {shopProofStatus === 'APPROVED' && <Chip label='ผ่านแล้ว' color='success' size='small' variant='tonal' />}
              {shopProofStatus === 'PENDING' && <Chip label='รอตรวจสอบ' color='warning' size='small' variant='tonal' />}
            </Stack>
          </StepLabel>
          <StepContent>
            {!level2Done ? (
              <Typography variant='body2' color='text.secondary' mt={1}>
                กรุณาผ่านระดับ 2 ก่อน
              </Typography>
            ) : shopProofStatus === 'APPROVED' ? (
              <Typography variant='body2' color='success.main' mt={1}>
                การยืนยันระดับ 3 (Shop Proof) สำเร็จแล้ว
              </Typography>
            ) : shopProofStatus === 'PENDING' ? (
              <Typography variant='body2' color='text.secondary' mt={1}>
                เอกสารถูกส่งแล้ว กำลังรอการตรวจสอบจากทีมงาน
              </Typography>
            ) : (
              <Stack spacing={2} mt={1}>
                <TextField
                  label='URL หลักฐานร้านค้า'
                  value={shopProofUrl}
                  onChange={e => setShopProofUrl(e.target.value)}
                  fullWidth
                  size='small'
                  helperText='เช่น ใบทะเบียนพาณิชย์, หน้าร้านค้าออนไลน์'
                />
                <Button
                  variant='contained'
                  size='small'
                  onClick={() => submitDocument('SHOP_PROOF', 3, shopProofUrl)}
                  disabled={submitting === 'SHOP_PROOF' || !shopProofUrl.trim()}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  {submitting === 'SHOP_PROOF' ? 'กำลังส่ง...' : 'ส่งเอกสาร'}
                </Button>
              </Stack>
            )}
          </StepContent>
        </Step>

        {/* Step 3: Level 3 — Business Registration */}
        <Step expanded>
          <StepLabel>
            <Stack direction='row' alignItems='center' spacing={1}>
              <Typography variant='subtitle1'>ระดับ 3 — หนังสือรับรองบริษัท (BUSINESS_REG)</Typography>
              {businessRegStatus === 'APPROVED' && <Chip label='ผ่านแล้ว' color='success' size='small' variant='tonal' />}
              {businessRegStatus === 'PENDING' && <Chip label='รอตรวจสอบ' color='warning' size='small' variant='tonal' />}
            </Stack>
          </StepLabel>
          <StepContent>
            {!level2Done ? (
              <Typography variant='body2' color='text.secondary' mt={1}>
                กรุณาผ่านระดับ 2 ก่อน
              </Typography>
            ) : businessRegStatus === 'APPROVED' ? (
              <Typography variant='body2' color='success.main' mt={1}>
                การยืนยันหนังสือรับรองบริษัทสำเร็จแล้ว
              </Typography>
            ) : businessRegStatus === 'PENDING' ? (
              <Typography variant='body2' color='text.secondary' mt={1}>
                เอกสารถูกส่งแล้ว กำลังรอการตรวจสอบจากทีมงาน
              </Typography>
            ) : (
              <Stack spacing={2} mt={1}>
                <TextField
                  label='URL หนังสือรับรองบริษัท'
                  value={businessRegUrl}
                  onChange={e => setBusinessRegUrl(e.target.value)}
                  fullWidth
                  size='small'
                  helperText='วาง URL เอกสารหนังสือรับรองบริษัทที่อัปโหลดแล้ว'
                />
                <Button
                  variant='contained'
                  size='small'
                  onClick={() => submitDocument('BUSINESS_REG', 3, businessRegUrl)}
                  disabled={submitting === 'BUSINESS_REG' || !businessRegUrl.trim()}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  {submitting === 'BUSINESS_REG' ? 'กำลังส่ง...' : 'ส่งเอกสาร'}
                </Button>
              </Stack>
            )}
          </StepContent>
        </Step>
      </Stepper>
    </Box>
  )
}
