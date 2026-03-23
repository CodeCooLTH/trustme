'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import { OrderTimeline } from '@/components/orders/OrderTimeline'
import { PageLoading } from '@/components/ui/Loading'
import { EmptyState } from '@/components/ui/EmptyState'
import { AlertCircle } from 'lucide-react'

interface OrderData {
  viewLevel: 'public' | 'buyer' | 'seller'
  publicToken: string
  productName: string
  description: string
  price: number | string
  status: string
  seller: { name: string; points: number }
  bankAccount?: { bank: string; accountNo: string; accountName: string }
  shipment?: { provider: string; trackingNo: string; status: string }
  confirmDeadline?: string
  createdAt: string
}

export default function OrderPage() {
  const params = useParams()
  const token = params.token as string
  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/orders/${token}`)
      .then(r => r.json())
      .then(res => {
        if (res.success) setOrder(res.data)
        else setError(res.error || 'เกิดข้อผิดพลาด')
      })
      .catch(() => setError('ไม่สามารถโหลดข้อมูลได้'))
      .finally(() => setLoading(false))
  }, [token])

  if (loading) return <PageLoading />
  if (error) return (
    <div className="py-20">
      <EmptyState icon={AlertCircle} title={error} />
    </div>
  )
  if (!order) return null

  return (
    <div className="space-y-4">
      {/* Product Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <CardTitle className="text-xl">{order.productName}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{order.description}</p>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-primary">฿{Number(order.price).toLocaleString()}</p>
            <div className="text-right text-sm text-muted-foreground">
              <p>ผู้ขาย: {order.seller.name}</p>
              <p>{order.seller.points} คะแนน</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bank Account (buyer only) */}
      {order.viewLevel === 'buyer' && order.bankAccount && order.status === 'PENDING_PAYMENT' && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base text-foreground">โอนเงินไปที่</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">ธนาคาร:</span> <span className="font-medium text-foreground">{order.bankAccount.bank}</span></p>
              <p><span className="text-muted-foreground">เลขบัญชี:</span> <span className="font-medium font-mono text-foreground">{order.bankAccount.accountNo}</span></p>
              <p><span className="text-muted-foreground">ชื่อบัญชี:</span> <span className="font-medium text-foreground">{order.bankAccount.accountName}</span></p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Shipping info */}
      {order.shipment && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">ข้อมูลจัดส่ง</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">ขนส่ง:</span> <span className="text-foreground">{order.shipment.provider}</span></p>
              <p><span className="text-muted-foreground">เลข tracking:</span> <span className="font-mono text-foreground">{order.shipment.trackingNo}</span></p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      {order.viewLevel === 'public' && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">เข้าสู่ระบบเพื่อดำเนินการ</p>
            <Button size="lg" className="w-full" onClick={() => window.location.href = '/login'}>
              เข้าสู่ระบบ
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">สถานะออเดอร์</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderTimeline status={order.status} />
        </CardContent>
      </Card>
    </div>
  )
}
