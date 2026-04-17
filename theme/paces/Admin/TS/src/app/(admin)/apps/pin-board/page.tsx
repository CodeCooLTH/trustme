import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import PinboardPage from './components/PinboardPage'

export const metadata: Metadata = { title: 'Pin Board' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Pin Board" subtitle="Apps" />
      <PinboardPage />
    </>
  )
}

export default Page
