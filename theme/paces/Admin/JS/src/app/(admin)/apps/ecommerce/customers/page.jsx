import PageBreadcrumb from '@/components/PageBreadcrumb'
import CustomerTable from './components/CustomerTable'
export const metadata = {
  title: 'Customers',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Customers" subtitle="Ecommerce" />
      <CustomerTable />
    </>
  )
}
export default Page
