'use client'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layouts/Header'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { PageLoading } from '@/components/ui/Loading'
import { EmptyState } from '@/components/ui/EmptyState'
import { Bell, CheckCheck } from 'lucide-react'
import { cn } from '@/lib/cn'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    fetch('/api/notifications')
      .then(r => r.json())
      .then(res => { if (res.success) setNotifications(res.data?.notifications || []) })
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const markAllRead = async () => {
    await fetch('/api/notifications/read-all', { method: 'PATCH' })
    load()
  }

  if (loading) return <PageLoading />

  return (
    <>
      <Header title="แจ้งเตือน" actions={
        <Button variant="ghost" size="sm" onClick={markAllRead}><CheckCheck className="h-4 w-4" /> อ่านทั้งหมด</Button>
      } />
      <div className="p-4 lg:p-6">
        {notifications.length === 0 ? (
          <EmptyState icon={Bell} title="ไม่มีแจ้งเตือน" description="คุณจะได้รับแจ้งเตือนเมื่อมีการเปลี่ยนแปลงสถานะ" />
        ) : (
          <div className="space-y-2">
            {notifications.map((n: any) => (
              <Card key={n.id} className={cn(n.isRead && 'opacity-60')}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={cn('mt-1.5 h-2 w-2 rounded-full shrink-0', n.isRead ? 'bg-muted' : 'bg-primary')} />
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-foreground">{n.title}</p>
                      <p className="text-sm text-muted-foreground">{n.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleString('th-TH')}</p>
                    </div>
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
