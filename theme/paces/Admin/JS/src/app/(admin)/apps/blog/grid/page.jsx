import PageBreadcrumb from '@/components/PageBreadcrumb'
import Blog from './components/Blog'
export const metadata = {
  title: 'Blog Grid',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb subtitle="Blog" title="Blog Grid" />

      <Blog />
    </>
  )
}
export default Page
