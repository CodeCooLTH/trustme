import user10 from '@/assets/images/users/user-10.jpg'
import user2 from '@/assets/images/users/user-2.jpg'
import user3 from '@/assets/images/users/user-3.jpg'
import user4 from '@/assets/images/users/user-4.jpg'
import user5 from '@/assets/images/users/user-5.jpg'
import user6 from '@/assets/images/users/user-6.jpg'
import user7 from '@/assets/images/users/user-7.jpg'
import user8 from '@/assets/images/users/user-8.jpg'
import user9 from '@/assets/images/users/user-9.jpg'
import { StaticImageData } from 'next/image'

export type ProjectStatType = {
  title: string
  icon: string
  className: string
  value: number
  prefix?: string
  suffix?: string
  change: number
}

export const projectStatData: ProjectStatType[] = [
  {
    title: 'Total Projects',
    icon: 'briefcase',
    className: 'bg-secondary/15 text-secondary',
    value: 6847,
    change: -9.19,
  },
  {
    title: 'Total Tasks',
    icon: 'invoice',
    className: 'bg-primary/15 text-primary',
    value: 9.6,
    suffix: 'k',
    change: 26.87,
  },
  {
    title: 'Avg. Project Earnings',
    icon: 'wallet',
    className: 'bg-warning/15 text-warning',
    value: 98.24,
    prefix: '$',
    suffix: 'k',
    change: 3.51,
  },
  {
    title: 'Productivity',
    icon: 'trending-up',
    className: 'bg-success/15 text-success',
    value: 87.84,
    suffix: '%',
    change: -1.05,
  },
]

export type PerformanceType = {
  title: string
  value: number
  prefix?: string
  suffix?: string
}

export const performanceData: PerformanceType[] = [
  { title: 'Number of Projects', value: 7845 },
  { title: 'Active Projects', value: 289 },
  { title: 'Revenue', value: 982.5, prefix: '$', suffix: 'k' },
  { title: 'Working Hours', value: 12559, prefix: '~', suffix: 'h' },
]

export type ScheduleType = {
  time: string
  title: string
  icon: string
  className: string
}

export const scheduleData: ScheduleType[] = [
  {
    time: '08:00 AM - 09:30 AM',
    title: 'Project Kickoff Meeting',
    icon: 'briefcase',
    className: 'bg-soft-primary text-primary',
  },
  {
    time: '10:00 AM - 11:15 AM',
    title: 'UI/UX Review Session',
    icon: 'brand-figma',
    className: 'bg-soft-info text-info',
  },
  {
    time: '04:00 PM - 05:30 PM',
    title: 'Team Collaboration Session',
    icon: 'users',
    className: 'bg-soft-secondary text-secondary',
  },
]

export type ProjectType = {
  company: string
  name: string
  deadline: string
  budget: string
  user: {
    name: string
    role: string
    image: StaticImageData
  }
  status: {
    label: string
    className: string
  }
}

export const projectData: ProjectType[] = [
  {
    company: 'Google',
    name: 'New Dashboard',
    deadline: '17 Aug, 26',
    budget: '$8,950',
    user: {
      name: 'Sean Kemper',
      role: 'UI/UX Team',
      image: user2,
    },
    status: { label: 'Early Stage', className: 'text-info' },
  },
  {
    company: 'Microsoft',
    name: 'Azure Migration',
    deadline: '05 Sep, 26',
    budget: '$12,500',
    user: {
      name: 'Emily Carter',
      role: 'Cloud Team',
      image: user3,
    },
    status: { label: 'in-progress', className: 'text-warning' },
  },
  {
    company: 'Amazon',
    name: 'E-Commerce Redesign',
    deadline: '29 Oct, 26',
    budget: '$18,200',
    user: {
      name: 'Jacob Wilson',
      role: 'Frontend Team',
      image: user4,
    },
    status: { label: 'On Track', className: 'text-success' },
  },
  {
    company: 'Spotify',
    name: 'Music Analytics Tool',
    deadline: '11 Nov, 26',
    budget: '$9,750',
    user: {
      name: 'Laura Chen',
      role: 'Analytics Team',
      image: user5,
    },
    status: { label: 'Delayed', className: 'text-danger' },
  },
  {
    company: 'Tesla',
    name: 'EV Monitoring System',
    deadline: '06 Dec, 26',
    budget: '$21,300',
    user: {
      name: 'Daniel Foster',
      role: 'Tech Team',
      image: user6,
    },
    status: { label: 'On Schedule', className: 'text-success' },
  },
  {
    company: 'Meta',
    name: 'Social Feed Optimization',
    deadline: '21 Jan, 26',
    budget: '$14,680',
    user: {
      name: 'Chloe Martin',
      role: 'AI Team',
      image: user7,
    },
    status: { label: 'Planning', className: 'text-info' },
  },
]

export type TaskType = {
  dueInfo: string
  title: string
  dueDate: string
  assignedTo: {
    name: string
    image: StaticImageData
  }
  status: 'in-progress' | 'completed' | 'pending' | 'blocked' | 'reviewing'
  time: string
}

export const taskData: TaskType[] = [
  {
    dueInfo: 'Due in 2 days',
    title: 'Fix Homepage Layout Issues',
    dueDate: '14 Sep, 26',
    assignedTo: { name: 'Mia Turner', image: user5 },
    status: 'in-progress',
    time: '1h 45min',
  },
  {
    dueInfo: 'Due in 1 day',
    title: 'Update User Profile API',
    dueDate: '15 Sep, 26',
    assignedTo: {
      name: 'Oliver Knight',
      image: user6,
    },
    status: 'completed',
    time: '4h 10min',
  },
  {
    dueInfo: 'Due in 5 days',
    title: 'Create Dashboard Widgets',
    dueDate: '19 Sep, 26',
    assignedTo: { name: 'Sofia Reed', image: user7 },
    status: 'pending',
    time: '0h 00min',
  },
  {
    dueInfo: 'Due in 7 days',
    title: 'Fix Login Authentication Bug',
    dueDate: '21 Sep, 26',
    assignedTo: {
      name: 'Henry Adams',
      image: user8,
    },
    status: 'blocked',
    time: '1h 05min',
  },
  {
    dueInfo: 'Due today',
    title: 'Write Release Notes for v2.1',
    dueDate: '14 Sep, 26',
    assignedTo: {
      name: 'Chloe Martin',
      image: user9,
    },
    status: 'reviewing',
    time: '45min',
  },
  {
    dueInfo: 'Due in 4 days',
    title: 'Design New Notification Icons',
    dueDate: '18 Sep, 26',
    assignedTo: {
      name: 'Victoria Mills',
      image: user10,
    },
    status: 'completed',
    time: '2h 30min',
  },
]
