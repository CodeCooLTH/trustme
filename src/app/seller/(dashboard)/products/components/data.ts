export type StatCardData = {
  title: string
  value: number
  prefix?: string
  suffix?: string
  change: number
  icon: string
  iconClassName: string
  metric: string
  metricValue: string
  bulletClassName: string
}

export type ProductRow = {
  id: string
  name: string
  description: string
  image: string
  price: number
  type: 'PHYSICAL' | 'DIGITAL' | 'SERVICE'
  isActive: boolean
  totalSold: number
  reviews: number
  rating: number
}
