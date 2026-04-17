import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import Treeview from './components/Treeview'

export const metadata: Metadata = { title: 'TreeView' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Treeview" subtitle="Plugins" />

      <Treeview />
    </>
  )
}

export default Page
