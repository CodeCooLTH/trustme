import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import OutlookPage from './components/OutlookPage'

export const metadata: Metadata = { title: 'Outlook View' }
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Outlook View" subtitle="Apps" />
      <OutlookPage />
    </>
  )
}

export default Page
