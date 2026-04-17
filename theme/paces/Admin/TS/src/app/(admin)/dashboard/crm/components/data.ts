import user1 from '@/assets/images/users/user-1.jpg'
import user10 from '@/assets/images/users/user-10.jpg'
import user2 from '@/assets/images/users/user-2.jpg'
import user3 from '@/assets/images/users/user-3.jpg'
import user4 from '@/assets/images/users/user-4.jpg'
import user5 from '@/assets/images/users/user-5.jpg'
import user6 from '@/assets/images/users/user-6.jpg'
import user7 from '@/assets/images/users/user-7.jpg'
import user8 from '@/assets/images/users/user-8.jpg'
import user9 from '@/assets/images/users/user-9.jpg'

import { getColor } from '@/utils/helpers'
import { ApexOptions } from 'apexcharts'
import { StaticImageData } from 'next/image'

import flagau from '@/assets/images/flags/au.svg'
import flagin from '@/assets/images/flags/in.svg'
import flagus from '@/assets/images/flags/us.svg'

export type CrmStatType = {
  title: string
  value: number
  suffix: string
  prefix?: string
  icon: string
  change: number
  label: string
  chartOptions: () => ApexOptions
}

export const crmStatData: CrmStatType[] = [
  {
    title: 'Leads Generated',
    value: 48.2,
    suffix: 'k',
    icon: 'users',
    change: 5.12,
    label: '2.3k Up',
    chartOptions: () => ({
      chart: {
        type: 'area',
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      series: [
        {
          name: 'Leads',
          data: [25, 28, 32, 38, 43, 55, 60, 48, 42, 51, 35],
        },
      ],
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      markers: {
        size: 0,
      },
      colors: [getColor('chart-primary')],
      tooltip: {
        fixed: { enabled: false },
        x: { show: false },
        y: {
          title: {
            formatter: function () {
              return 'Leads'
            },
          },
        },
        marker: { show: false },
      },
      fill: {
        opacity: [1],
        type: ['gradient'],
        gradient: {
          type: 'vertical',
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 100],
        },
      },
    }),
  },
  {
    title: 'Qualified Leads',
    value: 12.8,
    suffix: 'k',
    icon: 'user-check',
    change: -3.45,
    label: '0.4k Down',
    chartOptions: () => ({
      series: [70],
      chart: {
        type: 'radialBar',
        height: 90,
        width: 90,
      },
      stroke: {
        lineCap: 'round',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '45%',
          },
          dataLabels: {
            show: false,
          },
        },
      },
      grid: {
        padding: {
          top: -20,
          bottom: -20,
          left: -20,
          right: -20,
        },
      },
      labels: ['Direct'],
      colors: [getColor('chart-primary')],
    }),
  },
  {
    title: 'Deals Closed',
    value: 9.75,
    suffix: 'k',
    icon: 'briefcase',
    change: 2.94,
    label: '1.1k Up',
    chartOptions: () => ({
      chart: {
        type: 'area',
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      series: [
        {
          name: 'Deals',
          data: [32, 45, 38, 52, 47, 66, 70, 64, 78, 72, 81],
        },
      ],
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      markers: {
        size: 0,
      },
      colors: [getColor('chart-primary'), getColor('chart-gamma'), getColor('chart-gray')],
      tooltip: {
        fixed: { enabled: false },
        x: { show: false },
        y: {
          title: {
            formatter: function () {
              return 'Leads'
            },
          },
        },
        marker: { show: false },
      },
      fill: {
        opacity: [1],
        type: ['gradient'],
        gradient: {
          type: 'vertical',
          //   shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 100],
        },
      },
    }),
  },
  {
    title: 'Revenue Generated',
    value: 5.63,
    prefix: '$',
    suffix: 'M',
    icon: 'currency-dollar',
    change: 4.21,
    label: '$32.4k Up',
    chartOptions: () => ({
      chart: {
        type: 'bar',
        height: 60,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '60%',
          borderRadius: 4,
        },
      },
      colors: [getColor('chart-primary')],
      series: [
        {
          name: 'Revenue',
          data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82],
        },
      ],
      xaxis: {
        crosshairs: {
          width: 1,
        },
      },
      tooltip: {
        fixed: { enabled: false },
        x: { show: false },
        y: {
          formatter: function (value) {
            return '$' + value
          },
          title: {
            formatter: function () {
              return 'Revenue'
            },
          },
        },
        marker: { show: false },
      },
    }),
  },
]

