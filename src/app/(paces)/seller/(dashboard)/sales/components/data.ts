export type DailyRow = {
  date: string      // ISO YYYY-MM-DD
  label: string     // formatted th-TH e.g. "1 เม.ย. 2569"
  orders: number    // count (all statuses)
  completed: number // count of COMPLETED
  revenue: number   // sum of completed order totals
  avgOrder: number  // revenue / completed (or 0)
}

export type SummaryData = {
  totalOrders: number
  totalCompleted: number
  totalRevenue: number
  avgOrderValue: number
}
