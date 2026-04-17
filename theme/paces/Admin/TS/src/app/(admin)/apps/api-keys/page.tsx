import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import ApiKeyTable from './components/ApiKeyTable'

export const metadata: Metadata = { title: 'Api Keys' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="API Keys" subtitle="Apps" />
      <ApiKeyTable />
    </>
  )
}

export default Page
