import logosm from '@/assets/images/logo-sm.png'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { META_DATA } from '@/config/constants'
import { Metadata } from 'next'
import Image from 'next/image'
import { AreaChartDatetime, AreawithNegativeValues, AreaWithNullValues, BasicAreaChart, IrregularTimeSeries, SelectionGithubStyle, SelectionGithubStyle2, SplineAreaChart, StackedAreaChart } from './components/AreaChart'

export const metadata: Metadata = { title: 'Apex Areachart' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Area Apexchart" subtitle="Apex" />

      <div className="container-fluid">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-base">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Basic Area Chart</h4>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <BasicAreaChart />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Spline Area</h4>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <SplineAreaChart />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Area Chart - Datetime X-axis</h4>
            </div>
            <div className="card-body">
              <AreaChartDatetime />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Area with Negative Values</h4>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <AreawithNegativeValues />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Selection - Github Style</h4>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <SelectionGithubStyle2 />
                <div className="pt-2 pb-1">
                  <div className="flex items-center justify-center gap-2">
                    <Image src={logosm} className="size-8 rounded" alt="file-image" />
                    <a href="" className="text-default-400 text-base font-bold">
                      {META_DATA.name}
                    </a>
                  </div>
                </div>
                <SelectionGithubStyle />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Stacked Area</h4>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <StackedAreaChart />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Irregular TimeSeries</h4>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <IrregularTimeSeries />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Area Chart with Null values</h4>
            </div>
            <div className="card-body">
              <div dir="ltr">
                <AreaWithNullValues />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
