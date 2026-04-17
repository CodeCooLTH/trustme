import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import FixHeader from './components/FixHeader'

export const metadata: Metadata = { title: 'Fixed Header Datatables' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Fixed Header" subtitle="DataTables" />
      <div className="grid grid-cols-1 gap-base">
        <FixHeader />
      </div>
    </>
  )
}

export default Page
