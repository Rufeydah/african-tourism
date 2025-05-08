export interface Attraction {
  id: string
  title: {
    en: string
    am: string
    sw: string
  }
  description: {
    en: string
    am: string
    sw: string
  }
  image: string
  location: string
  country: string
  city: string
  category: string
  coordinates: {
    lat: number
    lng: number
  }
}
