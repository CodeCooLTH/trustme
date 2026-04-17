import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import GoogleMap from './components/GoogleMap'

export const metadata: Metadata = { title: 'Google' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Google" subtitle="Maps" />
      <div className="grid grid-cols-1 gap-base">
        <div className="grid xl:grid-cols-2 gap-base">
          <GoogleMap />
        </div>
      </div>
    </>
  )
}

export default Page
