import { Badge } from '@/components/ui/Badge'

const statusMap: Record<string, { label: string; color: string }> = {
  PENDING_PAYMENT: { label: 'รอชำระเงิน', color: 'yellow' },
  PAYMENT_UPLOADED: { label: 'รอตรวจสลิป', color: 'blue' },
  PAYMENT_RECEIVED: { label: 'ชำระแล้ว', color: 'green' },
  SHIPPING: { label: 'กำลังจัดส่ง', color: 'blue' },
  DELIVERED: { label: 'ส่งถึงแล้ว', color: 'purple' },
  COMPLETED: { label: 'สำเร็จ', color: 'green' },
  CANCELLED: { label: 'ยกเลิก', color: 'gray' },
  DISPUTE: { label: 'ข้อพิพาท', color: 'red' },
  REFUNDED: { label: 'คืนเงินแล้ว', color: 'red' },
  RELEASED: { label: 'ปล่อยเงินแล้ว', color: 'green' },
}

export function OrderStatusBadge({ status }: { status: string }) {
  const info = statusMap[status] || { label: status, color: 'gray' }
  return <Badge color={info.color}>{info.label}</Badge>
}
