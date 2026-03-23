'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import { OrderTimeline } from '@/components/orders/OrderTimeline'
import { PageLoading } from '@/components/ui/Loading'
import {
  Shield, ShieldCheck, Lock, User, Truck, CreditCard,
  Camera, Star, MapPin, Clock, Package, MessageSquare,
  AlertTriangle, CheckCircle, Copy, Share2,
} from 'lucide-react'
import { cn } from '@/lib/cn'

// ── Mock Data ──
const mockPublicOrders: Record<string, any> = {
  'abc-def-1234': {
    productName: 'iPhone 15 Pro Max 256GB',
    description: 'สีไทเทเนียม สภาพ 99% ครบกล่อง อุปกรณ์แท้ทุกชิ้น ไม่มีรอยตก ใช้งานปกติทุกอย่าง Face ID ทำงานปกติ แบตเตอรี่ 96% มาพร้อมเคส + ฟิล์มกระจก',
    price: 35000, status: 'PAYMENT_RECEIVED',
    images: ['/api/placeholder/400/300'],
    seller: { name: 'สมชาย ขายดี', slug: 'somchai-shop', points: 45, deals: 12, successRate: 94, joinedAt: '2025-06-15T00:00:00Z' },
    shippingMethod: 'Kerry Express',
    bankAccount: { bank: 'กสิกรไทย', accountNo: '012-345-6789', accountName: 'บจก. เซฟเพย์' },
    buyer: { name: 'สมหญิง ซื้อเก่ง' },
    payment: { status: 'APPROVED', amount: 35000, verifiedAt: '2026-03-22T12:00:00Z' },
    shipment: null,
    createdAt: '2026-03-22T10:00:00Z',
  },
  'ghi-jkl-5678': {
    productName: 'MacBook Air M3 15"',
    description: 'RAM 16GB SSD 512GB สี Midnight ใช้งาน 3 เดือน สภาพ 98% ไม่มีรอย ประกันเหลือ 9 เดือน มาพร้อมกล่อง สายชาร์จ Adapter ครบ',
    price: 42000, status: 'SHIPPING',
    seller: { name: 'สมชาย ขายดี', slug: 'somchai-shop', points: 45, deals: 12, successRate: 94, joinedAt: '2025-06-15T00:00:00Z' },
    shippingMethod: 'Flash Express',
    buyer: { name: 'วิภา รักช้อป' },
    payment: { status: 'APPROVED', amount: 42000, verifiedAt: '2026-03-21T16:00:00Z' },
    shipment: { provider: 'Flash Express', trackingNo: 'TH123456789', status: 'IN_TRANSIT', shippedAt: '2026-03-22T09:00:00Z' },
    createdAt: '2026-03-21T14:30:00Z',
  },
  'mno-pqr-9012': {
    productName: 'AirPods Pro 2 (USB-C)',
    description: 'ของใหม่ ยังไม่แกะซีล ประกันศูนย์ Apple 1 ปีเต็ม ซื้อจาก iStudio ใบเสร็จครบ',
    price: 7500, status: 'COMPLETED',
    seller: { name: 'สมชาย ขายดี', slug: 'somchai-shop', points: 45, deals: 12, successRate: 94, joinedAt: '2025-06-15T00:00:00Z' },
    shippingMethod: 'ไปรษณีย์ไทย',
    buyer: { name: 'ธนพล นักสะสม' },
    payment: { status: 'APPROVED', amount: 7500, verifiedAt: '2026-03-20T10:00:00Z' },
    shipment: { provider: 'ไปรษณีย์ไทย', trackingNo: 'EF987654321TH', status: 'DELIVERED', shippedAt: '2026-03-20T14:00:00Z', deliveredAt: '2026-03-21T10:00:00Z' },
    createdAt: '2026-03-20T09:15:00Z', completedAt: '2026-03-21T15:00:00Z',
  },
  'stu-vwx-3456': {
    productName: 'iPad Air 6 128GB WiFi',
    description: 'สี Starlight ใหม่แกะกล่อง ประกันศูนย์ Apple 1 ปี ซื้อจาก Apple Store ใบเสร็จครบ ยังไม่ลงทะเบียน Apple ID',
    price: 22900, status: 'PENDING_PAYMENT',
    seller: { name: 'สมชาย ขายดี', slug: 'somchai-shop', points: 45, deals: 12, successRate: 94, joinedAt: '2025-06-15T00:00:00Z' },
    shippingMethod: 'Kerry Express',
    bankAccount: { bank: 'กสิกรไทย', accountNo: '012-345-6789', accountName: 'บจก. เซฟเพย์' },
    buyer: null,
    payment: null, shipment: null,
    createdAt: '2026-03-23T08:00:00Z',
  },
  'yza-bcd-7890': {
    productName: 'Apple Watch Ultra 2',
    description: 'สภาพ 95% สาย Alpine Loop + สาย Trail Loop + สาย Ocean Band กล่องครบ ประกันเหลือ 5 เดือน แบตเตอรี่ดี ไม่มีรอยหน้าจอ',
    price: 28900, status: 'DELIVERED',
    seller: { name: 'สมชาย ขายดี', slug: 'somchai-shop', points: 45, deals: 12, successRate: 94, joinedAt: '2025-06-15T00:00:00Z' },
    shippingMethod: 'J&T Express',
    buyer: { name: 'ภาคิน สายเทค' },
    payment: { status: 'APPROVED', amount: 28900, verifiedAt: '2026-03-19T18:00:00Z' },
    shipment: { provider: 'J&T Express', trackingNo: 'JT001122334455', status: 'DELIVERED', shippedAt: '2026-03-20T08:00:00Z', deliveredAt: '2026-03-21T14:00:00Z' },
    confirmDeadline: '2026-03-24T14:00:00Z',
    createdAt: '2026-03-19T16:45:00Z',
  },
  'efg-hij-1122': {
    productName: 'Samsung Galaxy S24 Ultra',
    description: 'สี Titanium Gray 256GB ประกันเหลือ 8 เดือน มีรอยการใช้งานนิดหน่อยตามรูป หน้าจอไม่มีรอย มาพร้อมเคส Spigen + ฟิล์ม',
    price: 32000, status: 'DISPUTE',
    seller: { name: 'สมชาย ขายดี', slug: 'somchai-shop', points: 45, deals: 12, successRate: 94, joinedAt: '2025-06-15T00:00:00Z' },
    shippingMethod: 'Flash Express',
    buyer: { name: 'สมศรี มีปัญหา' },
    payment: { status: 'APPROVED', amount: 32000, verifiedAt: '2026-03-18T13:00:00Z' },
    shipment: { provider: 'Flash Express', trackingNo: 'FL998877665544', status: 'DELIVERED', shippedAt: '2026-03-18T15:00:00Z', deliveredAt: '2026-03-19T11:00:00Z' },
    dispute: { reason: 'สินค้าไม่ตรงตามที่โพสต์ มีรอยขีดข่วนมากกว่าที่บอกไว้ในรายละเอียด', status: 'OPEN', createdAt: '2026-03-19T14:00:00Z' },
    createdAt: '2026-03-18T11:20:00Z',
  },
}

