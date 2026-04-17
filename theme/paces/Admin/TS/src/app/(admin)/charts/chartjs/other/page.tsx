import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Bubblechart, ComboBarLineChart, DoughnutChart, MultiPieChart, PieChart, PolarAreaChart, RadarChart, ScatterChart, StackedBarLineChart } from './components/OthersChart'

export const metadata: Metadata = { title: 'Other Charts' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Other Charts" subtitle="Charts" />
      <div className="container-fluid">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-base">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Bubble</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div className="mt-3" style={{ height: 300 }}>
                  <Bubblechart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Combo Bar &amp; Line</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div className="mt-3" style={{ height: 300 }}>
                  <ComboBarLineChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Stacked Bar &amp; Line</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div className="mt-3" style={{ height: 300 }}>
                  <StackedBarLineChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Doughnut</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div className="mt-3" style={{ height: 300 }}>
                  <DoughnutChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Multi Series Pie</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div className="mt-3" style={{ height: 300 }}>
                  <MultiPieChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Pie</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div className="mt-3" style={{ height: 300 }}>
                  <PieChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Polar Area</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div className="mt-3" style={{ height: 300 }}>
                  <PolarAreaChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Radar</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div className="mt-3" style={{ height: 300 }}>
                  <RadarChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Scatter</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div className="mt-3" style={{ height: 300 }}>
                  <ScatterChart />
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
