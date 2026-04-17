import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import Image from 'next/image'
import Link from 'next/link'
import { contactData } from './data'
export const metadata = {
  title: 'Contacts',
}
const page = () => {
  return (
    <>
      <PageBreadcrumb title="Contacts" subtitle="Apps" />
      <div className="card mb-base">
        <div className="card-body">
          <div className="grid lg:grid-cols-3 gap-base">
            <div className="col-span-1">
              <div className="input-icon-group">
                <Icon icon="search" className="input-icon" />
                <input type="text" className="form-input" placeholder="Search contact name..." />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-semibold me-3">Filter By:</span>

                <div className="input-icon-group">
                  <Icon icon="user-check" className="input-icon" />
                  <select className="form-select">
                    <option>Designation</option>
                    <option value="Backend Engineer">Backend Engineer</option>
                    <option value="Content Strategist">Content Strategist</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Data Scientist">Data Scientist</option>
                  </select>
                </div>

                <div className="input-icon-group">
                  <Icon icon="map-pin" className="input-icon" />
                  <select className="form-select">
                    <option>Location</option>
                    <option value="Canada">Canada</option>
                    <option value="Italy">Italy</option>
                    <option value="Japan">Japan</option>
                    <option value="Egypt">Egypt</option>
                  </select>
                </div>

                <div className="input-icon-group">
                  <Icon icon="stack-2" className="input-icon" />
                  <select className="form-select">
                    <option>Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Development">Development</option>
                    <option value="Data">Data</option>
                  </select>
                </div>

                <button type="submit" className="btn bg-secondary text-white hover:bg-secondary-hover">
                  Apply
                </button>

                <div className="ms-auto">
                  <nav className="flex items-center gap-x-1" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
                    <button type="button" className="hs-tab-active:bg-primary hs-tab-active:text-white bg-primary/15 text-primary btn btn-icon active size-9.25!" id="contact-tab-1" aria-selected="true" data-hs-tab="#tabs-contact-1" aria-controls="tabs-contact-1" role="tab">
                      <Icon icon="apps" className="text-lg" />
                    </button>

                    <button type="button" className="hs-tab-active:bg-primary hs-tab-active:text-white bg-primary/15 text-primary btn btn-icon size-9.25!" id="contact-tab-2" aria-selected="false" data-hs-tab="#tabs-contact-2" aria-controls="#tabs-contact-2" role="tab">
                      <Icon icon="list-check" className="text-lg" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-base lg:grid-cols-4">
        {contactData.map((contact, idx) => (
          <ContactCard key={idx} contact={contact} />
        ))}
      </div>

      <div className="mt-5">
        <nav className="mx-auto flex items-center justify-center gap-1.5" aria-label="Pagination">
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
      </div>
    </>
  )
}
export default page
const ContactCard = ({ contact }) => {
  const { flag, updatedTime, role, user, badge, stats, website } = contact
  return (
    <div className="card">
      <div className="card-body text-center">
        <Image src={user.image} alt="avatar" className="mx-auto size-18 rounded-full" />

        <h5 className="mt-3 text-md flex items-center justify-center gap-1.5">
          <Link href="/apps/users/profile" className="hover:text-primary">
            {user.name}
          </Link>
          <Image src={flag} alt="UK" className="size-4 rounded" />
        </h5>

        <span className="text-default-400 text-xs">{role}</span>
        <div>
          <span className={cn('badge  text-white my-1.5', badge.className)}>{badge.label}</span>
        </div>

        <span className="text-default-400">
          {user.username} |{' '}
          <Link href="" className="text-danger">
            {website}
          </Link>
        </span>

        <div className="mt-base  flex justify-center gap-2">
          <button className="btn btn-sm bg-primary text-white hover:bg-primary-hover">Message</button>
          <button className="btn border-secondary hover:bg-secondary text-secondary btn-sm hover:text-white">Follow</button>
        </div>

        <hr className="border-default-300 my-base border-dashed" />

        <div className="flex justify-between text-center">
          <div>
            <h5>{stats.posts}</h5>
            <span className="text-default-400">Posts</span>
          </div>
          <div>
            <h5>{stats.followers}</h5>
            <span className="text-default-400">Followers</span>
          </div>
          <div>
            <h5>{stats.followings}</h5>
            <span className="text-default-400">Followings</span>
          </div>
        </div>

        <hr className="border-default-300 mt-base mb-4 border-dashed" />
        <div className="text-default-400 flex items-center justify-end gap-1.5 text-xs">
          <Icon icon="refresh" />
          Updated {updatedTime}
        </div>
      </div>
    </div>
  )
}