export type OverviewType = {
  title: string
  value: number
  prefix?: string
  suffix?: string
  icon: string
  className?: string
  change: number
}

export const overviewData: OverviewType[] = [
  {
    title: 'Revenue',
    value: 56.63,
    prefix: '$',
    suffix: 'k',
    icon: 'cash',
    className: 'text-success me-1',
    change: -3.91,
  },
  {
    title: 'Orders',
    value: 9842,
    icon: 'truck',
    className: 'text-info me-1',
    change: 8.72,
  },
  {
    title: 'New Users',
    value: 95.3,
    suffix: 'k',
    icon: 'users-group',
    change: 11.2,
  },
  {
    title: 'New Contract',
    value: 851,
    icon: 'heart-handshake',
    change: 0.0,
  },
]

export type DealType = {
  id: string
  name: string
  className: string
  company: string
  probability: number
  date: string
  user: {
    name: string
    image: StaticImageData
  }
  value: number
  prefix: string
  suffix: string
  status: 'paused' | 'new' | 'cold-lead' | 'cancelled' | 'deal-won'
}

export const dealData: DealType[] = [
  {
    id: '#DH874',
    name: 'AdamM09',
    className: 'bg-primary/15 text-primary',
    company: 'Rex Audio',
    probability: 3,
    date: '20 Apr, 2024',
    user: { name: 'Alexa Newsome', image: user1 },
    value: 100.1,
    prefix: '$',
    suffix: 'K',
    status: 'paused',
  },
  {
    id: '#DH809',
    name: 'Sensor Lecto',
    className: 'bg-success/15 text-success',
    company: 'Morville',
    probability: 2,
    date: '31 Dec, 2024',
    user: { name: 'David Lee', image: user2 },
    value: 95,
    prefix: '$',
    suffix: 'K',
    status: 'new',
  },
  {
    id: '#DH807',
    name: 'Dhvanil',
    className: 'bg-info/15 text-info',
    company: "Olson's Market",
    probability: 4,
    date: '05 Jun, 2024',
    user: { name: 'Peter Hein', image: user5 },
    value: 65.95,
    prefix: '$',
    suffix: 'K',
    status: 'cold-lead',
  },
  {
    id: '#DH805',
    name: 'KHCoal',
    className: 'bg-secondary/15 text-secondary',
    company: "Erlebacher's",
    probability: 1,
    date: '25 Aug, 2024',
    user: { name: 'Gladys Rivas', image: user7 },
    value: 296.1,
    prefix: '$',
    suffix: 'K',
    status: 'cancelled',
  },
  {
    id: '#DH800',
    name: 'Haniyo',
    className: 'bg-warning/15 text-warning',
    company: 'Colonial Stores',
    probability: 5,
    date: '30 Sep, 2024',
    user: { name: 'Joan Wisdom', image: user10 },
    value: 25.9,
    prefix: '$',
    suffix: 'K',
    status: 'deal-won',
  },
  {
    id: '#DH798',
    name: 'Lunotech',
    className: 'bg-primary/15 text-primary',
    company: 'Northbridge Ltd',
    probability: 2,
    date: '12 Jan, 2025',
    user: { name: 'Chris Nolan', image: user3 },
    value: 78.3,
    prefix: '$',
    suffix: 'K',
    status: 'paused',
  },
  {
    id: '#DH792',
    name: 'TechHive',
    className: 'bg-success/15 text-success',
    company: 'Urban Labs',
    probability: 3,
    date: '08 Mar, 2025',
    user: { name: 'Karen Miles', image: user4 },
    value: 120.4,
    prefix: '$',
    suffix: 'K',
    status: 'new',
  },
  {
    id: '#DH788',
    name: 'PixelForge',
    className: 'bg-warning/15 text-warning',
    company: 'Bright Mart',
    probability: 1,
    date: '15 Jul, 2025',
    user: { name: 'Oscar Brent', image: user6 },
    value: 58.7,
    prefix: '$',
    suffix: 'K',
    status: 'cold-lead',
  },
  {
    id: '#DH780',
    name: 'RedCore',
    className: 'bg-danger/15 text-danger',
    company: 'Highland Co.',
    probability: 1,
    date: '21 Feb, 2025',
    user: { name: 'Maria Jensen', image: user8 },
    value: 42.3,
    prefix: '$',
    suffix: 'K',
    status: 'cancelled',
  },
  {
    id: '#DH776',
    name: 'BluEdge',
    className: 'bg-success/15 text-success',
    company: 'Arcton Energy',
    probability: 5,
    date: '10 Oct, 2024',
    user: { name: 'Daniel Cook', image: user9 },
    value: 310.2,
    prefix: '$',
    suffix: 'K',
    status: 'deal-won',
  },
  {
    id: '#DH770',
    name: 'CloudNova',
    className: 'bg-info/15 text-info',
    company: 'Prime Retail',
    probability: 1,
    date: '28 May, 2025',
    user: { name: 'Emily Grace', image: user5 },
    value: 54.1,
    prefix: '$',
    suffix: 'K',
    status: 'paused',
  },
  {
    id: '#DH765',
    name: 'Finexa',
    className: 'bg-danger/15 text-danger',
    company: 'Beacon Stores',
    probability: 1,
    date: '02 Feb, 2025',
    user: { name: 'Nathan Cole', image: user7 },
    value: 19.8,
    prefix: '$',
    suffix: 'K',
    status: 'cancelled',
  },
]

