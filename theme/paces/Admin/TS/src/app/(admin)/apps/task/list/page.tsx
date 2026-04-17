import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import Tasks from './components/Tasks'

export const metadata: Metadata = { title: 'Tasks' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Tasks" subtitle="Apps" />

      <Tasks />
    </>
  )
}

export default Page
