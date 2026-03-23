'use client'
import { useEffect, useState } from 'react'
import { StatsCard } from '@/components/ui/StatsCard'
import { Card } from '@/components/ui/Card'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">แดชบอร์ด</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard title="ออเดอร์ทั้งหมด" value={orders.length} />
        <StatsCard title="สำเร็จ" value={orders.filter(o => o.status === 'COMPLETED').length} />
        <StatsCard title="รอดำเนินการ" value={orders.filter(o => !['COMPLETED', 'CANCELLED', 'REFUNDED', 'RELEASED'].includes(o.status)).length} />
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">ออเดอร์ล่าสุด</h2>
          <Link href="/orders" className="text-sm text-blue-600 hover:underline">ดูทั้งหมด</Link>
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm">กำลังโหลด...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-sm">ยังไม่มีออเดอร์</p>
        ) : (
          <div className="space-y-3">
            {orders.map((order: any) => (
              <Link key={order.id} href={`/orders/${order.publicToken}`} className="block">
                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{order.deal?.productName || 'สินค้า'}</p>
                    <p className="text-xs text-gray-500">฿{Number(order.amount).toLocaleString()}</p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
