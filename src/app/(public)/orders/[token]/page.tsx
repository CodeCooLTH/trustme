'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import { OrderTimeline } from '@/components/orders/OrderTimeline'

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

  if (loading) return <div className="text-center py-20 text-gray-500">กำลังโหลด...</div>
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>
  if (!order) return null

  return (
    <div className="space-y-4">
      {/* Product Info */}
      <Card>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{order.productName}</h1>
            <p className="mt-1 text-sm text-gray-500">{order.description}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-blue-600">฿{Number(order.price).toLocaleString()}</p>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p>ผู้ขาย: {order.seller.name}</p>
            <p>⭐ {order.seller.points} คะแนน</p>
          </div>
        </div>
      </Card>

      {/* Bank Account (buyer only) */}
      {order.viewLevel === 'buyer' && order.bankAccount && order.status === 'PENDING_PAYMENT' && (
        <Card className="border-blue-200 bg-blue-50">
          <h3 className="font-semibold text-blue-900">โอนเงินไปที่</h3>
          <div className="mt-2 space-y-1 text-sm">
            <p><span className="text-gray-600">ธนาคาร:</span> <span className="font-medium">{order.bankAccount.bank}</span></p>
            <p><span className="text-gray-600">เลขบัญชี:</span> <span className="font-medium font-mono">{order.bankAccount.accountNo}</span></p>
            <p><span className="text-gray-600">ชื่อบัญชี:</span> <span className="font-medium">{order.bankAccount.accountName}</span></p>
          </div>
        </Card>
      )}

      {/* Shipping info */}
      {order.shipment && (
        <Card>
          <h3 className="font-semibold text-gray-900">ข้อมูลจัดส่ง</h3>
          <div className="mt-2 space-y-1 text-sm">
            <p><span className="text-gray-600">ขนส่ง:</span> {order.shipment.provider}</p>
            <p><span className="text-gray-600">เลข tracking:</span> <span className="font-mono">{order.shipment.trackingNo}</span></p>
          </div>
        </Card>
      )}

      {/* Actions */}
      {order.viewLevel === 'public' && (
        <Card className="text-center">
          <p className="text-gray-600 mb-4">เข้าสู่ระบบเพื่อดำเนินการ</p>
          <Button size="lg" className="w-full" onClick={() => window.location.href = '/login'}>
            เข้าสู่ระบบ
          </Button>
        </Card>
      )}

      {/* Timeline */}
      <Card>
        <h3 className="font-semibold text-gray-900 mb-4">สถานะออเดอร์</h3>
        <OrderTimeline status={order.status} />
      </Card>
    </div>
  )
}
