export type Tag = {
  attributes: {
    tag: string
    displayName: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  id: number
}

type Venue = {
  id: number
  commonName: string
}

type OfferImage = {
  credit: string
  url: string
}

type Stock = {
  id: number
  price: number
}

export type Offer = {
  id: number
  name: string
  venue: Venue
  image: OfferImage | null
  stocks: Stock[]
}
