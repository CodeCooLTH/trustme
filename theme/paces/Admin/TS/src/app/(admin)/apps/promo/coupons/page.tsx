import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import { Metadata } from 'next'
import CouponTable from './components/CouponTable'
import { CouponStatType, couponStatData } from './components/data'

export const metadata: Metadata = { title: 'Coupons' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Coupons" subtitle="Promo" />
      <div className="mb-1.25 grid grid-cols-1 gap-1.25 md:grid-cols-2 lg:grid-cols-5">
        {couponStatData.map((stat) => (
          <CouponStatisticCard key={stat.title} stat={stat} />
        ))}
      </div>
      <CouponTable />
    </>
  )
}

export default Page

const CouponStatisticCard = ({ stat }: { stat: CouponStatType }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-5 flex items-center gap-2.5">
          <div className={cn('btn btn-icon size-9 rounded-full text-white', stat.iconClassName)}>
            <Icon icon={stat.icon} className="size-5.5" />
          </div>
          <h3 className="text-xl">{stat.value}</h3>
        </div>
        <div className="flex items-center justify-between">
          {stat.title}
          <span className={cn('badge', stat.badgeClassName)}>
            {stat.change > 0 ? '+' : ''}
            {stat.change}%
          </span>
        </div>
      </div>
    </div>
  )
}
