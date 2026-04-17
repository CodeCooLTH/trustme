import PageBreadcrumb from '@/components/PageBreadcrumb'
import Animations from './components/Animations'
export const metadata = {
  title: 'Animation',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Animation" subtitle="Miscellaneous" />

      <Animations />
    </>
  )
}
export default Page
