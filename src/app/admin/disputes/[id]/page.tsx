'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Header } from '@/components/layouts/Header'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Textarea } from '@/components/ui/Textarea'
import { PageLoading } from '@/components/ui/Loading'
import { ArrowLeftRight, MessageSquare } from 'lucide-react'

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

  if (loading) return <PageLoading />
  if (!dispute) return <div className="p-6 text-destructive">ไม่พบข้อพิพาท</div>

  return (
    <>
      <Header title="รายละเอียดข้อพิพาท" description={dispute.order?.deal?.productName} />
      <div className="p-4 lg:p-6 max-w-3xl space-y-4">
        <Card>
          <CardContent className="p-4 space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">สินค้า</span>
              <span className="font-medium">{dispute.order?.deal?.productName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">ราคา</span>
              <span className="font-semibold text-primary">฿{Number(dispute.order?.deal?.price || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">เหตุผล</span>
              <span className="font-medium">{dispute.reason}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">เปิดโดย</span>
              <span>{dispute.opener?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">สถานะ</span>
              <Badge variant={dispute.status === 'OPEN' ? 'destructive' : 'success'}>{dispute.status}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4" /> ข้อความ
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dispute.messages?.length === 0 ? (
              <p className="text-sm text-muted-foreground">ยังไม่มีข้อความ</p>
            ) : (
              <div className="space-y-3">
                {dispute.messages?.map((m: any) => (
                  <div key={m.id} className="border-b border-border pb-3 last:border-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{m.sender?.name}</span>
                      <Badge variant={m.sender?.role === 'ADMIN' ? 'warning' : 'secondary'} className="text-[10px]">{m.sender?.role}</Badge>
                    </div>
                    <p className="text-sm text-foreground">{m.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(m.createdAt).toLocaleString('th-TH')}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {dispute.status === 'OPEN' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ArrowLeftRight className="h-4 w-4" /> ตัดสิน
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea label="เหตุผลการตัดสิน" value={resolution} onChange={e => setResolution(e.target.value)} placeholder="อธิบายเหตุผลในการตัดสิน..." />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleResolve('buyer')} loading={processing} className="flex-1">
                  คืนเงินผู้ซื้อ
                </Button>
                <Button onClick={() => handleResolve('seller')} loading={processing} className="flex-1">
                  ปล่อยเงินผู้ขาย
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
