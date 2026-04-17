'use client'
import { type EChartsOption } from 'echarts'
import { EChartsReactProps } from 'echarts-for-react'
import * as echarts from 'echarts/core'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import { useLayoutContext } from '@/context/useLayoutContext'

const ReactECharts = dynamic(() => import('echarts-for-react'), {
  ssr: false,
})

type EChartClientProps = {
  getOptions: () => EChartsOption
  extensions: any[]
} & Omit<EChartsReactProps, 'option'>

let extensionsRegistered = false

const EChart = ({ getOptions, extensions, ...props }: EChartClientProps) => {
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
