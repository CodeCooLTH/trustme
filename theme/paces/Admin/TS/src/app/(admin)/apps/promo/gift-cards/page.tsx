import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import GiftCardTable from './components/GiftCardTable'

export const metadata: Metadata = { title: 'Gift Cards' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Gift Cards" subtitle="Promo" />
      <GiftCardTable />
    </>
  )
}

export default Page
