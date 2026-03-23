'use client'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layouts/Header'
import { StatsCard } from '@/components/ui/StatsCard'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import { PageLoading } from '@/components/ui/Loading'
import { EmptyState } from '@/components/ui/EmptyState'
import { Package, CheckCircle, Clock } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/orders?limit=5')
      .then(r => r.json())
      .then(res => { if (res.success) setOrders(res.data || []) })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <PageLoading />

  const completed = orders.filter(o => o.status === 'COMPLETED').length
  const active = orders.filter(o => !['COMPLETED', 'CANCELLED', 'REFUNDED', 'RELEASED'].includes(o.status)).length

  return (
    <>
      <Header title="แดชบอร์ด" />
      <div className="p-4 lg:p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatsCard title="ออเดอร์ทั้งหมด" value={orders.length} icon={Package} />
          <StatsCard title="สำเร็จ" value={completed} icon={CheckCircle} />
          <StatsCard title="รอดำเนินการ" value={active} icon={Clock} />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>ออเดอร์ล่าสุด</CardTitle>
              <Link href="/orders" className="text-sm text-primary hover:underline">ดูทั้งหมด</Link>
            </div>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <EmptyState icon={Package} title="ยังไม่มีออเดอร์" />
            ) : (
              <div className="space-y-2">
                {orders.map((order: any) => (
                  <Link key={order.id} href={`/orders/${order.publicToken}`} className="block">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">{order.deal?.productName || 'สินค้า'}</p>
                        <p className="text-xs text-muted-foreground">฿{Number(order.amount).toLocaleString()}</p>
                      </div>
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
