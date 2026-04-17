import PageBreadcrumb from '@/components/PageBreadcrumb'
import CategoryTable from './components/CategoryTable'
export const metadata = {
  title: 'Categories',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Categories" subtitle="Ecommerce" />
      <CategoryTable />
    </>
  )
}
export default Page
