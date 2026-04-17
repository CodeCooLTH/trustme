import PageBreadcrumb from '@/components/PageBreadcrumb'
import AIMetrics from './components/AIMetrics'
import AIStatsCard from './components/AIStatsCard'
import MetricCard from './components/MetricCard'
import OverviewCard from './components/OverviewCard'
import ProjectStat from './components/ProjectStat'
import SalesMetric from './components/SalesMetric'
import Stat from './components/Stat'
import SubscriptionMetric from './components/SubscriptionMetric'
export const metadata = {
  title: 'Statistics Widgets',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Statistics" subtitle="Widgets" />
      <div className="container-fluid">
        <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 mb-base gap-base">
          <Stat />
        </div>

        <div className="card mb-base">
          <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-1 items-center text-center">
            <ProjectStat />
          </div>
        </div>

        <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 mb-base gap-base">
          <OverviewCard />
        </div>

        <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 mb-base gap-base">
          <MetricCard />
        </div>

        <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-2.5 mb-base items-center text-center">
          <SalesMetric />
        </div>

        <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 mb-base gap-base">
          <AIMetrics />
        </div>

        <div className="grid xl:grid-cols-6 md:grid-cols-3 grid-cols-1 mb-base gap-base">
          <AIStatsCard />
        </div>

        <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-base">
          <SubscriptionMetric />
        </div>
      </div>
    </>
  )
}
export default Page
