import PageBreadcrumb from '@/components/PageBreadcrumb'
import FormCropper from './components/FormCropper'
export const metadata = {
  title: 'Cropper',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Cropper" subtitle="Form" />
      <FormCropper />
    </>
  )
}
export default Page
