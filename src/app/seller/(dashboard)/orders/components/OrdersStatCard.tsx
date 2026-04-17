'use client'

import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import type { StatCardData } from './data'

type OrdersStatCardProps = {
  stat: StatCardData
}

const accentBg: Record<StatCardData['accent'], string> = {
  primary: 'bg-primary',
  warning: 'bg-warning',
  info: 'bg-info',
  success: 'bg-success',
  danger: 'bg-danger',
}

const OrdersStatCard = ({ stat }: OrdersStatCardProps) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-5 flex w-full items-center justify-between gap-3">
          <h3 className="text-xl">
            <CountUp start={0} end={stat.value} duration={1} decimals={0} />
          </h3>
          <div className={cn('size-9 flex items-center justify-center rounded-full!', accentBg[stat.accent])}>
            <Icon icon={stat.icon} className="size-5.5 text-white" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-[15px] uppercase font-bold">{stat.label}</span>
          </div>
          {stat.change !== 0 && (
            <span
              className={cn(
                'badge ms-auto',
                stat.change > 0 ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger',
              )}
            >
              {stat.change > 0 ? '+' : ''}
              {stat.change}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrdersStatCard
