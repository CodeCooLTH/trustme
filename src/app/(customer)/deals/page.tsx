'use client'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

const statusColors: Record<string, string> = { DRAFT: 'gray', ACTIVE: 'green', CLOSED: 'red' }
const statusLabels: Record<string, string> = { DRAFT: 'แบบร่าง', ACTIVE: 'เผยแพร่', CLOSED: 'ปิดแล้ว' }

export default function DealsPage() {
  const [deals, setDeals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/deals')
      .then(r => r.json())
      .then(res => { if (res.success) setDeals(res.data || []) })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">ดีลของฉัน</h1>
        <Link href="/deals/create">
          <Button>สร้างดีลใหม่</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">กำลังโหลด...</p>
      ) : deals.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-500 mb-4">ยังไม่มีดีล</p>
          <Link href="/deals/create"><Button>สร้างดีลแรก</Button></Link>
        </Card>
      ) : (
        <div className="grid gap-4">
          {deals.map((deal: any) => (
            <Card key={deal.id}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{deal.productName}</h3>
                  <p className="text-sm text-gray-500 mt-1">฿{Number(deal.price).toLocaleString()}</p>
                  <p className="text-xs text-gray-400 mt-1">{deal._count?.orders || 0} ออเดอร์</p>
                </div>
                <Badge color={statusColors[deal.status]}>{statusLabels[deal.status]}</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
