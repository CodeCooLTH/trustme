'use client'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layouts/Header'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { PageLoading } from '@/components/ui/Loading'
import { EmptyState } from '@/components/ui/EmptyState'
import { Users } from 'lucide-react'
import type { BadgeVariant } from '@/components/ui/Badge'

const roleLabels: Record<string, string> = { BUYER: 'ผู้ซื้อ', SELLER: 'ผู้ขาย', ADMIN: 'แอดมิน' }
const roleVariants: Record<string, BadgeVariant> = { BUYER: 'default', SELLER: 'success', ADMIN: 'warning' }

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/users')
      .then(r => r.json())
      .then(res => { if (res.success) setUsers(res.data || []) })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <PageLoading />

  return (
    <>
      <Header title="จัดการผู้ใช้" description={`ทั้งหมด ${users.length} คน`} />
      <div className="p-4 lg:p-6">
        {users.length === 0 ? (
          <EmptyState icon={Users} title="ไม่มีผู้ใช้" description="ยังไม่มีผู้ใช้ในระบบ" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ชื่อ</TableHead>
                <TableHead>อีเมล</TableHead>
                <TableHead>ประเภท</TableHead>
                <TableHead>คะแนน</TableHead>
                <TableHead>วันที่สมัคร</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email || '-'}</TableCell>
                  <TableCell><Badge variant={roleVariants[user.role]}>{roleLabels[user.role]}</Badge></TableCell>
                  <TableCell>{user.points}</TableCell>
                  <TableCell className="text-muted-foreground">{new Date(user.createdAt).toLocaleDateString('th-TH')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  )
}
