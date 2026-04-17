export type CustomerRow = {
  key: string              // unique grouping key
  displayName: string
  initial: string
  contact: string          // masked
  isRegistered: boolean
  username: string | null  // for @username link if registered
  totalOrders: number
  totalSpent: number       // THB
  lastOrderDate: string    // formatted
  lastOrderRaw: number     // timestamp for sorting
}