export type SaleExecutiveType = {
  user: {
    name: string
    designation: string
  }
  leads: number
  deals: number
  tasks: number
}

export const saleExecutiveData: SaleExecutiveType[] = [
  {
    user: {
      name: 'Jeremy Young',
      designation: 'Senior Sales Executive',
    },
    leads: 187,
    deals: 154,
    tasks: 49,
  },
  {
    user: {
      name: 'Thomas Krueger',
      designation: 'Senior Sales Executive',
    },
    leads: 235,
    deals: 127,
    tasks: 83,
  },
  {
    user: {
      name: 'Pete Burdine',
      designation: 'Senior Sales Executive',
    },
    leads: 365,
    deals: 148,
    tasks: 62,
  },
  {
    user: {
      name: 'Mary Nelson',
      designation: 'Senior Sales Executive',
    },
    leads: 753,
    deals: 159,
    tasks: 258,
  },
  {
    user: {
      name: 'Kevin Grove',
      designation: 'Senior Sales Executive',
    },
    leads: 458,
    deals: 126,
    tasks: 73,
  },
]

export type CountryType = {
  country: {
    name: string
    image: StaticImageData
  }
  sessions: number
  users: number
  percentage: string
}

export const countryData: CountryType[] = [
  {
    country: {
      name: 'United States',
      image: flagus,
    },
    sessions: 196584,
    users: 187232,
    percentage: '48.63%',
  },
  {
    country: {
      name: 'India',
      image: flagin,
    },
    sessions: 145845,
    users: 126874,
    percentage: '36.08%',
  },
  {
    country: {
      name: 'Australia',
      image: flagau,
    },
    sessions: 95845,
    users: 90127,
    percentage: '23.41%',
  },
]

export type ActivityType = {
  title: string
  description: string
  author: string
  icon: string
  className: string
}

export const activityData: ActivityType[] = [
  {
    title: '15 New Leads Added',
    description: 'Fresh inbound leads were captured from the website and synced automatically.',
    author: 'Olivia Carter',
    icon: 'user-plus',
    className: 'bg-primary',
  },
  {
    title: 'Lead Follow-Up Emails Sent',
    description: 'Follow-up messages were sent to all leads who have not responded within 48 hours.',
    author: 'Daniel Moore',
    icon: 'messages',
    className: 'bg-success',
  },
  {
    title: 'Sales Calls Logged',
    description: '20 outbound calls were recorded for prospects in the “Negotiation” stage.',
    author: 'Sophia Turner',
    icon: 'phone-call',
    className: 'bg-warning',
  },
  {
    title: 'Team Member Assigned to Deals',
    description: 'Three deals were reassigned to the senior sales team for faster conversion.',
    author: 'Liam Anderson',
    icon: 'users',
    className: 'bg-info',
  },
  {
    title: 'Deals Moved to Lost Stage',
    description: '4 deals were marked as “Lost” due to inactivity or declined proposals.',
    author: 'Ethan Brooks',
    icon: 'x',
    className: 'bg-danger',
  },
  {
    title: 'Two Deals Successfully Closed',
    description: 'Two high-value deals were marked “Won” and moved to the onboarding pipeline.',
    author: 'Ava Mitchell',
    icon: 'briefcase',
    className: 'bg-secondary',
  },
]
