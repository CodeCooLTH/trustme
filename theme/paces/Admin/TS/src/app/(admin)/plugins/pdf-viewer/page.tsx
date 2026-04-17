import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import PdfView from './components/PdfView'

export const metadata: Metadata = { title: 'Pdf Viewer' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="PDF Viewer" subtitle="Miscellaneous" />
      <div className="grid lg:grid-cols-1 gap-base">
        <PdfView />
      </div>
    </>
  )
}

export default Page
