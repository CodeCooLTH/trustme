import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import PayRollTable from './components/PayRollTable'

export const metadata: Metadata = { title: 'Payroll' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Payroll" subtitle="HRM" />

      <PayRollTable />
    </>
  )
}

export default Page
