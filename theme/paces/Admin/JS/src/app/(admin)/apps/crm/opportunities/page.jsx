import PageBreadcrumb from '@/components/PageBreadcrumb'
import OpportunitiesTable from './components/OpportunitiesTable'
export const metadata = {
  title: 'CRM Opportunities',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Opportunities" subtitle="CRM" />

      <OpportunitiesTable />
    </>
  )
}
export default Page
