import PageBreadcrumb from '@/components/PageBreadcrumb'
import MasonryBlogs from './components/MasonryBlogs'

export const metadata = { title: 'Masonry' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Masonry" subtitle="Plugins" />

      <MasonryBlogs />
    </>
  )
}

export default Page
