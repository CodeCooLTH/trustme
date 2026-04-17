import { Icon } from '@iconify/react'

type Status = 'PENDING' | 'APPROVED' | 'REJECTED'

interface StatusBadgeProps {
  status: Status
}

const config: Record<Status, { label: string; icon: string; cls: string }> = {
  APPROVED: {
    label: 'อนุมัติแล้ว',
    icon: 'mdi:check-circle',
    cls: 'bg-success/10 text-success',
  },
  PENDING: {
    label: 'รอตรวจสอบ',
    icon: 'mdi:clock-outline',
    cls: 'bg-warning/10 text-warning',
  },
  REJECTED: {
    label: 'ปฏิเสธ',
    icon: 'mdi:close-circle',
    cls: 'bg-danger/10 text-danger',
  },
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, icon, cls } = config[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cls}`}
    >
      <Icon icon={icon} width={14} height={14} />
      {label}
    </span>
  )
}
