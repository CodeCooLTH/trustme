'use client'
import dynamic from 'next/dynamic'
const BasicDataTable = dynamic(() => import('./BasicDataTable'), { ssr: false })
const ComplexHeader = dynamic(() => import('./ComplexHeader'), { ssr: false })

const BasicTable = () => {
  return (
    <>
      <BasicDataTable />
      <ComplexHeader />
    </>
  )
}

export default BasicTable
