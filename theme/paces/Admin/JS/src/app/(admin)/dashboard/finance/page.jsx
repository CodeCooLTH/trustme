import flower from '@/assets/images/flower-style.svg'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { META_DATA } from '@/config/constants'
import FinancialOverview from './components/FinancialOverview'
import QuickTransfer from './components/QuickTransfer'
import RecentTransaction from './components/RecentTransaction'
import Stat from './components/Stat'
import TargetAndGoal from './components/TargetAndGoal'
import TotalBalance from './components/TotalBalance'
export const metadata = {
  title: 'Finance Dashboard',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Finance" subtitle="Dashboard" />

      <div className="container-fluid">
        <div id="dismiss-alert" className="mb-4 hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 bg-primary/10 text-primary text-sm rounded ps-4 py-0.5 pe-0" role="alert" tabIndex={-1} aria-labelledby="hs-dismiss-button-label">
          <div className="flex flex-wrap items-center gap-1.25">
            <div className="flex lg:items-center items-start gap-1.25">
              <div>
                <Icon icon="lifebuoy" className="text-2xl align-middle" />
              </div>
              <div>
                <h3 id="hs-dismiss-button-label" className="text-sm font-medium">
                  <b> Dear{META_DATA.username}- </b>
                  We kindly encourage you to review your recent transactions and financial commitments to ensure that your account is in good standing.
                </h3>
              </div>
            </div>
            <div className="ms-auto">
              <div className="flex items-center">
                <div>
                  <a href="#!" className="text-primary underline underline-offset-4">
                    <b>Action Now</b>
                  </a>
                </div>
                <button type="button" data-hs-remove-element="#dismiss-alert" className="size-11.5 flex justify-center items-center">
                  <Icon icon="x" className="text-2xl text-default-700 align-middle" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid xl:grid-cols-3 grid-cols-1 gap-base mb-base">
          <div className="xl:col-span-1">
            <TotalBalance />
          </div>
          <div className="xl:col-span-2">
            <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-base h-full">
              <Stat />
            </div>
          </div>
        </div>
        <div className="grid xl:grid-cols-3 grid-cols-1 gap-base mb-base">
          <div className="xl:col-span-2">
            <FinancialOverview />
          </div>
          <div className="xl:col-span-1">
            <div className="card !bg-secondary bg-linear-to-b from-white/30 to-white/0 text-white bg-cover bg-right mb-base">
              <div
                className="card-body"
                style={{
                  backgroundImage: `url(${flower.src})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right bottom',
                }}
              >
                <h4 className="text-lg font-semibold text-white mb-2">Investment Growth</h4>
                <p className="text-white/75 text-sm mb-4">Track performance and see where your money is heading.</p>
                <a href="#!" className="btn btn-sm rounded-full bg-info hover:bg-info-hover bg-linear-to-b from-white/30 to-white/0 text-white font-semibold">
                  View Portfolio
                </a>
              </div>
            </div>
            <QuickTransfer />
          </div>
        </div>
        <div className="mb-base">
          <RecentTransaction />
        </div>
        <div className="flex items-center mt-2.5 mb-base">
          <h4 className="font-bold text-md mb-2">My Targets &amp; Goals</h4>
          <a href="#!" className="underline underline-offset-4 font-semibold text-md ms-auto">
            See All
          </a>
        </div>
        <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-base">
          <TargetAndGoal />
        </div>
      </div>
    </>
  )
}
export default Page
