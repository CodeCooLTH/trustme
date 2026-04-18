export type AdminUserRow = {
  id: string
  displayName: string
  username: string
  avatar: string | null
  phone: string | null
  email: string | null
  trustScore: number
  trustLevel: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D'
  maxVerifiedLevel: 0 | 1 | 2 | 3
  isShop: boolean
  isAdmin: boolean
  createdAt: string // ISO string — serialized from server
  createdAtTh: string // th-TH formatted
  profileUrl: string // absolute buyer-subdomain URL when resolvable, else relative fallback
}
