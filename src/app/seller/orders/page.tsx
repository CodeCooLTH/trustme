'use client'
import { useState } from 'react'
import { Header } from '@/components/layouts/Header'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import { Dialog } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import {
  Plus, Copy, ExternalLink, Search, Filter,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/cn'

const mockOrders = [
  {
    id: '1', publicToken: 'abc-def-1234', sellerSlug: 'somchai-shop',
    productName: 'iPhone 15 Pro Max 256GB', description: 'สีไทเทเนียม สภาพ 99% ครบกล่อง',
    amount: 35000, status: 'PAYMENT_RECEIVED',
    buyer: { name: 'สมหญิง ซื้อเก่ง' }, shippingMethod: 'Kerry Express',
    createdAt: '2026-03-22T10:00:00Z',
  },
  {
    id: '2', publicToken: 'ghi-jkl-5678', sellerSlug: 'somchai-shop',
    productName: 'MacBook Air M3 15"', description: 'RAM 16GB SSD 512GB สี Midnight ใช้งาน 3 เดือน',
    amount: 42000, status: 'SHIPPING',
    buyer: { name: 'วิภา รักช้อป' }, shippingMethod: 'Flash Express',
    trackingNo: 'TH123456789',
    createdAt: '2026-03-21T14:30:00Z',
  },
  {
    id: '3', publicToken: 'mno-pqr-9012', sellerSlug: 'somchai-shop',
    productName: 'AirPods Pro 2 (USB-C)', description: 'ของใหม่ ยังไม่แกะซีล',
    amount: 7500, status: 'COMPLETED',
    buyer: { name: 'ธนพล นักสะสม' }, shippingMethod: 'ไปรษณีย์ไทย',
    trackingNo: 'EF987654321TH',
    createdAt: '2026-03-20T09:15:00Z',
  },
  {
    id: '4', publicToken: 'stu-vwx-3456', sellerSlug: 'somchai-shop',
    productName: 'iPad Air 6 128GB WiFi', description: 'สี Starlight ใหม่แกะกล่อง ประกันศูนย์ 1 ปี',
    amount: 22900, status: 'PENDING_PAYMENT',
    buyer: null, shippingMethod: 'Kerry Express',
    createdAt: '2026-03-23T08:00:00Z',
  },
  {
    id: '5', publicToken: 'yza-bcd-7890', sellerSlug: 'somchai-shop',
    productName: 'Apple Watch Ultra 2', description: 'สภาพ 95% สาย 3 เส้น กล่องครบ',
    amount: 28900, status: 'DELIVERED',
    buyer: { name: 'ภาคิน สายเทค' }, shippingMethod: 'J&T Express',
    trackingNo: 'JT001122334455',
    createdAt: '2026-03-19T16:45:00Z',
  },
  {
    id: '6', publicToken: 'efg-hij-1122', sellerSlug: 'somchai-shop',
    productName: 'Samsung Galaxy S24 Ultra', description: 'สี Titanium Gray 256GB ประกันเหลือ 8 เดือน',
    amount: 32000, status: 'DISPUTE',
    buyer: { name: 'สมศรี มีปัญหา' }, shippingMethod: 'Flash Express',
    createdAt: '2026-03-18T11:20:00Z',
  },
]

const statusFilters = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'PENDING_PAYMENT', label: 'รอชำระ' },
  { value: 'PAYMENT_RECEIVED', label: 'ชำระแล้ว' },
  { value: 'SHIPPING', label: 'กำลังจัดส่ง' },
  { value: 'DELIVERED', label: 'ส่งถึงแล้ว' },
  { value: 'COMPLETED', label: 'สำเร็จ' },
  { value: 'DISPUTE', label: 'ข้อพิพาท' },
]

