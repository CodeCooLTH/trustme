import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import SellerTable from './components/SellerTable'

export const metadata: Metadata = { title: 'Sellers' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Sellers" subtitle="Ecommerce" />

      <SellerTable />
    </>
  )
}

export default Page
