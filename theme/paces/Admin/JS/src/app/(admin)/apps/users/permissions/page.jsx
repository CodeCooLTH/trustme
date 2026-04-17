import PageBreadcrumb from '@/components/PageBreadcrumb'
import PermissionTable from './components/PermissionTable'
export const metadata = {
  title: 'Permissions',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Permissions" subtitle="Users" />

      <PermissionTable />
    </>
  )
}
export default Page
