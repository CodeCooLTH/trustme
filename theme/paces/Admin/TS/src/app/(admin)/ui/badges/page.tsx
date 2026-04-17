import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Badges' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Badges" subtitle="Base UI" />

      <div className="container-fluid">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-base">
          <div className="card">
            <BasicBadges />
          </div>
          <div className="card">
            <BasicPillBadges />
          </div>
          <div className="card">
            <OutlineBadges />
          </div>
          <div className="card">
            <OutlinePillBadges />
          </div>
          <div className="card">
            <LightenBadges />
          </div>
          <div className="card">
            <LightenPillBadges />
          </div>
          <div className="card">
            <LabelBadges />
          </div>
          <div className="card">
            <SquareBadges />
          </div>
          <div className="card">
            <CircleBadges />
          </div>
          <div className="card">
            <Positioned />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page

const BasicBadges = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Basic Badges</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-2">
          <span className="badge border-default-300 border">Default</span>
          <span className="badge bg-primary text-white">Primary</span>
          <span className="badge bg-secondary text-white">Secondary</span>
          <span className="badge bg-success text-white">Success</span>
          <span className="badge bg-danger text-white">Danger</span>
          <span className="badge bg-warning text-white">Warning</span>
          <span className="badge bg-info text-white">Info</span>
          <span className="badge bg-light">Light</span>
          <span className="badge bg-dark text-white">Dark</span>
        </div>
      </div>
    </>
  )
}

const BasicPillBadges = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Basic Pill Badges</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-2">
          <span className="badge border-default-300 rounded-full border">Default</span>
          <span className="badge bg-primary rounded-full text-white">Primary</span>
          <span className="badge bg-secondary rounded-full text-white">Secondary</span>
          <span className="badge bg-success rounded-full text-white">Success</span>
          <span className="badge bg-danger rounded-full text-white">Danger</span>
          <span className="badge bg-warning rounded-full text-white">Warning</span>
          <span className="badge bg-info rounded-full text-white">Info</span>
          <span className="badge bg-light rounded-full">Light</span>
          <span className="badge bg-dark rounded-full text-white">Dark</span>
        </div>
      </div>
    </>
  )
}

const OutlineBadges = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Outline Badges</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-2">
          <span className="badge border-primary text-primary border">Primary</span>
          <span className="badge border-secondary text-secondary border">Secondary</span>
          <span className="badge border-success text-success border">Success</span>
          <span className="badge border-danger text-danger border">Danger</span>
          <span className="badge border-warning text-warning border">Warning</span>
          <span className="badge border-info text-info border">Info</span>
          <span className="badge border-dark text-dark border">Dark</span>
        </div>
      </div>
    </>
  )
}

const OutlinePillBadges = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Outline Pill Badges</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-2">
          <span className="badge border-primary text-primary rounded-full border">Primary</span>
          <span className="badge border-secondary text-secondary rounded-full border">Secondary</span>
          <span className="badge border-success text-success rounded-full border">Success</span>
          <span className="badge border-danger text-danger rounded-full border">Danger</span>
          <span className="badge border-warning text-warning rounded-full border">Warning</span>
          <span className="badge border-info text-info rounded-full border">Info</span>
          <span className="badge border-dark text-dark rounded-full border">Dark</span>
        </div>
      </div>
    </>
  )
}

const LightenBadges = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Lighten Badges</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-2">
          <span className="badge bg-primary/15 text-primary">Primary</span>
          <span className="badge bg-secondary/15 text-secondary">Secondary</span>
          <span className="badge bg-success/15 text-success">Success</span>
          <span className="badge bg-danger/15 text-danger">Danger</span>
          <span className="badge bg-warning/15 text-warning">Warning</span>
          <span className="badge bg-info/15 text-info">Info</span>
          <span className="badge bg-dark/15 text-dark">Dark</span>
        </div>
      </div>
    </>
  )
}

const LightenPillBadges = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Lighten Pill Badges</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-2">
          <span className="badge bg-primary/15 text-primary rounded-full">Primary</span>
          <span className="badge bg-secondary/15 text-secondary rounded-full">Secondary</span>
          <span className="badge bg-success/15 text-success rounded-full">Success</span>
          <span className="badge bg-danger/15 text-danger rounded-full">Danger</span>
          <span className="badge bg-warning/15 text-warning rounded-full">Warning</span>
          <span className="badge bg-info/15 text-info rounded-full">Info</span>
          <span className="badge bg-dark/15 text-dark rounded-full">Dark</span>
        </div>
      </div>
    </>
  )
}

const LabelBadges = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Label Badges</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-2">
          <span className="badge badge-label border-default-300 border">Default</span>
          <span className="badge badge-label bg-primary text-white">Primary</span>
          <span className="badge badge-label bg-secondary text-white">Secondary</span>
          <span className="badge badge-label bg-success text-white">Success</span>
          <span className="badge badge-label bg-danger text-white">Danger</span>
          <span className="badge badge-label bg-warning text-white">Warning</span>
          <span className="badge badge-label bg-info text-white">Info</span>
          <span className="badge badge-label bg-light text-dark">Light</span>
          <span className="badge badge-label bg-dark text-white">Dark</span>
        </div>
      </div>
    </>
  )
}

const SquareBadges = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Square Badges</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-2">
          <span className="badge size-4 border border-default-300">0</span>
          <span className="badge size-4 bg-primary text-white">1</span>
          <span className="badge size-4 bg-secondary text-white">2</span>
          <span className="badge size-4 bg-success text-white">3</span>
          <span className="badge size-4 bg-danger text-white">4</span>
          <span className="badge size-4 bg-warning text-white">5</span>
          <span className="badge size-4 bg-info text-white">6</span>
          <span className="badge size-4 bg-light">7</span>
          <span className="badge size-4 bg-dark text-white">8</span>
        </div>
      </div>
    </>
  )
}

const CircleBadges = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Circle Badges</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-2">
          <span className="badge size-4 rounded-full border border-default-300">0</span>
          <span className="badge size-4 rounded-full bg-primary text-white">1</span>
          <span className="badge size-4 rounded-full bg-secondary text-white">2</span>
          <span className="badge size-4 rounded-full bg-success text-white">3</span>
          <span className="badge size-4 rounded-full bg-danger text-white">4</span>
          <span className="badge size-4 rounded-full bg-warning text-white">5</span>
          <span className="badge size-4 rounded-full bg-info text-white">6</span>
          <span className="badge size-4 rounded-full bg-light text-dark">7</span>
          <span className="badge size-4 rounded-full bg-dark text-white">8</span>
        </div>
      </div>
    </>
  )
}

const Positioned = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Positioned</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-4">
          <button type="button" className="btn bg-primary hover:bg-primary-hover relative text-white transition-all duration-300">
            Inbox
            <span className="bg-danger absolute -end-1 -top-1 rounded-full px-0.75 py-0.5 text-[9px]">99+</span>
          </button>
          <button type="button" className="btn bg-primary hover:bg-primary-hover relative text-white transition-all duration-300">
            Profile
            <span className="bg-danger absolute -end-1 -top-1 size-3 rounded-full border-1 border-white px-0.75 py-0.5 text-[9px]" />
          </button>
          <button type="button" className="btn bg-success hover:bg-success-hover text-white transition-all duration-300">
            Notifications
            <span className="flex size-3.5 items-center justify-center rounded bg-white text-[9px] font-semibold text-black">4</span>
          </button>
        </div>
      </div>
    </>
  )
}
