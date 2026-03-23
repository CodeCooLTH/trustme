'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export default function AdminDisputeDetailPage() {
  const params = useParams()
  const [dispute, setDispute] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [resolution, setResolution] = useState('')
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    fetch(`/api/disputes/${params.id}`)
      .then(r => r.json())
      .then(res => { if (res.success) setDispute(res.data) })
      .finally(() => setLoading(false))
  }, [params.id])

  const handleResolve = async (decision: 'buyer' | 'seller') => {
    if (!resolution.trim()) return alert('กรุณาระบุเหตุผลการตัดสิน')
    setProcessing(true)
    try {
      await fetch(`/api/admin/disputes/${params.id}/resolve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision, resolution }),
      })
      window.location.reload()
    } finally {
      setProcessing(false)
    }
  }

  if (loading) return <p className="text-gray-500">กำลังโหลด...</p>
  if (!dispute) return <p className="text-red-500">ไม่พบข้อพิพาท</p>

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">รายละเอียดข้อพิพาท</h1>

      <Card>
        <div className="space-y-2 text-sm">
          <p>สินค้า: <span className="font-medium">{dispute.order?.deal?.productName}</span></p>
          <p>ราคา: <span className="font-bold text-blue-600">฿{Number(dispute.order?.deal?.price || 0).toLocaleString()}</span></p>
          <p>เหตุผล: <span className="font-medium">{dispute.reason}</span></p>
          <p>เปิดโดย: {dispute.opener?.name}</p>
          <p>สถานะ: <Badge color={dispute.status === 'OPEN' ? 'red' : 'green'}>{dispute.status}</Badge></p>
        </div>
      </Card>

      {/* Messages */}
      <Card>
        <h3 className="font-semibold mb-4">ข้อความ</h3>
        {dispute.messages?.length === 0 ? (
          <p className="text-sm text-gray-500">ยังไม่มีข้อความ</p>
        ) : (
          <div className="space-y-3">
            {dispute.messages?.map((m: any) => (
              <div key={m.id} className="border-b pb-3 last:border-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{m.sender?.name}</span>
                  <Badge color={m.sender?.role === 'ADMIN' ? 'purple' : 'gray'}>{m.sender?.role}</Badge>
                </div>
                <p className="text-sm text-gray-700">{m.message}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(m.createdAt).toLocaleString('th-TH')}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Resolve */}
      {dispute.status === 'OPEN' && (
        <Card>
          <h3 className="font-semibold mb-4">ตัดสิน</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">เหตุผลการตัดสิน</label>
              <textarea
                value={resolution}
                onChange={e => setResolution(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                rows={3}
                placeholder="อธิบายเหตุผลในการตัดสิน..."
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={() => handleResolve('buyer')} loading={processing} variant="secondary">
                คืนเงินผู้ซื้อ
              </Button>
              <Button onClick={() => handleResolve('seller')} loading={processing}>
                ปล่อยเงินผู้ขาย
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
