import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import PurchaseOrderTable from './components/PurchaseOrderTable'

export const metadata: Metadata = { title: 'Purchased Orders' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Purchased Orders" subtitle="Ecommerce" />

      <PurchaseOrderTable />
    </>
  )
}

export default Page
