'use client'

import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

interface User {
  id: string
  displayName?: string | null
  username: string
  phone?: string | null
  trustScore: number
}

interface VerificationRecord {
  id: string
  type: string
  level: number
  status: string
  documents?: any
  createdAt: string
  user: User
}

const TYPE_LABELS: Record<string, string> = {
  NATIONAL_ID: 'บัตรประชาชน',
  PASSPORT: 'หนังสือเดินทาง',
  BUSINESS_REG: 'จดทะเบียนธุรกิจ',
  PHONE_OTP: 'OTP โทรศัพท์',
  EMAIL_OTP: 'OTP อีเมล',
}

const LEVEL_LABELS: Record<number, { label: string; color: 'default' | 'info' | 'warning' | 'success' | 'error' }> = {
  1: { label: 'ระดับ 1', color: 'info' },
  2: { label: 'ระดับ 2', color: 'warning' },
  3: { label: 'ระดับ 3', color: 'success' },
}

export default function AdminVerificationsPage() {
  const [records, setRecords] = useState<VerificationRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [actionError, setActionError] = useState('')

  // Reject dialog state
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [rejectingId, setRejectingId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  useEffect(() => {
    fetchRecords()
  }, [])

  async function fetchRecords() {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/verifications')

      if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลได้')

      const data = await res.json()

      setRecords(Array.isArray(data) ? data : [])
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }

  async function handleApprove(id: string) {
    setActionLoading(id)
    setActionError('')

    try {
      const res = await fetch(`/api/admin/verifications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'APPROVED' }),
      })

      if (!res.ok) throw new Error('ไม่สามารถอนุมัติได้')

      setRecords(prev => prev.filter(r => r.id !== id))
    } catch (err: any) {
      setActionError(err.message || 'เกิดข้อผิดพลาด')
    } finally {
      setActionLoading(null)
    }
  }

  function openRejectDialog(id: string) {
    setRejectingId(id)
    setRejectReason('')
    setRejectDialogOpen(true)
  }

  async function handleReject() {
    if (!rejectingId) return

    setActionLoading(rejectingId)
    setRejectDialogOpen(false)
    setActionError('')

    try {
      const res = await fetch(`/api/admin/verifications/${rejectingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'REJECTED', rejectedReason: rejectReason }),
      })

      if (!res.ok) throw new Error('ไม่สามารถปฏิเสธได้')

      setRecords(prev => prev.filter(r => r.id !== rejectingId))
    } catch (err: any) {
      setActionError(err.message || 'เกิดข้อผิดพลาด')
    } finally {
      setActionLoading(null)
      setRejectingId(null)
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
    <Box>
      <Typography variant='h4' fontWeight='bold' mb={1}>
        คิวยืนยันตัวตน
      </Typography>
      <Typography variant='body2' color='text.secondary' mb={4}>
        รายการรอการตรวจสอบ ({records.length} รายการ)
      </Typography>

      {error && (
        <Alert severity='error' sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {actionError && (
        <Alert severity='error' sx={{ mb: 3 }}>
          {actionError}
        </Alert>
      )}

      {records.length === 0 ? (
        <Card>
          <CardContent>
            <Typography color='text.secondary' textAlign='center' py={6}>
              ไม่มีรายการรอการยืนยัน
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {records.map(record => {
            const levelConfig = LEVEL_LABELS[record.level] || { label: `ระดับ ${record.level}`, color: 'default' as const }
            const isActing = actionLoading === record.id

            return (
              <Grid key={record.id} size={{ xs: 12, md: 6, lg: 4 }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Stack direction='row' spacing={1} mb={2} flexWrap='wrap'>
                      <Chip
                        label={TYPE_LABELS[record.type] || record.type}
                        color='primary'
                        size='small'
                        variant='tonal'
                      />
                      <Chip
                        label={levelConfig.label}
                        color={levelConfig.color}
                        size='small'
                        variant='tonal'
                      />
                    </Stack>

                    <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
                      {record.user.displayName || record.user.username}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      @{record.user.username}
                    </Typography>
                    {record.user.phone && (
                      <Typography variant='body2' color='text.secondary'>
                        {record.user.phone}
                      </Typography>
                    )}
                    <Typography variant='body2' color='text.secondary' mt={0.5}>
                      คะแนน: {record.user.trustScore}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant='caption' color='text.secondary' display='block' mb={1}>
                      ยื่นเมื่อ: {new Date(record.createdAt).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Typography>

                    {record.documents && (
                      <Box>
                        <Typography variant='caption' color='text.secondary' display='block' mb={0.5}>
                          เอกสาร:
                        </Typography>
                        {Array.isArray(record.documents) ? (
                          record.documents.map((doc: any, idx: number) => (
                            <Typography
                              key={idx}
                              variant='body2'
                              component='a'
                              href={typeof doc === 'string' ? doc : doc.url || '#'}
                              target='_blank'
                              rel='noopener noreferrer'
                              sx={{ display: 'block', color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                            >
                              เอกสาร {idx + 1}
                            </Typography>
                          ))
                        ) : typeof record.documents === 'object' ? (
                          Object.entries(record.documents).map(([key, val]) => (
                            <Typography
                              key={key}
                              variant='body2'
                              component='a'
                              href={String(val)}
                              target='_blank'
                              rel='noopener noreferrer'
                              sx={{ display: 'block', color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                            >
                              {key}
                            </Typography>
                          ))
                        ) : null}
                      </Box>
                    )}
                  </CardContent>

                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button
                      variant='contained'
                      color='success'
                      size='small'
                      onClick={() => handleApprove(record.id)}
                      disabled={isActing}
                      startIcon={isActing ? <CircularProgress size={14} color='inherit' /> : <i className='tabler-check' />}
                      sx={{ flex: 1 }}
                    >
                      อนุมัติ
                    </Button>
                    <Button
                      variant='contained'
                      color='error'
                      size='small'
                      onClick={() => openRejectDialog(record.id)}
                      disabled={isActing}
                      startIcon={<i className='tabler-x' />}
                      sx={{ flex: 1 }}
                    >
                      ปฏิเสธ
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )}

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)} maxWidth='sm' fullWidth>
        <DialogTitle>ปฏิเสธการยืนยันตัวตน</DialogTitle>
        <DialogContent>
          <Typography variant='body2' color='text.secondary' mb={2}>
            กรุณาระบุเหตุผลในการปฏิเสธ (ไม่บังคับ)
          </Typography>
          <TextField
            label='เหตุผลการปฏิเสธ'
            multiline
            rows={3}
            value={rejectReason}
            onChange={e => setRejectReason(e.target.value)}
            fullWidth
            placeholder='เช่น เอกสารไม่ชัดเจน, ข้อมูลไม่ถูกต้อง...'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialogOpen(false)} color='inherit'>
            ยกเลิก
          </Button>
          <Button onClick={handleReject} color='error' variant='contained'>
            ยืนยันการปฏิเสธ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
