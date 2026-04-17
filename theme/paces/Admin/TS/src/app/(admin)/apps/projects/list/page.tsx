import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import ProjectsList from './components/ProjectsList'

export const metadata: Metadata = { title: 'Projects List' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Projects List" subtitle="Apps" />
      <ProjectsList />
    </>
  )
}

export default Page
