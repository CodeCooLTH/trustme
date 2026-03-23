'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'

export default function CreateDealPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [providers, setProviders] = useState<string[]>([])
  const [form, setForm] = useState({
    productName: '', description: '', price: '', shippingMethod: '',
  })

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(res => {
        if (res.success && res.data?.shipping_providers) {
          setProviders(res.data.shipping_providers)
        }
      })
      .catch(() => setProviders(['Kerry Express', 'Flash Express', 'ไปรษณีย์ไทย']))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: form.productName,
          description: form.description,
          price: parseFloat(form.price),
          images: [],
          shippingMethod: form.shippingMethod,
        }),
      })
      const data = await res.json()
      if (data.success) {
        router.push('/deals')
      } else {
        setError(data.error || 'เกิดข้อผิดพลาด')
      }
    } catch {
      setError('เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">สร้างดีลใหม่</h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="ชื่อสินค้า"
            value={form.productName}
            onChange={e => setForm(f => ({ ...f, productName: e.target.value }))}
            required
          />
          <Textarea
            label="รายละเอียด"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            required
          />
          <Input
            label="ราคา (บาท)"
            type="number"
            min="1"
            value={form.price}
            onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
            required
          />
          <Select
            label="วิธีจัดส่ง"
            value={form.shippingMethod}
            onChange={e => setForm(f => ({ ...f, shippingMethod: e.target.value }))}
            options={providers.map(p => ({ value: p, label: p }))}
            required
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3">
            <Button type="submit" loading={loading}>สร้างดีล</Button>
            <Button type="button" variant="secondary" onClick={() => router.back()}>ยกเลิก</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
