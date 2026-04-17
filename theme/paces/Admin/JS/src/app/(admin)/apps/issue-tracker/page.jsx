import PageBreadcrumb from '@/components/PageBreadcrumb'
import IssueTrackerTable from './components/IssueTrackerTable'
export const metadata = {
  title: 'Issue List',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Issue List" subtitle="Apps" />
      <IssueTrackerTable />
    </>
  )
}
export default Page
