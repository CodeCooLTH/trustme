import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import JsTable from './components/JsTable'

export const metadata: Metadata = { title: 'Javascript Source Datatables' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Javascript Source" subtitle="DataTables" />
      <div className="grid grid-cols-1 gap-base">
        <JsTable />
      </div>
    </>
  )
}

export default Page
