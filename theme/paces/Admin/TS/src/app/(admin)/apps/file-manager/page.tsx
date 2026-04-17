import PageBreadcrumb from '@/components/PageBreadcrumb'
import type { Metadata } from 'next'
import FilesTable from './components/FilesTable'
import Sidebar from './components/Sidebar'

export const metadata: Metadata = { title: 'File Manager' }
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="File Manager" subtitle="Apps" />
      <div className="flex lg:gap-1.25 h-[calc(100vh-200px)]">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <FilesTable />
        </div>
      </div>
    </>
  )
}

export default Page
