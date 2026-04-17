import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import PermissionTable from './components/PermissionTable'

export const metadata: Metadata = { title: 'Permissions' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Permissions" subtitle="Users" />

      <PermissionTable />
    </>
  )
}

export default Page
