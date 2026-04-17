import PageBreadcrumb from '@/components/PageBreadcrumb'
import ClientsTable from './components/ClientsTable'
export const metadata = {
  title: 'Clients',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Clients" subtitle="Apps" />

      <ClientsTable />
    </>
  )
}
export default Page
