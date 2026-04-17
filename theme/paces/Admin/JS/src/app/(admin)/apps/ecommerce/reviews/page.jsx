import PageBreadcrumb from '@/components/PageBreadcrumb'
import ProductReviews from './components/ProductReviews'
export const metadata = {
  title: 'Reviews',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Reviews" subtitle="Ecommerce" />

      <ProductReviews />
    </>
  )
}
export default Page
