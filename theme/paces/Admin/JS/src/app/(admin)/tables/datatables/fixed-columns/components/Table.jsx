'use client'

import dynamic from 'next/dynamic'
const ColumnTable = dynamic(() => import('./ColumnTable'), {
  ssr: false,
})
const Table = () => {
  return (
    <div className="card">
      <div className="card-header justify-between">
        <h4 className="card-title">Export Data with Buttons</h4>
      </div>
      <div className="card-body">
        <ColumnTable />
      </div>
    </div>
  )
}
export default Table
