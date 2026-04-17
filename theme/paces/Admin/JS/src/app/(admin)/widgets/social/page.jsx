import PageBreadcrumb from '@/components/PageBreadcrumb'
import FeedColumn from './components/FeedColumn'
import SocialFeed from './components/SocialFeed'
export const metadata = {
  title: 'Social Widgets',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Social" subtitle="Widgets" />
      <div className="container">
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-base">
          <div className="flex flex-col gap-base">
            <SocialFeed />
          </div>
          <div className="flex flex-col gap-base">
            <FeedColumn />
          </div>
        </div>
      </div>
    </>
  )
}
export default Page
