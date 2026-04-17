import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import ClientsTable from './components/ClientsTable'

export const metadata: Metadata = { title: 'Clients' }
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Clients" subtitle="Apps" />

      <ClientsTable />
    </>
  )
}

export default Page
