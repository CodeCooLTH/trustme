'use client'

/**
 * Orchestrator สำหรับ /o/[token] — จัดการ 2 stages:
 * 1. 'lock'   — PhoneUnlock (ต้องกรอกเบอร์ตรงกับ order)
 * 2. 'detail' — OrderDetailMobile (mobile-first + fixed bottom CTA)
 *
 * Unlock persists via sessionStorage (key scoped per token) — reload หน้าเดิม
 * ภายใน session เดียวไม่ต้อง unlock ใหม่
 */
import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'

import OrderDetailMobile, { type PublicOrderData } from './OrderDetailMobile'
import PhoneUnlock from './PhoneUnlock'

type Stage = 'lock' | 'detail'

type Props = {
  order: PublicOrderData
}

const unlockStorageKey = (token: string) => `deep-o-unlock-${token.slice(0, 8)}`

export default function PublicOrderClient({ order }: Props) {
  const [stage, setStage] = useState<Stage>('lock')
  const [phone, setPhone] = useState('')
  const [orderState, setOrderState] = useState(order)

  // ลอง restore unlock จาก sessionStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = sessionStorage.getItem(unlockStorageKey(order.publicToken))
    if (saved && /^0[0-9]{9}$/.test(saved)) {
      setPhone(saved)
      setStage('detail')
    }
  }, [order.publicToken])

  const handleUnlock = async (enteredPhone: string) => {
    const res = await fetch(`/api/orders/${order.publicToken}/unlock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: enteredPhone }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(data?.error ?? 'เบอร์นี้ไม่ตรงกับคำสั่งซื้อ')
    }
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(unlockStorageKey(order.publicToken), enteredPhone)
    }
    setPhone(enteredPhone)
    setStage('detail')
  }

  const handleConfirm = async () => {
    const res = await fetch(`/api/orders/${order.publicToken}/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact: phone }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(data?.error ?? 'ยืนยันไม่สำเร็จ')
    }
    toast.success('ยืนยันคำสั่งซื้อแล้ว ขอบคุณครับ')
    // Optimistic update → re-render detail with new status (status จาก response)
    setOrderState((prev) => ({ ...prev, status: data.status ?? 'CONFIRMED' }))
  }

  if (stage === 'lock') {
    return (
      <PhoneUnlock
        orderHint={`#${order.publicToken.slice(0, 8)}`}
        onUnlock={handleUnlock}
      />
    )
  }

  return (
    <OrderDetailMobile
      order={orderState}
      unlockedPhone={phone}
      onConfirmAction={handleConfirm}
    />
  )
}
