import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import LeaveTable from './components/LeaveTable'
import { leaveStatData } from './components/data'
export const metadata = {
  title: 'Leaves',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Leaves" subtitle="HRM" />
      <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
        {leaveStatData.map((leaveStat, idx) => (
          <StatCard leaveStat={leaveStat} key={idx} />
        ))}
      </div>
      <LeaveTable />
    </>
  )
}
export default Page
const StatCard = ({ leaveStat }) => {
  const { icon, value, unit, title, change } = leaveStat
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="flex gap-base items-start">
            <div className="bg-light flex size-11 items-center justify-center rounded-full">
              <Icon icon={icon} className="text-default-800 text-xl" />
            </div>
            <div className="grow">
              <div className="mb-2.5 flex items-center justify-between">
                <h5 className="text-default-800 text-lg">
                  {value}&nbsp;
                  {unit && <small className="text-2xs">{unit}</small>}
                </h5>
                <span className="flex gap-1">
                  {change > 0 ? '+' : ''}
                  {change}%{change > 0 ? <Icon icon="arrow-up" className="text-success" /> : <Icon icon="arrow-down" className="text-danger" />}
                </span>
              </div>
              <p className="text-default-400">{title}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
