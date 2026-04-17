import brave from '@/assets/images/browsers/brave.svg'
import chrome from '@/assets/images/browsers/chrome.svg'
import edge from '@/assets/images/browsers/edge.svg'
import firefox from '@/assets/images/browsers/firefox.svg'
import globe from '@/assets/images/browsers/globe.svg'
import opera from '@/assets/images/browsers/opera.svg'
import safari from '@/assets/images/browsers/safari.svg'
import tor from '@/assets/images/browsers/tor.svg'

import dribbble from '@/assets/images/logos/dribbble.svg'
import google from '@/assets/images/logos/google.svg'
import instagram from '@/assets/images/logos/instagram.svg'
import linkedin from '@/assets/images/logos/linkedin.svg'
import messenger from '@/assets/images/logos/messenger.svg'
import meta from '@/assets/images/logos/meta.svg'
import snapchat from '@/assets/images/logos/snapchat.svg'
import telegram from '@/assets/images/logos/telegram.svg'
import whatsapp from '@/assets/images/logos/whatsapp.svg'
import x from '@/assets/images/logos/x.svg'

import flagBR from '@/assets/images/flags/br.svg'
import flagCA from '@/assets/images/flags/ca.svg'
import flagIN from '@/assets/images/flags/in.svg'
import flagUS from '@/assets/images/flags/us.svg'
import { StaticImageData } from 'next/image'

export type VisitorType = {
  title: string
  completed: number
  target: number
  progress: number
}

export const visitorData: VisitorType[] = [
  { title: 'Total Visitors', completed: 824300, target: 1000000, progress: 82 },
  { title: 'Mobile Traffic', completed: 41927, target: 60000, progress: 69 },
  { title: 'Desktop Traffic', completed: 18476, target: 30000, progress: 61 },
]

export type SubscriberType = {
  title: string
  value: number
  progress: number
  className: string
}

export const subscriberData: SubscriberType[] = [
  { title: 'Email Marketing', value: 34920, progress: 27.41, className: 'bg-secondary' },
  { title: 'Social Marketing', value: 58775, progress: 46.13, className: 'bg-info' },
  { title: 'Direct', value: 33645, progress: 26.46, className: 'bg-success' },
]

export type SessionType = {
  tabId: 'users' | 'sessions' | 'bounce' | 'duration'
  title: string
  icon: string
  value?: string | number
  change: number
}

export const sessionData: SessionType[] = [
  { tabId: 'users', title: 'Users', icon: 'users', value: 39.03, change: 3.02 },
  { tabId: 'sessions', title: 'Sessions', icon: 'eye', value: 42.15, change: -4.78 },
  { tabId: 'bounce', title: 'Bounce Rate', icon: 'trending-up', value: 21.2, change: -31.39 },
  { tabId: 'duration', title: 'Session Duration', icon: 'clock', value: '3m 12s', change: 7.92 },
]

export type InsightType = {
  pageLink: string
  views: number
  rate: number
}

export const insightData: InsightType[] = [
  { pageLink: '/dashboard-analytics', views: 25, rate: 87.5 },
  { pageLink: '/dashboard-crm', views: 15, rate: 21.48 },
  { pageLink: '/dashboard', views: 10, rate: 63.59 },
]

export type CountryType = {
  name: string
  flag: StaticImageData
  value: number
  progress: number
  className: string
}

export const countryData: CountryType[] = [
  { name: 'United States', flag: flagUS, value: 67.5, progress: 72.15, className: 'bg-secondary' },
  { name: 'India', flag: flagIN, value: 7.92, progress: 28.65, className: 'bg-info' },
  { name: 'Brazil', flag: flagBR, value: 89.05, progress: 62.5, className: 'bg-warning' },
  { name: 'Canada', flag: flagCA, value: 5.3, progress: 42.2, className: 'bg-success' },
]

export type TrafficSourceType = {
  name: string
  image: StaticImageData
  value: number
  progress: number
  className: string
  progressBgClass: string
}

