import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { BasicLineChart, InterpolationChart, LineSegmentChart, MultiAxesChart, PointStylingChart } from './components/LineChart'

export const metadata: Metadata = { title: 'Line Charts' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Line Charts" subtitle="Charts" />
      <div className="container-fluid">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-base">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Basic Line</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div className="mt-3" style={{ height: 300 }}>
                  <BasicLineChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Interpolation</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div className="mt-3" style={{ height: 300 }}>
                  <InterpolationChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Multi-Axes</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div className="mt-3" style={{ height: 300 }}>
                  <MultiAxesChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Point Styling</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div className="mt-3" style={{ height: 300 }}>
                  <PointStylingChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Line Segment</h5>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <div className="mt-3" style={{ height: 300 }}>
                  <LineSegmentChart />
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
