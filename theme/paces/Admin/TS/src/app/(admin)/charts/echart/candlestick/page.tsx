import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { BasicCandlestick, MixedCandlestick } from './components/Candlestick'

export const metadata: Metadata = { title: 'Candlestick Echart' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Candlestick Echart" subtitle="Charts" />
      <div className="container-fluid">
        <div className="space-y-5">
          <div>
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Basic Candlestick Chart</h4>
              </div>
              <div className="card-body">
                <BasicCandlestick />
              </div>
            </div>
          </div>

          <div>
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Mixed Candlestick Chart</h4>
              </div>
              <div className="card-body">
                <MixedCandlestick />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
