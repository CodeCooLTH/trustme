import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import AttendanceTable from './components/AttendanceTable'
import { attendanceStatData } from './components/data'
export const metadata = {
  title: 'Attendance',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Attendance" subtitle="HRM" />

      <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
        {attendanceStatData.map((item, idx) => (
          <StatCard key={idx} attendance={item} />
        ))}
      </div>
      <AttendanceTable />
    </>
  )
}
export default Page
const StatCard = ({ attendance }) => {
  const { icon, value, unit, change, title } = attendance
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
                <h5 className="text-lg">
                  {value}&nbsp;
                  <small className="text-2xs">{unit}</small>
                </h5>
                <span className="flex justify-center">
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
