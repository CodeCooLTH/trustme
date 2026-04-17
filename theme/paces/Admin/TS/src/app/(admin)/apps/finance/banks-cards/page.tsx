import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import BankAccount from './components/BankAccount'
import BankCard from './components/BankCard'

export const metadata: Metadata = { title: 'Banks & Cards' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Banks & Cards" subtitle="Finance" />
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <BankAccount />

            <BankCard />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
