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
  Plus, ArrowRight, Copy, ShoppingBag,
} from 'lucide-react'
import Link from 'next/link'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'

// ── Mock Data ──
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

const revenueData = [
  { name: 'ม.ค.', revenue: 45000, orders: 3 },
  { name: 'ก.พ.', revenue: 78000, orders: 5 },
  { name: 'มี.ค.', revenue: 62000, orders: 4 },
  { name: 'เม.ย.', revenue: 95000, orders: 7 },
  { name: 'พ.ค.', revenue: 120000, orders: 9 },
  { name: 'มิ.ย.', revenue: 136300, orders: 8 },
]

const orderStatusData = [
  { name: 'สำเร็จ', value: 42, color: '#16a34a' },
  { name: 'กำลังจัดส่ง', value: 8, color: '#3b82f6' },
  { name: 'รอชำระ', value: 5, color: '#f59e0b' },
  { name: 'ข้อพิพาท', value: 2, color: '#ef4444' },
]

const weeklyData = [
  { name: 'จ.', orders: 2, revenue: 15000 },
  { name: 'อ.', orders: 3, revenue: 28000 },
  { name: 'พ.', orders: 1, revenue: 7500 },
  { name: 'พฤ.', orders: 4, revenue: 45000 },
  { name: 'ศ.', orders: 5, revenue: 62000 },
  { name: 'ส.', orders: 3, revenue: 35000 },
  { name: 'อา.', orders: 2, revenue: 22000 },
]

export default function SellerDashboardPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/orders?limit=5')
      .then(r => r.json())
      .then(res => {
        if (res.success && res.data?.length > 0) setOrders(res.data)
        else setOrders(mockOrders)
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
        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="ออเดอร์ทั้งหมด" value={orders.length} icon={Package} />
          <StatsCard title="สำเร็จ" value={completed} icon={CheckCircle} />
          <StatsCard title="รอดำเนินการ" value={active} icon={Clock} />
          <StatsCard title="รายได้รวม" value={`฿${totalRevenue.toLocaleString()}`} icon={DollarSign} />
        </div>

        {/* ── Charts Row ── */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Revenue Area Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> รายได้รายเดือน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `฿${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', background: 'var(--card)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                    formatter={(value: any) => [`฿${Number(value).toLocaleString()}`, 'รายได้']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2.5} fill="url(#revenueGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Order Status Pie */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">สัดส่วนออเดอร์</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', background: 'var(--card)' }}
                    formatter={(value: any, name: any) => [`${value} รายการ`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {orderStatusData.map((s) => (
                  <div key={s.name} className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-xs text-muted-foreground">{s.name} ({s.value})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Weekly Bar Chart ── */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-4 w-4" /> ออเดอร์รายสัปดาห์
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `฿${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', background: 'var(--card)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  formatter={(value: any, name: any) => [
                    name === 'orders' ? `${value} รายการ` : `฿${Number(value).toLocaleString()}`,
                    name === 'orders' ? 'ออเดอร์' : 'รายได้',
                  ]}
                />
                <Legend formatter={(value) => value === 'orders' ? 'ออเดอร์' : 'รายได้'} />
                <Bar yAxisId="left" dataKey="orders" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar yAxisId="right" dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} opacity={0.6} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ── Bottom: Orders + Sidebar ── */}
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
                        <p className="font-medium text-sm text-foreground truncate">{order.deal?.productName}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-xs font-medium text-primary">฿{Number(order.amount).toLocaleString()}</p>
                          {order.buyer && <p className="text-xs text-muted-foreground">ผู้ซื้อ: {order.buyer.name}</p>}
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">ดำเนินการด่วน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/seller/deals/create" className="block">
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                    <div className="rounded-lg bg-primary/10 p-2"><Plus className="h-4 w-4 text-primary" /></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">สร้างดีลใหม่</p>
                      <p className="text-xs text-muted-foreground">ลงขายสินค้า</p>
                    </div>
                  </div>
                </Link>
                <div
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                  onClick={() => { navigator.clipboard.writeText('safepay.local/somchai-shop'); alert('คัดลอกลิงก์ร้านค้าแล้ว') }}
                >
                  <div className="rounded-lg bg-green-600/10 p-2"><Copy className="h-4 w-4 text-green-600" /></div>
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
