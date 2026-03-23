'use client'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layouts/Header'
import { Card, CardContent } from '@/components/ui/Card'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import { PageLoading } from '@/components/ui/Loading'
import { EmptyState } from '@/components/ui/EmptyState'
import { Package } from 'lucide-react'
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

  if (loading) return <PageLoading />

  return (
    <>
      <Header title="ออเดอร์ของฉัน" description={`ทั้งหมด ${orders.length} รายการ`} />
      <div className="p-4 lg:p-6">
        {orders.length === 0 ? (
          <EmptyState icon={Package} title="ยังไม่มีออเดอร์" />
        ) : (
          <div className="space-y-2">
            {orders.map((order: any) => (
              <Link key={order.id} href={`/seller/orders/${order.publicToken}`}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{order.deal?.productName}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          ฿{Number(order.amount).toLocaleString()}
                          {order.buyer && <span className="ml-2">• {order.buyer.name}</span>}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{new Date(order.createdAt).toLocaleDateString('th-TH')}</p>
                      </div>
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
