import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import ProductStockTable from './components/ProductStockTable'

export const metadata: Metadata = { title: 'Product Stocks' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Stocks" subtitle="Ecommerce" />

      <ProductStockTable />
    </>
  )
}

export default Page
