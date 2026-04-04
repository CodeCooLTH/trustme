'use client'

import Chip from '@mui/material/Chip'

const STATUS_MAP: Record<string, { label: string; color: 'default' | 'info' | 'warning' | 'success' | 'error' }> = {
  CREATED: { label: 'รอยืนยัน', color: 'default' },
  CONFIRMED: { label: 'ยืนยันแล้ว', color: 'info' },
  SHIPPED: { label: 'กำลังจัดส่ง', color: 'warning' },
  COMPLETED: { label: 'สำเร็จ', color: 'success' },
  CANCELLED: { label: 'ยกเลิก', color: 'error' },
}

export default function OrderStatusBadge({ status }: { status: string }) {
  const config = STATUS_MAP[status] || { label: status, color: 'default' as const }

  return <Chip label={config.label} color={config.color} size="small" variant="tonal" />
}
