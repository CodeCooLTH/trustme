import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import TourPage from './components/TourPage'

export const metadata: Metadata = { title: 'tour' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Tour" subtitle="Plugins" />
      <TourPage />
    </>
  )
}

export default Page
