import { CountUp } from '@/components/wrappers/CountUp'
import { Icon as IconifyIcon } from '@iconify/react'
import { targetData } from './data'
const Stat = () => {
  return (
    <>
      {targetData.map((item, idx) => (
        <div
          className="card text-white bg-cover bg-center"
          style={{
            backgroundImage: `url(${item.image.src})`,
            backgroundSize: 'cover',
          }}
          key={idx}
        >
          <div className={`card-body rounded-md ${item.className} bg-linear-to-b from-white/30 to-white/0`}>
            <IconifyIcon icon={item.icon} className="text-4xl mb-1.5" />
            <p className="text-white/75 mb-1.25 uppercase">{item.label}</p>
            <h3 className="font-semibold mb-2.5 text-xl">{item.title}</h3>
            <h4 className="font-medium text-base mb-1.25">
              <CountUp start={0} end={item.value} prefix={item.prefix} duration={1} separator="," />
            </h4>
          </div>
        </div>
      ))}
    </>
  )
}
export default Stat
