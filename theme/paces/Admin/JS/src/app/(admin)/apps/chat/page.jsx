import PageBreadcrumb from '@/components/PageBreadcrumb'
import ChatPage from './components/ChatPage'
export const metadata = {
  title: 'Chat',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Chat" subtitle="Apps" />
      <ChatPage />
    </>
  )
}
export default Page
