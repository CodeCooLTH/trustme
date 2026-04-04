'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

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
  createdAt: string
  items: OrderItem[]
}

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders?role=buyer')
        const data = await res.json()

        setOrders(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('fetch error', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

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
        คำสั่งซื้อของฉัน
      </Typography>

      {orders.length === 0 ? (
        <Card>
          <CardContent>
            <Typography color='text.secondary' textAlign='center' py={4}>
              ยังไม่มีคำสั่งซื้อ
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>รายการสินค้า</TableCell>
                  <TableCell align='right'>ยอดรวม</TableCell>
                  <TableCell align='center'>สถานะ</TableCell>
                  <TableCell align='right'>วันที่</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <TableRow
                    key={order.id}
                    hover
                    component={Link}
                    href={`/o/${order.publicToken}`}
                    sx={{ textDecoration: 'none', cursor: 'pointer' }}
                  >
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Box>
  )
}
