'use client'
import { useEffect, useState } from 'react'
import { StatsCard } from '@/components/ui/StatsCard'
import { Card } from '@/components/ui/Card'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(r => r.json())
      .then(res => { if (res.success) setStats(res.data) })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-gray-500">กำลังโหลด...</p>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">แดชบอร์ด Admin</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard title="ดีลทั้งหมด" value={stats?.totalDeals || 0} />
        <StatsCard title="ออเดอร์ทั้งหมด" value={stats?.totalOrders || 0} />
        <StatsCard title="ดีลสำเร็จ" value={stats?.completedOrders || 0} />
        <StatsCard title="GMV" value={`฿${Number(stats?.gmv || 0).toLocaleString()}`} />
        <StatsCard title="Success Rate" value={`${stats?.successRate || 0}%`} />
        <StatsCard title="ผู้ใช้ทั้งหมด" value={stats?.totalUsers || 0} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-semibold text-gray-900 mb-2">สลิปรอตรวจ</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats?.pendingPayments || 0}</p>
          <a href="/admin/payments" className="text-sm text-blue-600 hover:underline mt-2 block">ไปตรวจสลิป →</a>
        </Card>
        <Card>
          <h3 className="font-semibold text-gray-900 mb-2">ข้อพิพาทเปิดอยู่</h3>
          <p className="text-3xl font-bold text-red-600">{stats?.openDisputes || 0}</p>
          <a href="/admin/disputes" className="text-sm text-blue-600 hover:underline mt-2 block">ไปจัดการ →</a>
        </Card>
      </div>
    </div>
  )
}
