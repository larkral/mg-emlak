function formatPrice(price: number, status: string) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    currencyDisplay: "code",
  })
    .format(price)
    .replace("TRY", "")
    .trim() + " TL"
}

import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building,
  CalendarClock,
  Flame,
  Layers,
  MapPin,
  Maximize,
  MessageCircle,
  Phone,
  ExternalLink,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ImageGallery } from "@/components/image-gallery"
import { ListingCard } from "@/components/listing-card"
import { supabase } from "@/lib/supabase"

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single()

  if (!listing) notFound()

  const { data: similarData } = await supabase
    .from("listings")
    .select("*")
    .eq("city", listing.city)
    .neq("id", listing.id)
    .limit(3)

  const fallbackSimilar =
    similarData?.length
      ? similarData
      : (await supabase
          .from("listings")
          .select("*")
          .neq("id", listing.id)
          .limit(3)
        ).data || []

  const extraFeatures = listing.features ?? {}

  const isLand =
    listing.type === "Arsa" ||
    listing.status === "kat-karsiligi-arsa"

  const features = [
    { icon: Maximize, label: "Alan", value: `${listing.area} m²` },

    ...(!isLand
      ? [
          { icon: BedDouble, label: "Oda", value: listing.rooms },
          { icon: Bath, label: "Banyo", value: listing.bathrooms },
          { icon: Layers, label: "Kat", value: listing.floor },
          { icon: Flame, label: "Isıtma", value: listing.heating },
          {
            icon: CalendarClock,
            label: "Bina Yaşı",
            value:
              listing.buildingAge === 0
                ? "Sıfır"
                : `${listing.buildingAge} yıl`,
          },
        ]
      : []),

    ...(isLand
      ? [
          { icon: Building, label: "Parsel No", value: listing.parcel_no },
          { icon: Building, label: "Ada No", value: listing.island_no },
          { icon: Building, label: "Pafta", value: listing.sheet_no },
          { icon: MapPin, label: "İmar", value: listing.zoning_status },
          { icon: MapPin, label: "Tapu", value: listing.title_deed_status },
          { icon: Layers, label: "KAKS", value: listing.kaks },
          { icon: Layers, label: "Gabari", value: listing.gabari },
        ]
      : []),

    { icon: Building, label: "Tip", value: listing.type },
    {
      icon: MapPin,
      label: "Konum",
      value: `${listing.district}, ${listing.city}`,
    },
  ]

  const whatsappText = encodeURIComponent(
    `Merhaba, "${listing.title}" (#${listing.id}) ilanı hakkında bilgi almak istiyorum.`
  )

  // 👉 PARSEL SORGU (GENEL LINK - İSTERSEN ÖZELLEŞTİRİRİZ)
  const parcelUrl = "https://parselsorgu.tkgm.gov.tr/"

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">

          {/* BACK */}
          <Link href="/ilanlar">
            <Button variant="ghost" size="sm" className="mb-6 -ml-2">
              <ArrowLeft className="size-4 mr-2" />
              Geri dön
            </Button>
          </Link>

          {/* GRID */}
          <div className="grid gap-10 lg:grid-cols-3">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-8">

              {/* IMAGE */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <ImageGallery images={listing.images} title={listing.title} />
              </div>

              {/* TITLE */}
              <div>

                <div className="flex flex-wrap gap-2">
                  <Badge
  className={
    "text-white " +
    (listing.status === "satilik"
      ? "bg-orange-500"
      : listing.status === "kiralik"
      ? "bg-sky-500"
      : listing.status === "kat-karsiligi-arsa"
      ? "bg-red-600"
      : "bg-gray-500")
  }
>
  {listing.status === "satilik"
    ? "Satılık"
    : listing.status === "kiralik"
    ? "Kiralık"
    : listing.status === "kat-karsiligi-arsa"
    ? "Kat Karşılığı Arsa"
    : listing.status}
</Badge>

                  {listing.featured && (
                    <Badge className="bg-black text-white">
                      Öne Çıkan
                    </Badge>
                  )}
                </div>

                <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
                  {listing.title}
                </h1>

                <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4 text-primary" />
                  {listing.district}, {listing.city}
                </div>
              </div>

              <Separator />

              {/* DESCRIPTION (ÜSTTE KALDI) */}
              <div>
                <h2 className="text-xl font-semibold">Açıklama</h2>
                <p className="mt-3 text-muted-foreground whitespace-pre-line leading-relaxed">
                  {listing.description}
                </p>
              </div>

              <Separator />

              {/* FEATURES */}
              <div>
                <h2 className="text-xl font-semibold">Özellikler</h2>

                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {features.map((f) => (
                    <div
                      key={f.label}
                      className="rounded-2xl border bg-card p-4 hover:shadow-md transition"
                    >
                      <f.icon className="size-5 text-primary" />
                      <div className="mt-2 text-xs text-muted-foreground">
                        {f.label}
                      </div>
                      <div className="text-sm font-medium">
                        {f.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* EXTRA */}
              {Object.keys(extraFeatures).length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mt-6">
                    Ek Özellikler
                  </h2>

                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {Object.entries(extraFeatures).map(([k, v]) => (
                      <div key={k} className="border rounded-xl p-3">
                        <div className="text-xs text-muted-foreground">{k}</div>
                        <div className="text-sm font-medium">{String(v)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT (MOBILE FRIENDLY STICKY CARD) */}
            <div className="lg:col-span-1">

              <div className="lg:sticky lg:top-20 space-y-4">

                {/* PRICE CARD */}
                <Card className="rounded-2xl shadow-lg">
                  <CardContent className="p-5">

                    <div className="text-sm text-muted-foreground">
                      {listing.status === "kiralik"
                        ? "Aylık"
                        : "Fiyat"}
                    </div>

                    <div className="text-2xl font-bold text-black">
                      {formatPrice(listing.price, listing.status)}
                    </div>

                    <Separator className="my-4" />

                    {/* PARSEL SORGU BUTTON */}
                    <a href={parcelUrl} target="_blank">
                      <Button
                        variant="outline"
                        className="w-full flex items-center gap-2"
                      >
                        <ExternalLink className="size-4" />
                        Parsel Sorgu Aç
                      </Button>
                    </a>

                    <Separator className="my-4" />

                    {/* AGENT */}
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>MG</AvatarFallback>
                      </Avatar>

                      <div>
                        <div className="font-semibold text-sm">
                          MG Emlak
                        </div>
                        <div className="text-xs text-muted-foreground">
                          7/24 iletişim
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-4 flex flex-col gap-2">

                      <a
                        href={`https://wa.me/905432895252?text=${whatsappText}`}
                        target="_blank"
                      >
                        <Button className="w-full bg-green-500 text-white">
                          <MessageCircle className="mr-2" />
                          WhatsApp
                        </Button>
                      </a>

                      <a href="tel:+905322197656">
                        <Button variant="outline" className="w-full">
                          <Phone className="mr-2" />
                          Ara
                        </Button>
                      </a>

                    </div>

                  </CardContent>
                </Card>

              </div>
            </div>

          </div>

          {/* SIMILAR */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold">Benzer İlanlar</h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fallbackSimilar.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  )
}