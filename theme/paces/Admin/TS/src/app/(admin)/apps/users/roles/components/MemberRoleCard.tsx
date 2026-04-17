import authImg from '@/assets/images/auth-card-bg.svg'
import Icon from '@/components/wrappers/Icon'
import Image from 'next/image'
import Link from 'next/link'

import { MemberRoleType } from './data'

const MemberRoleCard = ({ member }: { member: MemberRoleType }) => {
  const { icon, title, users, features, description, time } = member
  return (
    <div className="card">
      <div className="absolute end-0 top-0 size-45">
        <Image src={authImg} alt="auth-card-bg" />
      </div>
      <div className="card-body">
        <div className="mb-7.5 flex items-start">
          <div>
            <div className="bg-primary/15 text-primary flex size-12 items-center justify-center rounded-md">
              <Icon icon={icon} className="text-2xl" />
            </div>
          </div>

          <div className="ms-6">
            <h5 className="mb-1.25 text-sm">{title}</h5>
            <p className="text-default-400">{description}</p>
          </div>

          <div className="relative ms-auto">
            <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
              <button type="button" className="hs-dropdown-toggle text-lg text-default-400" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                <Icon icon="dots-vertical" className="text-xl" />
              </button>

              <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical">
                <div className="space-y-0.5">
                  <Link className="dropdown-item" href="">
                    <Icon icon="eye" />
                    View
                  </Link>

                  <Link className="dropdown-item" href="">
                    <Icon icon="edit" />
                    Edit
                  </Link>

                  <Link className="dropdown-item text-danger" href="">
                    <Icon icon="trash" />
                    Remove
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className="mb-5 flex flex-col gap-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <Icon icon="check" className="text-success text-base" />
              {feature}
            </li>
          ))}
        </ul>

        <p className="text-default-400 mb-3 text-sm">Total {users.length} users</p>

        <div className="mb-5 flex items-center -space-x-2">
          {users.map((user, idx) => (
            <Image key={idx} src={user.image} alt="" className="transitio-all size-8 rounded-full duration-200 hover:-translate-y-1" />
          ))}
        </div>

        <div className="flex justify-between">
          <span className="text-default-400 flex items-center gap-1.5 text-xs">
            <Icon icon="clock" />
            Updated {time}
          </span>

          <div>
            <Link href="/apps/users/role-details" className="btn btn-sm border-primary text-primary hover:bg-primary rounded-full border hover:text-white">
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberRoleCard
