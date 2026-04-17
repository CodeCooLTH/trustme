import user1 from '@/assets/images/users/user-1.jpg'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { META_DATA } from '@/config/constants'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = { title: 'Staff Profile' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Staff Profile" subtitle="HRM" />

      <div className="container">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-base">
          <div className="card">
            <div className="card-body">
              <div className="mb-7.5 flex items-center justify-between">
                <div className="flex items-center gap-base">
                  <div className="relative">
                    <Image src={user1} alt="avatar" className="size-18 rounded-full" />
                  </div>
                  <div>
                    <h5 className="flex items-center">
                      <a href="#!" className="hover:text-primary">
                        {META_DATA.username}
                      </a>
                    </h5>
                    <p className="text-default-400 mb-3">Senior Developer</p>
                    <span className="badge badge-label bg-light text-dark">Team Lead</span>
                  </div>
                </div>
                <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                  <button type="button" className="hs-dropdown-toggle btn btn-icon hover:bg-default-100 focus:bg-default-100" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                    <Icon icon="dots-vertical" className="text-default-400 text-xl" />
                  </button>
                  <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical">
                    <a className="dropdown-item" href="#">
                      Edit Profile
                    </a>
                    <a className="dropdown-item text-danger" href="#">
                      Report
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-3">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="btn btn-icon bg-light size-8!">
                      <Icon icon="school" className="text-secondary text-lg" />
                    </div>
                  </div>
                  <p className="text-sm">
                    Studied at <span className="text-dark font-semibold">University of British Columbia</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="btn btn-icon bg-light size-8!">
                      <Icon icon="map-pin" className="text-secondary text-lg" />
                    </div>
                  </div>
                  <p className="text-sm">
                    Lives in <span className="text-dark font-semibold">Vancouver, Canada</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="btn btn-icon bg-light size-8!">
                      <Icon icon="users" className="text-secondary text-lg" />
                    </div>
                  </div>
                  <p className="text-sm">
                    Works in <span className="text-dark font-semibold">Finance &amp; Accounting Department</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="btn btn-icon bg-light size-8!">
                      <Icon icon="mail" className="text-secondary text-lg" />
                    </div>
                  </div>
                  <p className="text-sm">
                    Email{' '}
                    <a href="mailto:yogesh@company.com" className="text-primary font-semibold">
                      emp2045@company.com
                    </a>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="btn btn-icon bg-light size-8!">
                      <Icon icon="link" className="text-secondary text-lg" />
                    </div>
                  </div>
                  <p className="text-sm">
                    Employee ID <span className="text-dark font-semibold">EMP-2045</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="btn btn-icon bg-light size-8!">
                      <Icon icon="world" className="text-secondary text-lg" />
                    </div>
                  </div>
                  <p className="text-sm">
                    Languages <span className="text-dark font-semibold">English, French</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-2 space-y-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">About Employee</h4>
              </div>
              <div className="card-body">
                <p>
                  <strong>Alex Johnson</strong> is a passionate and results-driven <span className="text-primary font-semibold">Project Manager</span> with over 6 years of experience in managing cross-functional teams and delivering projects on time and within budget. Alex
                  specializes in planning, process optimization, and team leadership across multiple domains.
                </p>
                <p className="mt-base">
                  Known for strong communication and organizational skills, Alex has successfully led various digital transformation initiatives and implemented efficient workflows that improved team productivity. In free time, Alex enjoys learning new technologies and mentoring
                  young professionals.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Basic Information</h4>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-base gap-y-5">
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Phone</p>
                    <p>+1 312 555 9482</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Email</p>
                    <p>alex.johnson@example.com</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Gender</p>
                    <p>Male</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Birthday</p>
                    <p>15th March 1988</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Address</p>
                    <p>742 Evergreen Terrace, Chicago</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Nationality</p>
                    <p>American</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Blood Group</p>
                    <p>A+ve</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Shift</p>
                    <p>Day Shift</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Emergency Contact Details</h4>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-base gap-y-5">
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Contact Name</p>
                    <p>Sarah Johnson</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Relationship</p>
                    <p>Spouse</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Phone</p>
                    <p>+1 312 555 7854</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Alternate Phone</p>
                    <p>+1 312 555 9685</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Email</p>
                    <p>sarah.johnson@example.com</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Address</p>
                    <p>742 Evergreen Terrace, Chicago</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Financial Details</h4>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-base gap-y-5">
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Bank Name</p>
                    <p>Bank of America</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Account Number</p>
                    <p>**** **** **** 9845</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">IFSC / SWIFT Code</p>
                    <p>BOFAUS3NXXX</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Branch</p>
                    <p>Downtown Chicago Branch</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">PAN / Tax ID</p>
                    <p>TXN-9823645</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Salary (Monthly)</p>
                    <p>USD $6,500</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">Payment Mode</p>
                    <p>Bank Transfer</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">PF Number</p>
                    <p>PF-20458-CH</p>
                  </div>
                  <div>
                    <p className="text-default-400 mb-1.25 font-medium">ESI Number</p>
                    <p>ESI-985721</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
