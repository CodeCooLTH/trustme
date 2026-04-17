import PageBreadcrumb from '@/components/PageBreadcrumb'
import ProductStockTable from './components/ProductStockTable'
export const metadata = {
  title: 'Product Stocks',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Stocks" subtitle="Ecommerce" />

      <ProductStockTable />
    </>
  )
}
export default Page
