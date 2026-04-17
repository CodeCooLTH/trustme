export type ReviewRow = {
  id: string
  reviewerLabel: string
  reviewerInitial: string
  rating: number
  comment: string | null
  date: string
  productName: string
  orderToken: string // for linking to /orders/{token}
}

export type SummaryData = {
  total: number
  avgRating: number // one decimal
  distribution: Record<1 | 2 | 3 | 4 | 5, number> // count per star
}
