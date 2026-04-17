import PageBreadcrumb from '@/components/PageBreadcrumb'
import SnowEditor from './components/SnowEditor'
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Text Editors" subtitle="Form" />
      <div className="container-fluid">
        <div className="grid grid-cols-1 gap-base">
          <SnowEditor />
        </div>
      </div>
    </>
  )
}
export default Page
