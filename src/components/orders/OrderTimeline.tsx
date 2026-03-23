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

export function OrderTimeline({ status }: { status: string }) {
  const currentIdx = statusIndex[status] ?? -1
  const isTerminal = ['CANCELLED', 'DISPUTE', 'REFUNDED', 'RELEASED'].includes(status)

  return (
    <div className="space-y-3">
      {steps.map((step, idx) => {
        const isDone = idx <= currentIdx
        const isCurrent = idx === currentIdx

        return (
          <div key={step.key} className="flex items-center gap-3">
            <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
              isDone ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            } ${isCurrent ? 'ring-2 ring-blue-300' : ''}`}>
              {isDone ? '✓' : idx + 1}
            </div>
            <span className={`text-sm ${isDone ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
              {step.label}
            </span>
          </div>
        )
      })}
      {isTerminal && (
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600 text-xs font-bold">!</div>
          <span className="text-sm font-medium text-red-600">
            {status === 'CANCELLED' ? 'ยกเลิก' : status === 'DISPUTE' ? 'ข้อพิพาท' : status === 'REFUNDED' ? 'คืนเงินแล้ว' : 'ปล่อยเงินแล้ว'}
          </span>
        </div>
      )}
    </div>
  )
}
