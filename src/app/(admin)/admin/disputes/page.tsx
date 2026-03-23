'use client'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

const statusLabels: Record<string, string> = { OPEN: 'เปิดอยู่', RESOLVED_BUYER: 'คืนผู้ซื้อ', RESOLVED_SELLER: 'ปล่อยผู้ขาย' }
const statusColors: Record<string, string> = { OPEN: 'red', RESOLVED_BUYER: 'blue', RESOLVED_SELLER: 'green' }

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/disputes')
      .then(r => r.json())
      .then(res => { if (res.success) setDisputes(res.data || []) })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">จัดการข้อพิพาท</h1>

      {loading ? <p className="text-gray-500">กำลังโหลด...</p> : disputes.length === 0 ? (
        <Card className="text-center py-12"><p className="text-gray-500">ไม่มีข้อพิพาท</p></Card>
      ) : (
        <div className="space-y-3">
          {disputes.map((d: any) => (
            <Link key={d.id} href={`/admin/disputes/${d.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{d.order?.deal?.productName}</p>
                    <p className="text-sm text-gray-500 mt-1">เหตุผล: {d.reason}</p>
                    <p className="text-xs text-gray-400 mt-1">เปิดโดย: {d.opener?.name}</p>
                  </div>
                  <Badge color={statusColors[d.status]}>{statusLabels[d.status]}</Badge>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
