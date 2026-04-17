import { Icon as IconifyIcon } from '@iconify/react'
import { overviewData } from './data'
const SummaryAlt = () => {
  return (
    <>
      {overviewData.map((item, idx) => (
        <div className={`card bg-${item.variant} text-white bg-linear-to-b from-white/30 to-white/0`} key={idx}>
          <div
            className="card-body rounded-md"
            style={{
              backgroundImage: `url(${item.image.src})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right bottom',
            }}
          >
            <h4 className="text-white text-lg mb-2 font-semibold">{item.title}</h4>
            <p className="text-white/75 mb-4">{item.description}</p>
            <div className="flex gap-2.5">
              {item.actions.map((action, idx) => (
                <a href="#!" className={`btn btn-sm btn-${item.variant} border border-${item.variant}/50 hover:border-${item.variant} bg-white/10`} key={idx}>
                  <IconifyIcon icon={action.icon} /> {action.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
export default SummaryAlt
