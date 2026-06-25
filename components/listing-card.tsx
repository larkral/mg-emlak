import Link from "next/link"
import Image from "next/image"
import { Bath, BedDouble, MapPin, Maximize } from "lucide-react"
import { type Listing, formatPrice } from "@/lib/data"

function formatStatus(status: string) {
  if (status === "satilik") return "Satılık"
  if (status === "kiralik") return "Kiralık"
  if (status === "kat-karsiligi-arsa") return "Kat Karşılığı Arsa"
  return status
}

function formatType(type: string) {
  if (!type) return ""
  return type
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
}

export function ListingCard({ listing }: { listing: Listing }) {
  const imageSrc = listing.images?.[0] || "/placeholder.svg"

  return (
    <Link
      href={`/ilan/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
    >

      {/* IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden">

        <Image
          src={imageSrc}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* BADGES */}
        <div className="absolute left-3 top-3 flex gap-2 flex-wrap">

          {/* STATUS */}
          <span
            className={
              "rounded-md px-2 py-1 text-xs font-medium text-white backdrop-blur-md shadow-md " +
              (listing.status === "satilik"
                ? "bg-orange-500/90"
                : listing.status === "kiralik"
                ? "bg-sky-500/90"
                : listing.status === "kat-karsiligi-arsa"
                ? "bg-red-500/90"
                : "bg-gray-500/90")
            }
          >
            {formatStatus(listing.status)}
          </span>

          {/* FEATURED */}
          {listing.featured && (
            <span className="rounded-md bg-amber-400/90 px-2 py-1 text-xs font-medium text-black shadow-md">
              ⭐ Öne Çıkan
            </span>
          )}

        </div>

        {/* PRICE */}
        <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white backdrop-blur">
          {formatPrice(listing.price, listing.status)}
        </div>

      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-4">

        {/* LOCATION */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5 text-primary" />
          <span className="truncate">
            {listing.district}, {listing.city}
          </span>
        </div>

        {/* TITLE */}
        <h3 className="mt-2 line-clamp-1 text-base font-semibold group-hover:text-primary transition">
          {listing.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {listing.description}
        </p>

        {/* FEATURES */}
        <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">

          <div className="flex items-center gap-3">

            <span className="flex items-center gap-1">
              <Maximize className="size-4 opacity-70" />
              {listing.area} m²
            </span>

            <span className="flex items-center gap-1">
              <BedDouble className="size-4 opacity-70" />
              {listing.rooms}
            </span>

            <span className="flex items-center gap-1">
              <Bath className="size-4 opacity-70" />
              {listing.bathrooms}
            </span>

          </div>

          {/* TYPE */}
          <span className="hidden sm:inline-flex rounded-full bg-muted px-2 py-1 text-[11px] text-muted-foreground">
            {formatType(listing.type)}
          </span>

        </div>

      </div>

    </Link>
  )
}