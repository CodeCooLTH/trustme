'use client'

import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

type Props = {
  from: string // YYYY-MM-DD
  to: string   // YYYY-MM-DD
}

const SalesDateRange = ({ from, to }: Props) => {
  const router = useRouter()
  const defaultDate = [from, to]

  const handleChange = (selectedDates: Date[]) => {
    if (selectedDates.length === 2) {
      const f = selectedDates[0].toISOString().slice(0, 10)
      const t = selectedDates[1].toISOString().slice(0, 10)
      router.push(`?from=${f}&to=${t}`)
    }
  }

  return (
    <div className="input-icon-group">
      <Icon icon="calendar" className="input-icon" />
      <Flatpickr
        className="form-input"
        style={{ minWidth: 240 }}
        options={{
          dateFormat: 'd M, Y',
          mode: 'range',
          defaultDate,
        }}
        onChange={handleChange}
      />
    </div>
  )
}

export default SalesDateRange
