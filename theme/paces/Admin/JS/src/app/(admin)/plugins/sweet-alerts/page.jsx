import PageBreadcrumb from '@/components/PageBreadcrumb'
import SweetAlerts from './components/SweetAlerts'
export const metadata = {
  title: 'Sweet Alerts',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="SweetAlert2" subtitle="Plugins" />
      <SweetAlerts />
    </>
  )
}
export default Page
