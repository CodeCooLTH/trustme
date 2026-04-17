import PageBreadcrumb from '@/components/PageBreadcrumb'
import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import { transactionStatData } from './components/data'
import TransactionTable from './components/TransactionTable'
export const metadata = {
  title: 'Transactions',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Transactions" subtitle="Finance" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-base mb-base">
        {transactionStatData.map((item, idx) => (
          <StatCard key={idx} transactions={item} />
        ))}
      </div>
      <TransactionTable />
    </>
  )
}
export default Page
const StatCard = ({ transactions }) => {
  const { className, icon, value, prefix, title } = transactions
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div className={cn('flex size-15 items-center justify-center rounded-full', className)}>
              <Icon icon={icon} className="text-2xl" />
            </div>
            <div className="text-end">
              <h3 className="mb-2.5 text-xl font-normal">
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
