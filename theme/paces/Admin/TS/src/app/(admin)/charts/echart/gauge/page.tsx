import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import Gauges from './components/Gauges'

export const metadata: Metadata = { title: 'Gauge EChart' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Gauge EChart" subtitle="Charts" />
      <div className="container-fluid">
        <div className="grid xl:grid-cols-2 gap-base">
          <Gauges />
        </div>
      </div>
    </>
  )
}

export default Page
