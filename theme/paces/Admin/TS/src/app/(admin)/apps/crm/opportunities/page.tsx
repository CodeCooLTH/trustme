import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import OpportunitiesTable from './components/OpportunitiesTable'

export const metadata: Metadata = { title: 'CRM Opportunities' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Opportunities" subtitle="CRM" />

      <OpportunitiesTable />
    </>
  )
}

export default Page
