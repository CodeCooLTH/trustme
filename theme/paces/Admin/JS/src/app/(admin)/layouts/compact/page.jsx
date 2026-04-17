import PageBreadcrumb from '@/components/PageBreadcrumb'
import LayoutInfo from '../LayoutInfo'
import LayoutSwitcher from '../LayoutSwitcher'
export const metadata = {
  title: 'Compact Layout',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Compact" subtitle="Layouts" />
      <LayoutSwitcher attribute="width" value="compact" />
      <div className="container-xl">
        <LayoutInfo option="width" value="compact" />
      </div>
    </>
  )
}
export default Page
