import PageBreadcrumb from '@/components/PageBreadcrumb'
import CalendarPage from './components/CalendarPage'
export const metadata = {
  title: 'Calendar',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Calendar" subtitle="Apps" />
      <CalendarPage />
    </>
  )
}
export default Page
