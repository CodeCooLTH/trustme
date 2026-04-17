import PageBreadcrumb from '@/components/PageBreadcrumb'
import TourPage from './components/TourPage'
export const metadata = {
  title: 'tour',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Tour" subtitle="Plugins" />
      <TourPage />
    </>
  )
}
export default Page
