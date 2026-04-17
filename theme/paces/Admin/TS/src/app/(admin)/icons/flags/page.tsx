import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import Flags from './components/Flags'

export const metadata: Metadata = { title: 'Flags' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Flags" subtitle="Icons" />
      <div className="container-fluid">
        <Flags />
      </div>
    </>
  )
}

export default Page
