import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import FormCropper from './components/FormCropper'

export const metadata: Metadata = { title: 'Cropper' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Cropper" subtitle="Form" />
      <FormCropper />
    </>
  )
}

export default Page
