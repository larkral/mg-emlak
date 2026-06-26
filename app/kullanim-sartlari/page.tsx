import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Kullanım Şartları | MG Emlak Gayrimenkul",
  description: "MG Emlak Gayrimenkul kullanım şartları",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <div className="border-b bg-gradient-to-b from-amber-50 to-background">
        <div className="mx-auto max-w-7xl px-4 py-20">

          <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700">
            MG Emlak Gayrimenkul
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight">
            Kullanım Şartları
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Bu siteyi kullanan tüm ziyaretçiler aşağıdaki şartları kabul etmiş sayılır.
          </p>

          <p className="mt-6 text-sm text-muted-foreground">
            Son Güncelleme: 26 Haziran 2026
          </p>

        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-5xl px-4 py-16 space-y-8">

        <section className="rounded-3xl border bg-card p-8 shadow-sm">
          <h2 className="flex items-center gap-3 text-2xl font-semibold">
            <div className="h-8 w-1 rounded-full bg-amber-500" />
            1. Genel Şartlar
          </h2>
          <p className="mt-4 text-muted-foreground leading-8">
            Siteyi kullanan herkes bu kullanım şartlarını kabul etmiş sayılır.
          </p>
        </section>

        <section className="rounded-3xl border bg-card p-8 shadow-sm">
          <h2 className="flex items-center gap-3 text-2xl font-semibold">
            <div className="h-8 w-1 rounded-full bg-amber-500" />
            2. Hizmet İçeriği
          </h2>
          <p className="mt-4 text-muted-foreground leading-8">
            Sitedeki ilan ve bilgiler bilgilendirme amaçlıdır, değiştirilebilir.
          </p>
        </section>

        <section className="rounded-3xl border bg-card p-8 shadow-sm">
          <h2 className="flex items-center gap-3 text-2xl font-semibold">
            <div className="h-8 w-1 rounded-full bg-amber-500" />
            3. Fikri Haklar
          </h2>
          <p className="mt-4 text-muted-foreground leading-8">
            Tüm içerikler MG Emlak Gayrimenkul’e aittir.
          </p>
        </section>

        <section className="rounded-3xl border bg-card p-8 shadow-sm">
          <h2 className="flex items-center gap-3 text-2xl font-semibold">
            <div className="h-8 w-1 rounded-full bg-amber-500" />
            4. Sorumluluk
          </h2>
          <p className="mt-4 text-muted-foreground leading-8">
            Bilgi hatalarından dolayı oluşabilecek zararlardan site sorumlu değildir.
          </p>
        </section>

        {/* CTA */}
        <div className="rounded-3xl bg-amber-600 p-10 text-center text-white">
          <h3 className="text-3xl font-bold">
            Daha fazla bilgi mi lazım?
          </h3>
          <p className="mt-3 text-amber-100">
            Bizimle iletişime geçebilirsin.
          </p>

          <Link
            href="/iletisim"
            className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-amber-700 transition hover:scale-105"
          >
            İletişim
          </Link>
        </div>

      </div>
    </div>
  )
}