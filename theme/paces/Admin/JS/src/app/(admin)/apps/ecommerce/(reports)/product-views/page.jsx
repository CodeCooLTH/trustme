import PageBreadcrumb from '@/components/PageBreadcrumb'
import ProductViewsTable from './components/ProductViewsTable'
export const metadata = {
  title: 'Product Views',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Product Views" subtitle="Ecommerce" />

      <ProductViewsTable />
    </>
  )
}
export default Page
