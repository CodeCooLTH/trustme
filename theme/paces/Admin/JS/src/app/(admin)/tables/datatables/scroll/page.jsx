import PageBreadcrumb from '@/components/PageBreadcrumb'
import Table from './components/Table'
export const metadata = {
  title: 'Scroll Datatables',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Scroll" subtitle="DataTables" />

      <div className="grid grid-cols-1 gap-base">
        <Table />
      </div>
    </>
  )
}
export default Page
