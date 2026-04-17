import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import LeaFletMap from './components/LeaFletMap'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Leaflet' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Leaflet" subtitle="Maps" />
      <div className="grid xl:grid-cols-2 gap-base">
        <LeaFletMap />
      </div>
    </>
  )
}

export default Page
