import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import EmailSidebar from '../components/EmailSidebar'
import Emails from './components/Emails'

export const metadata: Metadata = { title: 'Inbox' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Email" subtitle="Apps" />

      <div className="lg:flex lg:gap-1.25 lg:h-[calc(100vh-200px)]">
        <EmailSidebar className="lg:w-56.5" />
        <Emails />
      </div>
    </>
  )
}

export default Page
