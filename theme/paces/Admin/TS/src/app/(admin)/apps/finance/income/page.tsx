import PageBreadcrumb from '@/components/PageBreadcrumb'
import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import { Metadata } from 'next'
import { incomeStatData, IncomeStatType } from './components/data'
import IncomeTable from './components/IncomeTable'

export const metadata: Metadata = { title: 'Income' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Income" subtitle="Finance" />
      <div className="mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-base">
        {incomeStatData.map((item, idx) => (
          <StatCard incomeStat={item} key={idx} />
        ))}
      </div>
      <IncomeTable />
    </>
  )
}

export default Page

const StatCard = ({ incomeStat }: { incomeStat: IncomeStatType }) => {
  const { icon, className, value, prefix, title } = incomeStat
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div className={cn('flex size-15 items-center justify-center rounded-full', className)}>
              <Icon icon={icon} className="size-6" />
            </div>
            <div className="text-end">
              <h3 className="mb-3 text-2xl font-normal">
                <CountUp start={0} end={value} duration={3} separator="," prefix={prefix} />
              </h3>
              <p className="text-default-400">
                <span>{title}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
