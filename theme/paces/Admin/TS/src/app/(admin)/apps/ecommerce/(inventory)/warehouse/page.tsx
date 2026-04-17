import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import WarehouseTable from './components/WarehouseTable'

export const metadata: Metadata = { title: 'Warehouse' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Warehouse" subtitle="Ecommerce" />
      <WarehouseTable />
    </>
  )
}

export default Page
