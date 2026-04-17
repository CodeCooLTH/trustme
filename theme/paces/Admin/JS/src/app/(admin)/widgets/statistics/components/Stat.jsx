import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
const Stat = () => {
  return (
    <>
      <div className="card h-full">
        <div className="card-body">
          <div className="flex justify-between">
            <div>
              <h5 className="text-default-400 text-sm mb-2 uppercase font-semibold" title="Total Orders">
                Total Orders
              </h5>
              <h3 className="my-2.5 py-1.25 text-xl">
                <CountUp end={12540} start={0} duration={1} />
              </h3>
              <p className="text-default-400 flex">
                <span className="text-success me-2.5 flex items-center">
                  <Icon icon="arrow-up" /> 3.2%
                </span>
                Since last month
              </p>
            </div>
            <div>
              <span className="size-11 flex justify-center items-center rounded-md bg-primary/15">
                <Icon icon="shopping-cart" className="text-primary size-5.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-info/10 border border-info/25 h-full">
        <div className="card-body">
          <div className="flex justify-between">
            <div>
              <h5 className="text-default-400 text-sm uppercase font-semibold" title="New Customers">
                New Customers
              </h5>
              <h3 className="my-2.5 py-1.25 font-semibold text-xl">
                <CountUp end={1284} start={0} duration={1} />
              </h3>
              <p className="text-default-400 flex">
                <span className="text-success me-2.5 flex items-center">
                  <Icon icon="arrow-up" /> 6.1%
                </span>
                Since last month
              </p>
            </div>
            <div>
              <span className="size-11 flex justify-center items-center rounded-full bg-info text-white">
                <Icon icon="users" className="size-5.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-primary h-full">
        <div className="card-body">
          <div className="flex justify-between">
            <div>
              <h5 className="text-white/50 text-sm uppercase font-semibold" title="Total Revenue">
                Revenue
              </h5>
              <h3 className="my-2.5 py-1.25 text-xl text-white">
                <CountUp end={98.4} start={0} duration={1} prefix="$" suffix="k" decimals={2} />
              </h3>
              <p className="text-white/50 flex">
                <span className="text-white me-2.5 flex items-center">
                  <Icon icon="arrow-down" /> 2.9%
                </span>
                Since last month
              </p>
            </div>
            <div>
              <span className="size-11 flex justify-center items-center rounded-md bg-white/25">
                <Icon icon="pig-money" className="text-white size-5.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="card h-full">
        <div className="card-body">
          <div className="flex justify-between">
            <div>
              <h5 className="text-default-400 text-sm mb-2 uppercase font-semibold" title="Conversion Rate">
                Conversion Rate
              </h5>
              <h3 className="my-2.5 py-1.25 text-xl">
                <CountUp end={4.76} start={0} duration={1} decimals={2} />%
              </h3>
              <p className="text-default-400 flex">
                <span className="text-success me-2.5 flex items-center">
                  <Icon icon="arrow-up" />
                  1.4%
                </span>
                Since last month
              </p>
            </div>
            <div>
              <span className="size-11 flex justify-center items-center rounded-md bg-primary/15">
                <Icon icon="trending-up" className="text-primary size-5.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Stat
