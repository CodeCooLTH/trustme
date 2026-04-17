import PageBreadcrumb from '@/components/PageBreadcrumb'
import CrmStats from './components/CrmStats'
import DealStatus from './components/DealStatus'
import LeadSource from './components/LeadSource'
import LocationBySession from './components/LocationBySession'
import Overview from './components/Overview'
import RecentActivity from './components/RecentActivity'
import TopPerforming from './components/TopPerforming'
export const metadata = {
  title: 'CRM Dashboard',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="CRM" subtitle="Dashboard" />

      <CrmStats />

      <div className="grid xl:grid-cols-3 grid-cols-1 gap-base mb-base">
        <div className="col-span-2">
          <Overview />
        </div>
        <div className="col-span-1">
          <LeadSource />
        </div>
      </div>

      <div className="mb-5">
        <DealStatus />
      </div>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-base">
        <TopPerforming />
        <LocationBySession />
        <RecentActivity />
      </div>
    </>
  )
}
export default Page
