'use client'

import dynamic from 'next/dynamic'
const VerticalScroll = dynamic(() => import('./VerticalScroll'), {
  ssr: false,
})
const HorizontalScroll = dynamic(() => import('./HorizontalScroll'), {
  ssr: false,
})
const Table = () => {
  return (
    <>
      <VerticalScroll />
      <HorizontalScroll />
    </>
  )
}
export default Table
