import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import InvoiceList from './components/InvoiceList'

export const metadata: Metadata = { title: 'Invoices' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Invoice List" subtitle="Invoices" />

      <InvoiceList />
    </>
  )
}

export default Page
