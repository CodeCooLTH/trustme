'use client'

import { useEffect, useState } from 'react'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

interface Shop {
  id: string
  name: string
  description?: string | null
  logo?: string | null
  category?: string | null
  businessType?: string | null
}

export default function SellerShopSettingsPage() {
  const [shop, setShop] = useState<Shop | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [logo, setLogo] = useState('')
  const [category, setCategory] = useState('')
  const [businessType, setBusinessType] = useState('INDIVIDUAL')

  useEffect(() => {
    async function fetchShop() {
      try {
        const res = await fetch('/api/shops')
        const data: Shop = await res.json()

        if (data?.id) {
          setShop(data)
          setName(data.name ?? '')
          setDescription(data.description ?? '')
          setLogo(data.logo ?? '')
          setCategory(data.category ?? '')
          setBusinessType(data.businessType ?? 'INDIVIDUAL')
        }
      } catch (err) {
        console.error('fetch error', err)
      } finally {
        setLoading(false)
      }
    }

    fetchShop()
  }, [])

  const handleSave = async () => {
    if (!shop?.id) return
    if (!name.trim()) {
      setError('กรุณากรอกชื่อร้านค้า')
      return
    }

    setError('')
    setSuccess(false)
    setSaving(true)
    try {
      const res = await fetch(`/api/shops/${shop.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || null,
          logo: logo.trim() || null,
          category: category.trim() || null,
          businessType,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'ไม่สามารถบันทึกข้อมูลได้')
      }
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight={300}>
        <CircularProgress />
      </Box>
    )
  }

  if (!shop) {
    return (
      <Box>
        <Typography variant='h4' mb={2}>
          ตั้งค่าร้านค้า
        </Typography>
        <Alert severity='warning'>
          คุณยังไม่มีร้านค้า กรุณาสร้างร้านค้าก่อนใช้งาน
        </Alert>
      </Box>
    )
  }

  return (
    <Box maxWidth={700}>
      <Typography variant='h4' mb={4}>
        ตั้งค่าร้านค้า
      </Typography>

      <Card>
        <CardContent>
          <Stack spacing={3}>
            {error && <Alert severity='error'>{error}</Alert>}
            {success && <Alert severity='success'>บันทึกข้อมูลสำเร็จ</Alert>}

            <TextField
              label='ชื่อร้านค้า'
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label='รายละเอียดร้านค้า'
              value={description}
              onChange={e => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />

            <TextField
              label='URL โลโก้ร้านค้า'
              value={logo}
              onChange={e => setLogo(e.target.value)}
              fullWidth
              placeholder='https://example.com/logo.png'
              helperText='วาง URL รูปโลโก้ของร้านค้า'
            />

            <TextField
              label='หมวดหมู่สินค้า'
              value={category}
              onChange={e => setCategory(e.target.value)}
              fullWidth
              placeholder='เช่น อิเล็กทรอนิกส์, แฟชั่น, อาหาร'
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

            <Button
              variant='contained'
              onClick={handleSave}
              disabled={saving}
              startIcon={saving ? <CircularProgress size={16} color='inherit' /> : null}
              sx={{ alignSelf: 'flex-start' }}
            >
              {saving ? 'กำลังบันทึก...' : 'บันทึก'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
