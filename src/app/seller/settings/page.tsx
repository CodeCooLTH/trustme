'use client'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layouts/Header'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PageLoading } from '@/components/ui/Loading'
import { Save, Link as LinkIcon } from 'lucide-react'

export default function SellerSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [slug, setSlug] = useState('')

  useEffect(() => {
    // TODO: fetch seller profile including slug
    setSlug('somchai-shop')
    setLoading(false)
  }, [])

  const handleSave = async () => {
    setSaving(true)
    // TODO: save slug
    setMessage('บันทึกสำเร็จ')
    setSaving(false)
    setTimeout(() => setMessage(''), 3000)
  }

  if (loading) return <PageLoading />

  return (
    <>
      <Header title="ตั้งค่า" actions={
        <div className="flex items-center gap-2">
          {message && <span className="text-sm text-green-600">{message}</span>}
          <Button onClick={handleSave} loading={saving} size="sm">
            <Save className="h-4 w-4" /> บันทึก
          </Button>
        </div>
      } />
      <div className="p-4 lg:p-6 max-w-2xl space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <LinkIcon className="h-4 w-4" /> ลิงก์ร้านค้า
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              label="Slug (URL ร้านค้า)"
              value={slug}
              onChange={e => setSlug(e.target.value)}
              placeholder="my-shop"
            />
            <p className="text-xs text-muted-foreground">
              ลิงก์ดีลของคุณจะเป็น: safepay.local/<strong>{slug || 'your-slug'}</strong>/deals/xxx
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
