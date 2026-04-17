import PageBreadcrumb from '@/components/PageBreadcrumb'
import { BasicBarChart, BorderReducedBarChart, FloatingChart, HorizontalChart, StackedChart, StackedwithGroupsChart, VerticalChart } from './components/BarChart'
export const metadata = {
  title: 'Bar Charts',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Bar Charts" subtitle="Charts" />
      <div className="container-fluid">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-base">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Basic Bar</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div
                  className="mt-3"
                  style={{
                    height: 300,
                  }}
                >
                  <BasicBarChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Border Radius</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div
                  className="mt-3"
                  style={{
                    height: 300,
                  }}
                >
                  <BorderReducedBarChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Floating</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div
                  className="mt-3"
                  style={{
                    height: 300,
                  }}
                >
                  <FloatingChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Horizontal</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div
                  className="mt-3"
                  style={{
                    height: 300,
                  }}
                >
                  <HorizontalChart />
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
              <h5 className="card-title">Stacked with Groups</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div
                  className="mt-3"
                  style={{
                    height: 300,
                  }}
                >
                  <StackedwithGroupsChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Vertical</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div
                  className="mt-3"
                  style={{
                    height: 300,
                  }}
                >
                  <VerticalChart />
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
