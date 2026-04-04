'use client'

import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

type ProductType = 'PHYSICAL' | 'DIGITAL' | 'SERVICE'

interface Product {
  id: string
  name: string
  price: number
  type: ProductType
  isActive: boolean
}

interface SelectedProduct {
  productId: string
  name: string
  price: number
  quantity: number
}

interface OneOffItem {
  name: string
  price: string
  quantity: string
}

const ORDER_TYPE_OPTIONS: { value: ProductType; label: string }[] = [
  { value: 'PHYSICAL', label: 'สินค้าจริง (Physical)' },
  { value: 'DIGITAL', label: 'ดิจิทัล (Digital)' },
  { value: 'SERVICE', label: 'บริการ (Service)' },
]

export default function SellerCreateOrderPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<SelectedProduct[]>([])
  const [oneOffItems, setOneOffItems] = useState<OneOffItem[]>([])
  const [orderType, setOrderType] = useState<ProductType>('PHYSICAL')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [createdToken, setCreatedToken] = useState('')
  const [snackbar, setSnackbar] = useState('')

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        setProducts(Array.isArray(data) ? data.filter((p: Product) => p.isActive) : [])
      } catch (err) {
        console.error('fetch error', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const isProductSelected = (id: string) => selected.some(s => s.productId === id)

  const toggleProduct = (product: Product) => {
    if (isProductSelected(product.id)) {
      setSelected(prev => prev.filter(s => s.productId !== product.id))
    } else {
      setSelected(prev => [
        ...prev,
        { productId: product.id, name: product.name, price: product.price, quantity: 1 },
      ])
    }
  }

  const updateQuantity = (productId: string, qty: number) => {
    setSelected(prev =>
      prev.map(s => (s.productId === productId ? { ...s, quantity: Math.max(1, qty) } : s))
    )
  }

  const addOneOffItem = () => {
    setOneOffItems(prev => [...prev, { name: '', price: '', quantity: '1' }])
  }

  const removeOneOffItem = (index: number) => {
    setOneOffItems(prev => prev.filter((_, i) => i !== index))
  }

  const updateOneOff = (index: number, field: keyof OneOffItem, value: string) => {
    setOneOffItems(prev => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
  }

  const totalAmount =
    selected.reduce((sum, s) => sum + s.price * s.quantity, 0) +
    oneOffItems.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0
      const qty = parseInt(item.quantity) || 1
      return sum + price * qty
    }, 0)

  const handleSubmit = async () => {
    const items: Array<{ productId?: string; name: string; price: number; quantity: number }> = [
      ...selected.map(s => ({ productId: s.productId, name: s.name, price: s.price, quantity: s.quantity })),
      ...oneOffItems
        .filter(item => item.name.trim())
        .map(item => ({
          name: item.name.trim(),
          price: parseFloat(item.price) || 0,
          quantity: parseInt(item.quantity) || 1,
        })),
    ]

    if (items.length === 0) {
      setError('กรุณาเลือกสินค้าหรือเพิ่มรายการอย่างน้อย 1 รายการ')
      return
    }

    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, type: orderType }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'ไม่สามารถสร้างคำสั่งซื้อได้')
      }
      const order = await res.json()
      setCreatedToken(order.publicToken)
      setSelected([])
      setOneOffItems([])
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCopyLink = () => {
    const url = `${window.location.origin}/o/${createdToken}`
    navigator.clipboard.writeText(url)
    setSnackbar('คัดลอกลิงก์แล้ว')
  }

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight={300}>
        <CircularProgress />
      </Box>
    )
  }

  if (createdToken) {
    const publicUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/o/${createdToken}`
    return (
      <Box>
        <Typography variant='h4' mb={4}>
          สร้างคำสั่งซื้อสำเร็จ
        </Typography>
        <Card>
          <CardContent>
            <Stack spacing={3}>
              <Alert severity='success'>สร้างคำสั่งซื้อเรียบร้อยแล้ว</Alert>
              <Typography variant='subtitle1' fontWeight='bold'>
                ลิงก์สำหรับผู้ซื้อ
              </Typography>
              <Stack direction='row' spacing={2} alignItems='center'>
                <TextField
                  value={publicUrl}
                  fullWidth
                  size='small'
                  InputProps={{ readOnly: true }}
                />
                <Button variant='contained' onClick={handleCopyLink}>
                  คัดลอก
                </Button>
              </Stack>
              <Button
                variant='outlined'
                onClick={() => setCreatedToken('')}
              >
                สร้างคำสั่งซื้อใหม่
              </Button>
            </Stack>
          </CardContent>
        </Card>
        <Snackbar
          open={!!snackbar}
          autoHideDuration={3000}
          onClose={() => setSnackbar('')}
          message={snackbar}
        />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant='h4' mb={4}>
        สร้างคำสั่งซื้อ
      </Typography>

      <Stack spacing={4}>
        {error && <Alert severity='error'>{error}</Alert>}

        {/* Order Type */}
        <Card>
          <CardContent>
            <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
              ประเภทคำสั่งซื้อ
            </Typography>
            <FormControl fullWidth>
              <InputLabel>ประเภท</InputLabel>
              <Select
                value={orderType}
                label='ประเภท'
                onChange={e => setOrderType(e.target.value as ProductType)}
              >
                {ORDER_TYPE_OPTIONS.map(opt => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        {/* Product Catalog */}
        <Card>
          <CardContent>
            <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
              เลือกสินค้าจากคลัง
            </Typography>
            {products.length === 0 ? (
              <Typography variant='body2' color='text.secondary'>
                ยังไม่มีสินค้า
              </Typography>
            ) : (
              <Stack spacing={2}>
                {products.map(product => {
                  const sel = selected.find(s => s.productId === product.id)
                  return (
                    <Stack key={product.id} direction='row' alignItems='center' spacing={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isProductSelected(product.id)}
                            onChange={() => toggleProduct(product)}
                          />
                        }
                        label={
                          <Stack>
                            <Typography variant='body2' fontWeight='medium'>
                              {product.name}
                            </Typography>
                            <Typography variant='caption' color='text.secondary'>
                              ฿{product.price.toLocaleString('th-TH')}
                            </Typography>
                          </Stack>
                        }
                        sx={{ flex: 1, mr: 0 }}
                      />
                      {sel && (
                        <Stack direction='row' alignItems='center' spacing={1}>
                          <Typography variant='body2' color='text.secondary'>
                            จำนวน:
                          </Typography>
                          <TextField
                            type='number'
                            value={sel.quantity}
                            onChange={e => updateQuantity(product.id, parseInt(e.target.value) || 1)}
                            size='small'
                            sx={{ width: 80 }}
                            inputProps={{ min: 1 }}
                          />
                        </Stack>
                      )}
                    </Stack>
                  )
                })}
              </Stack>
            )}
          </CardContent>
        </Card>

        {/* One-off Items */}
        <Card>
          <CardContent>
            <Stack direction='row' justifyContent='space-between' alignItems='center' mb={2}>
              <Typography variant='subtitle1' fontWeight='bold'>
                รายการพิเศษ (ไม่อยู่ในคลังสินค้า)
              </Typography>
              <Button variant='outlined' size='small' onClick={addOneOffItem}>
                เพิ่มรายการ
              </Button>
            </Stack>
            {oneOffItems.length === 0 ? (
              <Typography variant='body2' color='text.secondary'>
                กดปุ่ม "เพิ่มรายการ" เพื่อเพิ่มสินค้าที่ไม่ได้อยู่ในคลัง
              </Typography>
            ) : (
              <Stack spacing={2}>
                {oneOffItems.map((item, index) => (
                  <Stack key={index} direction='row' spacing={2} alignItems='flex-start'>
                    <TextField
                      label='ชื่อสินค้า'
                      value={item.name}
                      onChange={e => updateOneOff(index, 'name', e.target.value)}
                      size='small'
                      sx={{ flex: 2 }}
                    />
                    <TextField
                      label='ราคา'
                      value={item.price}
                      onChange={e => updateOneOff(index, 'price', e.target.value)}
                      size='small'
                      type='number'
                      sx={{ flex: 1 }}
                      inputProps={{ min: 0 }}
                    />
                    <TextField
                      label='จำนวน'
                      value={item.quantity}
                      onChange={e => updateOneOff(index, 'quantity', e.target.value)}
                      size='small'
                      type='number'
                      sx={{ flex: 1 }}
                      inputProps={{ min: 1 }}
                    />
                    <Button
                      variant='outlined'
                      color='error'
                      size='small'
                      onClick={() => removeOneOffItem(index)}
                      sx={{ mt: 0.5 }}
                    >
                      ลบ
                    </Button>
                  </Stack>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardContent>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
              <Typography variant='subtitle1' fontWeight='bold'>
                ยอดรวม
              </Typography>
              <Typography variant='h5' fontWeight='bold' color='primary'>
                ฿{totalAmount.toLocaleString('th-TH')}
              </Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            {selected.length > 0 && (
              <Stack spacing={1} mb={2}>
                {selected.map(s => (
                  <Stack key={s.productId} direction='row' justifyContent='space-between'>
                    <Typography variant='body2'>
                      {s.name} × {s.quantity}
                    </Typography>
                    <Typography variant='body2' fontWeight='medium'>
                      ฿{(s.price * s.quantity).toLocaleString('th-TH')}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            )}
            {oneOffItems.filter(i => i.name.trim()).length > 0 && (
              <Stack spacing={1} mb={2}>
                {oneOffItems
                  .filter(i => i.name.trim())
                  .map((item, index) => (
                    <Stack key={index} direction='row' justifyContent='space-between'>
                      <Typography variant='body2'>
                        {item.name} × {item.quantity || 1}
                      </Typography>
                      <Typography variant='body2' fontWeight='medium'>
                        ฿{((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1)).toLocaleString('th-TH')}
                      </Typography>
                    </Stack>
                  ))}
              </Stack>
            )}
            <Button
              fullWidth
              variant='contained'
              size='large'
              onClick={handleSubmit}
              disabled={submitting}
              startIcon={submitting ? <CircularProgress size={18} color='inherit' /> : null}
            >
              {submitting ? 'กำลังสร้างคำสั่งซื้อ...' : 'สร้างคำสั่งซื้อ'}
            </Button>
          </CardContent>
        </Card>
      </Stack>

      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar('')}
        message={snackbar}
      />
    </Box>
  )
}
