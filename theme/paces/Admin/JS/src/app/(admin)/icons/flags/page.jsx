import PageBreadcrumb from '@/components/PageBreadcrumb'
import Flags from './components/Flags'
export const metadata = {
  title: 'Flags',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Flags" subtitle="Icons" />
      <div className="container-fluid">
        <Flags />
      </div>
    </>
  )
}
export default Page
