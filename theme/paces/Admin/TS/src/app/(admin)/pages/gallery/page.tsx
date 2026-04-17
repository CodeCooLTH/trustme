import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import Gallery from './components/Gallery'

export const metadata: Metadata = { title: 'Gallery' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Gallery" subtitle="Pages" />
      <div className="container-fluid">
        <Gallery />
      </div>
    </>
  )
}

export default Page
