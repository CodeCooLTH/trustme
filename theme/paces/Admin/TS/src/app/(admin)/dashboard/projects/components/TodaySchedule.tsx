import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'
import { scheduleData } from './data'

const TodaySchedule = () => {
  return (
    <>
      <div>
        <div className="card h-full">
          <div className="card-body">
            <Flatpickr
              type="text"
              options={{
                dateFormat: 'd M, Y',
                defaultDate: 'today',
                inline: true,
              }}
              className="form-input card-calendar-widget w-full flatpickr-inline-custom"
            />
            <h4 className="card-title text-sm my-5">
              Today&apos;s Schedule:
              <a href="#!" className="float-end text-sm text-primary hover:text-primary-hover">
                View All
              </a>
            </h4>
            <ul className="mt-1.5 mb-0">
              {scheduleData.map((item, idx) => (
                <li className={idx === scheduleData.length - 1 ? '' : 'mb-5'} key={idx}>
                  <div className="flex gap-2.5 items-center">
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 flex justify-center items-center">
                        <Icon icon={item.icon} className={`size-5.5 ${item.className}`} />
                      </div>
                      <div>
                        <p className="text-default-400 mb-1.25 text-xs flex gap-1 items-center">
                          <Icon icon="calendar" className="align-middle" /> {item.time}
                        </p>
                        <h5 className="text-sm">{item.title}</h5>
                      </div>
                    </div>
                    <div className="ms-auto">
                      <button type="button" className="btn btn-sm btn-icon size-8 border-default-300 hover:border-default-400 text-default-950">
                        <Icon icon="x" className="text-sm" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="text-center mt-4">
              <a href="#" className="btn btn-sm bg-primary hover:bg-primary-hover text-white">
                {' '}
                <Icon icon="plus" /> Add New{' '}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodaySchedule
