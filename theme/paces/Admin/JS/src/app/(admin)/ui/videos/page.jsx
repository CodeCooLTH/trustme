import PageBreadcrumb from '@/components/PageBreadcrumb'
export const metadata = {
  title: 'Videos',
}
const Page = () => {
  return (
    <>
      <div className="container-fluid">
        <PageBreadcrumb title="Videos" subtitle="UI" />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-base">
          <div className="flex flex-col gap-base">
            <div className="card">
              <ResponsiveEmbedVideo219 />
            </div>
            <div className="card">
              <ResponsiveEmbedVideo11 />
            </div>
          </div>
          <div className="flex flex-col gap-base">
            <div className="card">
              <ResponsiveEmbedVideo169 />
            </div>
            <div className="card">
              <ResponsiveEmbedVideo43 />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Page
const ResponsiveEmbedVideo219 = () => {
  return (
    <>
      <div className="card-header">
        <h5 className="card-title">Responsive embed video 21:9</h5>
      </div>
      <div className="card-body">
        <div className="relative aspect-21/9 w-full">
          <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" className="h-full w-full" />
        </div>
      </div>
    </>
  )
}
const ResponsiveEmbedVideo11 = () => {
  return (
    <>
      <div className="card-header">
        <h5 className="card-title">Responsive embed video 1:1</h5>
      </div>
      <div className="card-body">
        <div className="relative aspect-square w-full">
          <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" className="h-full w-full" />
        </div>
      </div>
    </>
  )
}
const ResponsiveEmbedVideo169 = () => {
  return (
    <>
      <div className="card-header">
        <h5 className="card-title">Responsive embed video 16:9</h5>
      </div>
      <div className="card-body">
        <div className="relative aspect-video w-full">
          <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" className="h-full w-full" />
        </div>
      </div>
    </>
  )
}
const ResponsiveEmbedVideo43 = () => {
  return (
    <>
      <div className="card-header">
        <h5 className="card-title">Responsive embed video 4:3</h5>
      </div>
      <div className="card-body">
        <div className="relative aspect-4/3 w-full">
          <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" className="h-full w-full" />
        </div>
      </div>
    </>
  )
}
