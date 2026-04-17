import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import Animations from './components/Animations'

export const metadata: Metadata = { title: 'Animation' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Animation" subtitle="Miscellaneous" />

      <Animations />
    </>
  )
}

export default Page
