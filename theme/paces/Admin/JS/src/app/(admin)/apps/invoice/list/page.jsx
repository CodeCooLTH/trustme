import PageBreadcrumb from '@/components/PageBreadcrumb'
import InvoiceList from './components/InvoiceList'
export const metadata = {
  title: 'Invoices',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Invoice List" subtitle="Invoices" />

      <InvoiceList />
    </>
  )
}
export default Page
