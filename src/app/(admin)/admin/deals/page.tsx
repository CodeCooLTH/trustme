'use client'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const statusLabels: Record<string, string> = { DRAFT: 'แบบร่าง', ACTIVE: 'เผยแพร่', CLOSED: 'ปิดแล้ว' }
const statusColors: Record<string, string> = { DRAFT: 'gray', ACTIVE: 'green', CLOSED: 'red' }

export default function AdminDealsPage() {
  const [deals, setDeals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/deals')
      .then(r => r.json())
      .then(res => { if (res.success) setDeals(res.data || []) })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">ดีลทั้งหมด</h1>

      {loading ? <p className="text-gray-500">กำลังโหลด...</p> : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3 pr-4">สินค้า</th>
                  <th className="pb-3 pr-4">ผู้ขาย</th>
                  <th className="pb-3 pr-4">ราคา</th>
                  <th className="pb-3 pr-4">สถานะ</th>
                  <th className="pb-3">ออเดอร์</th>
                </tr>
              </thead>
              <tbody>
                {deals.map((d: any) => (
                  <tr key={d.id} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium">{d.productName}</td>
                    <td className="py-3 pr-4 text-gray-500">{d.seller?.name}</td>
                    <td className="py-3 pr-4">฿{Number(d.price).toLocaleString()}</td>
                    <td className="py-3 pr-4"><Badge color={statusColors[d.status]}>{statusLabels[d.status]}</Badge></td>
                    <td className="py-3">{d._count?.orders || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
