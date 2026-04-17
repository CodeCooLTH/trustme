import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Buttons' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Buttons" subtitle="Base UI" />

      <div className="container-fluid">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-base">
          <div className="card">
            <DefaultButton />
          </div>
          <div className="card">
            <RoundedButton />
          </div>
          <div className="card">
            <OutlineButton />
          </div>
          <div className="card">
            <OutlineButtonRounded />
          </div>
          <div className="card">
            <SoftButton />
          </div>
          <div className="card">
            <SoftRoundedButton />
          </div>
          <div className="card">
            <GhostButton />
          </div>
          <div className="card">
            <GhostRoundedButton />
          </div>
          <div className="card">
            <GradientButton />
          </div>
          <div className="col-span-1">
            <div className="card">
              <GradientRoundedButton />
            </div>
          </div>
          <div className="col-span-1">
            <div className="card">
              <ButtonSizes />
            </div>
          </div>
          <div className="card">
            <DisabledButtons />
          </div>
          <div className="col-span-1">
            <div className="card">
              <BlockButton />
            </div>
          </div>
          <div className="card">
            <IconButtons />
          </div>
          <div className="card">
            <ButtonTags />
          </div>
          <div className="col-span-1">
            <div className="card">
              <ButtonGroup />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page

const DefaultButton = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Default Buttons</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn border-default-300">
            Default
          </button>
          <button type="button" className="btn bg-primary hover:bg-primary-hover text-white">
            Primary
          </button>
          <button type="button" className="btn bg-secondary hover:bg-secondary-hover text-white">
            Secondary
          </button>
          <button type="button" className="btn bg-success hover:bg-success-hover text-white">
            Success
          </button>
          <button type="button" className="btn bg-danger hover:bg-danger-hover text-white">
            Danger
          </button>
          <button type="button" className="btn bg-warning hover:bg-warning-hover text-white">
            Warning
          </button>
          <button type="button" className="btn bg-info hover:bg-info-hover text-white">
            Info
          </button>
          <button type="button" className="btn bg-light text-dark hover:bg-light-hover">
            Light
          </button>
          <button type="button" className="btn bg-dark hover:bg-dark-hover text-white">
            Dark
          </button>
        </div>
      </div>
    </>
  )
}

const RoundedButton = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Button Rounded</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn border-default-300 rounded-full">
            Default
          </button>
          <button type="button" className="btn bg-primary hover:bg-primary-hover rounded-full text-white">
            Primary
          </button>
          <button type="button" className="btn bg-secondary hover:bg-secondary-hover rounded-full text-white">
            Secondary
          </button>
          <button type="button" className="btn bg-success hover:bg-success-hover rounded-full text-white">
            Success
          </button>
          <button type="button" className="btn bg-danger hover:bg-danger-hover rounded-full text-white">
            Danger
          </button>
          <button type="button" className="btn bg-warning hover:bg-warning-hover rounded-full text-white">
            Warning
          </button>
          <button type="button" className="btn bg-info hover:bg-info-hover rounded-full text-white">
            Info
          </button>
          <button type="button" className="btn bg-light text-dark hover:bg-light-hover rounded-full">
            Light
          </button>
          <button type="button" className="btn bg-dark hover:bg-dark-hover rounded-full text-white">
            Dark
          </button>
        </div>
      </div>
    </>
  )
}

const OutlineButton = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Button Outline</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn border-primary text-primary hover:bg-primary hover:text-white">
            Primary
          </button>
          <button type="button" className="btn border-secondary text-secondary hover:bg-secondary hover:text-white">
            Secondary
          </button>
          <button type="button" className="btn border-success text-success hover:bg-success hover:text-white">
            Success
          </button>
          <button type="button" className="btn border-danger text-danger hover:bg-danger hover:text-white">
            Danger
          </button>
          <button type="button" className="btn border-warning text-warning hover:bg-warning hover:text-white">
            Warning
          </button>
          <button type="button" className="btn border-info text-info hover:bg-info hover:text-white">
            Info
          </button>
          <button type="button" className="btn border-light text-dark hover:bg-light hover:text-dark">
            Light
          </button>
          <button type="button" className="btn border-dark text-dark hover:bg-dark hover:text-white">
            Dark
          </button>
        </div>
      </div>
    </>
  )
}

