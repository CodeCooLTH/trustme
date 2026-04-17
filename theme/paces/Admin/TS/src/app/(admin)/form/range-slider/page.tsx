import PageBreadcrumb from '@/components/PageBreadcrumb'
import Sliders from './components/Sliders'

export const metadata = { title: 'Range Slider' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Range Slider" subtitle="Forms" />
      <Sliders />
    </>
  )
}

export default Page
