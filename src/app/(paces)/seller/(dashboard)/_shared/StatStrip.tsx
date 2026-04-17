'use client'

import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'

// Compact number formatter: 999 → "999", 1000 → "1K", 52100 → "52.1K",
// 1_000_000 → "1M", 1_250_000 → "1.25M". Decimals trimmed when ".0".
function compactNumber(n: number): string {
  const abs = Math.abs(n)
  const sign = n < 0 ? '-' : ''
  if (abs < 1000) {
    return sign + (Number.isInteger(n) ? abs.toString() : abs.toFixed(2))
  }
  if (abs < 1_000_000) {
    const v = abs / 1000
    return sign + (v >= 100 ? v.toFixed(0) : v.toFixed(1)).replace(/\.0$/, '') + 'K'
  }
  if (abs < 1_000_000_000) {
    const v = abs / 1_000_000
    return sign + (v >= 100 ? v.toFixed(0) : v.toFixed(2)).replace(/\.?0+$/, '') + 'M'
  }
  const v = abs / 1_000_000_000
  return sign + (v >= 100 ? v.toFixed(0) : v.toFixed(2)).replace(/\.?0+$/, '') + 'B'
}

export type StatStripItem = {
  title: string
  value: number
  prefix?: string
  suffix?: string
  change: number          // % vs. previous month (0 when no history)
  icon: string            // tabler
  iconClass: string       // e.g. 'bg-primary/15 text-primary'
  sinceLabel?: string     // defaults to "เทียบเดือนก่อน"
}

export default function StatStrip({ items }: { items: StatStripItem[] }) {
  return (
    <div className="card">
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2',
          items.length === 3
            ? 'lg:grid-cols-3'
            : items.length === 5
              ? 'lg:grid-cols-5'
              : 'lg:grid-cols-4',
        )}
      >
        {items.map((item, idx) => (
          <div
            key={item.title}
            className={cn(
              idx < items.length - 1
                ? 'lg:border-e border-dashed border-default-300'
                : '',
            )}
          >
            <div className="p-5 text-center">
              <h5 className="text-default-400 mb-2 text-xs uppercase">{item.title}</h5>
              <div className="flex items-center justify-center gap-2.5 my-5">
                <span
                  className={cn(
                    'size-8 flex justify-center items-center rounded-full',
                    item.iconClass,
                  )}
                >
                  <Icon icon={item.icon} className="size-5.5" />
                </span>
                <h3 className="text-xl font-bold">
                  <CountUp
                    start={0}
                    end={item.value}
                    duration={1}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    formattingFn={(n) => `${item.prefix ?? ''}${compactNumber(n)}${item.suffix ?? ''}`}
                  />
                </h3>
              </div>
              <p className="text-default-400 flex justify-center">
                <span
                  className={cn(
                    item.change > 0
                      ? 'text-success'
                      : item.change < 0
                        ? 'text-danger'
                        : 'text-default-400',
                    'me-2.5 flex items-center',
                  )}
                >
                  <Icon
                    icon={
                      item.change > 0
                        ? 'chevron-up'
                        : item.change < 0
                          ? 'chevron-down'
                          : 'minus'
                    }
                  />
                  {Math.abs(item.change)}%
                </span>
                <span className="text-nowrap">{item.sinceLabel ?? 'เทียบเดือนก่อน'}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