const OutlineButtonRounded = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Button Outline Rounded</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn border-primary text-primary hover:bg-primary rounded-full hover:text-white">
            Primary
          </button>
          <button type="button" className="btn border-secondary text-secondary hover:bg-secondary rounded-full hover:text-white">
            Secondary
          </button>
          <button type="button" className="btn border-success text-success hover:bg-success rounded-full hover:text-white">
            Success
          </button>
          <button type="button" className="btn border-danger text-danger hover:bg-danger rounded-full hover:text-white">
            Danger
          </button>
          <button type="button" className="btn border-warning text-warning hover:bg-warning rounded-full hover:text-white">
            Warning
          </button>
          <button type="button" className="btn border-info text-info hover:bg-info rounded-full hover:text-white">
            Info
          </button>
          <button type="button" className="btn border-light text-dark hover:bg-light hover:text-dark rounded-full">
            Light
          </button>
          <button type="button" className="btn border-dark text-dark hover:bg-dark rounded-full hover:text-white">
            Dark
          </button>
        </div>
      </div>
    </>
  )
}

const SoftButton = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Soft Buttons</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn text-primary bg-primary/15 hover:bg-primary hover:text-white">
            Primary
          </button>
          <button type="button" className="btn text-secondary bg-secondary/15 hover:bg-secondary hover:text-white">
            Secondary
          </button>
          <button type="button" className="btn text-success bg-success/15 hover:bg-success hover:text-white">
            Success
          </button>
          <button type="button" className="btn text-danger bg-danger/15 hover:bg-danger hover:text-white">
            Danger
          </button>
          <button type="button" className="btn text-warning bg-warning/15 hover:bg-warning hover:text-white">
            Warning
          </button>
          <button type="button" className="btn text-info bg-info/15 hover:bg-info hover:text-white">
            Info
          </button>
          <button type="button" className="btn text-dark bg-dark/15 hover:bg-dark hover:text-white">
            Dark
          </button>
        </div>
      </div>
    </>
  )
}

const SoftRoundedButton = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Soft Rounded Buttons</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn text-primary bg-primary/15 hover:bg-primary rounded-full hover:text-white">
            Primary
          </button>
          <button type="button" className="btn text-secondary bg-secondary/15 hover:bg-secondary rounded-full hover:text-white">
            Secondary
          </button>
          <button type="button" className="btn text-success bg-success/15 hover:bg-success rounded-full hover:text-white">
            Success
          </button>
          <button type="button" className="btn text-danger bg-danger/15 hover:bg-danger rounded-full hover:text-white">
            Danger
          </button>
          <button type="button" className="btn text-warning bg-warning/15 hover:bg-warning rounded-full hover:text-white">
            Warning
          </button>
          <button type="button" className="btn text-info bg-info/15 hover:bg-info rounded-full hover:text-white">
            Info
          </button>
          <button type="button" className="btn text-dark bg-dark/15 hover:bg-dark rounded-full hover:text-white">
            Dark
          </button>
        </div>
      </div>
    </>
  )
}

const GhostButton = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Ghost Buttons</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn text-primary hover:bg-primary rounded hover:text-white">
            Primary
          </button>
          <button type="button" className="btn text-secondary hover:bg-secondary rounded hover:text-white">
            Secondary
          </button>
          <button type="button" className="btn text-success hover:bg-success rounded hover:text-white">
            Success
          </button>
          <button type="button" className="btn text-danger hover:bg-danger rounded hover:text-white">
            Danger
          </button>
          <button type="button" className="btn text-warning hover:bg-warning rounded hover:text-white">
            Warning
          </button>
          <button type="button" className="btn text-info hover:bg-info rounded hover:text-white">
            Info
          </button>
          <button type="button" className="btn text-dark hover:bg-dark rounded hover:text-white">
            Dark
          </button>
        </div>
      </div>
    </>
  )
}

