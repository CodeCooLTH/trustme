export type OrderStatus = 'CREATED' | 'CONFIRMED' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED'

export type OrderItemRow = {
  name: string
  qty: number
  image: string | null // null when no product image available
}

export type OrderRow = {
  id: string          // publicToken short (8-char)
  publicToken: string
  buyer: string       // masked contact or '—'
  items: OrderItemRow[] // all items, ordered as stored
  totalQty: number    // sum of qty across items
  total: number
  status: OrderStatus
  date: string        // formatted th-TH
}
