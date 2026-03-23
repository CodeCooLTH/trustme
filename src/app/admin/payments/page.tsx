'use client'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layouts/Header'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { PageLoading } from '@/components/ui/Loading'
import { EmptyState } from '@/components/ui/EmptyState'
import { CreditCard, CheckCircle, XCircle } from 'lucide-react'

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

  if (loading) return <PageLoading />

  return (
    <>
      <Header title="ตรวจสอบสลิป" description={`รอตรวจ ${payments.length} รายการ`} />
      <div className="p-4 lg:p-6">
        {payments.length === 0 ? (
          <EmptyState icon={CreditCard} title="ไม่มีสลิปรอตรวจ" description="สลิปทั้งหมดถูกตรวจสอบแล้ว" />
        ) : (
          <div className="grid gap-4">
            {payments.map((p: any) => (
              <Card key={p.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelected(p)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{p.order?.deal?.productName || 'สินค้า'}</p>
                      <p className="text-sm text-muted-foreground">ผู้ซื้อ: {p.order?.buyer?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-primary">฿{Number(p.amount).toLocaleString()}</p>
                      <Badge variant="warning">รอตรวจ</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selected} onClose={() => setSelected(null)} title="ตรวจสอบสลิป" description="ตรวจสอบและอนุมัติหรือปฏิเสธสลิปการชำระเงิน">
        {selected && (
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-3 text-sm space-y-1">
              <p>สินค้า: <span className="font-medium">{selected.order?.deal?.productName}</span></p>
              <p>จำนวน: <span className="font-semibold text-primary">฿{Number(selected.amount).toLocaleString()}</span></p>
              <p>สลิป: <span className="text-muted-foreground">{selected.slipImage}</span></p>
            </div>

            <Input
              label="เหตุผล (กรณีปฏิเสธ)"
              value={rejectedReason}
              onChange={e => setRejectedReason(e.target.value)}
              placeholder="สลิปไม่ชัด, ยอดไม่ตรง, etc."
            />

            <div className="flex gap-2">
              <Button onClick={() => handleVerify('approve')} loading={processing} className="flex-1">
                <CheckCircle className="h-4 w-4" />
                อนุมัติ
              </Button>
              <Button variant="destructive" onClick={() => handleVerify('reject')} loading={processing} className="flex-1">
                <XCircle className="h-4 w-4" />
                ปฏิเสธ
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </>
  )
}
