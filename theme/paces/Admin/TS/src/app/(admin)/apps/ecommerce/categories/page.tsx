import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import CategoryTable from './components/CategoryTable'

export const metadata: Metadata = { title: 'Categories' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Categories" subtitle="Ecommerce" />
      <CategoryTable />
    </>
  )
}

export default Page
