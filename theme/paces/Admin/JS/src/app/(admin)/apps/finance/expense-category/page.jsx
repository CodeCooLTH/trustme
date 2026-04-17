import PageBreadcrumb from '@/components/PageBreadcrumb'
import CategoryTable from './components/CategoryTable'
export const metadata = {
  title: 'Expense Categories',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Expense Categories" subtitle="Finance" />

      <CategoryTable />
    </>
  )
}
export default Page
