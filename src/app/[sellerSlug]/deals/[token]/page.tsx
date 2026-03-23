'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import { OrderTimeline } from '@/components/orders/OrderTimeline'
import { PageLoading } from '@/components/ui/Loading'
import { Shield, ShieldCheck, Lock, User, Truck, CreditCard, Upload, Camera } from 'lucide-react'

// Mock data for demo — same orders as seller dashboard
const mockPublicOrders: Record<string, any> = {
  'abc-def-1234': {
    productName: 'iPhone 15 Pro Max 256GB',
    description: 'สีไทเทเนียม สภาพ 99% ครบกล่อง อุปกรณ์แท้ทุกชิ้น ไม่มีรอยตก',
    price: 35000, status: 'PAYMENT_RECEIVED',
    seller: { name: 'สมชาย ขายดี', slug: 'somchai-shop', points: 45 },
    shippingMethod: 'Kerry Express',
    bankAccount: { bank: 'กสิกรไทย', accountNo: '012-345-6789', accountName: 'บจก. เซฟเพย์' },
    createdAt: '2026-03-22T10:00:00Z',
  },
  'ghi-jkl-5678': {
    productName: 'MacBook Air M3 15"',
    description: 'RAM 16GB SSD 512GB สี Midnight ใช้งาน 3 เดือน สภาพ 98%',
    price: 42000, status: 'SHIPPING',
    seller: { name: 'สมชาย ขายดี', slug: 'somchai-shop', points: 45 },
    shippingMethod: 'Flash Express',
    shipment: { provider: 'Flash Express', trackingNo: 'TH123456789', status: 'IN_TRANSIT' },
    createdAt: '2026-03-21T14:30:00Z',
  },
  'mno-pqr-9012': {
    productName: 'AirPods Pro 2 (USB-C)',
    description: 'ของใหม่ ยังไม่แกะซีล ประกันศูนย์ Apple 1 ปีเต็ม',
    price: 7500, status: 'COMPLETED',
    seller: { name: 'สมชาย ขายดี', slug: 'somchai-shop', points: 45 },
    shippingMethod: 'ไปรษณีย์ไทย',
    shipment: { provider: 'ไปรษณีย์ไทย', trackingNo: 'EF987654321TH', status: 'DELIVERED' },
    createdAt: '2026-03-20T09:15:00Z',
  },
  'stu-vwx-3456': {
    productName: 'iPad Air 6 128GB WiFi',
    description: 'สี Starlight ใหม่แกะกล่อง ประกันศูนย์ 1 ปี',
    price: 22900, status: 'PENDING_PAYMENT',
    seller: { name: 'สมชาย ขายดี', slug: 'somchai-shop', points: 45 },
    shippingMethod: 'Kerry Express',
    bankAccount: { bank: 'กสิกรไทย', accountNo: '012-345-6789', accountName: 'บจก. เซฟเพย์' },
    createdAt: '2026-03-23T08:00:00Z',
  },
  'yza-bcd-7890': {
    productName: 'Apple Watch Ultra 2',
    description: 'สภาพ 95% สาย 3 เส้น กล่องครบ ประกันเหลือ 5 เดือน',
    price: 28900, status: 'DELIVERED',
    seller: { name: 'สมชาย ขายดี', slug: 'somchai-shop', points: 45 },
    shippingMethod: 'J&T Express',
    shipment: { provider: 'J&T Express', trackingNo: 'JT001122334455', status: 'DELIVERED' },
    confirmDeadline: '2026-03-24T14:00:00Z',
    createdAt: '2026-03-19T16:45:00Z',
  },
  'efg-hij-1122': {
    productName: 'Samsung Galaxy S24 Ultra',
    description: 'สี Titanium Gray 256GB ประกันเหลือ 8 เดือน',
    price: 32000, status: 'DISPUTE',
    seller: { name: 'สมชาย ขายดี', slug: 'somchai-shop', points: 45 },
    shippingMethod: 'Flash Express',
    createdAt: '2026-03-18T11:20:00Z',
  },
}

