import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import Blog from './components/Blog'

export const metadata: Metadata = { title: 'Blog Grid' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb subtitle="Blog" title="Blog Grid" />

      <Blog />
    </>
  )
}

export default Page
