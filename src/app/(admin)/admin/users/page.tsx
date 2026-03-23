'use client'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const roleLabels: Record<string, string> = { BUYER: 'ผู้ซื้อ', SELLER: 'ผู้ขาย', ADMIN: 'แอดมิน' }
const roleColors: Record<string, string> = { BUYER: 'blue', SELLER: 'green', ADMIN: 'purple' }

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/users')
      .then(r => r.json())
      .then(res => { if (res.success) setUsers(res.data || []) })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">จัดการผู้ใช้</h1>

      {loading ? <p className="text-gray-500">กำลังโหลด...</p> : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3 pr-4">ชื่อ</th>
                  <th className="pb-3 pr-4">อีเมล</th>
                  <th className="pb-3 pr-4">ประเภท</th>
                  <th className="pb-3 pr-4">คะแนน</th>
                  <th className="pb-3">วันที่สมัคร</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium">{user.name}</td>
                    <td className="py-3 pr-4 text-gray-500">{user.email || '-'}</td>
                    <td className="py-3 pr-4"><Badge color={roleColors[user.role]}>{roleLabels[user.role]}</Badge></td>
                    <td className="py-3 pr-4">{user.points}</td>
                    <td className="py-3 text-gray-500">{new Date(user.createdAt).toLocaleDateString('th-TH')}</td>
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
