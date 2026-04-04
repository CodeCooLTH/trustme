'use client'

import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

interface DashboardStats {
  totalUsers: number
  totalShops: number
  totalOrders: number
  pendingVerifications: number
  avgTrustScore: number
}

interface StatCardProps {
  title: string
  value: number | string
  icon: string
  color?: string
}

function StatCard({ title, value, icon, color = 'primary.main' }: StatCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display='flex' alignItems='flex-start' justifyContent='space-between'>
          <Box>
            <Typography variant='body2' color='text.secondary' gutterBottom>
              {title}
            </Typography>
            <Typography variant='h4' fontWeight='bold'>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.9,
            }}
          >
            <i className={icon} style={{ fontSize: 24, color: 'white' }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/dashboard')

        if (!res.ok) {
          throw new Error('ไม่สามารถโหลดข้อมูลได้')
        }

        const data = await res.json()

        setStats(data)
      } catch (err: any) {
        setError(err.message || 'เกิดข้อผิดพลาด')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight={300}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity='error' sx={{ mt: 2 }}>
        {error}
      </Alert>
    )
  }

  return (
    <Box>
      <Typography variant='h4' fontWeight='bold' mb={1}>
        แดชบอร์ดผู้ดูแลระบบ
      </Typography>
      <Typography variant='body2' color='text.secondary' mb={4}>
        ภาพรวมระบบ SafePay
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title='ผู้ใช้ทั้งหมด'
            value={stats?.totalUsers.toLocaleString('th-TH') ?? 0}
            icon='tabler-users'
            color='primary.main'
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title='ร้านค้าทั้งหมด'
            value={stats?.totalShops.toLocaleString('th-TH') ?? 0}
            icon='tabler-building-store'
            color='success.main'
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title='คำสั่งซื้อทั้งหมด'
            value={stats?.totalOrders.toLocaleString('th-TH') ?? 0}
            icon='tabler-shopping-cart'
            color='info.main'
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title='รอการยืนยันตัวตน'
            value={stats?.pendingVerifications.toLocaleString('th-TH') ?? 0}
            icon='tabler-clock-check'
            color='warning.main'
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title='คะแนนความน่าเชื่อถือเฉลี่ย'
            value={stats?.avgTrustScore ?? 0}
            icon='tabler-star'
            color='secondary.main'
          />
        </Grid>
      </Grid>
    </Box>
  )
}
