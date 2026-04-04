'use client'

import { useEffect, useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

import OrderStatusBadge from '@/components/order-status-badge'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface ShopUser {
  displayName?: string | null
  username: string
  phone?: string | null
}

interface Shop {
  id: string
  name: string
  user: ShopUser
}

interface Order {
  id: string
  publicToken: string
  totalAmount: number
  status: string
  buyerContact?: string | null
  createdAt: string
  items: OrderItem[]
  shop: Shop
}

const STATUS_OPTIONS = [
  { value: '', label: 'ทุกสถานะ' },
  { value: 'CREATED', label: 'รอยืนยัน' },
  { value: 'CONFIRMED', label: 'ยืนยันแล้ว' },
  { value: 'SHIPPED', label: 'กำลังจัดส่ง' },
  { value: 'COMPLETED', label: 'สำเร็จ' },
  { value: 'CANCELLED', label: 'ยกเลิก' },
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchOrders = useCallback(async (statusFilter: string) => {
    setLoading(true)
    setError('')

    try {
      const params = new URLSearchParams()

      if (statusFilter) params.set('status', statusFilter)

      const res = await fetch(`/api/admin/orders?${params.toString()}`)

      if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลได้')

      const data = await res.json()

      setOrders(Array.isArray(data) ? data : [])
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders(status)
  }, [status, fetchOrders])

  return (
    <Box>
      <Typography variant='h4' fontWeight='bold' mb={1}>
        จัดการคำสั่งซื้อ
      </Typography>
      <Typography variant='body2' color='text.secondary' mb={4}>
        คำสั่งซื้อทั้งหมดในระบบ
      </Typography>

      <Stack direction='row' spacing={2} mb={3} alignItems='center'>
        <FormControl size='small' sx={{ minWidth: 180 }}>
          <InputLabel>กรองตามสถานะ</InputLabel>
          <Select
            value={status}
            label='กรองตามสถานะ'
            onChange={e => setStatus(e.target.value)}
          >
            {STATUS_OPTIONS.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant='body2' color='text.secondary'>
          พบ {orders.length} รายการ
        </Typography>
      </Stack>

      {error && (
        <Alert severity='error' sx={{ mb: 3 }}>
          {error}
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
                  <TableCell>ร้านค้า</TableCell>
                  <TableCell>ผู้ซื้อ</TableCell>
                  <TableCell>รายการสินค้า</TableCell>
                  <TableCell align='right'>ยอดรวม</TableCell>
                  <TableCell align='center'>สถานะ</TableCell>
                  <TableCell align='right'>วันที่</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align='center' sx={{ py: 6 }}>
                      <Typography color='text.secondary'>ไม่พบคำสั่งซื้อ</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map(order => (
                    <TableRow key={order.id} hover>
                      <TableCell>
                        <Typography variant='body2' fontWeight='medium'>
                          {order.shop?.name || '—'}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          @{order.shop?.user?.username}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>
                          {order.buyerContact || '—'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack spacing={0.5}>
                          {order.items?.length > 0 ? (
                            order.items.map(item => (
                              <Typography key={item.id} variant='body2'>
                                {item.name} × {item.quantity}
                              </Typography>
                            ))
                          ) : (
                            <Typography variant='body2' color='text.secondary'>—</Typography>
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell align='right'>
                        <Typography variant='body2' fontWeight='medium'>
                          ฿{order.totalAmount.toLocaleString('th-TH')}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <OrderStatusBadge status={order.status} />
                      </TableCell>
                      <TableCell align='right'>
                        <Typography variant='body2' color='text.secondary'>
                          {new Date(order.createdAt).toLocaleDateString('th-TH')}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </Box>
  )
}
