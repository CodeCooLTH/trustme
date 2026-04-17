import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import Feeds from './components/Feeds'
import Sidebar from './components/Sidebar'
import SocialProfile from './components/SocialProfile'

export const metadata: Metadata = { title: 'Social Feed' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Social Feed" subtitle="Apps" />
      <div className="lg:gap-base grid grid-cols-1 lg:grid-cols-4">
        <div>
          <SocialProfile />
        </div>

        <div className="mb-base lg:col-span-2 lg:mb-0">
          <Feeds />
        </div>

        <div>
          <Sidebar />
        </div>
      </div>
    </>
  )
}

export default Page
