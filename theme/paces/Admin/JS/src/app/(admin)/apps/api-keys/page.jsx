import PageBreadcrumb from '@/components/PageBreadcrumb'
import ApiKeyTable from './components/ApiKeyTable'
export const metadata = {
  title: 'Api Keys',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="API Keys" subtitle="Apps" />
      <ApiKeyTable />
    </>
  )
}
export default Page
