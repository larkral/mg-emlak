export type ListingStatus = "satilik" | "kiralik"| "kat-karsiligi-arsa"
export type PropertyType = "Daire" | "Villa" | "Müstakil Ev" | "Arsa"|"Kat Karşılığı Arsa"

export interface Listing {
  id: string
  title: string
  description: string
  price: number
  status: ListingStatus
  type: PropertyType
  city: string
  district: string // mahalle
  area: number // m²
  rooms: string // e.g. "3+1"
  bedrooms: number
  bathrooms: number
  floor: string
  heating: string
  buildingAge: number
  featured: boolean
  created_At: string
  images: string[]
  features?: Record<string, any> | null
  islandNo?: string
  parcelNo?: string
  sheetNo?: string

  zoningStatus?: string

  kaks?: string
  gabari?: string

  titleDeedStatus?: string

  infrastructure?: string[]

  locationFeatures?: string[]
}

export const CITY = "Afyonkarahisar"


export const NEIGHBORHOODS: string[] = [
  "Merkez",
  "Ataköy",
  "Cumhuriyet",
  "Dervişpaşa",
  "Dumlupınar",
  "Erenler",
  "Esentepe",
  "Eşrefpaşa",
  "Fakıpaşa",
  "Güvenevler",
  "İstiklal",
  "Karaman",
  "Kanlıca",
  "Karşıyaka",
  "Kurtuluş",
  "Marulcu",
  "Nazmi Saatçi",
  "Orhangazi",
  "Örnekevler",
  "Sahipata",
  "Veysel Karani",
  "Yeşilyurt",
  "Yıldırım Beyazıt",
  "Yüksel",
  "Zafer",
];

export const PROPERTY_TYPES: PropertyType[] = [
  "Arsa",
  "Daire",
  "Müstakil Ev",
  "Villa",
]

export const ROOM_OPTIONS = ["1+0", "1+1", "2+1", "3+1", "4+1", "5+1"]

const gallery = [
  "/images/listing-1.png",
  "/images/listing-2.png",
  "/images/listing-3.png",
  "/images/listing-4.png",
  "/images/listing-5.png",
  "/images/listing-6.png",
  "/images/listing-7.png",
  "/images/listing-8.png",
]

export const listings: Listing[] = [
]

export function formatPrice(price: number, status: string) {
  const formatted = new Intl.NumberFormat("tr-TR").format(price)

  return `${formatted} ₺`
}

export function getListingById(id: string): Listing | undefined {
  return listings.find((l) => l.id === id)
}
