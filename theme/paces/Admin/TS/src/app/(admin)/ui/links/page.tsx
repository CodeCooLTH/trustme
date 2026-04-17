import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Links' }

const Page = () => {
  return (
    <>
      <div className="container-fluid">
        <PageBreadcrumb title="Links" subtitle="Base UI" />

        <div className="container-fluid">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-base">
            <div className="card">
              <ColoredLink />
            </div>
            <div className="card">
              <LinkUtilities />
            </div>
            <div className="card">
              <LinkOpacity />
            </div>
            <div className="card">
              <LinkHoverOpacity />
            </div>
            <div className="card">
              <UnderlineColor />
            </div>
            <div className="card">
              <UnderlineOpacity />
            </div>
            <div className="card">
              <UnderlineOffset />
            </div>
            <div className="card">
              <HoverVariants />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page

const ColoredLink = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Colored Links</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-col gap-4">
          <p>
            <a href="#" className="text-primary hover:text-primary-hover">
              Primary link
            </a>
          </p>
          <p>
            <a href="#" className="text-secondary hover:text-secondary-hover">
              Secondary link
            </a>
          </p>
          <p>
            <a href="#" className="text-success hover:text-success-hover">
              Success link
            </a>
          </p>
          <p>
            <a href="#" className="text-danger hover:text-danger-hover">
              Danger link
            </a>
          </p>
          <p>
            <a href="#" className="text-warning hover:text-warning-hover">
              Warning link
            </a>
          </p>
          <p>
            <a href="#" className="text-info hover:text-info-hover">
              Info link
            </a>
          </p>
          <p>
            <a href="#" className="text-light hover:text-light-hover">
              Light link
            </a>
          </p>
          <p>
            <a href="#" className="text-dark hover:text-dark-hover">
              Dark link
            </a>
          </p>
          <p>
            <a href="#" className="text-default-700 hover:text-default-500">
              Emphasis link
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

const LinkUtilities = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Link Utilities</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-col gap-4">
          <p>
            <a href="#" className="text-primary hover:text-primary-hover underline">
              Primary link
            </a>
          </p>
          <p>
            <a href="#" className="text-secondary hover:text-secondary-hover underline">
              Secondary link
            </a>
          </p>
          <p>
            <a href="#" className="text-success hover:text-success-hover underline">
              Success link
            </a>
          </p>
          <p>
            <a href="#" className="text-danger hover:text-danger-hover underline">
              Danger link
            </a>
          </p>
          <p>
            <a href="#" className="text-warning hover:text-warning-hover underline">
              Warning link
            </a>
          </p>
          <p>
            <a href="#" className="text-info hover:text-info-hover underline">
              Info link
            </a>
          </p>
          <p>
            <a href="#" className="text-light hover:text-light-hover underline">
              Light link
            </a>
          </p>
          <p>
            <a href="#" className="text-dark hover:text-dark-hover underline">
              Dark link
            </a>
          </p>
          <p>
            <a href="#" className="text-default-700 hover:text-default-500 underline">
              Emphasis link
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

const LinkOpacity = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Link Opacity</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-col gap-4">
          <p>
            <a href="#" className="text-primary hover:text-primary-hover opacity-10">
              Link opacity 10
            </a>
          </p>
          <p>
            <a href="#" className="text-primary hover:text-primary-hover opacity-25">
              Link opacity 25
            </a>
          </p>
          <p>
            <a href="#" className="text-primary hover:text-primary-hover opacity-50">
              Link opacity 50
            </a>
          </p>
          <p>
            <a href="#" className="text-primary hover:text-primary-hover opacity-75">
              Link opacity 75
            </a>
          </p>
          <p>
            <a href="#" className="text-primary hover:text-primary-hover opacity-100">
              Link opacity 100
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

const LinkHoverOpacity = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Link Hover Opacity</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-col gap-4">
          <p>
            <a href="#" className="text-primary hover:text-primary-hover hover:opacity-10">
              Link opacity 10
            </a>
          </p>
          <p>
            <a href="#" className="text-primary hover:text-primary-hover hover:opacity-25">
              Link opacity 25
            </a>
          </p>
          <p>
            <a href="#" className="text-primary hover:text-primary-hover hover:opacity-50">
              Link opacity 50
            </a>
          </p>
          <p>
            <a href="#" className="text-primary hover:text-primary-hover hover:opacity-75">
              Link opacity 75
            </a>
          </p>
          <p>
            <a href="#" className="text-primary hover:text-primary-hover hover:opacity-100">
              Link opacity 100
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

const UnderlineColor = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Underline Color</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-col gap-4">
          <p>
            <a href="#" className="decoration-primary text-primary hover:text-primary-hover underline">
              Primary underline
            </a>
          </p>
          <p>
            <a href="#" className="decoration-secondary text-primary hover:text-primary-hover underline">
              Secondary underline
            </a>
          </p>
          <p>
            <a href="#" className="decoration-success text-primary hover:text-primary-hover underline">
              Success underline
            </a>
          </p>
          <p>
            <a href="#" className="decoration-danger text-primary hover:text-primary-hover underline">
              Danger underline
            </a>
          </p>
          <p>
            <a href="#" className="decoration-warning text-primary hover:text-primary-hover underline">
              Warning underline
            </a>
          </p>
          <p>
            <a href="#" className="decoration-info text-primary hover:text-primary-hover underline">
              Info underline
            </a>
          </p>
          <p>
            <a href="#" className="decoration-light text-primary hover:text-primary-hover underline">
              Light underline
            </a>
          </p>
          <p>
            <a href="#" className="decoration-dark text-primary hover:text-primary-hover underline">
              Dark underline
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

const UnderlineOpacity = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Underline Opacity</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-col gap-4">
          <p>
            <a href="#" className="decoration-primary/0 text-primary hover:text-primary-hover underline">
              Underline opacity 0
            </a>
          </p>
          <p>
            <a href="#" className="decoration-primary/15 text-primary hover:text-primary-hover underline">
              Underline opacity 10
            </a>
          </p>
          <p>
            <a href="#" className="decoration-primary/25 text-primary hover:text-primary-hover underline">
              Underline opacity 25
            </a>
          </p>
          <p>
            <a href="#" className="decoration-primary/50 text-primary hover:text-primary-hover underline">
              Underline opacity 50
            </a>
          </p>
          <p>
            <a href="#" className="decoration-primary/75 text-primary hover:text-primary-hover underline">
              Underline opacity 75
            </a>
          </p>
          <p>
            <a href="#" className="decoration-primary/100 text-primary hover:text-primary-hover underline">
              Underline opacity 100
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

const UnderlineOffset = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Underline Offset</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-col gap-4">
          <p>
            <a href="#" className="text-primary hover:text-primary-hover">
              Default link
            </a>
          </p>
          <p>
            <a href="#" className="text-primary hover:text-primary-hover underline">
              Offset 1 link
            </a>
          </p>
          <p>
            <a href="#" className="text-primary hover:text-primary-hover underline">
              Offset 2 link
            </a>
          </p>
          <p>
            <a href="#" className="text-primary hover:text-primary-hover underline">
              Offset 3 link
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

const HoverVariants = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Hover Variants</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-col gap-4">
          <p>
            <a href="#" className="text-primary hover:text-primary-hover hover:underline">
              Underline opacity 0
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