const GhostRoundedButton = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Ghost Rounded Buttons</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn text-primary hover:bg-primary rounded-full hover:text-white">
            Primary
          </button>
          <button type="button" className="btn text-secondary hover:bg-secondary rounded-full hover:text-white">
            Secondary
          </button>
          <button type="button" className="btn text-success hover:bg-success rounded-full hover:text-white">
            Success
          </button>
          <button type="button" className="btn text-danger hover:bg-danger rounded-full hover:text-white">
            Danger
          </button>
          <button type="button" className="btn text-warning hover:bg-warning rounded-full hover:text-white">
            Warning
          </button>
          <button type="button" className="btn text-info hover:bg-info rounded-full hover:text-white">
            Info
          </button>
          <button type="button" className="btn text-dark hover:bg-dark rounded-full hover:text-white">
            Dark
          </button>
        </div>
      </div>
    </>
  )
}

const GradientButton = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Gradient Buttons</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn border-0 bg-linear-to-br from-purple-600 to-blue-500 text-white hover:bg-linear-to-bl">
            Purple to Blue
          </button>
          <button type="button" className="btn border-0 bg-linear-to-r from-cyan-500 to-blue-500 text-white hover:bg-linear-to-bl">
            Cyan to Blue
          </button>
          <button type="button" className="btn border-0 bg-linear-to-br from-green-400 to-blue-600 text-white hover:bg-linear-to-bl">
            Green to Blue
          </button>
          <button type="button" className="btn border-0 bg-linear-to-r from-purple-500 to-pink-500 text-white hover:bg-linear-to-l">
            Purple to Pink
          </button>
          <button type="button" className="btn border-0 bg-linear-to-br from-pink-500 to-orange-400 text-white hover:bg-linear-to-bl">
            Pink to Orange
          </button>
          <button type="button" className="btn border-0 bg-linear-to-r from-teal-200 to-lime-200 text-gray-900 hover:bg-linear-to-l">
            Teal to Lime
          </button>
          <button type="button" className="btn border-0 bg-linear-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 hover:bg-linear-to-bl">
            Red to Yellow
          </button>
        </div>
      </div>
    </>
  )
}

const GradientRoundedButton = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Gradient Rounded Buttons</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn rounded-full border-0 bg-linear-to-br from-purple-600 to-blue-500 text-white hover:bg-linear-to-bl">
            Purple to Blue
          </button>
          <button type="button" className="btn rounded-full border-0 bg-linear-to-r from-cyan-500 to-blue-500 text-white hover:bg-linear-to-bl">
            Cyan to Blue
          </button>
          <button type="button" className="btn rounded-full border-0 bg-linear-to-br from-green-400 to-blue-600 text-white hover:bg-linear-to-bl">
            Green to Blue
          </button>
          <button type="button" className="btn rounded-full border-0 bg-linear-to-r from-purple-500 to-pink-500 text-white hover:bg-linear-to-l">
            Purple to Pink
          </button>
          <button type="button" className="btn rounded-full border-0 bg-linear-to-br from-pink-500 to-orange-400 text-white hover:bg-linear-to-bl">
            Pink to Orange
          </button>
          <button type="button" className="btn rounded-full border-0 bg-linear-to-r from-teal-200 to-lime-200 text-gray-900 hover:bg-linear-to-l">
            Teal to Lime
          </button>
          <button type="button" className="btn rounded-full border-0 bg-linear-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 hover:bg-linear-to-bl">
            Red to Yellow
          </button>
        </div>
      </div>
    </>
  )
}

const ButtonSizes = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Button Sizes</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-lg bg-primary hover:bg-primary-hover text-white">
            Large
          </button>
          <button type="button" className="btn bg-info hover:bg-info-hover text-white">
            Normal
          </button>
          <button type="button" className="btn btn-sm bg-success hover:bg-success-hover text-white">
            Small
          </button>
        </div>
      </div>
    </>
  )
}

