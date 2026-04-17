import PageBreadcrumb from '@/components/PageBreadcrumb'
import OutlookPage from './components/OutlookPage'
export const metadata = {
  title: 'Outlook View',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Outlook View" subtitle="Apps" />
      <OutlookPage />
    </>
  )
}
export default Page
