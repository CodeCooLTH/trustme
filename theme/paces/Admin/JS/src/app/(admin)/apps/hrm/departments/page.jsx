import PageBreadcrumb from '@/components/PageBreadcrumb'
import DepartmentTable from './components/DepartmentTable'
export const metadata = {
  title: 'Departments',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Departments" subtitle="HRM" />

      <DepartmentTable />
    </>
  )
}
export default Page
