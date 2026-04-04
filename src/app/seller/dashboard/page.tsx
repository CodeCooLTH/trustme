'use client'

import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'

import TrustScoreBadge from '@/components/trust-score-badge'
import AchievementBadges from '@/components/achievement-badges'
import OrderStatusBadge from '@/components/order-status-badge'

interface Badge {
  name: string
  icon: string
  nameEN: string
  type: string
}

interface UserBadge {
  badge: Badge
}

interface Shop {
  id: string
  name: string
  trustScore: number
  averageRating: number
  userBadges?: UserBadge[]
}

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

export default function SellerDashboardPage() {
  const [shop, setShop] = useState<Shop | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [shopRes, ordersRes] = await Promise.all([
          fetch('/api/shops'),
          fetch('/api/orders?role=seller'),
        ])
        const shopData = await shopRes.json()
        const ordersData = await ordersRes.json()

        setShop(shopData?.id ? shopData : null)
        setOrders(Array.isArray(ordersData) ? ordersData : [])
      } catch (err) {
        console.error('fetch error', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight={300}>
        <CircularProgress />
      </Box>
    )
  }

  const totalOrders = orders.length
  const completedOrders = orders.filter(o => o.status === 'COMPLETED').length
  const totalRevenue = orders
    .filter(o => o.status === 'COMPLETED')
    .reduce((sum, o) => sum + o.totalAmount, 0)
  const recentOrders = orders.slice(0, 5)

  const badges: Badge[] = shop?.userBadges?.map(ub => ub.badge) ?? []

  return (
    <Box>
      <Typography variant='h4' mb={4}>
        แดชบอร์ด
      </Typography>

      {shop && (
        <Typography variant='subtitle1' color='text.secondary' mb={4}>
          ร้านค้า: {shop.name}
        </Typography>
      )}

      <Grid container spacing={4}>
        {/* Total Orders */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant='subtitle2' color='text.secondary' gutterBottom>
                คำสั่งซื้อทั้งหมด
              </Typography>
              <Typography variant='h2' fontWeight='bold'>
                {totalOrders}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                รายการ
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Completed Orders */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant='subtitle2' color='text.secondary' gutterBottom>
                คำสั่งซื้อที่สำเร็จ
              </Typography>
              <Typography variant='h2' fontWeight='bold' color='success.main'>
                {completedOrders}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                รายการ
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Average Rating */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant='subtitle2' color='text.secondary' gutterBottom>
                คะแนนรีวิวเฉลี่ย
              </Typography>
              <Typography variant='h2' fontWeight='bold' color='warning.main'>
                {shop?.averageRating ? shop.averageRating.toFixed(1) : '—'}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                จาก 5 คะแนน
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Revenue */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant='subtitle2' color='text.secondary' gutterBottom>
                รายได้ทั้งหมด
              </Typography>
              <Typography variant='h2' fontWeight='bold' color='primary'>
                ฿{totalRevenue.toLocaleString('th-TH')}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                จากออเดอร์ที่สำเร็จ
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Trust Score + Badges */}
        {shop && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
                  ความน่าเชื่อถือของร้านค้า
                </Typography>
                <TrustScoreBadge score={shop.trustScore ?? 0} />
                {badges.length > 0 && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant='subtitle2' color='text.secondary' gutterBottom>
                      เหรียญรางวัล
                    </Typography>
                    <AchievementBadges badges={badges} />
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Recent Orders */}
        <Grid size={{ xs: 12, md: shop ? 6 : 12 }}>
          <Card>
            <CardContent>
              <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
                คำสั่งซื้อล่าสุด
              </Typography>
              {recentOrders.length === 0 ? (
                <Typography variant='body2' color='text.secondary' py={2} textAlign='center'>
                  ยังไม่มีคำสั่งซื้อ
                </Typography>
              ) : (
                <Stack spacing={2} divider={<Divider />}>
                  {recentOrders.map(order => (
                    <Stack key={order.id} direction='row' justifyContent='space-between' alignItems='center'>
                      <Stack>
                        <Typography variant='body2' fontWeight='medium'>
                          {order.items?.length > 0
                            ? order.items.map(i => i.name).join(', ')
                            : '—'}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {new Date(order.createdAt).toLocaleDateString('th-TH')}
                        </Typography>
                      </Stack>
                      <Stack direction='row' spacing={1} alignItems='center'>
                        <Typography variant='body2' fontWeight='medium'>
                          ฿{order.totalAmount.toLocaleString('th-TH')}
                        </Typography>
                        <OrderStatusBadge status={order.status} />
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
