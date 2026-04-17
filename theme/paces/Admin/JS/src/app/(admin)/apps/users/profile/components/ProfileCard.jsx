import us from '@/assets/images/flags/us.svg'
import user1 from '@/assets/images/users/user-1.jpg'
import Icon from '@/components/wrappers/Icon'
import { META_DATA } from '@/config/constants'
import Image from 'next/image'
import Link from 'next/link'
import { skillData } from './data'
const ProfileCard = () => {
  return (
    <div className="card sticky top-[calc(var(--topbar-height)+1.5rem)]">
      <div className="card-body">
        <div className="flex justify-between items-center mb-7.5">
          <div className="flex items-center gap-base">
            <Image src={user1} alt="avatar" className="size-18 rounded-full object-cover" />
            <div>
              <div className="flex items-center gap-3">
                <h4 className="text-md">
                  <a href="#!">{META_DATA.username}</a>
                </h4>
                <Image src={us} alt="US" className="rounded-full size-4" />
              </div>
              <p className="text-default-400 text-sm mb-3">Senior Developer</p>
              <span className="badge badge-label bg-light">Team Lead</span>
            </div>
          </div>
          <div className="ms-auto relative">
            <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
              <button type="button" className="hs-dropdown-toggle btn btn-icon text-default-500 hover:bg-default-100" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                <Icon icon="dots-vertical" className="text-2xl" />
              </button>
              <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical">
                <Link className="dropdown-item" href="">
                  Edit profile
                </Link>
                <Link className="dropdown-item text-danger" href="">
                  Report
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div>
              <div className="size-8 flex items-center justify-center rounded-full bg-light">
                <Icon icon="briefcase" className="text-lg" />
              </div>
            </div>
            <p className="text-sm">UI/UX Designer &amp; Full-Stack Developer</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-8 flex items-center justify-center rounded-full bg-light">
              <Icon icon="school" className="text-lg" />
            </div>
            <p className="text-sm">
              Studied at&nbsp;
              <span className="font-semibold text-default-700">Stanford University</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-8 flex items-center justify-center rounded-full bg-light">
              <Icon icon="map-pin" className="text-lg" />
            </div>
            <p className="text-sm">
              Lives in&nbsp;
              <span className="font-semibold text-default-700">San Francisco, CA</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-8 flex items-center justify-center rounded-full bg-light">
              <Icon icon="users" className="text-lg" />
            </div>
            <p className="text-sm">
              Followed by&nbsp;
              <span className="font-semibold text-default-700">25.3k People</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-8 flex items-center justify-center rounded-full bg-light">
              <Icon icon="mail" className="text-lg"></Icon>
            </div>
            <p className="text-sm">
              Email&nbsp;
              <a href="mailto:hello@example.com" className="text-primary font-semibold">
                hello@example.com
              </a>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-8 flex items-center justify-center rounded-full bg-light">
              <Icon icon="link" className="text-lg" />
            </div>
            <p className="text-sm">
              Website&nbsp;
              <a href="https://www.example.dev" className="text-primary font-semibold">
                www.example.dev
              </a>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <div className="size-8 flex items-center justify-center rounded-full bg-light">
                <Icon icon="world" className="text-lg" />
              </div>
            </div>
            <p className="text-sm">
              Languages&nbsp;
              <span className="font-semibold text-default-700">English, Hindi, Japanese</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center md:justify-center justify-start gap-3 mt-7.5 mb-3">
          <Link href="" className="btn btn-icon bg-primary hover:bg-primary-hover rounded-full">
            <svg className="text-lg text-white" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
            </svg>
          </Link>
          <Link href="" className="btn btn-icon bg-info hover:bg-info-hover rounded-full">
            <svg className="text-lg text-white" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
            </svg>
          </Link>
          <Link href="" className="btn btn-icon bg-danger hover:bg-danger-hover rounded-full">
            <svg className="text-lg text-white" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
              <path d="M16.5 7.5v.01" />
            </svg>
          </Link>
          <Link href="" className="btn btn-icon bg-success hover:bg-success-hover rounded-full">
            <svg className="text-lg text-white" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M9 3.6c5 6 7 10.5 7.5 16.2" />
              <path d="M6.4 19c3.5 -3.5 6 -6.5 14.5 -6.4" />
              <path d="M3.1 10.75c5 0 9.814 -.38 15.314 -5" />
            </svg>
          </Link>
          <Link href="" className="btn btn-icon bg-secondary hover:bg-secondary-hover rounded-full">
            <svg className="text-lg text-white" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 11v5" />
              <path d="M8 8v.01" />
              <path d="M12 16v-5" />
              <path d="M16 16v-3a2 2 0 1 0 -4 0" />
              <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
            </svg>
          </Link>
          <Link href="" className="btn btn-icon bg-danger hover:bg-danger-hover rounded-full">
            <svg className="text-lg text-white" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
              <path d="M10 9l5 3l-5 3z" />
            </svg>
          </Link>
        </div>
        <h4 className="card-title md:mt-7.5 mt-7 mb-base">Skills</h4>
        <div className="flex flex-wrap itmes-center gap-1.5">
          {skillData.map((skill, idx) => (
            <Link href="" className="btn btn-sm bg-light hover:text-primary" key={idx}>
              {skill}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
export default ProfileCard
