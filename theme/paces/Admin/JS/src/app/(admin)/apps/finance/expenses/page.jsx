import PageBreadcrumb from '@/components/PageBreadcrumb'
import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import { expenseStatData } from './components/data'
import ExpensesTable from './components/ExpensesTable'
export const metadata = {
  title: 'Expenses',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Expenses" subtitle="Finance" />
      <div className="container-fluid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-base mb-base">
          {expenseStatData.map((item, idx) => (
            <StatCard key={idx} expenseStat={item} />
          ))}
        </div>
        <ExpensesTable />
      </div>
    </>
  )
}
export default Page
const StatCard = ({ expenseStat }) => {
  const { icon, className, value, prefix, title } = expenseStat
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
              <p className="text-default-400">{title}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