export default function PublicDealPage() {
  const params = useParams()
  const token = params.token as string
  const sellerSlug = params.sellerSlug as string
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Try API first, fallback to mock
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

  return (
    <div className="space-y-4">
      {/* Seller badge */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{order.seller?.name || sellerSlug}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <ShieldCheck className="h-3 w-3 text-green-600" />
            <span>{order.seller?.points || 0} คะแนน</span>
            <span>•</span>
            <span>@{order.seller?.slug || sellerSlug}</span>
          </div>
        </div>
      </div>

      {/* Product Card */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold text-foreground">{order.productName}</h1>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{order.description}</p>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>

          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-primary">฿{Number(order.price).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-0.5">ส่งโดย {order.shippingMethod}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="h-4 w-4 text-green-600" />
              <span className="text-xs text-green-700 font-medium">Escrow ค้ำประกัน</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bank Account — show when PENDING_PAYMENT */}
      {isPending && order.bankAccount && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">โอนเงินไปที่</h3>
            </div>
            <div className="rounded-lg bg-card border border-border p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ธนาคาร</span>
                <span className="font-semibold text-foreground">{order.bankAccount.bank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">เลขบัญชี</span>
                <span className="font-mono font-semibold text-foreground tracking-wider">{order.bankAccount.accountNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ชื่อบัญชี</span>
                <span className="font-semibold text-foreground">{order.bankAccount.accountName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">จำนวน</span>
                <span className="font-bold text-primary text-lg">฿{Number(order.price).toLocaleString()}</span>
              </div>
            </div>

            <Button size="lg" className="w-full mt-4 h-12 text-base">
              <Camera className="h-5 w-5" />
              อัพโหลดสลิปการโอนเงิน
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              โอนเงินแล้วอัพโหลดสลิป ทีมงานจะตรวจสอบภายใน 30 นาที
            </p>
          </CardContent>
        </Card>
      )}

      {/* Shipping */}
      {order.shipment && (
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">ข้อมูลจัดส่ง</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ขนส่ง</span>
                <span className="font-medium">{order.shipment.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">เลข Tracking</span>
                <span className="font-mono font-medium">{order.shipment.trackingNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">สถานะ</span>
                <Badge variant={order.shipment.status === 'DELIVERED' ? 'success' : 'default'}>
                  {order.shipment.status === 'DELIVERED' ? 'ส่งถึงแล้ว' : 'กำลังจัดส่ง'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Confirm / Dispute Actions */}
      {order.status === 'DELIVERED' && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-5 space-y-3">
            <h3 className="font-semibold text-green-900">ได้รับสินค้าแล้วใช่ไหม?</h3>
            <p className="text-sm text-green-700">กรุณายืนยันรับสินค้าและอัพโหลดรูปหลักฐาน</p>
            {order.confirmDeadline && (
              <p className="text-xs text-amber-700">
                หากไม่กดยืนยันภายใน {new Date(order.confirmDeadline).toLocaleString('th-TH')} ระบบจะปล่อยเงินอัตโนมัติ
              </p>
            )}
            <div className="flex gap-2">
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                <Camera className="h-4 w-4" /> ยืนยันรับสินค้า
              </Button>
              <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/5">
                เปิดข้อพิพาท
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-4">สถานะออเดอร์</h3>
          <OrderTimeline status={order.status} />
        </CardContent>
      </Card>

      {/* Trust footer */}
      <div className="flex items-center justify-center gap-4 py-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
          <span>Escrow ค้ำประกัน</span>
        </div>
        <div className="flex items-center gap-1">
          <Lock className="h-3.5 w-3.5 text-green-600" />
          <span>ข้อมูลเข้ารหัส</span>
        </div>
      </div>
    </div>
  )
}
