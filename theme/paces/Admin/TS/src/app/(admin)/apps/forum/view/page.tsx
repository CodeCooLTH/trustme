import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import Blog from './components/Blog'
import ViewSidebar from './components/ViewSidebar'

export const metadata: Metadata = { title: 'Forum View' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Forum" subtitle="Apps" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-base">
        <Blog />
        <ViewSidebar />
      </div>
    </>
  )
}

export default Page
