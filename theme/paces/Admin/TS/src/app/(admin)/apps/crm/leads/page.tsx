import PageBreadcrumb from '@/components/PageBreadcrumb'
import { CountUp } from '@/components/wrappers/CountUp'
import { Metadata } from 'next'
import { LeadStatType, leadStatData } from './components/data'
import LeadsTable from './components/LeadsTable'
export const metadata: Metadata = { title: 'CRM Leads' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Leads" subtitle="CRM" />

      <div className="mb-1.25 grid grid-cols-1 gap-1.25 md:grid-cols-3 lg:grid-cols-6">
        {leadStatData.map((item, idx) => (
          <StatCard key={idx} stat={item} />
        ))}
      </div>
      <LeadsTable />
    </>
  )
}

export default Page

const StatCard = ({ stat }: { stat: LeadStatType }) => {
  const { title, value, suffix } = stat
  return (
    <div className="card">
      <div className="card-body">
        <div className="text-center">
          <p className="text-default-400 mb-1.25">{title}</p>
          <h4 className="text-lg">
            <CountUp end={value} suffix={suffix} duration={1} start={0} decimals={Number.isInteger(value) ? 0 : 2} />
          </h4>
        </div>
      </div>
    </div>
  )
}
