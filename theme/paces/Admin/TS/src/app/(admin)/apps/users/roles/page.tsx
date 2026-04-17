import Icon from '@/components/wrappers/Icon'
import { Metadata } from 'next'
import Link from 'next/link'
import MemberRoleCard from './components/MemberRoleCard'
import UsersTable from './components/UsersTable'
import { memberRoleData } from './components/data'

export const metadata: Metadata = { title: 'User Roles' }

const Page = () => {
  return (
    <>
      <div className="mt-5"></div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="page-main-title mb-1.25">Manage Roles</h4>
          <p className="text-default-400">Manage roles for smoother operations and secure access.</p>
        </div>
        <div>
          <Link href="" className="btn bg-success text-white hover:bg-success-hover" aria-haspopup="dialog" aria-expanded="false" aria-inputs="addRoleModal" data-hs-overlay="#addRoleModal">
            <Icon icon="plus" />
            Add New Role
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-base mb-base">
        {memberRoleData.map((member, idx) => (
          <MemberRoleCard key={idx} member={member} />
        ))}
      </div>

      <UsersTable />
    </>
  )
}

export default Page
