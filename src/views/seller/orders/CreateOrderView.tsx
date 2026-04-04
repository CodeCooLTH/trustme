'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

type ProductType = 'PHYSICAL' | 'DIGITAL' | 'SERVICE'

interface Product {
  id: string
  name: string
  price: number
  type: ProductType
  isActive: boolean
}

interface OrderItem {
  id: string // internal key
  productId?: string
  name: string
  price: number
  quantity: number
}

const ORDER_TYPE_OPTIONS: { value: ProductType; label: string }[] = [
  { value: 'PHYSICAL', label: 'สินค้าจริง (Physical)' },
  { value: 'DIGITAL', label: 'ดิจิทัล (Digital)' },
  { value: 'SERVICE', label: 'บริการ (Service)' }
]

let nextId = 1

const CreateOrderView = () => {
  // States
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<OrderItem[]>([
    { id: String(nextId++), name: '', price: 0, quantity: 1 }
  ])
  const [orderType, setOrderType] = useState<ProductType>('PHYSICAL')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successDialog, setSuccessDialog] = useState(false)
  const [createdToken, setCreatedToken] = useState('')
  const [copied, setCopied] = useState(false)

  // Hooks
  const isBelowMdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

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

  const addItem = () => {
    setItems(prev => [...prev, { id: String(nextId++), name: '', price: 0, quantity: 1 }])
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const updateItem = (id: string, field: keyof OrderItem, value: string | number) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  const handleProductSelect = (itemId: string, productId: string) => {
    const product = products.find(p => p.id === productId)

    if (product) {
      setItems(prev =>
        prev.map(item =>
          item.id === itemId
            ? { ...item, productId: product.id, name: product.name, price: product.price }
            : item
        )
      )
    } else {
      // "custom" selected
      setItems(prev =>
        prev.map(item =>
          item.id === itemId
            ? { ...item, productId: undefined, name: '', price: 0 }
            : item
        )
      )
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSubmit = async () => {
    const validItems = items.filter(item => item.name.trim() && item.price > 0)

    if (validItems.length === 0) {
      setError('กรุณาเพิ่มรายการสินค้าอย่างน้อย 1 รายการ')

      return
    }

    setError('')
    setSubmitting(true)

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: validItems.map(item => ({
            productId: item.productId || undefined,
            name: item.name.trim(),
            price: item.price,
            qty: item.quantity
          })),
          type: orderType
        })
      })

      if (!res.ok) {
        const data = await res.json()

        throw new Error(data.error || 'ไม่สามารถสร้างคำสั่งซื้อได้')
      }

      const order = await res.json()

      setCreatedToken(order.publicToken)
      setSuccessDialog(true)
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCopyLink = () => {
    const url = `${window.location.origin}/o/${createdToken}`

    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCreateNew = () => {
    setSuccessDialog(false)
    setCreatedToken('')
    setItems([{ id: String(nextId++), name: '', price: 0, quantity: 1 }])
    setOrderType('PHYSICAL')
    setError('')
  }

  const publicUrl = typeof window !== 'undefined' ? `${window.location.origin}/o/${createdToken}` : ''

  return (
    <>
      <Grid container spacing={6}>
        {/* Main Card — based on AddCard.tsx */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Card>
            <CardContent className='sm:!p-12'>
              <Grid container spacing={6}>
                {/* Header */}
                <Grid size={{ xs: 12 }}>
                  <div className='p-6 bg-actionHover rounded'>
                    <div className='flex justify-between gap-4 flex-col sm:flex-row'>
                      <div className='flex flex-col gap-6'>
                        <Typography variant='h5' color='text.primary'>
                          สร้างคำสั่งซื้อใหม่
                        </Typography>
                        <Typography color='text.secondary'>
                          เพิ่มรายการสินค้าและกำหนดราคาสำหรับผู้ซื้อ
                        </Typography>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-4'>
                          <Typography className='min-is-[95px]' color='text.primary'>
                            ประเภท:
                          </Typography>
                          <CustomTextField
                            select
                            fullWidth
                            value={orderType}
                            onChange={e => setOrderType(e.target.value as ProductType)}
                          >
                            {ORDER_TYPE_OPTIONS.map(opt => (
                              <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </MenuItem>
                            ))}
                          </CustomTextField>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>

                {error && (
                  <Grid size={{ xs: 12 }}>
                    <Alert severity='error'>{error}</Alert>
                  </Grid>
                )}

                <Grid size={{ xs: 12 }}>
                  <Divider className='border-dashed' />
                </Grid>

                {/* Item List — based on AddCard repeater pattern */}
                <Grid size={{ xs: 12 }}>
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className={classnames('repeater-item flex relative mbe-4 border rounded', {
                        'mbs-8': !isBelowMdScreen,
                        'mbs-14!': index !== 0 && !isBelowMdScreen,
                        'gap-5': isBelowMdScreen
                      })}
                    >
                      <Grid container spacing={5} className='m-0 p-5'>
                        <Grid size={{ xs: 12, md: 5, lg: 5 }}>
                          <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                            สินค้า
                          </Typography>
                          <CustomTextField
                            select
                            fullWidth
                            value={item.productId || '_custom'}
                            onChange={e => handleProductSelect(item.id, e.target.value)}
                            className='mbe-5'
                          >
                            <MenuItem value='_custom'>
                              <i className='tabler-plus mie-2 text-base' />
                              รายการกำหนดเอง
                            </MenuItem>
                            {products.map(product => (
                              <MenuItem key={product.id} value={product.id}>
                                {product.name} — ฿{product.price.toLocaleString('th-TH')}
                              </MenuItem>
                            ))}
                          </CustomTextField>
                          {!item.productId && (
                            <CustomTextField
                              fullWidth
                              placeholder='ชื่อสินค้า'
                              value={item.name}
                              onChange={e => updateItem(item.id, 'name', e.target.value)}
                            />
                          )}
                        </Grid>
                        <Grid size={{ xs: 12, md: 3, lg: 3 }}>
                          <Typography className='font-medium md:absolute md:-top-8'>ราคา</Typography>
                          <CustomTextField
                            {...(isBelowMdScreen && { fullWidth: true })}
                            type='number'
                            placeholder='0'
                            value={item.price || ''}
                            onChange={e => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                            disabled={!!item.productId}
                            slotProps={{
                              input: {
                                startAdornment: <InputAdornment position='start'>฿</InputAdornment>,
                                inputProps: { min: 0 }
                              }
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 2 }}>
                          <Typography className='font-medium md:absolute md:-top-8'>จำนวน</Typography>
                          <CustomTextField
                            {...(isBelowMdScreen && { fullWidth: true })}
                            type='number'
                            placeholder='1'
                            value={item.quantity}
                            onChange={e => updateItem(item.id, 'quantity', Math.max(1, parseInt(e.target.value) || 1))}
                            slotProps={{
                              input: {
                                inputProps: { min: 1 }
                              }
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 2 }}>
                          <Typography className='font-medium md:absolute md:-top-8'>รวม</Typography>
                          <Typography className='font-medium' color='text.primary'>
                            ฿{(item.price * item.quantity).toLocaleString('th-TH')}
                          </Typography>
                        </Grid>
                      </Grid>
                      <div className='flex flex-col justify-start border-is'>
                        <IconButton size='small' onClick={() => removeItem(item.id)}>
                          <i className='tabler-x text-2xl text-actionActive' />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                  <Grid size={{ xs: 12 }}>
                    <Button
                      size='small'
                      variant='contained'
                      onClick={addItem}
                      startIcon={<i className='tabler-plus' />}
                    >
                      เพิ่มรายการ
                    </Button>
                  </Grid>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Divider className='border-dashed' />
                </Grid>

                {/* Total — based on AddCard subtotal section */}
                <Grid size={{ xs: 12 }}>
                  <div className='flex justify-end'>
                    <div className='min-is-[200px]'>
                      <div className='flex items-center justify-between'>
                        <Typography>รวมทั้งหมด:</Typography>
                        <Typography className='font-medium' color='text.primary'>
                          ฿{subtotal.toLocaleString('th-TH')}
                        </Typography>
                      </div>
                      <Divider className='mlb-2' />
                      <div className='flex items-center justify-between'>
                        <Typography className='font-medium'>ยอดสุทธิ:</Typography>
                        <Typography variant='h6' className='font-medium' color='primary.main'>
                          ฿{subtotal.toLocaleString('th-TH')}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar Actions — based on AddActions.tsx */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <Card>
                <CardContent className='flex flex-col gap-4'>
                  <Button
                    fullWidth
                    variant='contained'
                    className='capitalize'
                    startIcon={
                      submitting ? (
                        <CircularProgress size={18} color='inherit' />
                      ) : (
                        <i className='tabler-shopping-cart-plus' />
                      )
                    }
                    onClick={handleSubmit}
                    disabled={submitting || loading}
                  >
                    {submitting ? 'กำลังสร้าง...' : 'สร้างคำสั่งซื้อ'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Card>
                <CardContent>
                  <div className='flex flex-col gap-4'>
                    <Typography className='font-medium' color='text.primary'>
                      ประเภทคำสั่งซื้อ
                    </Typography>
                    <div className='flex flex-col gap-1'>
                      {ORDER_TYPE_OPTIONS.map(opt => (
                        <div key={opt.value} className='flex items-center gap-2'>
                          <i
                            className={classnames('tabler-circle-filled text-[8px]', {
                              'text-primary': orderType === opt.value,
                              'text-textDisabled': orderType !== opt.value
                            })}
                          />
                          <Typography
                            variant='body2'
                            color={orderType === opt.value ? 'primary.main' : 'text.secondary'}
                          >
                            {opt.label}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Success Dialog */}
      <Dialog open={successDialog} maxWidth='sm' fullWidth onClose={() => {}}>
        <DialogTitle>สร้างคำสั่งซื้อสำเร็จ</DialogTitle>
        <DialogContent>
          <div className='flex flex-col gap-4 pbs-2'>
            <Alert severity='success'>สร้างคำสั่งซื้อเรียบร้อยแล้ว</Alert>
            <Typography className='font-medium' color='text.primary'>
              ลิงก์สำหรับผู้ซื้อ
            </Typography>
            <div className='flex items-center gap-4'>
              <CustomTextField fullWidth value={publicUrl} slotProps={{ input: { readOnly: true } }} />
              <Button variant='contained' onClick={handleCopyLink} startIcon={<i className='tabler-copy' />}>
                {copied ? 'คัดลอกแล้ว!' : 'คัดลอก'}
              </Button>
            </div>
            <Typography variant='body2' color='text.secondary'>
              ส่งลิงก์นี้ให้ผู้ซื้อเพื่อยืนยันคำสั่งซื้อ
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateNew} variant='tonal' color='secondary'>
            สร้างคำสั่งซื้อใหม่
          </Button>
          <Button href='/orders' variant='contained'>
            ดูรายการคำสั่งซื้อ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateOrderView
