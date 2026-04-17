import PageBreadcrumb from '@/components/PageBreadcrumb'
import Todos from './components/Todos'
export const metadata = {
  title: 'Todo List',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Todo List" subtitle="Apps" />
      <Todos />
    </>
  )
}
export default Page
