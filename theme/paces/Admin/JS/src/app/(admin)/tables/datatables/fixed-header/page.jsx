import PageBreadcrumb from '@/components/PageBreadcrumb'
import FixHeader from './components/FixHeader'
export const metadata = {
  title: 'Fixed Header Datatables',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Fixed Header" subtitle="DataTables" />
      <div className="grid grid-cols-1 gap-base">
        <FixHeader />
      </div>
    </>
  )
}
export default Page
