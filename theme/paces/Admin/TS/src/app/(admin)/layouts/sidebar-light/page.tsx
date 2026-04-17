import PageBreadcrumb from '@/components/PageBreadcrumb'
import type { Metadata } from 'next'
import LayoutInfo from '../LayoutInfo'
import LayoutSwitcher from '../LayoutSwitcher'

export const metadata: Metadata = { title: 'Light Menu' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Light Menu" subtitle="Layouts" />
      <LayoutSwitcher attribute="sidenavColor" value="light" />
      <LayoutInfo option="sidenavColor" value="light" />
    </>
  )
}

export default Page