export const trafficSourceData: TrafficSourceType[] = [
  { name: 'Google', image: google, value: 87.8, progress: 72, className: 'bg-warning/10', progressBgClass: 'bg-warning/20' },
  { name: 'Instagram', image: instagram, value: 42.9, progress: 30, className: 'bg-danger/10', progressBgClass: 'bg-danger/20' },
  { name: 'LinkedIn', image: linkedin, value: 58.5, progress: 43, className: 'bg-info/10', progressBgClass: 'bg-info/20' },
  { name: 'Dribbble', image: dribbble, value: 2.85, progress: 12, className: 'bg-secondary/10', progressBgClass: 'bg-secondary/20' },
  { name: 'Messenger', image: messenger, value: 9.08, progress: 18, className: 'bg-primary/10', progressBgClass: 'bg-primary/20' },
  { name: 'Meta', image: meta, value: 77.7, progress: 66, className: 'bg-primary/10', progressBgClass: 'bg-primary/20' },
  { name: 'Telegram', image: telegram, value: 31.5, progress: 46, className: 'bg-success/10', progressBgClass: 'bg-success/20' },
  { name: 'Twitter X', image: x, value: 22.6, progress: 29, className: 'bg-dark/10', progressBgClass: 'bg-dark/20' },
  { name: 'WhatsApp', image: whatsapp, value: 3.1, progress: 18, className: 'bg-danger/10', progressBgClass: 'bg-danger/20' },
  { name: 'Snapchat', image: snapchat, value: 5.8, progress: 9, className: 'bg-warning/10', progressBgClass: 'bg-warning/20' },
]

export type BrowserType = {
  name: string
  image: StaticImageData
  usage: number
  change: number
}

export const browserData: BrowserType[] = [
  { name: 'Chrome', image: chrome, usage: 62.5, change: -5.06 },
  { name: 'Firefox', image: firefox, usage: 12.3, change: -1.5 },
  { name: 'Safari', image: safari, usage: 9.86, change: 1.03 },
  { name: 'Brave', image: brave, usage: 3.15, change: -0.3 },
  { name: 'Opera', image: opera, usage: 3.01, change: 1.58 },
  { name: 'Tor', image: tor, usage: 2.8, change: 0.01 },
  { name: 'Edge', image: edge, usage: 4.25, change: 0.75 },
  { name: 'Other', image: globe, usage: 6.38, change: 3.6 },
]

export type AnalyticType = {
  pagePath: string
  source: string
  views: number
  duration: string
  bounceRate: number
  conversionRate: number
}

export const analyticData: AnalyticType[] = [
  { pagePath: '/dashboard', source: 'Direct', views: 3980, duration: '02m:12s', bounceRate: 19.5, conversionRate: 4.3 },
  { pagePath: '/pricing', source: 'Google', views: 1742, duration: '01m:49s', bounceRate: 22.1, conversionRate: 6.7 },
  { pagePath: '/features', source: 'LinkedIn', views: 2310, duration: '02m:05s', bounceRate: 17.8, conversionRate: 5.4 },
  { pagePath: '/blog/how-to-boost-sales', source: 'Twitter', views: 1128, duration: '03m:14s', bounceRate: 14.9, conversionRate: 2.2 },
  { pagePath: '/docs/get-started', source: 'Reddit', views: 2540, duration: '04m:01s', bounceRate: 11.2, conversionRate: 7.9 },
  { pagePath: '/signup', source: 'Newsletter', views: 3780, duration: '02m:29s', bounceRate: 28.5, conversionRate: 9.1 },
  { pagePath: '/account/settings', source: 'Instagram', views: 1690, duration: '01m:36s', bounceRate: 16.3, conversionRate: 3.9 },
  { pagePath: '/reports/weekly-performance', source: 'Direct', views: 2245, duration: '02m:08s', bounceRate: 17.2, conversionRate: 4.1 },
  { pagePath: '/help/faq', source: 'Google', views: 3015, duration: '01m:23s', bounceRate: 23.9, conversionRate: 2.8 },
  { pagePath: '/products', source: 'Instagram', views: 4680, duration: '02m:51s', bounceRate: 18.4, conversionRate: 6.3 },
  { pagePath: '/downloads', source: 'Referral', views: 1395, duration: '03m:22s', bounceRate: 13.6, conversionRate: 7.4 },
  { pagePath: '/contact', source: 'Facebook', views: 2920, duration: '01m:41s', bounceRate: 21.7, conversionRate: 3.6 },
]
