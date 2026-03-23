'use client'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layouts/Header'
import { StatsCard } from '@/components/ui/StatsCard'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { PageLoading } from '@/components/ui/Loading'
import { ShoppingBag, Package, CheckCircle, DollarSign, TrendingUp, Users, CreditCard, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(r => r.json())
      .then(res => { if (res.success) setStats(res.data) })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <PageLoading />

  return (
    <>
      <Header title="แดชบอร์ด" description="ภาพรวมระบบ SafePay" />
      <div className="p-4 lg:p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="ดีลทั้งหมด" value={stats?.totalDeals || 0} icon={ShoppingBag} />
          <StatsCard title="ออเดอร์ทั้งหมด" value={stats?.totalOrders || 0} icon={Package} />
          <StatsCard title="ดีลสำเร็จ" value={stats?.completedOrders || 0} icon={CheckCircle} />
          <StatsCard title="ผู้ใช้ทั้งหมด" value={stats?.totalUsers || 0} icon={Users} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatsCard title="GMV" value={`฿${Number(stats?.gmv || 0).toLocaleString()}`} icon={DollarSign} />
          <StatsCard title="Success Rate" value={`${stats?.successRate || 0}%`} icon={TrendingUp} />
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                สลิปรอตรวจ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats?.pendingPayments || 0}</p>
              <Link href="/admin/payments" className="text-sm text-primary hover:underline mt-2 block">ไปตรวจสลิป →</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                ข้อพิพาทเปิดอยู่
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-destructive">{stats?.openDisputes || 0}</p>
              <Link href="/admin/disputes" className="text-sm text-primary hover:underline mt-2 block">ไปจัดการ →</Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
