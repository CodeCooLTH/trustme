import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import Todos from './components/Todos'

export const metadata: Metadata = { title: 'Todo List' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Todo List" subtitle="Apps" />
      <Todos />
    </>
  )
}

export default Page
