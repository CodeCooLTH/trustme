'use client'

import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'

interface Badge {
  id: string
  name: string
  nameEN: string
  icon: string
  type: string
  criteria?: any
  _count: {
    userBadges: number
  }
}

interface BadgeFormData {
  name: string
  nameEN: string
  icon: string
  type: string
  criteria: string
}

const BADGE_TYPES = [
  { value: 'ACHIEVEMENT', label: 'ความสำเร็จ' },
  { value: 'VERIFICATION', label: 'การยืนยัน' },
  { value: 'TRUST', label: 'ความน่าเชื่อถือ' },
  { value: 'SPECIAL', label: 'พิเศษ' },
]

const defaultForm: BadgeFormData = {
  name: '',
  nameEN: '',
  icon: '',
  type: 'ACHIEVEMENT',
  criteria: '',
}

export default function AdminBadgesPage() {
  const [badges, setBadges] = useState<Badge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  // Add dialog
  const [addOpen, setAddOpen] = useState(false)
  const [addForm, setAddForm] = useState<BadgeFormData>(defaultForm)
  const [addFormError, setAddFormError] = useState('')

  // Edit dialog
  const [editOpen, setEditOpen] = useState(false)
  const [editBadge, setEditBadge] = useState<Badge | null>(null)
  const [editForm, setEditForm] = useState<BadgeFormData>(defaultForm)
  const [editFormError, setEditFormError] = useState('')

  useEffect(() => {
    fetchBadges()
  }, [])

  async function fetchBadges() {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/badges')

      if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลได้')

      const data = await res.json()

      setBadges(Array.isArray(data) ? data : [])
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }

  function validateForm(form: BadgeFormData): string {
    if (!form.name.trim()) return 'กรุณากรอกชื่อ (ภาษาไทย)'
    if (!form.nameEN.trim()) return 'กรุณากรอกชื่อ (ภาษาอังกฤษ)'
    if (!form.icon.trim()) return 'กรุณากรอก icon'

    if (form.criteria.trim()) {
      try {
        JSON.parse(form.criteria)
      } catch {
        return 'Criteria ต้องเป็น JSON ที่ถูกต้อง'
      }
    }

    return ''
  }

  async function handleAdd() {
    const validationError = validateForm(addForm)

    if (validationError) {
      setAddFormError(validationError)
      return
    }

    setAddFormError('')
    setSaving(true)
    setSaveError('')

    try {
      const body: any = {
        name: addForm.name.trim(),
        nameEN: addForm.nameEN.trim(),
        icon: addForm.icon.trim(),
        type: addForm.type,
      }

      if (addForm.criteria.trim()) {
        body.criteria = JSON.parse(addForm.criteria)
      }

      const res = await fetch('/api/admin/badges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error('ไม่สามารถบันทึกได้')

      setAddOpen(false)
      setAddForm(defaultForm)
      await fetchBadges()
    } catch (err: any) {
      setSaveError(err.message || 'เกิดข้อผิดพลาด')
    } finally {
      setSaving(false)
    }
  }

  function openEditDialog(badge: Badge) {
    setEditBadge(badge)
    setEditForm({
      name: badge.name,
      nameEN: badge.nameEN,
      icon: badge.icon,
      type: badge.type,
      criteria: badge.criteria ? JSON.stringify(badge.criteria, null, 2) : '',
    })
    setEditFormError('')
    setEditOpen(true)
  }

  async function handleEdit() {
    if (!editBadge) return

    const validationError = validateForm(editForm)

    if (validationError) {
      setEditFormError(validationError)
      return
    }

    setEditFormError('')
    setSaving(true)
    setSaveError('')

    try {
      const body: any = {
        id: editBadge.id,
        name: editForm.name.trim(),
        nameEN: editForm.nameEN.trim(),
        icon: editForm.icon.trim(),
        type: editForm.type,
      }

      if (editForm.criteria.trim()) {
        body.criteria = JSON.parse(editForm.criteria)
      }

      const res = await fetch('/api/admin/badges', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error('ไม่สามารถบันทึกได้')

      setEditOpen(false)
      setEditBadge(null)
      await fetchBadges()
    } catch (err: any) {
      setSaveError(err.message || 'เกิดข้อผิดพลาด')
    } finally {
      setSaving(false)
    }
  }

  const TYPE_LABEL_MAP = Object.fromEntries(BADGE_TYPES.map(t => [t.value, t.label]))

  return (
    <Box>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={1}>
        <Typography variant='h4' fontWeight='bold'>
          จัดการเหรียญรางวัล
        </Typography>
        <Button
          variant='contained'
          startIcon={<i className='tabler-plus' />}
          onClick={() => {
            setAddForm(defaultForm)
            setAddFormError('')
            setSaveError('')
            setAddOpen(true)
          }}
        >
          เพิ่มเหรียญ
        </Button>
      </Stack>
      <Typography variant='body2' color='text.secondary' mb={4}>
        เหรียญรางวัลทั้งหมดในระบบ
      </Typography>

      {error && (
        <Alert severity='error' sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {saveError && (
        <Alert severity='error' sx={{ mb: 3 }}>
          {saveError}
        </Alert>
      )}

      <Card>
        {loading ? (
          <CardContent>
            <Box display='flex' justifyContent='center' alignItems='center' minHeight={200}>
              <CircularProgress />
            </Box>
          </CardContent>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Icon</TableCell>
                  <TableCell>ชื่อ (ไทย)</TableCell>
                  <TableCell>ชื่อ (EN)</TableCell>
                  <TableCell align='center'>ประเภท</TableCell>
                  <TableCell align='center'>ผู้ใช้</TableCell>
                  <TableCell align='center'>จัดการ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {badges.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align='center' sx={{ py: 6 }}>
                      <Typography color='text.secondary'>ยังไม่มีเหรียญรางวัล</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  badges.map(badge => (
                    <TableRow key={badge.id} hover>
                      <TableCell>
                        <Typography variant='h5'>{badge.icon}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2' fontWeight='medium'>
                          {badge.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2' color='text.secondary'>
                          {badge.nameEN}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Chip
                          label={TYPE_LABEL_MAP[badge.type] || badge.type}
                          color='primary'
                          size='small'
                          variant='tonal'
                        />
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2' fontWeight='bold'>
                          {badge._count.userBadges}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton
                          size='small'
                          color='primary'
                          onClick={() => openEditDialog(badge)}
                          title='แก้ไข'
                        >
                          <i className='tabler-edit' style={{ fontSize: 18 }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      {/* Add Badge Dialog */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth='sm' fullWidth>
        <DialogTitle>เพิ่มเหรียญรางวัล</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {addFormError && (
              <Alert severity='error'>{addFormError}</Alert>
            )}
            <TextField
              label='ชื่อ (ภาษาไทย)'
              value={addForm.name}
              onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))}
              fullWidth
              required
            />
            <TextField
              label='ชื่อ (ภาษาอังกฤษ)'
              value={addForm.nameEN}
              onChange={e => setAddForm(f => ({ ...f, nameEN: e.target.value }))}
              fullWidth
              required
            />
            <TextField
              label='Icon (Emoji หรือ URL)'
              value={addForm.icon}
              onChange={e => setAddForm(f => ({ ...f, icon: e.target.value }))}
              fullWidth
              required
              placeholder='เช่น 🏅 หรือ URL รูปภาพ'
            />
            <FormControl fullWidth required>
              <InputLabel>ประเภท</InputLabel>
              <Select
                value={addForm.type}
                label='ประเภท'
                onChange={e => setAddForm(f => ({ ...f, type: e.target.value }))}
              >
                {BADGE_TYPES.map(t => (
                  <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label='Criteria (JSON)'
              value={addForm.criteria}
              onChange={e => setAddForm(f => ({ ...f, criteria: e.target.value }))}
              fullWidth
              multiline
              rows={4}
              placeholder='{"minOrders": 10} หรือว่างไว้'
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddOpen(false)} color='inherit' disabled={saving}>
            ยกเลิก
          </Button>
          <Button
            onClick={handleAdd}
            variant='contained'
            disabled={saving}
            startIcon={saving ? <CircularProgress size={16} color='inherit' /> : null}
          >
            {saving ? 'กำลังบันทึก...' : 'บันทึก'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Badge Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth='sm' fullWidth>
        <DialogTitle>แก้ไขเหรียญรางวัล</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {editFormError && (
              <Alert severity='error'>{editFormError}</Alert>
            )}
            <TextField
              label='ชื่อ (ภาษาไทย)'
              value={editForm.name}
              onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
              fullWidth
              required
            />
            <TextField
              label='ชื่อ (ภาษาอังกฤษ)'
              value={editForm.nameEN}
              onChange={e => setEditForm(f => ({ ...f, nameEN: e.target.value }))}
              fullWidth
              required
            />
            <TextField
              label='Icon (Emoji หรือ URL)'
              value={editForm.icon}
              onChange={e => setEditForm(f => ({ ...f, icon: e.target.value }))}
              fullWidth
              required
              placeholder='เช่น 🏅 หรือ URL รูปภาพ'
            />
            <FormControl fullWidth required>
              <InputLabel>ประเภท</InputLabel>
              <Select
                value={editForm.type}
                label='ประเภท'
                onChange={e => setEditForm(f => ({ ...f, type: e.target.value }))}
              >
                {BADGE_TYPES.map(t => (
                  <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label='Criteria (JSON)'
              value={editForm.criteria}
              onChange={e => setEditForm(f => ({ ...f, criteria: e.target.value }))}
              fullWidth
              multiline
              rows={4}
              placeholder='{"minOrders": 10} หรือว่างไว้'
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color='inherit' disabled={saving}>
            ยกเลิก
          </Button>
          <Button
            onClick={handleEdit}
            variant='contained'
            disabled={saving}
            startIcon={saving ? <CircularProgress size={16} color='inherit' /> : null}
          >
            {saving ? 'กำลังบันทึก...' : 'บันทึก'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
