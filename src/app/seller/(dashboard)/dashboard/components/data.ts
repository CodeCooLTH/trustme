// Types for SafePay seller dashboard components
// No mock data — all data comes from props (real DB data)

export type StatType = {
  title: string
  value: number
  prefix?: string
  suffix?: string
  change: number
  icon: string
}

export type OrderType = {
  id: string           // short display id (publicToken prefix or id prefix)
  publicToken: string  // full token for link
  customer: {
    name: string
    contact: string
  }
  product: string      // first item name
  total: number
  status: 'CREATED' | 'CONFIRMED' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED'
  date: string         // ISO or formatted
}

export type ProductType = {
  id: string
  name: string
  image?: string       // may be empty/null for products with no image
  type: 'PHYSICAL' | 'DIGITAL' | 'SERVICE'
  price: number
  sales: number        // qty sold (from completed orders)
}

export type WeeklyType = {
  labels: string[]
  revenue: number[]
  orders: number[]
}
