export type OrderStatus = 'CREATED' | 'CONFIRMED' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED'

export type OrderRow = {
  id: string         // publicToken short (8-char)
  publicToken: string
  buyer: string      // masked contact or '—'
  product: string    // first item name
  qty: number
  total: number
  status: OrderStatus
  date: string       // formatted th-TH
}

export type StatCardData = {
  label: string
  value: number
  icon: string       // tabler name
  accent: 'primary' | 'warning' | 'info' | 'success' | 'danger'
}
