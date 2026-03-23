'use client'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/layouts/Header'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import { OrderTimeline } from '@/components/orders/OrderTimeline'
import {
  ArrowLeft, Copy, ExternalLink, Package, User, Truck,
  CreditCard, Clock, CheckCircle, MapPin,
} from 'lucide-react'
import Link from 'next/link'

// Mock order detail
const mockOrderDetail: Record<string, any> = {
  'abc-def-1234': {
    id: '1', publicToken: 'abc-def-1234', sellerSlug: 'somchai-shop',
    productName: 'iPhone 15 Pro Max 256GB',
    description: 'สีไทเทเนียม สภาพ 99% ครบกล่อง อุปกรณ์แท้ทุกชิ้น ไม่มีรอยตก ใช้งานปกติทุกอย่าง',
    amount: 35000, status: 'PAYMENT_RECEIVED',
    shippingMethod: 'Kerry Express',
    buyer: { name: 'สมหญิง ซื้อเก่ง', points: 20 },
    payment: { status: 'APPROVED', slipImage: 'slip-001.jpg', verifiedAt: '2026-03-22T12:00:00Z' },
    shipment: null,
    createdAt: '2026-03-22T10:00:00Z',
  },
  'ghi-jkl-5678': {
    id: '2', publicToken: 'ghi-jkl-5678', sellerSlug: 'somchai-shop',
    productName: 'MacBook Air M3 15"',
    description: 'RAM 16GB SSD 512GB สี Midnight ใช้งาน 3 เดือน สภาพ 98% ประกันเหลือ 9 เดือน',
    amount: 42000, status: 'SHIPPING',
    shippingMethod: 'Flash Express',
    buyer: { name: 'วิภา รักช้อป', points: 35 },
    payment: { status: 'APPROVED', slipImage: 'slip-002.jpg', verifiedAt: '2026-03-21T16:00:00Z' },
    shipment: { provider: 'Flash Express', trackingNo: 'TH123456789', status: 'IN_TRANSIT', shippedAt: '2026-03-22T09:00:00Z' },
    createdAt: '2026-03-21T14:30:00Z',
  },
  'mno-pqr-9012': {
    id: '3', publicToken: 'mno-pqr-9012', sellerSlug: 'somchai-shop',
    productName: 'AirPods Pro 2 (USB-C)',
    description: 'ของใหม่ ยังไม่แกะซีล ประกันศูนย์ Apple 1 ปีเต็ม',
    amount: 7500, status: 'COMPLETED',
    shippingMethod: 'ไปรษณีย์ไทย',
    buyer: { name: 'ธนพล นักสะสม', points: 55 },
    payment: { status: 'APPROVED', slipImage: 'slip-003.jpg', verifiedAt: '2026-03-20T10:00:00Z' },
    shipment: { provider: 'ไปรษณีย์ไทย', trackingNo: 'EF987654321TH', status: 'DELIVERED', shippedAt: '2026-03-20T14:00:00Z', deliveredAt: '2026-03-21T10:00:00Z' },
    createdAt: '2026-03-20T09:15:00Z',
    completedAt: '2026-03-21T15:00:00Z',
  },
  'stu-vwx-3456': {
    id: '4', publicToken: 'stu-vwx-3456', sellerSlug: 'somchai-shop',
    productName: 'iPad Air 6 128GB WiFi',
    description: 'สี Starlight ใหม่แกะกล่อง ประกันศูนย์ 1 ปี',
    amount: 22900, status: 'PENDING_PAYMENT',
    shippingMethod: 'Kerry Express',
    buyer: null,
    payment: null,
    shipment: null,
    createdAt: '2026-03-23T08:00:00Z',
  },
  'yza-bcd-7890': {
    id: '5', publicToken: 'yza-bcd-7890', sellerSlug: 'somchai-shop',
    productName: 'Apple Watch Ultra 2',
    description: 'สภาพ 95% สาย 3 เส้น กล่องครบ ประกันเหลือ 5 เดือน',
    amount: 28900, status: 'DELIVERED',
    shippingMethod: 'J&T Express',
    buyer: { name: 'ภาคิน สายเทค', points: 40 },
    payment: { status: 'APPROVED', slipImage: 'slip-005.jpg', verifiedAt: '2026-03-19T18:00:00Z' },
    shipment: { provider: 'J&T Express', trackingNo: 'JT001122334455', status: 'DELIVERED', shippedAt: '2026-03-20T08:00:00Z', deliveredAt: '2026-03-21T14:00:00Z' },
    createdAt: '2026-03-19T16:45:00Z',
    confirmDeadline: '2026-03-24T14:00:00Z',
  },
  'efg-hij-1122': {
    id: '6', publicToken: 'efg-hij-1122', sellerSlug: 'somchai-shop',
    productName: 'Samsung Galaxy S24 Ultra',
    description: 'สี Titanium Gray 256GB ประกันเหลือ 8 เดือน มีรอยนิดหน่อย',
    amount: 32000, status: 'DISPUTE',
    shippingMethod: 'Flash Express',
    buyer: { name: 'สมศรี มีปัญหา', points: 10 },
    payment: { status: 'APPROVED', slipImage: 'slip-006.jpg', verifiedAt: '2026-03-18T13:00:00Z' },
    shipment: { provider: 'Flash Express', trackingNo: 'FL998877665544', status: 'DELIVERED', shippedAt: '2026-03-18T15:00:00Z', deliveredAt: '2026-03-19T11:00:00Z' },
    dispute: { reason: 'สินค้าไม่ตรงตามที่โพสต์ มีรอยขีดข่วนมากกว่าที่บอก', status: 'OPEN' },
    createdAt: '2026-03-18T11:20:00Z',
  },
}

