'use client'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadNotifications = () => {
    fetch('/api/notifications')
      .then(r => r.json())
      .then(res => {
        if (res.success) setNotifications(res.data?.notifications || [])
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadNotifications() }, [])

  const markAllRead = async () => {
    await fetch('/api/notifications/read-all', { method: 'PATCH' })
    loadNotifications()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">แจ้งเตือน</h1>
        <Button variant="ghost" size="sm" onClick={markAllRead}>อ่านทั้งหมด</Button>
      </div>

      {loading ? (
        <p className="text-gray-500">กำลังโหลด...</p>
      ) : notifications.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-500">ไม่มีแจ้งเตือน</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {notifications.map((n: any) => (
            <Card key={n.id} className={n.isRead ? 'opacity-60' : ''}>
              <div className="flex items-start gap-3">
                <div className={`mt-1 h-2 w-2 rounded-full ${n.isRead ? 'bg-gray-300' : 'bg-blue-500'}`} />
                <div>
                  <p className="font-medium text-sm text-gray-900">{n.title}</p>
                  <p className="text-sm text-gray-500">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString('th-TH')}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
