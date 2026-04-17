import PageBreadcrumb from '@/components/PageBreadcrumb'
import ChatCard from './components/ChatCard'
import TicketDetails from './components/TicketDetails'
export const metadata = {
  title: 'Ticket Details',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Tickets Details" subtitle="Support" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-base">
        <TicketDetails />
        <ChatCard />
      </div>
    </>
  )
}
export default Page
