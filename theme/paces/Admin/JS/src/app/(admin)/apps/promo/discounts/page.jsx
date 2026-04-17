import PageBreadcrumb from '@/components/PageBreadcrumb'
import DiscountTable from './components/DiscountTable'
export const metadata = {
  title: 'Discounts',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Discounts" subtitle="Promo" />
      <DiscountTable />
    </>
  )
}
export default Page
