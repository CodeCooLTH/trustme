import PageBreadcrumb from '@/components/PageBreadcrumb'
import SellerTable from './components/SellerTable'
export const metadata = {
  title: 'Sellers',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Sellers" subtitle="Ecommerce" />

      <SellerTable />
    </>
  )
}
export default Page
