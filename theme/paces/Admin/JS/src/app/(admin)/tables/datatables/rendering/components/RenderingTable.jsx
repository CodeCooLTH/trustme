'use client'

import dynamic from 'next/dynamic'
const Table = dynamic(() => import('./Table'), {
  ssr: false,
})
const RenderingTable = () => {
  return (
    <div className="card">
      <div className="card-header justify-between">
        <h4 className="card-title">Example</h4>
      </div>
      <div className="card-body">
        <Table />
      </div>
    </div>
  )
}
export default RenderingTable
