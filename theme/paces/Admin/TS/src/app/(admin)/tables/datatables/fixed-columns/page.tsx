import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import Table from './components/Table'

export const metadata: Metadata = { title: 'Fixed Columns' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Fixed Columns" subtitle="Datatables" />
      <div className="grid grid-cols-1 gap-base">
        <Table />
      </div>
    </>
  )
}

export default Page
