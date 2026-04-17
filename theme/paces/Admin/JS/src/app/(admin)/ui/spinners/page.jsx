import PageBreadcrumb from '@/components/PageBreadcrumb'
export const metadata = {
  title: 'Spinners',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Spinners" subtitle="Base UI" />

      <div className="container-fluid">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-base">
          <div className="space-y-base">
            <div className="card">
              <BorderSpinner />
            </div>
            <div className="card">
              <Colors />
            </div>
            <div className="card">
              <Alignment />
            </div>
            <div className="card">
              <ButtonsSpinner />
            </div>
          </div>
          <div className="space-y-base">
            <div className="card">
              <GrowingSpinner />
            </div>
            <div className="card">
              <ColorGrowingSpinner />
            </div>
            <div className="card">
              <Size />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Page
const BorderSpinner = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Border Spinner</h4>
      </div>
      <div className="card-body">
        <div className="border-dark inline-block size-8 animate-spin rounded-full border-3 border-t-transparent" role="status" aria-label="loading">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )
}
const Colors = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Colors</h4>
      </div>
      <div className="card-body">
        <div className="flex gap-base flex-wrap items-center">
          <div className="border-primary inline-block size-8 animate-spin rounded-full border-3 border-t-transparent" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="border-secondary inline-block size-8 animate-spin rounded-full border-3 border-t-transparent" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="border-success inline-block size-8 animate-spin rounded-full border-3 border-t-transparent" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="border-danger inline-block size-8 animate-spin rounded-full border-3 border-t-transparent" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="border-warning inline-block size-8 animate-spin rounded-full border-3 border-t-transparent" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="border-info inline-block size-8 animate-spin rounded-full border-3 border-t-transparent" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="border-light inline-block size-8 animate-spin rounded-full border-3 border-t-transparent" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="border-dark inline-block size-8 animate-spin rounded-full border-3 border-t-transparent" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </>
  )
}
const Alignment = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Alignment</h4>
      </div>
      <div className="card-body">
        <div className="flex gap-base flex-wrap items-center">
          <strong>Loading...</strong>
          <div className="border-dark ms-auto inline-block size-8 animate-spin rounded-full border-3 border-t-transparent" role="status" aria-label="loading" />
        </div>
        <div className="mt-5 flex items-center justify-center gap-base">
          <div className="border-dark inline-block size-8 animate-spin rounded-full border-3 border-t-transparent" role="status" aria-label="loading" />
        </div>
      </div>
    </>
  )
}
const ButtonsSpinner = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Buttons Spinner</h4>
      </div>
      <div className="card-body">
        <div className="grid md:grid-cols-2 gap-base">
          <div className="flex flex-wrap items-center gap-2">
            <button className="btn btn-icon bg-primary">
              <div className="inline-block size-4 animate-spin rounded-full border-2 border-white border-t-transparent" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
              </div>
            </button>
            <button className="btn btn-icon bg-primary rounded-full">
              <div className="inline-block size-4 animate-spin rounded-full border-2 border-white border-t-transparent" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
              </div>
            </button>
            <button className="btn bg-primary">
              <div className="inline-block size-4 animate-spin rounded-full border-2 border-white border-t-transparent" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
              </div>
            </button>
            <button className="btn bg-primary">
              <div className="flex items-center gap-3">
                <div className="inline-block size-4 animate-spin rounded-full border-2 border-white border-t-transparent" role="status" aria-label="loading">
                  <span className="sr-only">Loading...</span>
                </div>
                <span className="text-white">Loading..</span>
              </div>
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="btn btn-icon bg-primary">
              <span className="size-4 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-white" />
            </button>
            <button className="btn btn-icon bg-primary rounded-full">
              <span className="size-4 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-white" />
            </button>
            <button className="btn bg-primary">
              <span className="size-4 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-white" />
            </button>
            <button className="btn bg-primary">
              <div className="flex items-center gap-3">
                <span className="size-4 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-white" />
                <strong className="text-white">Loading...</strong>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
const GrowingSpinner = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Growing Spinner</h4>
      </div>
      <div className="card-body">
        <div className="flex items-center justify-start">
          <span className="bg-dark size-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full" />
        </div>
      </div>
    </>
  )
}
const ColorGrowingSpinner = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Color Growing Spinner</h4>
      </div>
      <div className="card-body">
        <div className="flex gap-base flex-wrap items-center">
          <div className="flex items-center justify-center">
            <span className="bg-primary size-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full" />
          </div>
          <div className="flex items-center justify-center">
            <span className="bg-secondary size-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full" />
          </div>
          <div className="flex items-center justify-center">
            <span className="bg-success size-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full" />
          </div>
          <div className="flex items-center justify-center">
            <span className="bg-danger size-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full" />
          </div>
          <div className="flex items-center justify-center">
            <span className="bg-warning size-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full" />
          </div>
          <div className="flex items-center justify-center">
            <span className="bg-info size-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full" />
          </div>
          <div className="flex items-center justify-center">
            <span className="bg-default-200 size-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full" />
          </div>
          <div className="flex items-center justify-center">
            <span className="bg-dark size-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full" />
          </div>
          <div className="flex items-center justify-center">
            <span className="bg-purple size-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full" />
          </div>
        </div>
      </div>
    </>
  )
}
const Size = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Size</h4>
      </div>
      <div className="card-body">
        <div className="grid md:grid-cols-2 gap-base">
          <div className="flex items-center gap-base">
            <div className="flex items-center justify-center">
              <div className="border-primary inline-block size-11 animate-spin rounded-full border-3 border-t-transparent" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <span className="bg-secondary size-11 animate-[spinner-grow_0.75s_linear_infinite] rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-base">
            <div className="flex items-center justify-center">
              <div className="border-primary inline-block size-9 animate-spin rounded-full border-3 border-t-transparent" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <span className="bg-secondary size-7 animate-[spinner-grow_0.75s_linear_infinite] rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-base">
            <div className="flex items-center justify-center">
              <div className="border-primary inline-block size-7 animate-spin rounded-full border-3 border-t-transparent" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <span className="bg-secondary size-6 animate-[spinner-grow_0.75s_linear_infinite] rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-base">
            <div className="flex items-center justify-center">
              <div className="border-dark inline-block size-4 animate-spin rounded-full border-2 border-t-transparent" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <span className="bg-dark size-4 animate-[spinner-grow_0.75s_linear_infinite] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
