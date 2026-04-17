import PageBreadcrumb from '@/components/PageBreadcrumb'
import AttributeTable from './components/AttributeTable'
export const metadata = {
  title: 'Manage Attributes',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Manage Attributes" subtitle="Ecommerce" />
      <AttributeTable />
    </>
  )
}
export default Page
