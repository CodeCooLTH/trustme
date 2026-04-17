import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import CategoryTable from './components/CategoryTable'

export const metadata: Metadata = { title: 'Expense Categories' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Expense Categories" subtitle="Finance" />

      <CategoryTable />
    </>
  )
}

export default Page
