'use client'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(res => { if (res.success) setSettings(res.data || {}) })
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      const data = await res.json()
      if (data.success) setMessage('บันทึกสำเร็จ')
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  if (loading) return <p className="text-gray-500">กำลังโหลด...</p>

  const bankAccount = settings.bank_account || {}

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">ตั้งค่าระบบ</h1>

      <Card>
        <h3 className="font-semibold mb-4">บัญชีรับเงิน</h3>
        <div className="space-y-3">
          <Input label="ธนาคาร" value={bankAccount.bank || ''} onChange={e => setSettings((s: any) => ({ ...s, bank_account: { ...s.bank_account, bank: e.target.value } }))} />
          <Input label="เลขบัญชี" value={bankAccount.accountNo || ''} onChange={e => setSettings((s: any) => ({ ...s, bank_account: { ...s.bank_account, accountNo: e.target.value } }))} />
          <Input label="ชื่อบัญชี" value={bankAccount.accountName || ''} onChange={e => setSettings((s: any) => ({ ...s, bank_account: { ...s.bank_account, accountName: e.target.value } }))} />
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-4">ตั้งค่าอื่นๆ</h3>
        <div className="space-y-3">
          <Input label="Deadline ยืนยันรับสินค้า (วัน)" type="number" value={settings.confirm_deadline_days || ''} onChange={e => setSettings((s: any) => ({ ...s, confirm_deadline_days: e.target.value }))} />
          <Input label="จำนวนครั้งสูงสุดส่งสลิป" type="number" value={settings.max_payment_attempts || ''} onChange={e => setSettings((s: any) => ({ ...s, max_payment_attempts: e.target.value }))} />
        </div>
      </Card>

      <div className="flex items-center gap-4">
        <Button onClick={handleSave} loading={saving}>บันทึก</Button>
        {message && <span className="text-sm text-green-600">{message}</span>}
      </div>
    </div>
  )
}
