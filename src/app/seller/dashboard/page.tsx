'use client'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layouts/Header'
import { StatsCard } from '@/components/ui/StatsCard'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import { Badge } from '@/components/ui/Badge'
import {
  Package, CheckCircle, Clock, DollarSign, TrendingUp,
  Plus, ArrowRight, Copy, ShoppingBag, Truck,
} from 'lucide-react'
import Link from 'next/link'

// Mock data for demo
const mockOrders = [
  { id: '1', publicToken: 'abc-123', deal: { productName: 'iPhone 15 Pro Max 256GB' }, amount: 35000, status: 'PAYMENT_RECEIVED', buyer: { name: 'สมหญิง' }, createdAt: '2026-03-22T10:00:00Z' },
  { id: '2', publicToken: 'def-456', deal: { productName: 'MacBook Air M3' }, amount: 42000, status: 'SHIPPING', buyer: { name: 'วิภา' }, createdAt: '2026-03-21T14:30:00Z' },
  { id: '3', publicToken: 'ghi-789', deal: { productName: 'AirPods Pro 2' }, amount: 7500, status: 'COMPLETED', buyer: { name: 'ธนพล' }, createdAt: '2026-03-20T09:15:00Z' },
  { id: '4', publicToken: 'jkl-012', deal: { productName: 'iPad Air 6 128GB' }, amount: 22900, status: 'PENDING_PAYMENT', buyer: null, createdAt: '2026-03-23T08:00:00Z' },
  { id: '5', publicToken: 'mno-345', deal: { productName: 'Apple Watch Ultra 2' }, amount: 28900, status: 'COMPLETED', buyer: { name: 'ภาคิน' }, createdAt: '2026-03-19T16:45:00Z' },
]

const mockDeals = [
  { id: '1', productName: 'iPhone 15 Pro Max 256GB', price: 35000, status: 'ACTIVE', orders: 3 },
  { id: '2', productName: 'MacBook Air M3', price: 42000, status: 'ACTIVE', orders: 1 },
  { id: '3', productName: 'AirPods Pro 2', price: 7500, status: 'ACTIVE', orders: 5 },
]

export default function SellerDashboardPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Try API first, fallback to mock
    fetch('/api/orders?limit=5')
      .then(r => r.json())
      .then(res => {
        if (res.success && res.data?.length > 0) {
          setOrders(res.data)
        } else {
          setOrders(mockOrders)
        }
      })
      .catch(() => setOrders(mockOrders))
      .finally(() => setLoading(false))
  }, [])

  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.amount), 0)
  const completed = orders.filter(o => o.status === 'COMPLETED').length
  const active = orders.filter(o => !['COMPLETED', 'CANCELLED', 'REFUNDED', 'RELEASED'].includes(o.status)).length

  return (
    <>
      <Header
        title="แดชบอร์ด"
        description="ภาพรวมร้านค้าของคุณ"
        actions={
          <Link href="/seller/deals/create">
            <Button size="sm"><Plus className="h-4 w-4" /> สร้างดีลใหม่</Button>
          </Link>
        }
      />
      <div className="p-4 lg:p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="ออเดอร์ทั้งหมด" value={orders.length} icon={Package} />
          <StatsCard title="สำเร็จ" value={completed} icon={CheckCircle} />
          <StatsCard title="รอดำเนินการ" value={active} icon={Clock} />
          <StatsCard title="รายได้รวม" value={`฿${totalRevenue.toLocaleString()}`} icon={DollarSign} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-4 w-4" /> ออเดอร์ล่าสุด
                  </CardTitle>
                  <Link href="/seller/orders" className="text-sm text-primary hover:underline flex items-center gap-1">
                    ดูทั้งหมด <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {orders.map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm text-foreground truncate">{order.deal?.productName}</p>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-xs font-medium text-primary">฿{Number(order.amount).toLocaleString()}</p>
                          {order.buyer && (
                            <p className="text-xs text-muted-foreground">ผู้ซื้อ: {order.buyer.name}</p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                      </div>
                      <OrderStatusBadge status={order.status} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar: Quick Actions + Active Deals */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">ดำเนินการด่วน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/seller/deals/create" className="block">
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Plus className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">สร้างดีลใหม่</p>
                      <p className="text-xs text-muted-foreground">ลงขายสินค้า</p>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText('safepay.local/somchai-shop')
                    alert('คัดลอกลิงก์ร้านค้าแล้ว')
                  }}
                >
                  <div className="rounded-lg bg-green-600/10 p-2">
                    <Copy className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">คัดลอกลิงก์ร้าน</p>
                    <p className="text-xs text-muted-foreground">safepay.local/somchai-shop</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Deals */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ShoppingBag className="h-4 w-4" /> ดีลที่เปิดอยู่
                  </CardTitle>
                  <Link href="/seller/deals" className="text-xs text-primary hover:underline">ดูทั้งหมด</Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockDeals.map((deal) => (
                    <div key={deal.id} className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{deal.productName}</p>
                        <p className="text-xs text-muted-foreground">฿{deal.price.toLocaleString()} • {deal.orders} ออเดอร์</p>
                      </div>
                      <Badge variant="success">เปิด</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="h-4 w-4" /> สถิติ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">อัตราสำเร็จ</span>
                    <span className="text-sm font-semibold text-green-600">94%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">คะแนนร้าน</span>
                    <span className="text-sm font-semibold text-foreground">45 pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">เวลาจัดส่งเฉลี่ย</span>
                    <span className="text-sm font-semibold text-foreground">1.2 วัน</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
