import PageBreadcrumb from '@/components/PageBreadcrumb'
import type { Metadata } from 'next'
import LayoutInfo from '../LayoutInfo'
import LayoutSwitcher from '../LayoutSwitcher'

export const metadata: Metadata = { title: 'Compact Layout' }

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
