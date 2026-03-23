'use client'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layouts/Header'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PageLoading } from '@/components/ui/Loading'
import { EmptyState } from '@/components/ui/EmptyState'
import { Scale } from 'lucide-react'
import Link from 'next/link'
import type { BadgeVariant } from '@/components/ui/Badge'

const statusLabels: Record<string, string> = { OPEN: 'เปิดอยู่', RESOLVED_BUYER: 'คืนผู้ซื้อ', RESOLVED_SELLER: 'ปล่อยผู้ขาย' }
const statusVariants: Record<string, BadgeVariant> = { OPEN: 'destructive', RESOLVED_BUYER: 'default', RESOLVED_SELLER: 'success' }

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/disputes')
      .then(r => r.json())
      .then(res => { if (res.success) setDisputes(res.data || []) })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <PageLoading />

  return (
    <>
      <Header title="จัดการข้อพิพาท" description={`ทั้งหมด ${disputes.length} รายการ`} />
      <div className="p-4 lg:p-6">
        {disputes.length === 0 ? (
          <EmptyState icon={Scale} title="ไม่มีข้อพิพาท" />
        ) : (
          <div className="space-y-3">
            {disputes.map((d: any) => (
              <Link key={d.id} href={`/admin/disputes/${d.id}`}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{d.order?.deal?.productName}</p>
                        <p className="text-sm text-muted-foreground truncate">เหตุผล: {d.reason}</p>
                        <p className="text-xs text-muted-foreground">เปิดโดย: {d.opener?.name}</p>
                      </div>
                      <Badge variant={statusVariants[d.status]}>{statusLabels[d.status]}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
