import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import OngoingProject from './components/OngoingProject'
import ProjectPerformance from './components/ProjectPerformance'
import ProjectStat from './components/ProjectStat'
import ProjectStatus from './components/ProjectStatus'
import Task from './components/Task'
import TodaySchedule from './components/TodaySchedule'

export const metadata: Metadata = { title: 'Project' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Projects" subtitle="Dashboard" />

      <div className="grid xl:grid-cols-4 grid-cols-1 gap-base mb-base">
        <div className="xl:col-span-3">
          <ProjectStat />

          <div className="grid xl:grid-cols-3 grid-cols-1  gap-base">
            <ProjectStatus />
            <div className="xl:col-span-2">
              <ProjectPerformance />
            </div>
          </div>
        </div>

        <TodaySchedule />
      </div>
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-base">
        <OngoingProject />
        <Task />
      </div>
    </>
  )
}

export default Page