export default function PublicDealPage() {
  const params = useParams()
  const token = params.token as string
  const sellerSlug = params.sellerSlug as string
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch(`/api/orders/${token}`)
      .then(r => r.json())
      .then(res => {
        if (res.success) setOrder(res.data)
        else setOrder(mockPublicOrders[token] || null)
      })
      .catch(() => setOrder(mockPublicOrders[token] || null))
      .finally(() => setLoading(false))
  }, [token])

  if (loading) return <PageLoading />

  if (!order) {
    return (
      <div className="text-center py-20">
        <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-foreground">ไม่พบออเดอร์</h2>
        <p className="text-sm text-muted-foreground mt-1">ลิงก์อาจหมดอายุหรือไม่ถูกต้อง</p>
      </div>
    )
  }

  const isPending = order.status === 'PENDING_PAYMENT'
  const seller = order.seller || { name: sellerSlug, points: 0, deals: 0, successRate: 0 }
  const shareUrl = `http://safepay.local:3000/${sellerSlug}/deals/${token}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4 pb-8">

      {/* ── Seller Profile Card ── */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-bold shrink-0">
              {seller.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground">{seller.name}</p>
                <ShieldCheck className="h-4 w-4 text-green-600 shrink-0" />
              </div>
              <p className="text-xs text-muted-foreground">@{seller.slug || sellerSlug}</p>
            </div>
          </div>

          {/* Seller stats */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-border">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{seller.points}</p>
              <p className="text-[11px] text-muted-foreground">คะแนน</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{seller.deals || 0}</p>
              <p className="text-[11px] text-muted-foreground">ดีลทั้งหมด</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-green-600">{seller.successRate || 0}%</p>
              <p className="text-[11px] text-muted-foreground">สำเร็จ</p>
            </div>
          </div>

          {seller.joinedAt && (
            <p className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              เข้าร่วมเมื่อ {new Date(seller.joinedAt).toLocaleDateString('th-TH', { month: 'long', year: 'numeric' })}
            </p>
          )}
        </CardContent>
      </Card>

      {/* ── Product Card ── */}
      <Card>
        <CardContent className="p-0">
          {/* Product image placeholder */}
          <div className="h-48 bg-gradient-to-br from-muted to-accent flex items-center justify-center">
            <Package className="h-16 w-16 text-muted-foreground/30" />
          </div>

          <div className="p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-xl font-bold text-foreground">{order.productName}</h1>
              <OrderStatusBadge status={order.status} />
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{order.description}</p>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div>
                <p className="text-3xl font-bold text-primary">฿{Number(order.price).toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Truck className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{order.shippingMethod}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200">
                <Lock className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-700 font-medium">Escrow ค้ำประกัน</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Bank Account (PENDING_PAYMENT only) ── */}
      {isPending && order.bankAccount && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">โอนเงินไปที่</h3>
            </div>

            <div className="rounded-lg bg-card border border-border p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">ธนาคาร</span>
                <span className="font-semibold text-foreground">{order.bankAccount.bank}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">เลขบัญชี</span>
                <span className="font-mono font-bold text-foreground text-lg tracking-widest">{order.bankAccount.accountNo}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">ชื่อบัญชี</span>
                <span className="font-semibold text-foreground">{order.bankAccount.accountName}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground">จำนวนเงิน</span>
                <span className="font-bold text-primary text-2xl">฿{Number(order.price).toLocaleString()}</span>
              </div>
            </div>

            <Button size="lg" className="w-full mt-4 h-12 text-base">
              <Camera className="h-5 w-5" />
              อัพโหลดสลิปการโอนเงิน
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              โอนเงินตามจำนวนด้านบน แล้วอัพโหลดสลิป ทีมงานจะตรวจสอบภายใน 30 นาที
            </p>
          </CardContent>
        </Card>
      )}

      {/* ── Payment Confirmed ── */}
      {order.payment && order.payment.status === 'APPROVED' && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-foreground">ชำระเงินแล้ว</p>
                <p className="text-xs text-muted-foreground">
                  ฿{Number(order.payment.amount).toLocaleString()} •
                  ยืนยันเมื่อ {new Date(order.payment.verifiedAt).toLocaleString('th-TH')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Shipping ── */}
      {order.shipment && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">ข้อมูลจัดส่ง</h3>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">ขนส่ง</span>
                <span className="font-medium">{order.shipment.provider}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">เลข Tracking</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-semibold">{order.shipment.trackingNo}</span>
                  <button onClick={() => navigator.clipboard.writeText(order.shipment.trackingNo)} className="text-muted-foreground hover:text-foreground">
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">สถานะ</span>
                <Badge variant={order.shipment.status === 'DELIVERED' ? 'success' : 'default'}>
                  {order.shipment.status === 'DELIVERED' ? 'ส่งถึงแล้ว' : order.shipment.status === 'IN_TRANSIT' ? 'กำลังจัดส่ง' : 'จัดส่งแล้ว'}
                </Badge>
              </div>
              {order.shipment.shippedAt && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">วันจัดส่ง</span>
                  <span>{new Date(order.shipment.shippedAt).toLocaleString('th-TH')}</span>
                </div>
              )}
              {order.shipment.deliveredAt && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">ส่งถึงเมื่อ</span>
                  <span>{new Date(order.shipment.deliveredAt).toLocaleString('th-TH')}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Confirm / Dispute Actions (DELIVERED) ── */}
      {order.status === 'DELIVERED' && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-green-700" />
              <h3 className="font-semibold text-green-900">สินค้าส่งถึงแล้ว</h3>
            </div>
            <p className="text-sm text-green-700">ตรวจสอบสินค้าและยืนยันรับ หรือเปิดข้อพิพาทหากสินค้ามีปัญหา</p>
            {order.confirmDeadline && (
              <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                <Clock className="h-3.5 w-3.5" />
                <span>ยืนยันภายใน {new Date(order.confirmDeadline).toLocaleString('th-TH')} หรือระบบจะปล่อยเงินอัตโนมัติ</span>
              </div>
            )}
            <div className="flex gap-2 pt-1">
              <Button className="flex-1 bg-green-600 hover:bg-green-700 h-11">
                <Camera className="h-4 w-4" /> ยืนยันรับสินค้า
              </Button>
              <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/5 h-11">
                <AlertTriangle className="h-4 w-4" /> เปิดข้อพิพาท
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Completed ── */}
      {order.status === 'COMPLETED' && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2.5">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-green-900">ดีลสำเร็จ</p>
                <p className="text-sm text-green-700">ผู้ซื้อยืนยันรับสินค้าเรียบร้อยแล้ว</p>
                {order.completedAt && <p className="text-xs text-green-600 mt-0.5">{new Date(order.completedAt).toLocaleString('th-TH')}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Dispute ── */}
      {order.dispute && (
        <Card className="border-destructive/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <h3 className="font-semibold text-destructive">ข้อพิพาท</h3>
              <Badge variant="destructive">{order.dispute.status}</Badge>
            </div>
            <p className="text-sm text-foreground">{order.dispute.reason}</p>
            {order.dispute.createdAt && (
              <p className="text-xs text-muted-foreground mt-2">เปิดเมื่อ {new Date(order.dispute.createdAt).toLocaleString('th-TH')}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* ── Timeline ── */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-4">สถานะออเดอร์</h3>
          <OrderTimeline status={order.status} />
        </CardContent>
      </Card>

      {/* ── Order Info ── */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-3">ข้อมูลออเดอร์</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">รหัสออเดอร์</span>
              <span className="font-mono text-xs">{token}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">สร้างเมื่อ</span>
              <span>{new Date(order.createdAt).toLocaleString('th-TH')}</span>
            </div>
            {order.buyer && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">ผู้ซื้อ</span>
                <span className="font-medium">{order.buyer.name}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Share ── */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={handleCopy}>
          {copied ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          {copied ? 'คัดลอกแล้ว!' : 'คัดลอกลิงก์'}
        </Button>
        <Button variant="outline" className="flex-1">
          <Share2 className="h-4 w-4" /> แชร์
        </Button>
      </div>

      {/* ── Trust Footer ── */}
      <div className="rounded-xl border border-border bg-card p-4 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">SafePay Escrow Protection</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Lock, text: 'เงินถูกพักไว้อย่างปลอดภัย' },
            { icon: ShieldCheck, text: 'ยืนยันตัวตนทุกผู้ใช้' },
            { icon: Star, text: 'ระบบคะแนนความน่าเชื่อถือ' },
            { icon: MessageSquare, text: 'ระบบข้อพิพาทยุติธรรม' },
          ].map(item => (
            <div key={item.text} className="flex items-start gap-1.5">
              <item.icon className="h-3.5 w-3.5 text-green-600 mt-0.5 shrink-0" />
              <span className="text-[11px] text-muted-foreground leading-tight">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