const DisabledButtons = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Disabled Buttons</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn bg-info rounded text-white" disabled>
            Info
          </button>
          <button type="button" className="btn bg-danger rounded text-white" disabled>
            Danger
          </button>
          <button type="button" className="btn bg-dark rounded text-white" disabled>
            Dark
          </button>
        </div>
      </div>
    </>
  )
}

const BlockButton = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Block Button</h4>
      </div>
      <div className="card-body">
        <div className="space-y-3">
          <button type="button" className="btn bg-primary hover:bg-primary-hover w-full text-white">
            Block Button
          </button>
          <button type="button" className="btn btn-lg bg-success hover:bg-success-hover w-full text-white">
            Block Button
          </button>
        </div>
      </div>
    </>
  )
}

const IconButtons = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Icon Buttons</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn btn-icon bg-primary hover:bg-primary-hover text-white">
            <Icon icon="star" className="size-4.5" />
          </button>
          <button type="button" className="btn btn-icon bg-secondary hover:bg-secondary-hover text-white">
            <Icon icon="leaf" className="size-4.5" />
          </button>
          <button type="button" className="btn btn-icon bg-warning hover:bg-warning-hover text-white">
            <Icon icon="settings" className="size-4.5" />
          </button>
          <button type="button" className="btn btn-icon bg-info/15 text-info hover:bg-info hover:text-white">
            <Icon icon="bell" className="size-4.5" />
          </button>
          <button type="button" className="btn btn-icon bg-secondary hover:bg-secondary-hover text-white">
            <Icon icon="rocket" className="size-4.5" />
          </button>
          <button type="button" className="btn btn-icon border-dark text-dark hover:bg-dark rounded-full border hover:text-white">
            <Icon icon="plane" className="size-4.5" />
          </button>
          <button type="button" className="btn btn-icon bg-secondary/15 text-secondary hover:bg-secondary hover:text-white">
            <Icon icon="microphone" className="size-4.5" />
          </button>
          <button type="button" className="btn bg-light/60 hover:text-primary">
            <Icon icon="hand-stop" className="size-4.5" />
            Stop
          </button>
          <button type="button" className="btn bg-dark text-white">
            <Icon icon="bolt" className="size-4.5" />
            Boost
          </button>
          <button type="button" className="btn border-info text-info hover:bg-info border hover:text-white">
            <Icon icon="credit-card" className="size-4" />
            Payment
          </button>
          <button type="button" className="btn bg-danger hover:bg-danger-hover text-white">
            <Icon icon="tools" className="size-4" />
            Tools
          </button>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" className="btn border-secondary text-secondary hover:bg-secondary size-7.5 border hover:text-white">
            <Icon icon="star" className="size-3" />
          </button>
          <button type="button" className="btn bg-primary hover:bg-primary-hover size-7.5 text-white">
            <Icon icon="leaf" className="size-3" />
          </button>
          <button type="button" className="btn bg-success hover:bg-success-hover size-7.5 rounded-full text-white">
            <Icon icon="settings" className="size-3" />
          </button>
          <button type="button" className="btn border-secondary text-secondary hover:bg-secondary size-11.25 border hover:text-white">
            <Icon icon="bell" className="size-5" />
          </button>
          <button type="button" className="btn bg-primary hover:bg-primary-hover size-11.25 rounded-full text-white">
            <Icon icon="rocket" className="size-5" />
          </button>
          <button type="button" className="btn bg-success hover:bg-success-hover size-11.25 rounded-full text-white">
            <Icon icon="share" className="size-5" />
          </button>
          <button type="button" className="btn bg-info hover:bg-info-hover size-11.25 text-white">
            <Icon icon="star" className="size-5" />
          </button>
          <button type="button" className="btn bg-warning hover:bg-warning-hover size-11.25 text-white">
            <Icon icon="alert-octagon" className="size-5" />
          </button>
        </div>
      </div>
    </>
  )
}

