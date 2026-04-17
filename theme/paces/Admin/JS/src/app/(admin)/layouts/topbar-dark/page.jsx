import PageBreadcrumb from '@/components/PageBreadcrumb'
import LayoutInfo from '../LayoutInfo'
import LayoutSwitcher from '../LayoutSwitcher'
export const metadata = {
  title: 'Dark Topbar',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Dark Topbar" subtitle="Layouts" />
      <LayoutSwitcher attribute="topbarColor" value="dark" />
      <LayoutInfo option="topbarColor" value="dark" />
    </>
  )
}
export default Page
