import small6 from '@/assets/images/stock/small-6.jpg'
import { Icon as IconifyIcon } from '@iconify/react'
import { cityWeatherData } from './data'

const WeatherOverviewCard = () => {
  return (
    <>
      <div className="flex flex-col gap-base">
        <div className="card overflow-hidden">
          <div className="relative h-50" style={{ height: 200, background: `url(${small6.src}) center/cover` }}>
            <div className="absolute top-0 start-0 bg-dark text-white text-center px-5 py-2.5 rounded-e-lg mt-5">
              <div className="font-bold">OCT</div>
              <div className="font-bold">21</div>
            </div>
            <div className="absolute bottom-0 start-0 text-white p-5">
              <div className="text-sm">Cloudy</div>
              <h2 className="text-2xl font-bold">69°</h2>
            </div>
            <div className="absolute bottom-0 end-0 p-2.5 flex">
              <div className="border-b border-white">
                <button className="btn text-white">Today</button>
              </div>
              <div>
                <button className="btn text-white">Week</button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-5 gap-base text-center">
              <div>
                <div className="font-semibold text-default-400">Now</div>
                <IconifyIcon icon="tabler:cloud" className="mx-auto my-1.25 block text-2xl" />
                <div className="font-semibold">72°</div>
              </div>
              <div>
                <div className="font-semibold text-default-400">2pm</div>
                <IconifyIcon icon="tabler:cloud-bolt" className="mx-auto my-1.25 block text-2xl" />
                <div className="font-semibold">74°</div>
              </div>
              <div>
                <div className="font-semibold text-default-400">3pm</div>
                <IconifyIcon icon="tabler:sun-high" className="mx-auto my-1.25 block text-2xl" />
                <div className="font-semibold">76°</div>
              </div>
              <div>
                <div className="font-semibold text-default-400">4pm</div>
                <IconifyIcon icon="tabler:sun" className="mx-auto my-1.25 block text-2xl" />
                <div className="font-semibold">75°</div>
              </div>
              <div>
                <div className="font-semibold text-default-400">5pm</div>
                <IconifyIcon icon="tabler:cloud-rain" className="mx-auto my-1.25 block text-2xl" />
                <div className="font-semibold">71°</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-base">
          {cityWeatherData.map((item, idx) => (
            <div className="card text-white" style={{ background: `url(${item.image.src}) center/cover` }} key={idx}>
              <div className="card-body rounded-md rounded-b-none bg-dark/75 bg-linear-to-b from-white/30 to-white/0">
                <div className="size-full flex flex-col justify-end">
                  <div className="font-bold text-2xl">{item.temperature}</div>
                  <div className="font-semibold">{item.city}</div>
                  <div className="text-white/50">{item.status}</div>
                </div>
              </div>
              <div className="flex justify-between items-center rounded-md rounded-t-none px-5 py-2.5 bg-dark text-white/75">
                <div className="flex items-center gap-1.25">
                  <IconifyIcon icon="tabler:wind" /> <span>{item.wind.speed}</span>
                </div>
                <div className="flex items-center gap-1.25">
                  <IconifyIcon icon="tabler:compass" /> <span>{item.wind.direction}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default WeatherOverviewCard
