import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import KanbanPage from './components/KanbanPage'

export const metadata: Metadata = { title: 'Kanban Board' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Kanban Board" subtitle="Apps" />

      <KanbanPage />
    </>
  )
}

export default Page
