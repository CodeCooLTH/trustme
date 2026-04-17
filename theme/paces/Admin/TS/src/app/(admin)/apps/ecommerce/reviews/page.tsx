import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import ProductReviews from './components/ProductReviews'

export const metadata: Metadata = { title: 'Reviews' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Reviews" subtitle="Ecommerce" />

      <ProductReviews />
    </>
  )
}

export default Page
