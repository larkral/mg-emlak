import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ListingCard } from "@/components/listing-card"
import { supabase } from "@/lib/supabase"

export default async function HomePage() {
  const res = await supabase.from("listings").select("*")
  const listings = res.data ?? []
  

  const featured = listings.filter((l) => l.featured)

  const latest = [...listings]
    .sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""))
    .slice(0, 6)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">

        {/* HERO */}
        <section className="relative">
          <div className="relative h-[520px] sm:h-[640px] w-full overflow-hidden">

            <Image
              src="/images/hero.png"
              alt="Emlak"
              fill
              priority
              className="object-cover scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
          </div>

          {/* HERO CONTENT */}
          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">

              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] sm:text-xs text-white backdrop-blur border border-white/10">
                <Building2 className="size-3 sm:size-4" />
                Afyonkarahisar
              </div>

              <h1 className="mt-4 sm:mt-6 max-w-xl text-2xl sm:text-5xl font-semibold leading-snug sm:leading-tight text-white">
                Doğru evi bulmanın en hızlı yolu
              </h1>

              <p className="mt-3 sm:mt-5 max-w-md text-sm sm:text-lg text-white/70 leading-relaxed">
                Satılık ve kiralık binlerce ilanı tek platformda keşfet.
              </p>

            </div>
          </div>

          {/* SEARCH */}
          <div className="relative -mt-10 sm:-mt-16 z-10 mx-auto max-w-5xl px-4">
            <div className="rounded-2xl bg-white/95 backdrop-blur-xl p-4 sm:p-5 shadow-2xl border">

              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  className="flex-1 rounded-xl border px-4 py-3 text-sm sm:text-base bg-gray-50 outline-none focus:border-black"
                  placeholder="Şehir, mahalle veya ilan ara..."
                />

                <select className="rounded-xl border bg-gray-50 px-3 py-3 text-sm sm:text-base">
                  <option>Satılık</option>
                  <option>Kiralık</option>
                  <option>Kat Karşılığı</option>
                </select>

                <Link
                  href="/ilanlar"
                  className="rounded-xl bg-black px-6 py-3 text-white text-sm sm:text-base hover:opacity-90 transition inline-flex items-center justify-center"
                >
                  Ara
                </Link>

              </div>

            </div>
          </div>
        </section>

        {/* FEATURED */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Öne Çıkan İlanlar
              </h2>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground">
                Editör seçimi premium ilanlar
              </p>
            </div>

            <Link
              href="/ilanlar"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
            >
              Tümü <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-6 sm:mt-10 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        {/* LATEST */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  Son Eklenen İlanlar
                </h2>
                <p className="mt-1 text-sm sm:text-base text-muted-foreground">
                  Güncel fırsatlar
                </p>
              </div>

              <Link href="/ilanlar" className="text-sm flex items-center gap-2">
                Tümü <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-6 sm:mt-10 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24">

          <div className="rounded-3xl bg-black px-6 sm:px-10 py-14 sm:py-20 text-center text-white">

            <h2 className="text-xl sm:text-4xl font-semibold">
              Mülkünüzü hızlıca satmak ister misiniz?
            </h2>

            <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-sm sm:text-base text-white/70">
              Uzman ekibimizle en doğru fiyatlandırma ve hızlı satış süreci
            </p>

            <Button
              render={<Link href="/iletisim" />}
              nativeButton={false}
              size="lg"
              variant="secondary"
              className="mt-6 sm:mt-8 w-full sm:w-auto"
            >
              İlan Ver
            </Button>

          </div>

        </section>

      </main>

      <SiteFooter />
    </div>
  )
}