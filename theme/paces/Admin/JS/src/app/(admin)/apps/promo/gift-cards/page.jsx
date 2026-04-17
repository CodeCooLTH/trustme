import PageBreadcrumb from '@/components/PageBreadcrumb'
import GiftCardTable from './components/GiftCardTable'
export const metadata = {
  title: 'Gift Cards',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Gift Cards" subtitle="Promo" />
      <GiftCardTable />
    </>
  )
}
export default Page
