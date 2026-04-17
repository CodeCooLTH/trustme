import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import IssueTrackerTable from './components/IssueTrackerTable'

export const metadata: Metadata = { title: 'Issue List' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Issue List" subtitle="Apps" />
      <IssueTrackerTable />
    </>
  )
}

export default Page
