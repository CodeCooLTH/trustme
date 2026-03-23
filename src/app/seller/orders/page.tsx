'use client'
import { useState } from 'react'
import { Header } from '@/components/layouts/Header'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import { OrderTimeline } from '@/components/orders/OrderTimeline'
import { Dialog } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import {
  Plus, Copy, ExternalLink, Search, Package,
  User, Truck, CreditCard, Camera, Clock, ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/cn'

// ── Mock Data ──
const mockOrders = [
  {
    id: '1', publicToken: 'abc-def-1234', sellerSlug: 'somchai-shop',
    productName: 'iPhone 15 Pro Max 256GB', description: 'สีไทเทเนียม สภาพ 99% ครบกล่อง อุปกรณ์แท้ทุกชิ้น',
    amount: 35000, status: 'PAYMENT_RECEIVED',
    buyer: { name: 'สมหญิง ซื้อเก่ง', points: 20 }, shippingMethod: 'Kerry Express',
    payment: { status: 'APPROVED', verifiedAt: '2026-03-22T12:00:00Z' },
    shipment: null, createdAt: '2026-03-22T10:00:00Z',
  },
  {
    id: '2', publicToken: 'ghi-jkl-5678', sellerSlug: 'somchai-shop',
    productName: 'MacBook Air M3 15"', description: 'RAM 16GB SSD 512GB สี Midnight ใช้งาน 3 เดือน',
    amount: 42000, status: 'SHIPPING',
    buyer: { name: 'วิภา รักช้อป', points: 35 }, shippingMethod: 'Flash Express',
    payment: { status: 'APPROVED', verifiedAt: '2026-03-21T16:00:00Z' },
    shipment: { provider: 'Flash Express', trackingNo: 'TH123456789', status: 'IN_TRANSIT', shippedAt: '2026-03-22T09:00:00Z' },
    createdAt: '2026-03-21T14:30:00Z',
  },
  {
    id: '3', publicToken: 'mno-pqr-9012', sellerSlug: 'somchai-shop',
    productName: 'AirPods Pro 2 (USB-C)', description: 'ของใหม่ ยังไม่แกะซีล ประกันศูนย์ 1 ปี',
    amount: 7500, status: 'COMPLETED',
    buyer: { name: 'ธนพล นักสะสม', points: 55 }, shippingMethod: 'ไปรษณีย์ไทย',
    payment: { status: 'APPROVED', verifiedAt: '2026-03-20T10:00:00Z' },
    shipment: { provider: 'ไปรษณีย์ไทย', trackingNo: 'EF987654321TH', status: 'DELIVERED', shippedAt: '2026-03-20T14:00:00Z', deliveredAt: '2026-03-21T10:00:00Z' },
    createdAt: '2026-03-20T09:15:00Z', completedAt: '2026-03-21T15:00:00Z',
  },
  {
    id: '4', publicToken: 'stu-vwx-3456', sellerSlug: 'somchai-shop',
    productName: 'iPad Air 6 128GB WiFi', description: 'สี Starlight ใหม่แกะกล่อง ประกันศูนย์ 1 ปี',
    amount: 22900, status: 'PENDING_PAYMENT',
    buyer: null, shippingMethod: 'Kerry Express',
    payment: null, shipment: null, createdAt: '2026-03-23T08:00:00Z',
  },
  {
    id: '5', publicToken: 'yza-bcd-7890', sellerSlug: 'somchai-shop',
    productName: 'Apple Watch Ultra 2', description: 'สภาพ 95% สาย 3 เส้น กล่องครบ',
    amount: 28900, status: 'DELIVERED',
    buyer: { name: 'ภาคิน สายเทค', points: 40 }, shippingMethod: 'J&T Express',
    payment: { status: 'APPROVED', verifiedAt: '2026-03-19T18:00:00Z' },
    shipment: { provider: 'J&T Express', trackingNo: 'JT001122334455', status: 'DELIVERED', shippedAt: '2026-03-20T08:00:00Z', deliveredAt: '2026-03-21T14:00:00Z' },
    createdAt: '2026-03-19T16:45:00Z', confirmDeadline: '2026-03-24T14:00:00Z',
  },
  {
    id: '6', publicToken: 'efg-hij-1122', sellerSlug: 'somchai-shop',
    productName: 'Samsung Galaxy S24 Ultra', description: 'สี Titanium Gray 256GB ประกันเหลือ 8 เดือน',
    amount: 32000, status: 'DISPUTE',
    buyer: { name: 'สมศรี มีปัญหา', points: 10 }, shippingMethod: 'Flash Express',
    payment: { status: 'APPROVED', verifiedAt: '2026-03-18T13:00:00Z' },
    shipment: { provider: 'Flash Express', trackingNo: 'FL998877665544', status: 'DELIVERED', shippedAt: '2026-03-18T15:00:00Z', deliveredAt: '2026-03-19T11:00:00Z' },
    dispute: { reason: 'สินค้าไม่ตรงตามที่โพสต์ มีรอยขีดข่วนมากกว่าที่บอก', status: 'OPEN' },
    createdAt: '2026-03-18T11:20:00Z',
  },
]

const statusFilters = [
  { value: '', label: 'ทั้งหมด', count: mockOrders.length },
  { value: 'PENDING_PAYMENT', label: 'รอชำระ', count: mockOrders.filter(o => o.status === 'PENDING_PAYMENT').length },
  { value: 'PAYMENT_RECEIVED', label: 'ชำระแล้ว', count: mockOrders.filter(o => o.status === 'PAYMENT_RECEIVED').length },
  { value: 'SHIPPING', label: 'จัดส่ง', count: mockOrders.filter(o => o.status === 'SHIPPING').length },
  { value: 'DELIVERED', label: 'ส่งถึง', count: mockOrders.filter(o => o.status === 'DELIVERED').length },
  { value: 'COMPLETED', label: 'สำเร็จ', count: mockOrders.filter(o => o.status === 'COMPLETED').length },
  { value: 'DISPUTE', label: 'ข้อพิพาท', count: mockOrders.filter(o => o.status === 'DISPUTE').length },
]

export default function SellerOrdersPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedId, setSelectedId] = useState<string>(mockOrders[0].id)
  const [showCreate, setShowCreate] = useState(false)
  const [copiedToken, setCopiedToken] = useState<string | null>(null)

  const filtered = mockOrders.filter(o => {
    if (statusFilter && o.status !== statusFilter) return false
    if (search && !o.productName.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const selected = mockOrders.find(o => o.id === selectedId) || filtered[0]

  const copyLink = (token: string) => {
    navigator.clipboard.writeText(`http://safepay.local:3000/somchai-shop/deals/${token}`)
    setCopiedToken(token)
    setTimeout(() => setCopiedToken(null), 2000)
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

      {/* ── Split Panel ── */}
      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 7rem)' }}>

        {/* ── Left: Filter + List (30%) ── */}
        <div className="w-full lg:w-[35%] xl:w-[30%] border-r border-border flex flex-col shrink-0">
          {/* Search */}
          <div className="px-3 py-2.5 border-b border-border shrink-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="ค้นหาสินค้า..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-8 pl-8 pr-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>

          {/* Status Filters */}
          <div className="px-3 py-2 border-b border-border shrink-0 overflow-x-auto">
            <div className="flex gap-1">
              {statusFilters.map(f => (
                <button
                  key={f.value}
                  onClick={() => setStatusFilter(f.value)}
                  className={cn(
                    'px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors',
                    statusFilter === f.value
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent'
                  )}
                >
                  {f.label}
                  {f.count > 0 && <span className="ml-1 opacity-70">({f.count})</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Order List */}
          <div className="flex-1 overflow-y-auto">
            {filtered.map(order => (
              <div
                key={order.id}
                onClick={() => setSelectedId(order.id)}
                className={cn(
                  'px-3 py-3 border-b border-border cursor-pointer transition-colors',
                  selected?.id === order.id ? 'bg-accent' : 'hover:bg-muted/50'
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{order.productName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold text-primary">฿{order.amount.toLocaleString()}</span>
                      {order.buyer && <span className="text-xs text-muted-foreground truncate">{order.buyer.name}</span>}
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-1">
                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="p-6 text-center text-sm text-muted-foreground">ไม่พบออเดอร์</div>
            )}
          </div>

          {/* List Footer */}
          <div className="px-3 py-2 border-t border-border text-xs text-muted-foreground shrink-0">
            แสดง {filtered.length} จาก {mockOrders.length} รายการ
          </div>
        </div>

        {/* ── Right: Detail (70%) ── */}
        <div className="hidden lg:flex flex-1 flex-col overflow-hidden">
          {selected ? (
            <OrderDetail order={selected} onCopyLink={copyLink} copiedToken={copiedToken} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Package className="h-10 w-10 mx-auto mb-3 opacity-50" />
                <p className="text-sm">เลือกออเดอร์เพื่อดูรายละเอียด</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Order Dialog */}
      <Dialog open={showCreate} onClose={() => setShowCreate(false)} title="สร้างออเดอร์ใหม่" description="กรอกข้อมูลสินค้าเพื่อสร้างลิงก์สั่งซื้อ">
        <CreateOrderForm onClose={() => setShowCreate(false)} />
      </Dialog>
    </>
  )
}

// ── Order Detail Panel ──
function OrderDetail({ order, onCopyLink, copiedToken }: { order: any; onCopyLink: (token: string) => void; copiedToken: string | null }) {
  const orderLink = `http://safepay.local:3000/${order.sellerSlug}/deals/${order.publicToken}`

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Detail Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5 shrink-0">
        <div className="min-w-0">
          <h2 className="font-semibold text-foreground truncate">{order.productName}</h2>
          <p className="text-xs text-muted-foreground font-mono">#{order.publicToken}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={() => onCopyLink(order.publicToken)}>
            <Copy className="h-3.5 w-3.5" />
            {copiedToken === order.publicToken ? 'คัดลอกแล้ว!' : 'คัดลอกลิงก์'}
          </Button>
          <a href={orderLink} target="_blank">
            <Button variant="outline" size="sm"><ExternalLink className="h-3.5 w-3.5" /></Button>
          </a>
        </div>
      </div>

      {/* Detail Content — split into main (70%) + side (30%) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main tabs area */}
        <div className="w-[70%] flex flex-col overflow-hidden border-r border-border">
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {/* Product */}
            <section>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">สินค้า</h3>
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{order.productName}</p>
                    <p className="text-sm text-muted-foreground mt-1">{order.description}</p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <span className="text-xl font-bold text-primary">฿{Number(order.amount).toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">{order.shippingMethod}</span>
                </div>
              </div>
            </section>

            {/* Buyer */}
            <section>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">ผู้ซื้อ</h3>
              {order.buyer ? (
                <div className="rounded-lg border border-border p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                    {order.buyer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{order.buyer.name}</p>
                    <p className="text-xs text-muted-foreground">{order.buyer.points} คะแนน</p>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
                  <User className="h-5 w-5 mx-auto mb-1 opacity-50" />
                  ยังไม่มีผู้ซื้อ — รอเปิดลิงก์
                </div>
              )}
            </section>

            {/* Payment */}
            {order.payment && (
              <section>
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">การชำระเงิน</h3>
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">สลิปการโอน</span>
                    </div>
                    <Badge variant={order.payment.status === 'APPROVED' ? 'success' : 'warning'}>
                      {order.payment.status === 'APPROVED' ? 'อนุมัติแล้ว' : 'รอตรวจ'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    ตรวจสอบเมื่อ {new Date(order.payment.verifiedAt).toLocaleString('th-TH')}
                  </p>
                </div>
              </section>
            )}

            {/* Shipping */}
            {order.shipment && (
              <section>
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">การจัดส่ง</h3>
                <div className="rounded-lg border border-border p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ขนส่ง</span>
                    <span className="font-medium">{order.shipment.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tracking</span>
                    <span className="font-mono font-medium">{order.shipment.trackingNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">สถานะ</span>
                    <Badge variant={order.shipment.status === 'DELIVERED' ? 'success' : 'default'}>
                      {order.shipment.status === 'DELIVERED' ? 'ส่งถึงแล้ว' : order.shipment.status === 'IN_TRANSIT' ? 'กำลังจัดส่ง' : 'จัดส่งแล้ว'}
                    </Badge>
                  </div>
                </div>
              </section>
            )}

            {/* Dispute */}
            {order.dispute && (
              <section>
                <h3 className="text-xs font-medium text-destructive uppercase tracking-wider mb-2">ข้อพิพาท</h3>
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                  <p className="text-sm text-foreground">{order.dispute.reason}</p>
                  <Badge variant="destructive" className="mt-2">{order.dispute.status}</Badge>
                </div>
              </section>
            )}

            {/* Action: ship or other */}
            {order.status === 'PAYMENT_RECEIVED' && (
              <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
                <p className="font-medium text-foreground mb-2">พร้อมจัดส่ง</p>
                <p className="text-sm text-muted-foreground mb-3">ผู้ซื้อชำระเงินแล้ว กรุณาจัดส่งสินค้าและใส่เลข tracking</p>
                <Button><Truck className="h-4 w-4" /> จัดส่งสินค้า</Button>
              </div>
            )}
          </div>
        </div>

        {/* Side panel (30%) */}
        <div className="w-[30%] flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {/* Timeline */}
            <section>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">สถานะ</h3>
              <OrderTimeline status={order.status} />
            </section>

            {/* Info */}
            <section>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">ข้อมูล</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">สร้าง</span>
                  <span className="text-xs">{new Date(order.createdAt).toLocaleDateString('th-TH')}</span>
                </div>
                {order.completedAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">สำเร็จ</span>
                    <span className="text-xs">{new Date(order.completedAt).toLocaleDateString('th-TH')}</span>
                  </div>
                )}
                {order.confirmDeadline && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deadline</span>
                    <span className="text-xs text-amber-600 font-medium">{new Date(order.confirmDeadline).toLocaleDateString('th-TH')}</span>
                  </div>
                )}
              </div>
            </section>

            {/* Link */}
            <section>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">ลิงก์</h3>
              <p className="text-[11px] text-muted-foreground font-mono break-all leading-relaxed">{orderLink}</p>
              <div className="flex gap-1.5 mt-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => onCopyLink(order.publicToken)}>
                  <Copy className="h-3 w-3" /> คัดลอก
                </Button>
                <a href={orderLink} target="_blank" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs"><ExternalLink className="h-3 w-3" /> เปิด</Button>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Create Order Form ──
function CreateOrderForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ productName: '', description: '', price: '', shippingMethod: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ link: string } | null>(null)

  const providers = ['Kerry Express', 'Flash Express', 'ไปรษณีย์ไทย', 'J&T Express', 'Ninja Van']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
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
          <p className="text-xs text-green-600 mt-1">คัดลอกลิงก์ส่งให้ผู้ซื้อ</p>
        </div>
        <div className="flex items-center gap-2">
          <input readOnly value={result.link} className="flex-1 h-9 px-3 rounded-md border border-input bg-muted text-sm font-mono" />
          <Button size="sm" onClick={() => { navigator.clipboard.writeText(result.link); alert('คัดลอกแล้ว!') }}><Copy className="h-4 w-4" /></Button>
          <a href={result.link} target="_blank"><Button size="sm" variant="outline"><ExternalLink className="h-4 w-4" /></Button></a>
        </div>
        <Button variant="outline" className="w-full" onClick={onClose}>ปิด</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="ชื่อสินค้า" value={form.productName} onChange={e => setForm(f => ({ ...f, productName: e.target.value }))} placeholder="เช่น iPhone 15 Pro Max" required />
      <Textarea label="รายละเอียด" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="สภาพ, อุปกรณ์, etc." required />
      <Input label="ราคา (บาท)" type="number" min="1" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="25000" required />
      <Select label="วิธีจัดส่ง" value={form.shippingMethod} onChange={e => setForm(f => ({ ...f, shippingMethod: e.target.value }))} options={providers.map(p => ({ value: p, label: p }))} required />
      <div className="flex gap-2">
        <Button type="submit" loading={loading} className="flex-1">สร้างออเดอร์</Button>
        <Button type="button" variant="outline" onClick={onClose}>ยกเลิก</Button>
      </div>
    </form>
  )
}
