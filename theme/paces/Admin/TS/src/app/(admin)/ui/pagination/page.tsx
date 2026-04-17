import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Pagination' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Pagination" subtitle="Base UI" />

      <div className="container-fluid">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-base">
          <div className="flex gap-base flex-col">
            <div className="card">
              <DefaultPagination />
            </div>

            <div className="card">
              <AlignmentPagination />
            </div>

            <div className="card">
              <CustomColorPagination />
            </div>

            <div className="card">
              <DisabledAndActive />
            </div>

            <div className="card">
              <CustomIconPagination />
            </div>
          </div>
          <div className="flex gap-base flex-col">
            <div className="card">
              <SizingPagination />
            </div>

            <div className="card">
              <BoxedPagination />
            </div>

            <div className="card">
              <RoundedPagination />
            </div>

            <div className="card">
              <SoftPagination />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page

const DefaultPagination = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Default Pagination</h4>
      </div>
      <div className="card-body">
        <nav className="flex items-center -space-x-px" aria-label="Pagination">
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary inline-flex items-center justify-center gap-x-1.5 border px-3 py-1.5 transition-all duration-300 first:rounded-s-md last:rounded-e-md" aria-label="Previous">
            <span>Previous</span>
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex items-center justify-center border px-3 py-1.5 transition-all duration-300 first:rounded-s-md last:rounded-e-md" aria-current="page">
            1
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex items-center justify-center border px-3 py-1.5 transition-all duration-300 first:rounded-s-md last:rounded-e-md">
            2
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex items-center justify-center border px-3 py-1.5 transition-all duration-300 first:rounded-s-md last:rounded-e-md">
            3
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary inline-flex items-center justify-center gap-x-1.5 border px-3 py-1.5 transition-all duration-300 first:rounded-s-md last:rounded-e-md" aria-label="Next">
            <span>Next</span>
          </button>
        </nav>
      </div>
    </>
  )
}

const AlignmentPagination = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Alignment</h4>
      </div>
      <div className="card-body">
        <nav className="mb-4 flex items-center justify-center -space-x-px" aria-label="Pagination">
          <button type="button" className="text-default-400 border-default-300 inline-flex items-center justify-center gap-x-1.5 border px-3 py-1.5 first:rounded-s-md last:rounded-e-md" aria-label="Previous" disabled>
            <span>Previous</span>
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex items-center justify-center border px-3 py-1.5 transition-all duration-300 first:rounded-s-md last:rounded-e-md" aria-current="page">
            1
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex items-center justify-center border px-3 py-1.5 transition-all duration-300 first:rounded-s-md last:rounded-e-md">
            2
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex items-center justify-center border px-3 py-1.5 transition-all duration-300 first:rounded-s-md last:rounded-e-md">
            3
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary inline-flex items-center justify-center gap-x-1.5 border px-3 py-1.5 transition-all duration-300 first:rounded-s-md last:rounded-e-md" aria-label="Next">
            <span>Next</span>
          </button>
        </nav>
        <nav className="flex items-center justify-end -space-x-px" aria-label="Pagination">
          <button type="button" className="text-default-400 border-default-300 inline-flex items-center justify-center gap-x-1.5 border px-3 py-1.5 first:rounded-s-md last:rounded-e-md" aria-label="Previous" disabled>
            <span>Previous</span>
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex items-center justify-center border px-3 py-1.5 transition-all duration-300 first:rounded-s-md last:rounded-e-md" aria-current="page">
            1
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex items-center justify-center border px-3 py-1.5 transition-all duration-300 first:rounded-s-md last:rounded-e-md">
            2
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex items-center justify-center border px-3 py-1.5 transition-all duration-300 first:rounded-s-md last:rounded-e-md">
            3
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary inline-flex items-center justify-center gap-x-1.5 border px-3 py-1.5 transition-all duration-300 first:rounded-s-md last:rounded-e-md" aria-label="Next">
            <span>Next</span>
          </button>
        </nav>
      </div>
    </>
  )
}

