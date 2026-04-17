import { Icon as IconifyIcon } from '@iconify/react'
import { weatherData } from './data'
const SummaryCard = () => {
  return (
    <>
      {weatherData.map((item, idx) => (
        <div className={`card rounded-md ${item.className} bg-linear-to-b from-white/30 to-white/0`} key={idx}>
          <div className="card-body">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-base items-center text-white">
              <div className="flex justify-center items-center gap-base">
                <div>
                  <IconifyIcon icon={item.current.icon} className="text-5xl" />
                  <h2 className="mt-1.25 text-2xl font-semibold">{item.current.temperature}</h2>
                </div>
                <div>
                  <p>{item.current.status}</p>
                  <small>
                    {item.current.wind} - {item.current.humidity}
                  </small>
                </div>
              </div>

              <div className="md:col-span-2 text-center">
                <div className="grid grid-cols-4 gap-base">
                  {item.forecast.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <h6 className="text-white/50 mb-1.25 text-2xs">{day.day}</h6>
                      <IconifyIcon icon={day.icon} className="size-8" />
                      <p className="mt-1.25">{day.temperature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
export default SummaryCard
