'use client'

import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

type ProductType = 'PHYSICAL' | 'DIGITAL' | 'SERVICE'

interface Product {
  id: string
  name: string
  description?: string | null
  price: number
  type: ProductType
  isActive: boolean
}

const PRODUCT_TYPE_MAP: Record<ProductType, string> = {
  PHYSICAL: 'สินค้าจริง',
  DIGITAL: 'ดิจิทัล',
  SERVICE: 'บริการ',
}

const defaultForm = {
  name: '',
  description: '',
  price: '',
  type: 'PHYSICAL' as ProductType,
}

export default function SellerProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [form, setForm] = useState(defaultForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function fetchProducts() {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('fetch error', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const openAddDialog = () => {
    setEditProduct(null)
    setForm(defaultForm)
    setError('')
    setDialogOpen(true)
  }

  const openEditDialog = (product: Product) => {
    setEditProduct(product)
    setForm({
      name: product.name,
      description: product.description ?? '',
      price: String(product.price),
      type: product.type,
    })
    setError('')
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
    setEditProduct(null)
    setForm(defaultForm)
    setError('')
  }

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError('กรุณากรอกชื่อสินค้า')
      return
    }
    const priceNum = parseFloat(form.price)
    if (isNaN(priceNum) || priceNum < 0) {
      setError('กรุณากรอกราคาที่ถูกต้อง')
      return
    }

    setSaving(true)
    setError('')
    try {
      const body = {
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        price: priceNum,
        type: form.type,
      }

      if (editProduct) {
        const res = await fetch(`/api/products/${editProduct.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error('ไม่สามารถอัปเดตสินค้าได้')
      } else {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error('ไม่สามารถเพิ่มสินค้าได้')
      }

      await fetchProducts()
      handleClose()
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('ยืนยันการลบสินค้า?')) return
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' })
      await fetchProducts()
    } catch (err) {
      console.error('delete error', err)
    }
  }

  const handleToggleActive = async (product: Product) => {
    try {
      await fetch(`/api/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !product.isActive }),
      })
      await fetchProducts()
    } catch (err) {
      console.error('toggle error', err)
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
      <Stack direction='row' justifyContent='space-between' alignItems='center' mb={4}>
        <Typography variant='h4'>สินค้าของฉัน</Typography>
        <Button variant='contained' onClick={openAddDialog}>
          เพิ่มสินค้า
        </Button>
      </Stack>

      {products.length === 0 ? (
        <Card>
          <Box py={6} textAlign='center'>
            <Typography color='text.secondary'>ยังไม่มีสินค้า กดปุ่ม "เพิ่มสินค้า" เพื่อเริ่มต้น</Typography>
          </Box>
        </Card>
      ) : (
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ชื่อสินค้า</TableCell>
                  <TableCell>ประเภท</TableCell>
                  <TableCell align='right'>ราคา</TableCell>
                  <TableCell align='center'>สถานะ</TableCell>
                  <TableCell align='center'>จัดการ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(product => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Stack>
                        <Typography variant='body2' fontWeight='medium'>
                          {product.name}
                        </Typography>
                        {product.description && (
                          <Typography variant='caption' color='text.secondary'>
                            {product.description}
                          </Typography>
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>{PRODUCT_TYPE_MAP[product.type]}</Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography variant='body2' fontWeight='medium'>
                        ฿{product.price.toLocaleString('th-TH')}
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Chip
                        label={product.isActive ? 'เปิดขาย' : 'ปิดขาย'}
                        color={product.isActive ? 'success' : 'default'}
                        size='small'
                        variant='tonal'
                        onClick={() => handleToggleActive(product)}
                        sx={{ cursor: 'pointer' }}
                      />
                    </TableCell>
                    <TableCell align='center'>
                      <Stack direction='row' spacing={1} justifyContent='center'>
                        <Button size='small' variant='outlined' onClick={() => openEditDialog(product)}>
                          แก้ไข
                        </Button>
                        <Button size='small' variant='outlined' color='error' onClick={() => handleDelete(product.id)}>
                          ลบ
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth='sm' fullWidth>
        <DialogTitle>{editProduct ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={1}>
            {error && <Alert severity='error'>{error}</Alert>}

            <TextField
              label='ชื่อสินค้า'
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              fullWidth
              required
            />

            <TextField
              label='รายละเอียด'
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              fullWidth
              multiline
              rows={3}
            />

            <TextField
              label='ราคา (บาท)'
              value={form.price}
              onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
              fullWidth
              type='number'
              inputProps={{ min: 0, step: 1 }}
            />

            <FormControl fullWidth>
              <InputLabel>ประเภทสินค้า</InputLabel>
              <Select
                value={form.type}
                label='ประเภทสินค้า'
                onChange={e => setForm(f => ({ ...f, type: e.target.value as ProductType }))}
              >
                <MenuItem value='PHYSICAL'>สินค้าจริง (Physical)</MenuItem>
                <MenuItem value='DIGITAL'>ดิจิทัล (Digital)</MenuItem>
                <MenuItem value='SERVICE'>บริการ (Service)</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} disabled={saving}>
            ยกเลิก
          </Button>
          <Button
            variant='contained'
            onClick={handleSave}
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
