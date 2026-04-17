import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import Clipboard from './components/Clipboard'

export const metadata: Metadata = { title: 'Clipboard' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Clipboard" subtitle="Plugins" />
      <div className="grid xl:grid-cols-1 gap-base">
        <Clipboard />
      </div>
    </>
  )
}

export default Page
