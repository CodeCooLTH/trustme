import { StaticImageData } from 'next/image'

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

export type ContactType = {
  user: {
    name: string
    role: string
    email: string
    phone: string
    image?: StaticImageData
  }
  label: {
    text: string
    className: string
  }
  categories: {
    tag: string
    className: string
  }[]
  stats: {
    title: string
    value: number
    prefix?: string
    suffix?: string
  }[]
}

export const contactData: ContactType[] = [
  {
    user: {
      name: 'Emily Ross',
      role: 'Marketing Director at GreenTech',
      email: 'emily.ross@greentech.com',
      phone: '+44 7911 112233',
      image: user10,
    },
    label: {
      text: 'Prospect',
      className: 'bg-success',
    },
    categories: [
      { tag: 'Eco', className: 'bg-info/15 text-info' },
      { tag: 'Newsletter', className: 'bg-light' },
      { tag: 'Follow-up', className: 'bg-secondary/15 text-secondary' },
    ],
    stats: [
      { title: 'Posts', value: 98 },
      { title: 'Followers', value: 12.5, suffix: 'k' },
      { title: 'Followings', value: 860 },
    ],
  },
  {
    user: {
      name: 'Ava Mitchell',
      role: 'Product Strategist at NovaX Labs',
      email: 'ava.mitchell@novaxlabs.com',
      phone: '+1 347 445 8890',
      image: user9,
    },
    label: {
      text: 'Cold Lead',
      className: 'bg-info',
    },
    categories: [
      { tag: 'Technology', className: 'bg-primary/15 text-primary' },
      { tag: 'Outbound', className: 'bg-light' },
      { tag: 'Low Engagement', className: 'bg-danger/15 text-danger' },
    ],
    stats: [
      { title: 'Total Value', value: 4.2, suffix: 'k', prefix: '$' },
      { title: 'Open Deal', value: 1 },
      { title: 'Meetings', value: 0 },
    ],
  },
  {
    user: {
      name: 'Lucas Grant',
      role: 'VP of Sales at MetricOne',
      email: 'lucas.grant@metricone.com',
      phone: '+1 646 901 2200',
      image: user8,
    },
    label: {
      text: 'Qualified',
      className: 'bg-success',
    },
    categories: [
      { tag: 'B2B', className: 'bg-success/15 text-success' },
      { tag: 'Referral', className: 'bg-light' },
      { tag: 'High Potential', className: 'bg-info/15 text-info' },
    ],
    stats: [
      { title: 'Total Value', value: 19.6, suffix: 'k', prefix: '$' },
      { title: 'Open Deals', value: 3 },
      { title: 'Meetings', value: 2 },
    ],
  },
  {
    user: {
      name: 'Sophie Nguyen',
      role: 'Head of Growth at ElevateX',
      email: 'sophie.nguyen@elevatex.com',
      phone: '+1 213 778 0923',
      image: user7,
    },
    label: {
      text: 'Negotiation',
      className: 'bg-warning',
    },
    categories: [
      { tag: 'SaaS', className: 'bg-info/15 text-info' },
      { tag: 'Demo Scheduled', className: 'bg-light' },
      { tag: 'Strategic', className: 'bg-primary/15 text-primary' },
    ],
    stats: [
      { title: 'Total Value', value: 32.1, suffix: 'k', prefix: '$' },
      { title: 'Open Deals', value: 4 },
      { title: 'Meetings', value: 3 },
    ],
  },
  {
    user: {
      name: 'Rajiv Mehra',
      role: 'CTO at Cloudbyte',
      email: 'rajiv.mehra@cloudbyte.io',
      phone: '+91 98100 11223',
      image: user6,
    },
    label: {
      text: 'Cold Lead',
      className: 'bg-info',
    },
    categories: [
      { tag: 'Cloud', className: 'bg-warning/15 text-warning' },
      { tag: 'India', className: 'bg-light' },
      { tag: 'Low Engagement', className: 'bg-danger/15 text-danger' },
    ],
    stats: [
      { title: 'Total Value', value: 8.7, suffix: 'k', prefix: '$' },
      { title: 'Open Deal', value: 1 },
      { title: 'Meetings', value: 0 },
    ],
  },
  {
    user: {
      name: 'Isabella Stone',
      role: 'Digital Strategy Lead at Marvia',
      email: 'isabella.stone@marvia.com',
      phone: '+44 7910 556677',
    },
    label: {
      text: 'Prospect',
      className: 'bg-primary',
    },
    categories: [
      { tag: 'Marketing', className: 'bg-info/15 text-info' },
      { tag: 'EU', className: 'bg-light' },
      { tag: 'Newsletter', className: 'bg-secondary/15 text-secondary' },
    ],
    stats: [
      { title: 'Total Value', value: 15.4, suffix: 'k', prefix: '$' },
      { title: 'Open Deals', value: 2 },
      { title: 'Meetings', value: 1 },
    ],
  },
  {
    user: {
      name: 'Carlos Jiménez',
      role: 'Enterprise Sales at Nexora',
      email: 'carlos.jimenez@nexora.com',
      phone: '+34 612 345 678',
      image: user5,
    },
    label: {
      text: 'Closed - Won',
      className: 'bg-success',
    },
    categories: [
      { tag: 'Enterprise', className: 'bg-dark/15 text-dark' },
      { tag: 'Spain', className: 'bg-light' },
      { tag: 'Repeat Client', className: 'bg-success/15 text-success' },
    ],
    stats: [
      { title: 'Total Value', value: 45.9, suffix: 'k', prefix: '$' },
      { title: 'Open Deals', value: 5 },
      { title: 'Meetings', value: 4 },
    ],
  },
  {
    user: {
      name: 'Nina Patel',
      role: 'Partnership Manager at ZentroHub',
      email: 'nina.patel@zentrohub.com',
      phone: '+61 480 123 456',
      image: user4,
    },
    label: {
      text: 'In Progress',
      className: 'bg-secondary',
    },
    categories: [
      { tag: 'Partnership', className: 'bg-secondary/15 text-secondary' },
      { tag: 'APAC', className: 'bg-light' },
      { tag: 'Mid Priority', className: 'bg-warning/15 text-warning' },
    ],
    stats: [
      { title: 'Total Value', value: 21.3, suffix: 'k', prefix: '$' },
      { title: 'Open Deals', value: 2 },
      { title: 'Meetings', value: 1 },
    ],
  },
  {
    user: {
      name: 'Elena Moretti',
      role: 'Customer Success Manager at LumiPay',
      email: 'elena.moretti@lumipay.io',
      phone: '+39 06 9456 2345',
      image: user3,
    },
    label: {
      text: 'Churn Risk',
      className: 'bg-danger',
    },
    categories: [
      { tag: 'High Churn Risk', className: 'bg-danger/15 text-danger' },
      { tag: 'Renewal Due', className: 'bg-light' },
      { tag: 'EMEA', className: 'bg-info/15 text-info' },
    ],
    stats: [
      { title: 'Total Value', value: 5.2, suffix: 'k', prefix: '$' },
      { title: 'Open Deal', value: 1 },
      { title: 'Meetings', value: 0 },
    ],
  },
  {
    user: {
      name: 'Jason Lee',
      role: 'Account Executive at BrightCore',
      email: 'jason.lee@brightcore.com',
      phone: '+1 310 555 7890',
      image: user2,
    },
    label: {
      text: 'Follow-Up',
      className: 'bg-primary',
    },
    categories: [
      { tag: 'US Market', className: 'bg-primary/15 text-primary' },
      { tag: 'Email Outreach', className: 'bg-light' },
      { tag: 'Warm Lead', className: 'bg-success/15 text-success' },
    ],
    stats: [
      { title: 'Total Value', value: 11.9, suffix: 'k', prefix: '$' },
      { title: 'Open Deals', value: 2 },
      { title: 'Meetings', value: 1 },
    ],
  },
  {
    user: {
      name: 'Fatima Al-Mansoori',
      role: 'Regional Director at GulfNext',
      email: 'fatima.m@gulfnxt.com',
      phone: '+971 55 667 3412',
      image: user1,
    },
    label: {
      text: 'Pending Review',
      className: 'bg-warning',
    },
    categories: [
      { tag: 'Middle East', className: 'bg-warning/15 text-warning' },
      { tag: 'Partner Channel', className: 'bg-light' },
      { tag: 'Pending Docs', className: 'bg-secondary/15 text-secondary' },
    ],
    stats: [
      { title: 'Total Value', value: 26.8, suffix: 'k', prefix: '$' },
      { title: 'Open Deals', value: 2 },
      { title: 'Meetings', value: 2 },
    ],
  },
  {
    user: {
      name: 'Markus Hoffmann',
      role: 'Operations Manager at Nordexa AG',
      email: 'markus.h@nordexa.de',
      phone: '+49 160 445 7788',
    },
    label: {
      text: 'Active Client',
      className: 'bg-success',
    },
    categories: [
      { tag: 'Logistics', className: 'bg-primary/15 text-primary' },
      { tag: 'DACH', className: 'bg-light' },
      { tag: 'Long-Term', className: 'bg-success/15 text-success' },
    ],
    stats: [
      { title: 'Total Value', value: 39.2, suffix: 'k', prefix: '$' },
      { title: 'Open Deals', value: 3 },
      { title: 'Meetings', value: 2 },
    ],
  },
]
