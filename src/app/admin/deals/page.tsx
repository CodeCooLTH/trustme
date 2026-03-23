'use client'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layouts/Header'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { PageLoading } from '@/components/ui/Loading'
import { EmptyState } from '@/components/ui/EmptyState'
import { Tag } from 'lucide-react'
import type { BadgeVariant } from '@/components/ui/Badge'

const statusLabels: Record<string, string> = { DRAFT: 'แบบร่าง', ACTIVE: 'เผยแพร่', CLOSED: 'ปิดแล้ว' }
const statusVariants: Record<string, BadgeVariant> = { DRAFT: 'secondary', ACTIVE: 'success', CLOSED: 'destructive' }

export default function AdminDealsPage() {
  const [deals, setDeals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/deals')
      .then(r => r.json())
      .then(res => { if (res.success) setDeals(res.data || []) })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <PageLoading />

  return (
    <>
      <Header title="ดีลทั้งหมด" description={`ทั้งหมด ${deals.length} รายการ`} />
      <div className="p-4 lg:p-6">
        {deals.length === 0 ? (
          <EmptyState icon={Tag} title="ไม่มีดีล" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>สินค้า</TableHead>
                <TableHead>ผู้ขาย</TableHead>
                <TableHead>ราคา</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead>ออเดอร์</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((d: any) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.productName}</TableCell>
                  <TableCell className="text-muted-foreground">{d.seller?.name}</TableCell>
                  <TableCell>฿{Number(d.price).toLocaleString()}</TableCell>
                  <TableCell><Badge variant={statusVariants[d.status]}>{statusLabels[d.status]}</Badge></TableCell>
                  <TableCell>{d._count?.orders || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  )
}
