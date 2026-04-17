import { Icon as IconifyIcon } from '@iconify/react'
import { weatherStatData } from './data'

const WeatherForecast = () => {
  return (
    <>
      {weatherStatData.map((item, idx) => (
        <div
          className={`card ${item.isActive ? 'text-white bg-center' : ''}`}
          key={idx}
          style={
            item.isActive && item.image
              ? {
                  backgroundImage: `url(${item.image.src})`,
                  backgroundSize: 'cover',
                }
              : {}
          }
        >
          <div className={`card-body text-center ${item.isActive ? 'rounded-md bg-secondary/90 bg-linear-to-b from-white/30 to-white/0' : ''}`}>
            <h5 className={` uppercase font-semibold ${item.isActive ? 'text-white/75' : 'text-default-400'}`}>{item.day}</h5>
            <div className="flex items-center justify-center gap-2.5 my-5">
              <div>
                <span className={`size-9 flex justify-center items-center ${item.className} rounded-full`}>
                  <IconifyIcon icon={item.icon} className="size-5.5" />
                </span>
              </div>
              <h3 className="text-xl font-bold">{item.temperature}</h3>
            </div>
            <p className={`mb-1.25 text-center ${item.isActive ? 'text-white' : 'text-default-400'}`}>{item.status}</p>
            <p className={`text-default-400 gap-base flex justify-center ${item.isActive ? 'text-white/75' : 'text-default-400'}`}>
              <span className="flex items-center gap-1">
                <IconifyIcon icon="tabler:wind" /> {item.wind}
              </span>
              <span className="flex items-center gap-1">
                <IconifyIcon icon="tabler:droplet" /> {item.humidity}
              </span>
            </p>
          </div>
        </div>
      ))}
    </>
  )
}

export default WeatherForecast
