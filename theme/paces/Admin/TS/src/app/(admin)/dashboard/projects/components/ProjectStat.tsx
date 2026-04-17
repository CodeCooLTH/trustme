'use client'
import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { useCallback, useEffect, useState } from 'react'
import { projectStatData } from './data'

const ProjectStat = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(20000)
  const [startTime, setStartTime] = useState<number | null>(null)

  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return [hours, minutes, secs].map((v) => (v < 10 ? `0${v}` : v)).join(':')
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => {
          return startTime ? Math.floor((Date.now() - startTime) / 1000) : prev + 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, startTime])

  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false)
    } else {
      setStartTime(Date.now() - elapsedTime * 1000)
      setIsRunning(true)
    }
  }

  return (
    <>
      <div className="card mb-base">
        <div className="card-body p-0">
          <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-1 items-center justify-center md:divide-x divide-y md:divide-y-0 divide-dashed divide-light">
            {projectStatData.map((item, idx) => (
              <div key={idx}>
                <div className="p-5 text-center">
                  <h5 className="text-default-400 text-xs uppercase mb-2" title="Number of Orders">
                    {item.title}
                  </h5>
                  <div className="flex items-center justify-center gap-2.5 my-5">
                    <div className={`size-8 ${item.className} flex items-center justify-center rounded-full`}>
                      <Icon icon={item.icon} className="text-xl" />
                    </div>
                    <h3 className="text-xl font-bold">
                      <CountUp end={item.value} start={0} duration={1} prefix={item.prefix} suffix={item.suffix} decimal="." decimals={Number.isInteger(item.value) ? 0 : 2} />
                    </h3>
                  </div>
                  <p className="text-default-400">
                    <span className={`${item.change >= 0 ? 'text-success' : 'text-danger'}`}>
                      {item.change >= 0 ? <Icon icon="chevron-up" className="inline" /> : <Icon icon="chevron-down" className="inline" />}
                      {Math.abs(item.change)}%{' '}
                    </span>
                    <span className="text-sm text-default-400 ms-2.5">Since last month</span>
                  </p>
                </div>
              </div>
            ))}
            <div>
              <div className="p-5 text-center">
                <h5 className="text-default-400 text-xs uppercase mb-2" title="Today's Hours">
                  Today&apos;s Hours
                </h5>
                <div className="flex items-center justify-center gap-2.5 my-5">
                  <div className="size-8 bg-info/15 text-info flex items-center justify-center rounded-full">
                    <Icon icon="clock" className="text-xl" />
                  </div>
                  <h3 className="text-xl font-bold">
                    <span id="tracker-time">{formatTime(elapsedTime)}</span>
                  </h3>
                </div>
                <button type="button" onClick={toggleTimer} className={`btn btn-sm  text-white font-semibold w-full time-tracker-btn ${isRunning ? 'bg-danger hover:bg-danger-hover' : 'bg-info hover:bg-info-hover'}`}>
                  {isRunning ? 'Stop Tracker' : 'Start Tracker'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectStat
