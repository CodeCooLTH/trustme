'use client'

import dynamic from 'next/dynamic'
const BasicBarChart = dynamic(() => import('./BarChart').then((m) => m.BasicBarChart), {
  ssr: false,
})
const GradientBarChart = dynamic(() => import('./BarChart').then((m) => m.GradientBarChart), {
  ssr: false,
})
const HoriBarChart = dynamic(() => import('./BarChart').then((m) => m.HoriBarChart), {
  ssr: false,
})
const HorizontalStackedBar = dynamic(() => import('./BarChart').then((m) => m.HorizontalStackedBar), {
  ssr: false,
})
const MixdedBarChart = dynamic(() => import('./BarChart').then((m) => m.MixdedBarChart), {
  ssr: false,
})
const NegativeChart = dynamic(() => import('./BarChart').then((m) => m.NegativeChart), {
  ssr: false,
})
const ProgressBar = dynamic(() => import('./BarChart').then((m) => m.ProgressBar), {
  ssr: false,
})
const RaceBarChart = dynamic(() => import('./BarChart').then((m) => m.RaceBarChart), {
  ssr: false,
})
const SeriesBarChart = dynamic(() => import('./BarChart').then((m) => m.SeriesBarChart), {
  ssr: false,
})
const StackedBarChart = dynamic(() => import('./BarChart').then((m) => m.StackedBarChart), {
  ssr: false,
})
const TimelineBarChart = dynamic(() => import('./BarChart').then((m) => m.TimelineBarChart), {
  ssr: false,
})
const TwobarChart = dynamic(() => import('./BarChart').then((m) => m.TwobarChart), {
  ssr: false,
})
const Charts = () => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Basic Bar Chart</h4>
        </div>
        <div className="card-body">
          <BasicBarChart />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Two Bar Chart</h4>
        </div>
        <div className="card-body">
          <TwobarChart />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Progress Bar Chart</h4>
        </div>
        <div className="card-body">
          <ProgressBar />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Horizontal Bar Chart</h4>
        </div>
        <div className="card-body">
          <HoriBarChart />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Negative Chart</h4>
        </div>
        <div className="card-body">
          <NegativeChart />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Bar Chart with Series</h4>
        </div>
        <div className="card-body">
          <SeriesBarChart />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Stacked Bar</h4>
        </div>
        <div className="card-body">
          <StackedBarChart />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Horizontal Stacked Bar</h4>
        </div>
        <div className="card-body">
          <HorizontalStackedBar />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Bar Race Chart</h4>
        </div>
        <div className="card-body">
          <RaceBarChart />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Bar Gradient Chart</h4>
        </div>
        <div className="card-body">
          <GradientBarChart />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Mixded Bar Chart</h4>
        </div>
        <div className="card-body">
          <MixdedBarChart />
        </div>
      </div>

      <div className="col-span-2">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Timeline Bar Chart</h4>
          </div>
          <div className="card-body">
            <TimelineBarChart />
          </div>
        </div>
      </div>
    </>
  )
}
export default Charts
