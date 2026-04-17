import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Progress' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Progress" subtitle="Base UI" />

      <div className="container-fluid">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-base">
          <div className="flex gap-base flex-col">
            <div className="card">
              <Examples />
            </div>
            <div className="card">
              <Height />
            </div>
            <div className="card">
              <MultipleBar />
            </div>
            <div className="card">
              <AnimatedStripes />
            </div>
          </div>
          <div className="flex gap-base flex-col">
            <div className="card">
              <Labels />
            </div>
            <div className="card">
              <Backgrounds />
            </div>
            <div className="card">
              <Striped />
            </div>
            <div className="card">
              <Steps />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page

const Examples = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Examples</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-col gap-3">
          <div className="bg-default-100 flex h-4 w-full overflow-hidden rounded" role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-primary flex flex-col justify-center overflow-hidden text-center whitespace-nowrap transition duration-500" style={{ width: '0%' }} />
          </div>
          <div className="bg-default-100 flex h-4 w-full overflow-hidden rounded" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-primary flex flex-col justify-center overflow-hidden text-center whitespace-nowrap transition duration-500" style={{ width: '25%' }} />
          </div>
          <div className="bg-default-100 flex h-4 w-full overflow-hidden rounded" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-primary flex flex-col justify-center overflow-hidden text-center whitespace-nowrap transition duration-500" style={{ width: '50%' }} />
          </div>
          <div className="bg-default-100 flex h-4 w-full overflow-hidden rounded" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-primary flex flex-col justify-center overflow-hidden text-center whitespace-nowrap transition duration-500" style={{ width: '75%' }} />
          </div>
          <div className="bg-default-100 flex h-4 w-full overflow-hidden rounded" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-primary flex flex-col justify-center overflow-hidden text-center whitespace-nowrap transition duration-500" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    </>
  )
}

const Height = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Height</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-col gap-3">
          <div className="bg-default-100 flex h-px w-full overflow-hidden rounded" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-danger flex flex-col justify-center overflow-hidden text-center whitespace-nowrap transition duration-500" style={{ width: '25%' }} />
          </div>
          <div className="bg-default-100 flex h-0.75 w-full overflow-hidden rounded" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-primary flex flex-col justify-center overflow-hidden text-center whitespace-nowrap transition duration-500" style={{ width: '25%' }} />
          </div>
          <div className="bg-default-100 flex h-1.25 w-full overflow-hidden rounded" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-success flex flex-col justify-center overflow-hidden text-center whitespace-nowrap transition duration-500" style={{ width: '25%' }} />
          </div>
          <div className="bg-default-100 flex h-2 w-full overflow-hidden rounded" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-info flex flex-col justify-center overflow-hidden text-center whitespace-nowrap transition duration-500" style={{ width: '50%' }} />
          </div>
          <div className="bg-default-100 flex h-3 w-full overflow-hidden rounded" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-warning flex flex-col justify-center overflow-hidden text-center whitespace-nowrap transition duration-500" style={{ width: '75%' }} />
          </div>
          <div className="bg-default-100 flex h-3.75 w-full overflow-hidden rounded" role="progressbar" aria-valuenow={38} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-success flex flex-col justify-center overflow-hidden text-center whitespace-nowrap transition duration-500" style={{ width: '38%' }} />
          </div>
        </div>
      </div>
    </>
  )
}

const MultipleBar = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Multiple Bars</h4>
      </div>
      <div className="card-body">
        <div className="bg-default-100 flex h-4 w-full overflow-hidden rounded">
          <div className="bg-primary flex flex-col justify-center overflow-hidden whitespace-nowrap" style={{ width: '15%' }} role="progressbar" aria-valuenow={15} aria-valuemin={0} aria-valuemax={100} />
          <div className="bg-success flex flex-col justify-center overflow-hidden whitespace-nowrap" style={{ width: '30%' }} role="progressbar" aria-valuenow={30} aria-valuemin={0} aria-valuemax={100} />
          <div className="bg-info flex flex-col justify-center overflow-hidden whitespace-nowrap" style={{ width: '20%' }} role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} />
        </div>
      </div>
    </>
  )
}

const AnimatedStripes = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Animated Stripes</h4>
      </div>
      <div className="card-body">
        <div className="bg-default-100 h-4 w-full overflow-hidden rounded">
          <div className="bg-primary progress-striped h-4" style={{ width: '75%' }} role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={75} />
        </div>
      </div>
    </>
  )
}

