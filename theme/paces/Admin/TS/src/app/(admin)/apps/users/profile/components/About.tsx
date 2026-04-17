import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import Image from 'next/image'
import Link from 'next/link'
import { taskData, timelineData } from './data'

const About = () => {
  return (
    <>
      <p className="mb-4">I&apos;m an Admin Template Author dedicated to building clean, efficient, and highly customizable dashboards for developers and businesses. My goal is to create UI solutions that are modern, scalable, and easy to integrate.</p>
      <p className="mb-4">
        I specialize in crafting developer-friendly admin panels and UI kits using frameworks like Bootstrap, Tailwind CSS, React, Vue, Angular, Laravel, and Next.js. My templates are designed to accelerate development and provide a strong foundation for web apps, SaaS platforms,
        and enterprise tools.
      </p>
      <p>
        I focus on delivering well-structured, pixel-perfect layouts with a user-centric approach—ensuring responsive design, clean code, and seamless user experiences. Whether you&apos;re building a CRM, analytics dashboard, or backend system, my templates are made to help you
        build faster and smarter.
      </p>
      <div className="my-5 flex items-center gap-1">
        <Icon icon="briefcase" />
        <h4 className="card-title uppercase text-sm">Professional Experience:</h4>
      </div>
      <div>
        {timelineData.map((item, idx) => (
          <div className="flex gap-x-base" key={idx}>
            <div className="md:w-25 w-15 text-end">
              <span className="text-default-400">{item.yearRange}</span>
            </div>
            <div className={cn('relative after:absolute after:top-3 after:bottom-0 after:start-1/2 after:w-px after:border-default-300 after:border after:border-dashed', idx === timelineData.length - 1 && 'after:hidden')}>
              <div className="relative z-10 flex justify-center items-center">
                <div className={cn('size-3.25 rounded-full  ms-0.5', item.bulletClassName)} />
              </div>
            </div>
            <div className={cn('flex-1', idx === timelineData.length - 1 ? '' : 'pb-7.5')}>
              <h5 className="mb-1">{item.title}</h5>
              <p className="mb-1 text-default-400">{item.description}</p>
              <span className="text-default-400 font-semibold">at {item.company}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="my-5 flex items-center gap-1">
        <Icon icon="list-check" />
        <h4 className="card-title uppercase text-sm">Tasks Overview:</h4>
      </div>
      <div className="table-wrapper">
        <table className="min-w-full text-sm">
          <thead className="border-b border-default-300 uppercase text-2xs font-semibold tracking-wider">
            <tr>
              <th>Task</th>
              <th className="py-2 px-2 text-start">Status</th>
              <th className="py-2 px-2 text-start">Assigned By</th>
              <th className="py-2 px-2 text-start">Start Date</th>
              <th className="py-2 px-2 text-start">Priority</th>
              <th className="py-2 px-2 text-start">Progress</th>
              <th className="py-2 px-2 text-start">Total Time Spent</th>
              <th className="py-2 px-2 w-7.5" />
            </tr>
          </thead>
          <tbody>
            {taskData.map((item, idx) => (
              <tr className="hover:bg-default-50 transition" key={idx}>
                <td className="py-2 ps-4.5 pe-2">
                  <h5 className="font-medium text-default-700 my-1">
                    <Link href="">{item.title}</Link>
                  </h5>
                  <span className="text-xs text-default-400">{item.due}</span>
                </td>
                <td className="p-2">
                  <span className={cn('badge ', item.status === 'in-progress' ? 'bg-warning/10 text-warning' : item.status === 'outdated' ? 'bg-danger/10 text-danger' : item.status === 'on-hold' ? 'bg-dark/10 text-dark' : 'bg-success/10 text-success')}>
                    {toPascalCase(item.status)}
                  </span>
                </td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <Image src={item.user.image} alt={item.user.name} className="size-8 rounded-full object-cover" />
                    <div>
                      <h5 className="font-semibold leading-tight">{item.user.name}</h5>
                      <p className="text-xs text-default-400">{item.user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3">{item.startDate}</td>
                <td className="p-2">
                  <span className={cn('badge ', item.priority === 'high' ? 'bg-danger/10 text-danger' : item.priority === 'medium' ? 'bg-primary/10 text-primary' : 'bg-success/10 text-success')}>{toPascalCase(item.priority)}</span>
                </td>
                <td className="p-2">{item.progress}</td>
                <td className="p-2">{item.time}</td>
                <td>
                  <Link href="">
                    <Icon icon="pencil" className="text-lg text-default-400" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default About
