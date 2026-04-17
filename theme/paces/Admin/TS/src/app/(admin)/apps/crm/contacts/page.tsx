import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { cn, generateInitials } from '@/utils/helpers'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ContactType, contactData } from './data'

export const metadata: Metadata = { title: 'CRM Contacts' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Contacts" subtitle="CRM" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-base mb-base">
        {contactData.map((item, idx) => (
          <ContactCard contact={item} key={idx} />
        ))}
      </div>
      <nav className="mb-4 flex items-center justify-center gap-1.5" aria-label="Pagination">
        <button type="button" className="btn btn-icon bg-card border-default-300 hover:bg-default-50 hover:text-primary rounded-full" aria-label="Previous">
          <span>«</span>
        </button>
        <button type="button" className="btn btn-icon bg-primary rounded-full text-white">
          1
        </button>
        <button type="button" className="btn btn-icon bg-card hover:bg-default-50 border-default-300 hover:text-primary rounded-full">
          2
        </button>
        <button type="button" className="btn btn-icon bg-card hover:bg-default-50 border-default-300 hover:text-primary rounded-full">
          3
        </button>
        <button type="button" className="btn btn-icon bg-card hover:bg-default-50 border-default-300 hover:text-primary rounded-full">
          4
        </button>
        <button type="button" className="btn btn-icon bg-card hover:bg-default-50 border-default-300 hover:text-primary rounded-full">
          5
        </button>
        <button type="button" className="btn btn-icon bg-card border-default-300 hover:bg-default-50 hover:text-primary rounded-full" aria-label="Next">
          <span>»</span>
        </button>
      </nav>
    </>
  )
}

export default Page

const ContactCard = ({ contact }: { contact: ContactType }) => {
  const { user, label, categories, stats } = contact
  return (
    <div className="card">
      <div className="card-body">
        <div className="flex gap-base">
          {user.image ? <Image src={user.image} alt="avatar" className="rounded-full size-16" /> : <div className="bg-primary flex size-10 items-center justify-center rounded-full text-xl font-semibold text-white md:size-16">{generateInitials(user.name)}</div>}

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h5>
                <a href="#!" className="hover:text-primary font-semibold">
                  {user.name}
                </a>
              </h5>
              <span className={cn('badge badge-label text-white', label.className)}>{label.text}</span>
            </div>
            <p className="text-default-400 mb-base text-xs">{user.role}</p>
            <div className="mb-2.5">
              <div className="mb-1.5 flex items-center gap-2.5">
                <span className="bg-light flex size-6 items-center justify-center rounded-full">
                  <Icon icon="mail" />
                </span>
                <p>
                  <Link href="" className="hover:text-primary">
                    {user.email}
                  </Link>
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="bg-light flex size-6 items-center justify-center rounded-full">
                  <Icon icon="phone" />
                </span>
                <p>
                  <Link href="" className="hover:text-primary">
                    {user.phone}
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.25">
              {categories.map((item, idx) => (
                <span className={cn('badge', item.className)} key={idx}>
                  {item.tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer border-dashed bg-light/15">
        {stats.map((item, idx) => (
          <div className="text-center" key={idx}>
            <h5>
              {item.prefix ?? ''}
              {item.value}
              {item.suffix ?? ''}
            </h5>
            <span className="text-default-400">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
