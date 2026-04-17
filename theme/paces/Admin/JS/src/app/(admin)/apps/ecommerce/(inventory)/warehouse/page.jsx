import PageBreadcrumb from '@/components/PageBreadcrumb'
import WarehouseTable from './components/WarehouseTable'
export const metadata = {
  title: 'Warehouse',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Warehouse" subtitle="Ecommerce" />
      <WarehouseTable />
    </>
  )
}
export default Page
