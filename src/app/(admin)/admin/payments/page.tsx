'use client'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)
  const [rejectedReason, setRejectedReason] = useState('')
  const [processing, setProcessing] = useState(false)

  const loadPayments = () => {
    setLoading(true)
    fetch('/api/admin/payments')
      .then(r => r.json())
      .then(res => { if (res.success) setPayments(res.data || []) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadPayments() }, [])

  const handleVerify = async (action: 'approve' | 'reject') => {
    if (!selected) return
    setProcessing(true)
    try {
      await fetch(`/api/admin/payments/${selected.id}/verify`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, rejectedReason: action === 'reject' ? rejectedReason : undefined }),
      })
      setSelected(null)
      setRejectedReason('')
      loadPayments()
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">ตรวจสอบสลิป</h1>

      {loading ? <p className="text-gray-500">กำลังโหลด...</p> : payments.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-500">ไม่มีสลิปรอตรวจ</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {payments.map((p: any) => (
            <Card key={p.id}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{p.order?.deal?.productName || 'สินค้า'}</p>
                  <p className="text-sm text-gray-500">ผู้ซื้อ: {p.order?.buyer?.name}</p>
                  <p className="text-lg font-bold text-blue-600 mt-1">฿{Number(p.amount).toLocaleString()}</p>
                </div>
                <Button size="sm" onClick={() => setSelected(p)}>ตรวจสอบ</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="ตรวจสอบสลิป">
        {selected && (
          <div className="space-y-4">
            <div className="text-sm space-y-1">
              <p>สินค้า: <span className="font-medium">{selected.order?.deal?.productName}</span></p>
              <p>จำนวน: <span className="font-bold text-blue-600">฿{Number(selected.amount).toLocaleString()}</span></p>
              <p>สลิป: <span className="text-gray-500">{selected.slipImage}</span></p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">เหตุผล (กรณี reject)</label>
              <input
                type="text"
                value={rejectedReason}
                onChange={e => setRejectedReason(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="สลิปไม่ชัด, ยอดไม่ตรง, etc."
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={() => handleVerify('approve')} loading={processing}>อนุมัติ</Button>
              <Button variant="danger" onClick={() => handleVerify('reject')} loading={processing}>ปฏิเสธ</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
