'use client'

import dynamic from 'next/dynamic'
const BasicGaugeEChart = dynamic(() => import('./GaugeChart').then((mod) => mod.BasicGaugeEChart), {
  ssr: false,
})
const MultiGaugeChart = dynamic(() => import('./GaugeChart').then((mod) => mod.MultiGaugeChart), {
  ssr: false,
})
const MultiRingGaugeChart = dynamic(() => import('./GaugeChart').then((mod) => mod.MultiRingGaugeChart), {
  ssr: false,
})
const RingGaugeChart = dynamic(() => import('./GaugeChart').then((mod) => mod.RingGaugeChart), {
  ssr: false,
})
const SpeedStageGaugeChart = dynamic(() => import('./GaugeChart').then((mod) => mod.SpeedStageGaugeChart), {
  ssr: false,
})
const TemperatureChart = dynamic(() => import('./GaugeChart').then((mod) => mod.TemperatureChart), {
  ssr: false,
})
const Gauges = () => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Basic Gauge Chart</h4>
        </div>
        <div className="card-body">
          <BasicGaugeEChart />
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Speed Stage Gauge Chart</h4>
        </div>
        <div className="card-body">
          <SpeedStageGaugeChart />
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Ring Gauge Chart</h4>
        </div>
        <div className="card-body">
          <RingGaugeChart />
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Temperature Chart</h4>
        </div>
        <div className="card-body">
          <TemperatureChart />
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Multi Ring Gauge Chart</h4>
        </div>
        <div className="card-body">
          <MultiRingGaugeChart />
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Multi Gauge Chart</h4>
        </div>
        <div className="card-body">
          <MultiGaugeChart />
        </div>
      </div>
    </>
  )
}
export default Gauges
