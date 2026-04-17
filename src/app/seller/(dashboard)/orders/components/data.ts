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
