import PageBreadcrumb from '@/components/PageBreadcrumb'
import FinancialOverview from './components/FinancialOverview'
import ProjectPerformance from './components/ProjectPerformance'
import ProjectStatus from './components/ProjectStatus'
import RevenueStat from './components/RevenueStat'
import SalesReport from './components/SalesReport'
import Stat from './components/Stat'
import StorePerformance from './components/StorePerformance'
export const metadata = {
  title: 'Chart Widgets',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Charts" subtitle="Widgets" />

      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 mb-base gap-base">
        <Stat />
      </div>

      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 mb-base gap-base">
        <RevenueStat />
      </div>

      <div className="grid xl:grid-cols-4 grid-cols-1 mb-base gap-base">
        <div className="col-span-1">
          <ProjectStatus />
        </div>
        <div className="xl:col-span-2 col-span-1">
          <ProjectPerformance />
        </div>
        <div className="col-span-1">
          <StorePerformance />
        </div>
      </div>

      <div className="grid xl:grid-cols-2 grid-cols-1 gap-base">
        <SalesReport />
        <FinancialOverview />
      </div>
    </>
  )
}
export default Page
