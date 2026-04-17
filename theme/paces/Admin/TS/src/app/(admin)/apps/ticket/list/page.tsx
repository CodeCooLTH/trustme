import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import TicketStat from './components/TicketStat'
import TicketsTable from './components/TicketsTable'
import { ticketStatData } from './components/data'

export const metadata: Metadata = { title: 'Tickets' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Tickets" subtitle="Support" />

      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-2.5 mb-2.5">
        {ticketStatData.map((item, idx) => (
          <TicketStat key={idx} list={item} />
        ))}
      </div>

      <TicketsTable />
    </>
  )
}

export default Page
