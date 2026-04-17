import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { Metadata } from 'next'
import { holidayStatData, HolidayStatType } from './components/data'
import HolidayTable from './components/HolidayTable'

export const metadata: Metadata = { title: 'Holidays' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Holidays" subtitle="HRM" />
      <div className="mb-1.25 grid grid-cols-1 gap-1.25 md:grid-cols-2 lg:grid-cols-6">
        {holidayStatData.map((item, idx) => (
          <StatCard holiday={item} key={idx} />
        ))}
      </div>
      <HolidayTable />
    </>
  )
}

export default Page

const StatCard = ({ holiday }: { holiday: HolidayStatType }) => {
  const { title, value, icon } = holiday
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="flex items-center gap-base">
            <div className="bg-light flex size-11 items-center justify-center rounded-full">
              <Icon icon={icon} className="text-default-800 text-xl" />
            </div>
            <div>
              <p className="text-default-400 mb-1.25">{title}</p>
              <h4 className="text-lg">{value}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
