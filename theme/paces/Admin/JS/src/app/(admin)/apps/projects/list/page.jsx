import PageBreadcrumb from '@/components/PageBreadcrumb'
import ProjectsList from './components/ProjectsList'
export const metadata = {
  title: 'Projects List',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Projects List" subtitle="Apps" />
      <ProjectsList />
    </>
  )
}
export default Page
