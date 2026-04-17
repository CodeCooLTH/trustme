import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import BasicTable from './components/BasicTable'

export const metadata: Metadata = { title: 'Basic Datatables' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Basic" subtitle="DataTables" />

      <div className="grid grid-cols-1 gap-base">
        <BasicTable />
      </div>
    </>
  )
}

export default Page
