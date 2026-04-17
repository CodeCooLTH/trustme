import PageBreadcrumb from '@/components/PageBreadcrumb'
import PurchaseOrderTable from './components/PurchaseOrderTable'
export const metadata = {
  title: 'Purchased Orders',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Purchased Orders" subtitle="Ecommerce" />

      <PurchaseOrderTable />
    </>
  )
}
export default Page
