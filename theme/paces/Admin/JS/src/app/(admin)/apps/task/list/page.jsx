import PageBreadcrumb from '@/components/PageBreadcrumb'
import Tasks from './components/Tasks'
export const metadata = {
  title: 'Tasks',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Tasks" subtitle="Apps" />

      <Tasks />
    </>
  )
}
export default Page
