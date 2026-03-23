'use client'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import Link from 'next/link'

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/orders')
      .then(r => r.json())
      .then(res => { if (res.success) setOrders(res.data || []) })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">ออเดอร์ของฉัน</h1>

      {loading ? (
        <p className="text-gray-500">กำลังโหลด...</p>
      ) : orders.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-500">ยังไม่มีออเดอร์</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {orders.map((order: any) => (
            <Link key={order.id} href={`/orders/${order.publicToken}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{order.deal?.productName}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      ฿{Number(order.amount).toLocaleString()}
                      {order.buyer && <span className="ml-2">• {order.buyer.name}</span>}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(order.createdAt).toLocaleDateString('th-TH')}
                    </p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
