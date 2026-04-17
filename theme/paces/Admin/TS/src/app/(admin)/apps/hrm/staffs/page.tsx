import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import StaffTable from './components/StaffTable'

export const metadata: Metadata = { title: 'Staffs List' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Staffs" subtitle="HRM" />

      <StaffTable />
    </>
  )
}

export default Page
