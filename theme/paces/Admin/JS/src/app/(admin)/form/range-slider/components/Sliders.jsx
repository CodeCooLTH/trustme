'use client'

import dynamic from 'next/dynamic'
const RangeSlider = dynamic(() => import('./RangeSlider'), {
  ssr: false,
})
const Sliders = () => {
  return <RangeSlider />
}
export default Sliders