export default function SellerOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const token = params.token as string
  const order = mockOrderDetail[token]

  if (!order) {
    return (
      <>
        <Header title="ไม่พบออเดอร์" />
        <div className="p-6 text-center text-muted-foreground">ออเดอร์ไม่พบในระบบ</div>
      </>
    )
  }

  const orderLink = `http://safepay.local:3000/${order.sellerSlug}/deals/${order.publicToken}`

  return (
    <>
      <Header
        title={order.productName}
        description={`#${order.publicToken}`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(orderLink); alert('คัดลอกลิงก์แล้ว') }}>
              <Copy className="h-4 w-4" /> คัดลอกลิงก์
            </Button>
            <a href={orderLink} target="_blank">
              <Button variant="outline" size="sm"><ExternalLink className="h-4 w-4" /> เปิดลิงก์</Button>
            </a>
          </div>
        }
      />

      <div className="p-4 lg:p-6">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> กลับ
        </button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Product Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{order.productName}</CardTitle>
                  <OrderStatusBadge status={order.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{order.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-2xl font-bold text-primary">฿{Number(order.amount).toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">{order.shippingMethod}</span>
                </div>
              </CardContent>
            </Card>

            {/* Buyer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="h-4 w-4" /> ข้อมูลผู้ซื้อ
                </CardTitle>
              </CardHeader>
              <CardContent>
                {order.buyer ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {order.buyer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{order.buyer.name}</p>
                        <p className="text-xs text-muted-foreground">{order.buyer.points} คะแนน</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">ยังไม่มีผู้ซื้อ — รอผู้ซื้อเปิดลิงก์</p>
                )}
              </CardContent>
            </Card>

            {/* Payment */}
            {order.payment && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CreditCard className="h-4 w-4" /> การชำระเงิน
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 text-sm">
                      <p>สลิป: <span className="font-mono text-muted-foreground">{order.payment.slipImage}</span></p>
                      <p>ตรวจสอบเมื่อ: {new Date(order.payment.verifiedAt).toLocaleString('th-TH')}</p>
                    </div>
                    <Badge variant={order.payment.status === 'APPROVED' ? 'success' : 'warning'}>
                      {order.payment.status === 'APPROVED' ? 'อนุมัติแล้ว' : 'รอตรวจ'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Shipping */}
            {order.shipment && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Truck className="h-4 w-4" /> การจัดส่ง
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                        {order.shipment.status === 'DELIVERED' ? 'ส่งถึงแล้ว' : order.shipment.status === 'IN_TRANSIT' ? 'กำลังจัดส่ง' : 'จัดส่งแล้ว'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">วันที่จัดส่ง</span>
                      <span>{new Date(order.shipment.shippedAt).toLocaleString('th-TH')}</span>
                    </div>
                    {order.shipment.deliveredAt && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ส่งถึงเมื่อ</span>
                        <span>{new Date(order.shipment.deliveredAt).toLocaleString('th-TH')}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Dispute */}
            {order.dispute && (
              <Card className="border-destructive/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base text-destructive">
                    ข้อพิพาท
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground">{order.dispute.reason}</p>
                  <Badge variant="destructive" className="mt-2">{order.dispute.status}</Badge>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">สถานะออเดอร์</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderTimeline status={order.status} />
              </CardContent>
            </Card>

            {/* Order Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">ข้อมูลออเดอร์</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token</span>
                  <span className="font-mono text-xs">{order.publicToken}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">สร้างเมื่อ</span>
                  <span>{new Date(order.createdAt).toLocaleString('th-TH')}</span>
                </div>
                {order.completedAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">สำเร็จเมื่อ</span>
                    <span>{new Date(order.completedAt).toLocaleString('th-TH')}</span>
                  </div>
                )}
                {order.confirmDeadline && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deadline ยืนยัน</span>
                    <span className="text-amber-600 font-medium">{new Date(order.confirmDeadline).toLocaleString('th-TH')}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions based on status */}
            {order.status === 'PAYMENT_RECEIVED' && (
              <Card>
                <CardContent className="pt-6">
                  <Button className="w-full">
                    <Truck className="h-4 w-4" /> จัดส่งสินค้า
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Order Link */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">ลิงก์ออเดอร์</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs text-muted-foreground font-mono break-all">{orderLink}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => { navigator.clipboard.writeText(orderLink); alert('คัดลอกแล้ว!') }}>
                    <Copy className="h-3 w-3" /> คัดลอก
                  </Button>
                  <a href={orderLink} target="_blank" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="h-3 w-3" /> เปิด
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
