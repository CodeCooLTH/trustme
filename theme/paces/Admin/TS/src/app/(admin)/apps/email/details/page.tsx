import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import EmailSidebar from '../components/EmailSidebar'
import EmailDetail from './components/EmailDetail'

export const metadata: Metadata = { title: 'Email Details' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Email Details" subtitle="Apps" />

      <div className="lg:flex lg:gap-1.25 lg:h-[calc(100vh-200px)]">
        <EmailSidebar className="lg:w-56.5 w-full" />
        <EmailDetail />
      </div>
    </>
  )
}

export default Page
