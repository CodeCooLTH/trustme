import PageBreadcrumb from '@/components/PageBreadcrumb'
import PayRollTable from './components/PayRollTable'
export const metadata = {
  title: 'Payroll',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Payroll" subtitle="HRM" />

      <PayRollTable />
    </>
  )
}
export default Page
