import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import AnalyticsOverview from './components/AnalyticsOverview'
import AudienceInsight from './components/AudienceInsight'
import SessionByBrowser from './components/SessionByBrowser'
import SessionOverview from './components/SessionOverview'
import TopTrafficSources from './components/TopTrafficSources'
import TotalOrder from './components/TotalOrder'
import TotalSubscriber from './components/TotalSubscriber'
import TotalVisitors from './components/TotalVisitors'
import UserGeography from './components/UserGeography'

export const metadata: Metadata = { title: 'Analytics Dashboard' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Analytics" subtitle="Dashboard" />
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-base mb-base">
        <TotalOrder />
        <TotalVisitors />
        <TotalSubscriber />
      </div>
      <div className="grid xl:grid-cols-4 grid-cols-1 gap-base mb-base">
        <div className="xl:col-span-3">
          <SessionOverview />
        </div>
        <AudienceInsight />
      </div>

      <div className="grid xl:grid-cols-12 grid-cols-1 gap-base mb-base">
        <div className="xl:col-span-7">
          <UserGeography />
        </div>
        <div className="xl:col-span-5">
          <TopTrafficSources />
        </div>
      </div>

      <div className="grid xl:grid-cols-4 grid-cols-1 gap-base">
        <SessionByBrowser />
        <div className="xl:col-span-3">
          <AnalyticsOverview />
        </div>
      </div>
    </>
  )
}

export default Page