export default function SellerOrdersPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filtered = mockOrders.filter(o => {
    if (statusFilter && o.status !== statusFilter) return false
    if (search && !o.productName.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const copyLink = (order: typeof mockOrders[0]) => {
    const link = `http://safepay.local:3000/${order.sellerSlug}/deals/${order.publicToken}`
    navigator.clipboard.writeText(link)
    setCopiedId(order.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <>
      <Header
        title="ออเดอร์"
        description={`ทั้งหมด ${mockOrders.length} รายการ`}
        actions={
          <Button size="sm" onClick={() => setShowCreate(true)}>
            <Plus className="h-4 w-4" /> สร้างออเดอร์ใหม่
          </Button>
        }
      />

      <div className="p-4 lg:p-6 space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {statusFilters.map(f => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border',
                  statusFilter === f.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-muted-foreground border-border hover:bg-accent'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Order List */}
        <div className="space-y-3">
          {filtered.map(order => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Link href={`/seller/orders/${order.publicToken}`} className="font-semibold text-foreground hover:text-primary truncate">
                        {order.productName}
                      </Link>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{order.description}</p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                      <span className="text-sm font-semibold text-primary">฿{order.amount.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">{order.shippingMethod}</span>
                      {order.buyer && (
                        <span className="text-xs text-muted-foreground">ผู้ซื้อ: {order.buyer.name}</span>
                      )}
                      {order.trackingNo && (
                        <span className="text-xs font-mono text-muted-foreground">{order.trackingNo}</span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <OrderStatusBadge status={order.status} />
                    <div className="flex gap-1">
                      <button
                        onClick={() => copyLink(order)}
                        className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        title="คัดลอกลิงก์"
                      >
                        {copiedId === order.id ? (
                          <Badge variant="success" className="text-[10px]">คัดลอกแล้ว!</Badge>
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                      <Link
                        href={`http://safepay.local:3000/${order.sellerSlug}/deals/${order.publicToken}`}
                        target="_blank"
                        className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        title="เปิดลิงก์"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Order Dialog */}
      <Dialog open={showCreate} onClose={() => setShowCreate(false)} title="สร้างออเดอร์ใหม่" description="กรอกข้อมูลสินค้าเพื่อสร้างลิงก์สั่งซื้อ">
        <CreateOrderForm onClose={() => setShowCreate(false)} />
      </Dialog>
    </>
  )
}

function CreateOrderForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ productName: '', description: '', price: '', shippingMethod: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ link: string } | null>(null)

  const providers = ['Kerry Express', 'Flash Express', 'ไปรษณีย์ไทย', 'J&T Express', 'Ninja Van']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate creating order
    setTimeout(() => {
      const token = `${Math.random().toString(36).slice(2, 6)}-${Math.random().toString(36).slice(2, 6)}-${Math.floor(Math.random() * 9000) + 1000}`
      setResult({ link: `http://safepay.local:3000/somchai-shop/deals/${token}` })
      setLoading(false)
    }, 800)
  }

  if (result) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center">
          <p className="text-sm font-medium text-green-800">สร้างออเดอร์สำเร็จ!</p>
          <p className="text-xs text-green-600 mt-1">คัดลอกลิงก์ด้านล่างส่งให้ผู้ซื้อ</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            readOnly
            value={result.link}
            className="flex-1 h-9 px-3 rounded-md border border-input bg-muted text-sm font-mono"
          />
          <Button size="sm" onClick={() => { navigator.clipboard.writeText(result.link); alert('คัดลอกแล้ว!') }}>
            <Copy className="h-4 w-4" />
          </Button>
          <a href={result.link} target="_blank">
            <Button size="sm" variant="outline"><ExternalLink className="h-4 w-4" /></Button>
          </a>
        </div>

        <Button variant="outline" className="w-full" onClick={onClose}>ปิด</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="ชื่อสินค้า" value={form.productName} onChange={e => setForm(f => ({ ...f, productName: e.target.value }))} placeholder="เช่น iPhone 15 Pro Max" required />
      <Textarea label="รายละเอียด" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="สภาพสินค้า, อุปกรณ์ที่ได้, etc." required />
      <Input label="ราคา (บาท)" type="number" min="1" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="25000" required />
      <Select label="วิธีจัดส่ง" value={form.shippingMethod} onChange={e => setForm(f => ({ ...f, shippingMethod: e.target.value }))} options={providers.map(p => ({ value: p, label: p }))} required />
      <div className="flex gap-2">
        <Button type="submit" loading={loading} className="flex-1">สร้างออเดอร์</Button>
        <Button type="button" variant="outline" onClick={onClose}>ยกเลิก</Button>
      </div>
    </form>
  )
}
