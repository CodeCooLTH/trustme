import PageBreadcrumb from '@/components/PageBreadcrumb'
import Blog from './components/Blog'
import PostSidebar from './components/PostSidebar'
export const metadata = {
  title: 'Forum Post',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb subtitle="Apps" title="Forum Post" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-base">
        <Blog />
        <PostSidebar />
      </div>
    </>
  )
}
export default Page