const CustomColorPagination = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Custom Color Pagination</h4>
      </div>
      <div className="card-body">
        <nav className="mb-4 flex items-center gap-1.5" aria-label="Pagination">
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center gap-x-1.5 rounded border transition-all duration-300" aria-label="Previous">
            <Icon icon="chevron-left" />
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300" aria-current="page">
            1
          </button>
          <button type="button" className="bg-info flex size-8.75 items-center justify-center rounded text-white">
            2
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300">
            3
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300">
            4
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300">
            5
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center gap-x-1.5 rounded border transition-all duration-300" aria-label="Next">
            <Icon icon="chevron-right" />
          </button>
        </nav>
        <nav className="flex items-center gap-1.5" aria-label="Pagination">
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center gap-x-1.5 rounded border transition-all duration-300" aria-label="Previous">
            <Icon icon="arrow-left" />
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300" aria-current="page">
            1
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300">
            2
          </button>
          <button type="button" className="bg-secondary flex size-8.75 items-center justify-center rounded text-white">
            3
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300">
            4
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300">
            5
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center gap-x-1.5 rounded border transition-all duration-300" aria-label="Next">
            <Icon icon="arrow-right" />
          </button>
        </nav>
      </div>
    </>
  )
}

const DisabledAndActive = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Disabled and active states</h4>
      </div>
      <div className="card-body">
        <nav className="flex items-center -space-x-px" aria-label="Pagination">
          <button type="button" className="text-default-400 border-default-300 inline-flex items-center justify-center gap-x-1.5 border px-3 py-1.5 first:rounded-s-md last:rounded-e-md" aria-label="Previous" disabled>
            <span>Previous</span>
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex items-center justify-center border px-3 py-1.5 transition-all duration-300" aria-current="page">
            1
          </button>
          <button type="button" className="bg-primary flex items-center justify-center border border-primary px-3 py-1.5 text-white transition-all duration-300">
            2
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex items-center justify-center border px-3 py-1.5 transition-all duration-300">
            3
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary inline-flex items-center justify-center gap-x-1.5 border px-3 py-1.5 transition-all duration-300 first:rounded-s-md last:rounded-e-md" aria-label="Next">
            <span>Next</span>
          </button>
        </nav>
      </div>
    </>
  )
}

const CustomIconPagination = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Custom Icon Pagination</h4>
      </div>
      <div className="card-body">
        <nav className="mb-4 flex items-center gap-1.5" aria-label="Pagination">
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center gap-x-1.5 rounded border transition-all duration-300" aria-label="Previous">
            <Icon icon="chevron-left" />
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300" aria-current="page">
            1
          </button>
          <button type="button" className="bg-primary flex size-8.75 items-center justify-center rounded text-white">
            2
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300">
            3
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300">
            4
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300">
            5
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center gap-x-1.5 rounded border transition-all duration-300" aria-label="Next">
            <Icon icon="chevron-right" />
          </button>
        </nav>
        <nav className="flex items-center gap-1.5" aria-label="Pagination">
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center gap-x-1.5 rounded border transition-all duration-300" aria-label="Previous">
            <Icon icon="arrow-left" />
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300" aria-current="page">
            1
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300">
            2
          </button>
          <button type="button" className="bg-primary flex size-8.75 items-center justify-center rounded text-white">
            3
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300">
            4
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300">
            5
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center gap-x-1.5 rounded border transition-all duration-300" aria-label="Next">
            <Icon icon="arrow-right" />
          </button>
        </nav>
      </div>
    </>
  )
}

const SizingPagination = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Sizing</h4>
      </div>
      <div className="card-body">
        <nav className="mb-4 flex items-center -space-x-px" aria-label="Pagination">
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary inline-flex items-center justify-center gap-x-1.5 border px-6 py-3 text-base transition-all duration-300 first:rounded-s-md last:rounded-e-md" aria-label="Previous">
            <span className="text-base">«</span>
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex items-center justify-center border px-6 py-3 text-base transition-all duration-300 first:rounded-s-md last:rounded-e-md" aria-current="page">
            1
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex items-center justify-center border px-6 py-3 text-base transition-all duration-300 first:rounded-s-md last:rounded-e-md">
            2
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex items-center justify-center border px-6 py-3 text-base transition-all duration-300 first:rounded-s-md last:rounded-e-md">
            3
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary inline-flex items-center justify-center gap-x-1.5 border px-6 py-3 text-base transition-all duration-300 first:rounded-s-md last:rounded-e-md" aria-label="Next">
            <span className="text-base">»</span>
          </button>
        </nav>
        <nav className="flex items-center -space-x-px" aria-label="Pagination">
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary inline-flex items-center justify-center gap-x-1.5 border px-2 py-1 transition-all duration-300 first:rounded-s-md last:rounded-e-md" aria-label="Previous">
            <span>«</span>
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex items-center justify-center border px-2 py-1 transition-all duration-300 first:rounded-s-md last:rounded-e-md" aria-current="page">
            1
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex items-center justify-center border px-2 py-1 transition-all duration-300 first:rounded-s-md last:rounded-e-md">
            2
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex items-center justify-center border px-2 py-1 transition-all duration-300 first:rounded-s-md last:rounded-e-md">
            3
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary inline-flex items-center justify-center gap-x-1.5 border px-2 py-1 transition-all duration-300 first:rounded-s-md last:rounded-e-md" aria-label="Next">
            <span>»</span>
          </button>
        </nav>
      </div>
    </>
  )
}

