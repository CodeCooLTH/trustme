'use client'

import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

import TrustScoreBadge from '@/components/trust-score-badge'
import AchievementBadges from '@/components/achievement-badges'

interface Badge {
  name: string
  icon: string
  nameEN: string
  type: string
}

interface UserBadge {
  badge: Badge
}

interface User {
  id: string
  displayName?: string | null
  username: string
  trustScore: number
  userBadges: UserBadge[]
}

interface Order {
  id: string
}

export default function BuyerDashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, ordersRes] = await Promise.all([
          fetch('/api/users/me'),
          fetch('/api/orders?role=buyer'),
        ])
        const userData = await userRes.json()
        const ordersData = await ordersRes.json()

        setUser(userData)
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

  const badges: Badge[] = user?.userBadges?.map(ub => ub.badge) ?? []
  const achievementBadges = badges.filter(b => b.type === 'ACHIEVEMENT')

  return (
    <Box>
      <Typography variant='h4' mb={4}>
        แดชบอร์ด
      </Typography>

      <Grid container spacing={4}>
        {/* Trust Score */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant='subtitle2' color='text.secondary' gutterBottom>
                คะแนนความน่าเชื่อถือ
              </Typography>
              <Typography variant='h2' fontWeight='bold' mb={1}>
                {user?.trustScore ?? 0}
              </Typography>
              {user && <TrustScoreBadge score={user.trustScore} />}
            </CardContent>
          </Card>
        </Grid>

        {/* Badges Earned */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant='subtitle2' color='text.secondary' gutterBottom>
                เหรียญรางวัลที่ได้รับ
              </Typography>
              <Typography variant='h2' fontWeight='bold' mb={1}>
                {achievementBadges.length}
              </Typography>
              {achievementBadges.length > 0 ? (
                <AchievementBadges badges={badges} />
              ) : (
                <Typography variant='body2' color='text.secondary'>
                  ยังไม่มีเหรียญรางวัล
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Orders */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant='subtitle2' color='text.secondary' gutterBottom>
                คำสั่งซื้อทั้งหมด
              </Typography>
              <Typography variant='h2' fontWeight='bold' mb={1}>
                {orders.length}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                รายการสั่งซื้อ
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Welcome Card */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Stack spacing={1}>
                <Typography variant='h6'>
                  สวัสดี, {user?.displayName || user?.username || 'ผู้ใช้'}!
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  ยินดีต้อนรับสู่ SafePay — แพลตฟอร์มการชำระเงินที่ปลอดภัย
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
