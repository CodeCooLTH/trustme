'use client'

import EChart from '@/components/wrappers/EChart'
import { getColor } from '@/utils/helpers'
import { registerMap } from 'echarts'
import { MapChart } from 'echarts/charts'
import { GeoComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useCallback, useEffect, useState } from 'react'
const WorldMap = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BASE_URL + '/data/world_geo.json')
      .then((res) => res.json())
      .then((worldGeoJson) => {
        registerMap('world', worldGeoJson)
        setLoaded(true)
      })
  }, [])
  const getOptions = useCallback(() => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}',
        padding: [7, 10],
        backgroundColor: getColor('bg-card'),
        borderColor: getColor('default-300'),
        textStyle: {
          color: getColor('default-600'),
        },
        borderWidth: 1,
        transitionDuration: 0,
      },
      textStyle: {
        fontFamily: getComputedStyle(document.body).fontFamily,
      },
      geo: {
        map: 'world',
        roam: true,
        itemStyle: {
          borderColor: getColor('default-300'),
          areaColor: getColor('chart-primary'),
        },
        label: {
          color: '#fff',
        },
        emphasis: {
          label: {
            show: true,
            color: '#fff',
          },
          itemStyle: {
            areaColor: getColor('chart-gamma'),
          },
        },
      },
      legend: {
        textStyle: {
          color: '#858d98',
        },
      },
      series: [],
    }
  }, [])
  return (
    <>
      {loaded && (
        <EChart
          getOptions={getOptions}
          extensions={[GeoComponent, TooltipComponent, LegendComponent, MapChart, CanvasRenderer]}
          style={{
            height: '400px',
            width: '100%',
          }}
        />
      )}
    </>
  )
}
export default WorldMap
