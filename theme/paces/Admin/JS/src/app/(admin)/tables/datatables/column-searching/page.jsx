import PageBreadcrumb from '@/components/PageBreadcrumb'
import Example from './components/ColumnTable'
export const metadata = {
  title: 'Column Searching Datatables',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Column Searching" subtitle="DataTables" />

      <div className="grid grid-cols-1 gap-base">
        <Example />
      </div>
    </>
  )
}
export default Page
