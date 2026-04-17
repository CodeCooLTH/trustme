import PageBreadcrumb from '@/components/PageBreadcrumb'
import Example from './components/RowTable'
export const metadata = {
  title: 'Child Row Datatables',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Child Row" subtitle="DataTables" />
      <div className="grid grid-cols-1 gap-base">
        <Example />
      </div>
    </>
  )
}
export default Page
