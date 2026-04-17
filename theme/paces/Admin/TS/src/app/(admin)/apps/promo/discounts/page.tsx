import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import DiscountTable from './components/DiscountTable'

export const metadata: Metadata = { title: 'Discounts' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Discounts" subtitle="Promo" />
      <DiscountTable />
    </>
  )
}

export default Page
