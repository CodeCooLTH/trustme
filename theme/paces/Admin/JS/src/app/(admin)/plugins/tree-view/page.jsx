import PageBreadcrumb from '@/components/PageBreadcrumb'
import Treeview from './components/Treeview'
export const metadata = {
  title: 'TreeView',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Treeview" subtitle="Plugins" />

      <Treeview />
    </>
  )
}
export default Page
