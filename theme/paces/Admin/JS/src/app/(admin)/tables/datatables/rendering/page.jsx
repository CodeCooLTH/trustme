import PageBreadcrumb from '@/components/PageBreadcrumb'
import RenderingTable from './components/RenderingTable'
export const metadata = {
  title: 'Data Rendering Datatables',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Data Rendering" subtitle="DataTables" />
      <div className="grid grid-cols-1 gap-base">
        <RenderingTable />
      </div>
    </>
  )
}
export default Page
