import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import DepartmentTable from './components/DepartmentTable'

export const metadata: Metadata = { title: 'Departments' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Departments" subtitle="HRM" />

      <DepartmentTable />
    </>
  )
}

export default Page
