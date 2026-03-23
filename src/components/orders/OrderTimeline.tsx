import { cn } from '@/lib/cn'
import { Check, AlertTriangle } from 'lucide-react'

const steps = [
  { key: 'PENDING_PAYMENT', label: 'รอชำระเงิน' },
  { key: 'PAYMENT_UPLOADED', label: 'อัพโหลดสลิป' },
  { key: 'PAYMENT_RECEIVED', label: 'ชำระแล้ว' },
  { key: 'SHIPPING', label: 'กำลังจัดส่ง' },
  { key: 'DELIVERED', label: 'ส่งถึงแล้ว' },
  { key: 'COMPLETED', label: 'สำเร็จ' },
]

const statusIndex: Record<string, number> = {}
steps.forEach((s, i) => { statusIndex[s.key] = i })

const terminalLabels: Record<string, string> = {
  CANCELLED: 'ยกเลิก', DISPUTE: 'ข้อพิพาท', REFUNDED: 'คืนเงินแล้ว', RELEASED: 'ปล่อยเงินแล้ว',
}

export function OrderTimeline({ status }: { status: string }) {
  const currentIdx = statusIndex[status] ?? -1
  const isTerminal = status in terminalLabels

  return (
    <div className="space-y-3">
      {steps.map((step, idx) => {
        const isDone = idx <= currentIdx
        const isCurrent = idx === currentIdx

        return (
          <div key={step.key} className="flex items-center gap-3">
            <div className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold shrink-0',
              isDone ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
              isCurrent && 'ring-2 ring-ring ring-offset-2 ring-offset-background'
            )}>
              {isDone ? <Check className="h-3.5 w-3.5" /> : idx + 1}
            </div>
            <span className={cn('text-sm', isDone ? 'text-foreground font-medium' : 'text-muted-foreground')}>
              {step.label}
            </span>
          </div>
        )
      })}
      {isTerminal && (
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 shrink-0">
            <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
          </div>
          <span className="text-sm font-medium text-destructive">{terminalLabels[status]}</span>
        </div>
      )}
    </div>
  )
}
