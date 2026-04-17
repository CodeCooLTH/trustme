import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import Channel from './components/Channel'
import Chat from './components/Chat'
import Search from './components/Search'
import Stat from './components/Stat'
import SummaryAlt from './components/SummaryAlt'
import TeamMember from './components/TeamMember'
import TopCountries from './components/TopCountries'
import TopTrafficSources from './components/TopTrafficSources '
import TotalSubscribers from './components/TotalSubscribers'
import TotalVisitors from './components/TotalVisitors'
import TrafficSources from './components/TrafficSources'

export const metadata: Metadata = { title: 'Mixed Widgets' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Mixed" subtitle="Widgets" />
      <div className="container-fluid">
        <div className="grid xl:grid-cols-5 md:grid-cols-2 grid-cols-1 mb-base gap-base">
          <Stat />
        </div>

        <div className="grid xl:grid-cols-3 grid-cols-1 mb-base gap-base">
          <TotalVisitors />
          <TotalSubscribers />
          <TopTrafficSources />
        </div>

        <div className="grid xl:grid-cols-3 grid-cols-1 mb-base gap-base">
          <SummaryAlt />
        </div>

        <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 mb-base gap-base">
          <TeamMember />
        </div>

        <div className="grid xl:grid-cols-3 grid-cols-1 gap-base mb-base">
          <Chat />
          <TrafficSources />
          <TopCountries />
        </div>

        <div className="grid xl:grid-cols-12 grid-cols-1 gap-base">
          <div className="xl:col-span-7">
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-base">
              <Channel />
            </div>
          </div>
          <div className="xl:col-span-5">
            <Search />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
