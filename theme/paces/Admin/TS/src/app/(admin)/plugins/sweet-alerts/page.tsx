import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import SweetAlerts from './components/SweetAlerts'

export const metadata: Metadata = { title: 'Sweet Alerts' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="SweetAlert2" subtitle="Plugins" />
      <SweetAlerts />
    </>
  )
}

export default Page