const Labels = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Labels</h4>
      </div>
      <div className="card-body">
        <div className="flex gap-base flex-col">
          <div className="bg-default-100 flex h-4 w-full overflow-hidden rounded" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-primary flex flex-col justify-center overflow-hidden text-center text-[9px] whitespace-nowrap text-white" style={{ width: '25%' }}>
              25%
            </div>
          </div>
          <div className="bg-default-100 flex h-4 w-full overflow-hidden rounded" role="progressbar" aria-valuenow={10} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-primary relative flex h-4 w-[10%] items-center overflow-visible text-[9px] font-medium whitespace-nowrap" style={{ width: '10%' }}>
              Long label text for the progress bar, set to a dark color
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Backgrounds = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Backgrounds</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-col gap-3">
          <div className="bg-default-100 flex h-4 w-full overflow-hidden rounded" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-primary flex flex-col justify-center overflow-hidden text-center whitespace-nowrap transition duration-500" style={{ width: '25%' }} />
          </div>
          <div className="bg-default-100 flex h-4 w-full overflow-hidden rounded" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={50}>
            <div className="bg-info flex flex-col justify-center overflow-hidden text-center whitespace-nowrap transition duration-500" style={{ width: '50%' }} />
          </div>
          <div className="bg-default-100 flex h-4 w-full overflow-hidden rounded" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-warning flex flex-col justify-center overflow-hidden text-center whitespace-nowrap transition duration-500" style={{ width: '75%' }} />
          </div>
          <div className="bg-default-100 flex h-4 w-full overflow-hidden rounded" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-danger flex flex-col justify-center overflow-hidden text-center whitespace-nowrap transition duration-500" style={{ width: '100%' }} />
          </div>
          <div className="bg-default-100 flex h-4 w-full overflow-hidden rounded" role="progressbar" aria-valuenow={65} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-dark flex flex-col justify-center overflow-hidden text-center whitespace-nowrap transition duration-500" style={{ width: '65%' }} />
          </div>
          <div className="bg-default-100 flex h-4 w-full overflow-hidden rounded" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-secondary flex flex-col justify-center overflow-hidden text-center whitespace-nowrap transition duration-500" style={{ width: '50%' }} />
          </div>
        </div>
      </div>
    </>
  )
}

const Striped = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Striped</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-col gap-3">
          <div className="bg-default-100 h-4 w-full overflow-hidden rounded">
            <div className="bg-primary progress h-4" style={{ width: '10%' }} role="progressbar" aria-valuemin={0} aria-valuemax={10} />
          </div>
          <div className="bg-default-100 h-4 w-full overflow-hidden rounded">
            <div className="bg-success progress h-4" style={{ width: '25%' }} role="progressbar" aria-valuemin={0} aria-valuemax={25} />
          </div>
          <div className="bg-default-100 h-4 w-full overflow-hidden rounded">
            <div className="bg-info progress h-4" style={{ width: '50%' }} role="progressbar" aria-valuemin={0} aria-valuemax={50} />
          </div>
          <div className="bg-default-100 h-4 w-full overflow-hidden rounded">
            <div className="bg-warning progress h-4" style={{ width: '75%' }} role="progressbar" aria-valuemin={0} aria-valuemax={75} />
          </div>
          <div className="bg-default-100 h-4 w-full overflow-hidden rounded">
            <div className="bg-danger progress h-4" style={{ width: '100%' }} role="progressbar" aria-valuemin={0} aria-valuemax={100} />
          </div>
        </div>
      </div>
    </>
  )
}

const Steps = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Steps</h4>
      </div>
      <div className="card-body">
        <ul className="flex w-full items-center justify-between">
          <li className="flex w-full items-center">
            <span className="bg-primary flex size-9 shrink-0 items-center justify-center rounded-full font-medium text-white">1</span>
            <div className="bg-primary h-0.5 flex-1" />
          </li>

          <li className="flex w-full items-center">
            <span className="bg-primary flex size-9 shrink-0 items-center justify-center rounded-full font-medium text-white">2</span>
            <div className="bg-default-100 h-0.5 flex-1" />
          </li>

          <li className="flex items-center">
            <span className="bg-default-100 text-default-800 flex size-9 shrink-0 items-center justify-center rounded-full font-medium">3</span>
          </li>
        </ul>
      </div>
    </>
  )
}
