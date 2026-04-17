import PageBreadcrumb from '@/components/PageBreadcrumb'
import KanbanPage from './components/KanbanPage'
export const metadata = {
  title: 'Kanban Board',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Kanban Board" subtitle="Apps" />

      <KanbanPage />
    </>
  )
}
export default Page
