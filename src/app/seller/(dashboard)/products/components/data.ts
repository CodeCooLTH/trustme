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