const BoxedPagination = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Boxed Pagination</h4>
      </div>
      <div className="card-body">
        <nav className="mb-4 flex items-center gap-1.5" aria-label="Pagination">
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center gap-x-1.5 rounded border transition-all duration-300" aria-label="Previous">
            <span>«</span>
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300" aria-current="page">
            1
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300">
            2
          </button>
          <button type="button" className="bg-primary flex size-8.75 items-center justify-center rounded text-white">
            3
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300">
            4
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded border transition-all duration-300">
            5
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center gap-x-1.5 rounded border transition-all duration-300" aria-label="Next">
            <span>»</span>
          </button>
        </nav>
        <nav className="mb-4 flex items-center gap-1.5" aria-label="Pagination">
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-12.5 items-center justify-center gap-x-1.5 rounded border text-base transition-all duration-300" aria-label="Previous">
            <span>«</span>
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-12.5 items-center justify-center rounded border text-base transition-all duration-300" aria-current="page">
            1
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-12.5 items-center justify-center rounded border text-base transition-all duration-300">
            2
          </button>
          <button type="button" className="bg-primary flex size-12.5 items-center justify-center rounded text-base text-white">
            3
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-12.5 items-center justify-center rounded border text-base transition-all duration-300">
            4
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-12.5 items-center justify-center rounded border text-base transition-all duration-300">
            5
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-12.5 items-center justify-center gap-x-1.5 rounded border text-base transition-all duration-300" aria-label="Next">
            <span>»</span>
          </button>
        </nav>
        <nav className="flex items-center gap-1.5" aria-label="Pagination">
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-7.25 items-center justify-center gap-x-1.5 rounded border transition-all duration-300" aria-label="Previous">
            <span>«</span>
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-7.25 items-center justify-center rounded border transition-all duration-300" aria-current="page">
            1
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-7.25 items-center justify-center rounded border transition-all duration-300">
            2
          </button>
          <button type="button" className="bg-primary flex size-7.25 items-center justify-center rounded text-white">
            3
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-7.25 items-center justify-center rounded border transition-all duration-300">
            4
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-7.25 items-center justify-center rounded border transition-all duration-300">
            5
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-7.25 items-center justify-center gap-x-1.5 rounded border transition-all duration-300" aria-label="Next">
            <span>»</span>
          </button>
        </nav>
      </div>
    </>
  )
}

const RoundedPagination = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Rounded Pagination</h4>
      </div>
      <div className="card-body">
        <nav className="flex items-center gap-1.5" aria-label="Pagination">
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center gap-x-1.5 rounded-full border transition-all duration-300" aria-label="Previous">
            <span>«</span>
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded-full border transition-all duration-300" aria-current="page">
            1
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded-full border transition-all duration-300">
            2
          </button>
          <button type="button" className="bg-primary flex size-8.75 items-center justify-center rounded-full text-white">
            3
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded-full border transition-all duration-300">
            4
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center rounded-full border transition-all duration-300">
            5
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-primary flex size-8.75 items-center justify-center gap-x-1.5 rounded-full border transition-all duration-300" aria-label="Next">
            <span>»</span>
          </button>
        </nav>
      </div>
    </>
  )
}

const SoftPagination = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Soft Pagination</h4>
      </div>
      <div className="card-body">
        <nav className="flex items-center gap-1.5" aria-label="Pagination">
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-danger flex size-8.75 items-center justify-center gap-x-1.5 rounded border transition-all duration-300" aria-label="Previous">
            <span>«</span>
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-danger flex size-8.75 items-center justify-center rounded border transition-all duration-300" aria-current="page">
            1
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-danger flex size-8.75 items-center justify-center rounded border transition-all duration-300">
            2
          </button>
          <button type="button" className="text-danger bg-danger/10 flex size-8.75 items-center justify-center rounded">
            3
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-danger flex size-8.75 items-center justify-center rounded border transition-all duration-300">
            4
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-danger flex size-8.75 items-center justify-center rounded border transition-all duration-300">
            5
          </button>
          <button type="button" className="border-default-300 hover:bg-default-100 hover:text-danger flex size-8.75 items-center justify-center gap-x-1.5 rounded border transition-all duration-300" aria-label="Next">
            <span>»</span>
          </button>
        </nav>
      </div>
    </>
  )
}
