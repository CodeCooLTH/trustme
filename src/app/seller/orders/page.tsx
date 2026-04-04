'use client'

import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import Snackbar from '@mui/material/Snackbar'

import OrderStatusBadge from '@/components/order-status-badge'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface Order {
  id: string
  publicToken: string
  totalAmount: number
  status: string
  type: string
  createdAt: string
  items: OrderItem[]
  buyerContact?: string | null
}

const STATUS_TABS = [
  { value: 'ALL', label: 'ทั้งหมด' },
  { value: 'CREATED', label: 'รอยืนยัน' },
  { value: 'CONFIRMED', label: 'ยืนยันแล้ว' },
  { value: 'SHIPPED', label: 'กำลังจัดส่ง' },
  { value: 'COMPLETED', label: 'สำเร็จ' },
  { value: 'CANCELLED', label: 'ยกเลิก' },
]

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('ALL')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [snackbar, setSnackbar] = useState('')

  async function fetchOrders() {
    try {
      const res = await fetch('/api/orders?role=seller')
      const data = await res.json()
      setOrders(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('fetch error', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const filteredOrders =
    activeTab === 'ALL' ? orders : orders.filter(o => o.status === activeTab)

  const handleShip = async (token: string) => {
    setActionLoading(token)
    try {
      await fetch(`/api/orders/${token}/ship`, { method: 'POST' })
      await fetchOrders()
      setSnackbar('อัปเดตสถานะเป็น "กำลังจัดส่ง" แล้ว')
    } catch (err) {
      console.error('ship error', err)
    } finally {
      setActionLoading(null)
    }
  }

  const handleComplete = async (token: string) => {
    setActionLoading(token)
    try {
      await fetch(`/api/orders/${token}/complete`, { method: 'POST' })
      await fetchOrders()
      setSnackbar('อัปเดตสถานะเป็น "สำเร็จ" แล้ว')
    } catch (err) {
      console.error('complete error', err)
    } finally {
      setActionLoading(null)
    }
  }

  const handleCopyLink = (token: string) => {
    const url = `${window.location.origin}/o/${token}`
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

  return (
    <Box>
      <Typography variant='h4' mb={4}>
        คำสั่งซื้อ
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(_, v) => setActiveTab(v)}
        variant='scrollable'
        scrollButtons='auto'
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        {STATUS_TABS.map(tab => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>

      {filteredOrders.length === 0 ? (
        <Card>
          <Box py={6} textAlign='center'>
            <Typography color='text.secondary'>ไม่มีคำสั่งซื้อในหมวดนี้</Typography>
          </Box>
        </Card>
      ) : (
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ผู้ซื้อ</TableCell>
                  <TableCell>รายการสินค้า</TableCell>
                  <TableCell align='right'>ยอดรวม</TableCell>
                  <TableCell align='center'>สถานะ</TableCell>
                  <TableCell align='right'>วันที่</TableCell>
                  <TableCell align='center'>จัดการ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map(order => (
                  <TableRow key={order.id} hover>
                    <TableCell>
                      <Typography variant='body2' color={order.buyerContact ? 'text.primary' : 'text.secondary'}>
                        {order.buyerContact ?? '—'}
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
                          <Typography variant='body2' color='text.secondary'>
                            —
                          </Typography>
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
                    <TableCell align='center'>
                      <Stack direction='row' spacing={1} justifyContent='center'>
                        {/* Ship: CONFIRMED + PHYSICAL */}
                        {order.status === 'CONFIRMED' && order.type === 'PHYSICAL' && (
                          <Button
                            size='small'
                            variant='contained'
                            onClick={() => handleShip(order.publicToken)}
                            disabled={actionLoading === order.publicToken}
                          >
                            จัดส่ง
                          </Button>
                        )}

                        {/* Complete: CONFIRMED digital/service OR SHIPPED */}
                        {(order.status === 'SHIPPED' ||
                          (order.status === 'CONFIRMED' && order.type !== 'PHYSICAL')) && (
                          <Button
                            size='small'
                            variant='contained'
                            color='success'
                            onClick={() => handleComplete(order.publicToken)}
                            disabled={actionLoading === order.publicToken}
                          >
                            เสร็จสิ้น
                          </Button>
                        )}

                        <Button
                          size='small'
                          variant='outlined'
                          onClick={() => handleCopyLink(order.publicToken)}
                        >
                          คัดลอกลิงก์
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

      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar('')}
        message={snackbar}
      />
    </Box>
  )
}
