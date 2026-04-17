import PageBreadcrumb from '@/components/PageBreadcrumb'
import AjaxTable from './components/AjaxTable'
export const metadata = {
  title: 'Ajax DataTables',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Ajax" subtitle="DataTables" />

      <div className="grid grid-cols-1 gap-base">
        <AjaxTable />
      </div>
    </>
  )
}
export default Page
