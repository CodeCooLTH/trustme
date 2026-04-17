'use client'

import { useLayoutContext } from '@/context/useLayoutContext'
import * as echarts from 'echarts/core'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
const ReactECharts = dynamic(() => import('echarts-for-react'), {
  ssr: false,
})
let extensionsRegistered = false
const EChart = ({ getOptions, extensions, ...props }) => {
  if (!extensionsRegistered) {
    echarts.use(extensions)
    extensionsRegistered = true
  }
  const { skin, theme } = useLayoutContext()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo(() => typeof window !== 'undefined' && getOptions(), [getOptions, skin, theme])
  return <ReactECharts echarts={echarts} {...props} option={options} />
}
export default EChart
