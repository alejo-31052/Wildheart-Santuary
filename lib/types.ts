export interface Shelter {
  id: string
  name: string
  description: string
  image?: string
  longDescription?: string
  location?: string
  contactEmail?: string
  contactPhone?: string
  website?: string
  amazonWishlist?: string
  donationNeeds?: string[]
}

export interface User {
  id: string
  name: string
  email: string
  password: string // In a real app, this would be hashed
  createdAt: string
}

export interface Donation {
  id: string
  userId: string
  shelterId: string
  amount: number
  type: "one-time" | "recurring"
  frequency?: "monthly" | "quarterly" | "yearly"
  createdAt: string
}

