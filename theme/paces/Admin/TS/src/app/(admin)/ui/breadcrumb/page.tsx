import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Breadcrumb' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Breadcrumb" subtitle="Base UI" />
      <div className="container-fluid">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-base">
          <div className="card">
            <Basic />
          </div>

          <div className="card">
            <WithIcon />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page

const Basic = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Basic</h4>
      </div>
      <div className="card-body">
        <nav className="py-3">
          <ol className="flex items-center whitespace-nowrap">
            <li className="text-default-400 inline-flex items-center truncate font-medium" aria-current="page">
              Home
            </li>
          </ol>
        </nav>
        <nav className="py-3">
          <ol className="flex items-center whitespace-nowrap">
            <li className="inline-flex items-center">
              <a className="text-default-600 hover:text-primary flex items-center font-medium" href="#">
                Home
              </a>
              <Icon icon="chevron-right" className="text-default-400 m-0.75 size-4 pe-1" />
            </li>
            <li className="text-default-400 inline-flex items-center truncate font-medium" aria-current="page">
              Library
            </li>
          </ol>
        </nav>
        <nav className="py-3">
          <ol className="flex items-center whitespace-nowrap">
            <li className="inline-flex items-center">
              <a className="text-default-600 hover:text-primary flex items-center font-medium" href="#">
                Home
              </a>
              <Icon icon="chevron-right" className="text-default-400 m-0.75 size-4 pe-1" />
            </li>
            <li className="inline-flex items-center">
              <a className="text-default-600 hover:text-primary flex items-center font-medium" href="#">
                Library
              </a>
              <Icon icon="chevron-right" className="text-default-400 m-0.75 size-4 pe-1" />
            </li>
            <li className="text-default-400 inline-flex items-center truncate font-medium" aria-current="page">
              Data
            </li>
          </ol>
        </nav>
      </div>
    </>
  )
}

const WithIcon = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">With Icons</h4>
      </div>
      <div className="card-body">
        <nav className="bg-light/50 p-3 mb-3">
          <ol className="flex items-center whitespace-nowrap">
            <li className="text-default-400 inline-flex items-center truncate font-medium" aria-current="page">
              <Icon icon="smart-home" className="me-2 size-3.5" />
              Home
            </li>
          </ol>
        </nav>
        <nav className="bg-light/50 p-3 mb-3">
          <ol className="flex items-center whitespace-nowrap">
            <li className="inline-flex items-center">
              <a className="hover:text-primary flex items-center font-medium" href="#">
                <Icon icon="smart-home" className="me-1.5" /> Home
              </a>
              <Icon icon="chevron-right" className="text-default-400 m-0.75 size-4 pe-1" />
            </li>
            <li className="text-default-400 inline-flex items-center truncate font-medium" aria-current="page">
              Library
            </li>
          </ol>
        </nav>
        <nav className="bg-light/50 p-3">
          <ol className="flex items-center whitespace-nowrap">
            <li className="inline-flex items-center">
              <a className="hover:text-primary flex items-center font-medium" href="#">
                <Icon icon="smart-home" className="me-1 size-3.5" />
                Home
              </a>
              <Icon icon="chevron-right" className="text-default-400 m-0.75 size-4 pe-1" />
            </li>
            <li className="inline-flex items-center">
              <a className="hover:text-primary flex items-center font-medium" href="#">
                Library
              </a>
              <Icon icon="chevron-right" className="text-default-400 m-0.75 size-4 pe-1" />
            </li>
            <li className="text-default-400 inline-flex items-center truncate font-medium" aria-current="page">
              Data
            </li>
          </ol>
        </nav>
      </div>
    </>
  )
}