const ButtonTags = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Button Tags</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-3">
          <a href="#" className="btn bg-primary hover:bg-primary-hover rounded text-white">
            Link
          </a>
          <button type="submit" className="btn bg-primary hover:bg-primary-hover rounded text-white">
            Button
          </button>
          <input type="button" className="btn bg-primary! hover:bg-primary-hover! rounded text-white" value="Input" />
          <input type="submit" className="btn bg-primary! hover:bg-primary-hover! rounded text-white" value="Submit" />
          <input type="reset" className="btn bg-primary! hover:bg-primary-hover! rounded text-white" value="Reset" />
        </div>
      </div>
    </>
  )
}

const ButtonGroup = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Button Group</h4>
      </div>
      <div className="card-body">
        <div className="mb-3 inline-flex">
          <button type="button" className="btn bg-light hover:text-primary rounded-e-none">
            Left
          </button>
          <button type="button" className="btn bg-light hover:text-primary rounded-none">
            Middle
          </button>
          <button type="button" className="btn bg-light hover:text-primary rounded-s-none">
            Right
          </button>
        </div>
        <br />
        <div className="mb-3 inline-flex">
          <button type="button" className="btn bg-light hover:text-primary rounded-e-none">
            1
          </button>
          <button type="button" className="btn bg-light hover:text-primary rounded-none">
            2
          </button>
          <button type="button" className="btn bg-light hover:text-primary rounded-none">
            3
          </button>
          <button type="button" className="btn bg-light hover:text-primary rounded-s-none">
            4
          </button>
        </div>
        &nbsp;
        <div className="mb-3 inline-flex">
          <button type="button" className="btn bg-light hover:text-primary rounded-e-none">
            5
          </button>
          <button type="button" className="btn bg-light hover:text-primary rounded-none">
            6
          </button>
          <button type="button" className="btn bg-light hover:text-primary rounded-s-none">
            7
          </button>
        </div>
        &nbsp;
        <div className="mb-3 inline-flex">
          <button type="button" className="btn bg-light hover:text-primary">
            8
          </button>
        </div>
        <br />
        <div className="mb-3 inline-flex">
          <button type="button" className="btn bg-light hover:text-primary rounded-e-none">
            1
          </button>
          <button type="button" className="btn bg-primary hover:bg-primary-hover rounded-none text-white">
            2
          </button>
          <button type="button" className="btn bg-light hover:text-primary rounded-none">
            3
          </button>
          <div className="hs-dropdown relative inline-flex">
            <button type="button" className="btn bg-light hover:text-primary rounded-s-none" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
              Dropdown
              <Icon icon="chevron-down" />
            </button>
            <div className="hs-dropdown-menu" role="menu">
              <a className="dropdown-item" href="#">
                Dropdown link
              </a>
              <a className="dropdown-item" href="#">
                Dropdown link
              </a>
            </div>
          </div>
        </div>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-base">
          <div>
            <div className="inline-flex flex-col">
              <button type="button" className="btn bg-light hover:text-primary rounded-b-none">
                Top
              </button>
              <button type="button" className="btn bg-light hover:text-primary rounded-none">
                Middle
              </button>
              <button type="button" className="btn bg-light hover:text-primary rounded-t-none">
                Bottom
              </button>
            </div>
          </div>
          <div>
            <div className="inline-flex flex-col">
              <button type="button" className="btn bg-light hover:text-primary rounded-b-none">
                Button 1
              </button>
              <button type="button" className="btn bg-light hover:text-primary rounded-none">
                Button 2
              </button>
              <div className="hs-dropdown relative inline-flex">
                <button type="button" className="btn bg-light hover:text-primary rounded-t-none" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  Button 3
                  <Icon icon="chevron-down" />
                </button>
                <div className="hs-dropdown-menu" role="menu">
                  <a className="dropdown-item" href="#">
                    Dropdown link
                  </a>
                  <a className="dropdown-item" href="#">
                    Dropdown link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
