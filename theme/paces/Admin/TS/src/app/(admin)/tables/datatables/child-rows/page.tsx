import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import Example from './components/RowTable'

export const metadata: Metadata = { title: 'Child Row Datatables' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Child Row" subtitle="DataTables" />
      <div className="grid grid-cols-1 gap-base">
        <Example />
      </div>
    </>
  )
}

export default Page
