import PageBreadcrumb from '@/components/PageBreadcrumb'
import Rating from '@/components/Rating'
import Icon from '@/components/wrappers/Icon'
import { Metadata } from 'next'
import Image from 'next/image'
import { CompanyType, companyData } from './data'

export const metadata: Metadata = { title: 'Companies' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Companies" subtitle="Apps" />
      <div className="card border border-default-300 mb-base">
        <div className="card-body">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="input-icon-group">
                <Icon icon="search" className="input-icon" />
                <input type="text" className="form-input" placeholder="Search company name..." />
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5 md:flex-nowrap">
                <div className="flex flex-wrap items-center gap-2.5 md:flex-nowrap">
                  <div className="items-center gap-base md:flex">
                    <span className="font-semibold">Filter By:</span>
                    <div className="input-icon-group">
                      <Icon icon="map-pin" className="input-icon" />
                      <select className="form-select">
                        <option>Location</option>
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                        <option value="Germany">Germany</option>
                        <option value="India">India</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                  <div className="input-icon-group">
                    <Icon icon="briefcase" className="input-icon" />
                    <select className="form-select">
                      <option>Category</option>
                      <option value="Tech">Tech</option>
                      <option value="Finance">Finance</option>
                      <option value="eCommerce">eCommerce</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Automotive">Automotive</option>
                    </select>
                  </div>
                  <div className="input-icon-group">
                    <Icon icon="star" className="input-icon" />
                    <select className="form-select">
                      <option>Rating</option>
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars &amp; Up</option>
                      <option value={3}>3 Stars &amp; Up</option>
                      <option value={2}>2 Stars &amp; Up</option>
                      <option value={1}>1 Star &amp; Up</option>
                    </select>
                  </div>
                  <button type="submit" className="btn bg-primary text-white hover:bg-primary-hover">
                    <Icon icon="plus" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-base mb-base">
        {companyData.map((company, idx) => (
          <CompanyCard company={company} key={idx} />
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

const CompanyCard = ({ company }: { company: CompanyType }) => {
  const { revenue, description, ceo, name, founded, exchange, industry, location, image, ticker, website, rating, employees } = company
  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-base">
            <Image src={image} alt="Amazon Logo" className="size-12.5 rounded" />
            <div>
              <h4 className="mb-1.25 text-lg font-bold">{name}</h4>
              <a href={`https://${website}`} className="text-default-400 text-xs" target="_blank">
                www.{name.split(' ')[0].toLowerCase()}.com
              </a>
            </div>
          </div>
          <div>
            <button className="btn btn-sm border-danger hover:bg-danger text-danger hover:text-white">
              <Icon icon="heart" />
              Follow
            </button>
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2.5">
          <span className="badge font-semibold bg-primary/15 text-primary rounded-full px-2.5 py-1.25">{location}</span>
          <span className="badge font-semibold bg-success/15 text-success rounded-full px-2.5 py-1.25">{industry}</span>
          <span className="badge font-semibold bg-info/15 text-info rounded-full px-2.5 py-1.25">Founded: {founded}</span>
        </div>
        <p className="text-default-400 mb-7.5">{description}</p>
        <div className="mb-7.5 grid grid-cols-2 gap-base md:grid-cols-4">
          <div className="text-center">
            <h5 className="font-bold">{employees}</h5>
            <small className="text-default-400">Employees</small>
          </div>
          <div className="text-center">
            <h5 className="font-bold">{revenue}</h5>
            <small className="text-default-400">Revenue</small>
          </div>
          <div className="text-center">
            <h5 className="font-bold">{ceo}</h5>
            <small className="text-default-400">CEO</small>
          </div>
          <div className="text-center">
            <h5 className="font-bold">{ticker}</h5>
            <small className="text-default-400">{exchange}</small>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-warning items-ceenter flex gap-1 text-lg">
            <Rating rating={rating} />
          </div>
          <a href="" className="btn btn-sm bg-primary text-white hover:bg-primary-hover">
            Visit Company Profile
          </a>
        </div>
      </div>
    </div>
  )
}
