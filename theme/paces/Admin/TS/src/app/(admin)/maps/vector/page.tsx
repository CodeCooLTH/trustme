import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import ExamplesCard from './components/VectorMaps'

export const metadata: Metadata = { title: 'Vector Maps' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Vector" subtitle="Maps" />

      <div className="grid xl:grid-cols-2 gap-base">
        <ExamplesCard />
      </div>
    </>
  )
}

export default Page
