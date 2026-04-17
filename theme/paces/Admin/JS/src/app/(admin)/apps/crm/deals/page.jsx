import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import { dealStatData } from './components/data'
import DealsTable from './components/DealsTable'
export const metadata = {
  title: 'Deals',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Deals" subtitle="CRM" />
      <div>
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-5 mb-2.5">
          {dealStatData.map((stat, idx) => (
            <DealStatisticCard key={idx} stat={stat} />
          ))}
        </div>
        <DealsTable />
      </div>
    </>
  )
}
export default Page
const DealStatisticCard = ({ stat }) => {
  const { value, change, title, progress, className, prefix, suffix } = stat
  return (
    <div className="card">
      <div className="card-body">
        <div className="flex">
          <div className="flex-1">
            <div className="mb-5 flex items-center justify-between">
              <h5 className="text-lg">
                {prefix}
                {value}
                {suffix && <small className="text-2xs">{suffix}</small>}
              </h5>
              <div className="flex items-center gap-1.5">
                <span>{change}%</span>
                <Icon icon="arrow-up" className="text-success" />
              </div>
            </div>
            <p className="text-default-400 mb-2.5">{title}</p>
            <div className="bg-default-100 h-1.25 w-full rounded-full">
              <div
                className={cn('h-1.25 rounded-s-full', className)}
                role="progressbar"
                style={{
                  width: `${progress}%`,
                }}
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
