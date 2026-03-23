'use client'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layouts/Header'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { PageLoading } from '@/components/ui/Loading'
import { EmptyState } from '@/components/ui/EmptyState'
import { Plus, Tag } from 'lucide-react'
import Link from 'next/link'
import type { BadgeVariant } from '@/components/ui/Badge'

const statusVariants: Record<string, BadgeVariant> = { DRAFT: 'secondary', ACTIVE: 'success', CLOSED: 'destructive' }
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

  if (loading) return <PageLoading />

  return (
    <>
      <Header title="ดีลของฉัน" actions={
        <Link href="/deals/create"><Button size="sm"><Plus className="h-4 w-4" /> สร้างดีลใหม่</Button></Link>
      } />
      <div className="p-4 lg:p-6">
        {deals.length === 0 ? (
          <EmptyState icon={Tag} title="ยังไม่มีดีล" description="สร้างดีลแรกของคุณ" action={
            <Link href="/deals/create"><Button><Plus className="h-4 w-4" /> สร้างดีลแรก</Button></Link>
          } />
        ) : (
          <div className="grid gap-3">
            {deals.map((deal: any) => (
              <Card key={deal.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{deal.productName}</h3>
                      <p className="text-sm text-primary font-medium mt-1">฿{Number(deal.price).toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground mt-1">{deal._count?.orders || 0} ออเดอร์</p>
                    </div>
                    <Badge variant={statusVariants[deal.status]}>{statusLabels[deal.status]}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
