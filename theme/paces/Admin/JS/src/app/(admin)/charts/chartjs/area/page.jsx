import PageBreadcrumb from '@/components/PageBreadcrumb'
import { AreaChartJs, BoundariesChart, DifferentDatasetChart, DrawTimeChart, StackedChart } from './components/AreaChart'
export const metadata = {
  title: 'Area Charts',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Area Charts" subtitle="Charts" />
      <div className="container-fluid">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-base">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Basic Area</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div
                  className="mt-3"
                  style={{
                    height: 300,
                  }}
                >
                  <AreaChartJs />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Different Dataset</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div
                  className="mt-3"
                  style={{
                    height: 300,
                  }}
                >
                  <DifferentDatasetChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Stacked</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div
                  className="mt-3"
                  style={{
                    height: 300,
                  }}
                >
                  <StackedChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Boundaries</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div
                  className="mt-3"
                  style={{
                    height: 300,
                  }}
                >
                  <BoundariesChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Draw Time</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div
                  className="mt-3"
                  style={{
                    height: 300,
                  }}
                >
                  <DrawTimeChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Page
