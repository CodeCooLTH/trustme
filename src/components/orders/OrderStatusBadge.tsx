import { Badge } from '@/components/ui/Badge'
import type { BadgeVariant } from '@/components/ui/Badge'

const statusMap: Record<string, { label: string; variant: BadgeVariant }> = {
  PENDING_PAYMENT: { label: 'รอชำระเงิน', variant: 'warning' },
  PAYMENT_UPLOADED: { label: 'รอตรวจสลิป', variant: 'default' },
  PAYMENT_RECEIVED: { label: 'ชำระแล้ว', variant: 'success' },
  SHIPPING: { label: 'กำลังจัดส่ง', variant: 'default' },
  DELIVERED: { label: 'ส่งถึงแล้ว', variant: 'default' },
  COMPLETED: { label: 'สำเร็จ', variant: 'success' },
  CANCELLED: { label: 'ยกเลิก', variant: 'secondary' },
  DISPUTE: { label: 'ข้อพิพาท', variant: 'destructive' },
  REFUNDED: { label: 'คืนเงินแล้ว', variant: 'destructive' },
  RELEASED: { label: 'ปล่อยเงินแล้ว', variant: 'success' },
}

export function OrderStatusBadge({ status }: { status: string }) {
  const info = statusMap[status] || { label: status, variant: 'secondary' as BadgeVariant }
  return <Badge variant={info.variant}>{info.label}</Badge>
}
