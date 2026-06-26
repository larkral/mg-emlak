import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Gizlilik Politikası | MG Emlak Gayrimenkul",
  description: "MG Emlak Gayrimenkul gizlilik politikası",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <div className="border-b bg-gradient-to-b from-amber-50 to-background">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700">
            MG Emlak Gayrimenkul
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight">
            Gizlilik Politikası
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Kişisel verilerinizin güvenliği bizim için önemlidir. Bu sayfa,
            hangi bilgileri topladığımızı ve nasıl kullandığımızı açıklar.
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
            1. Genel Bilgilendirme
          </h2>
          <p className="mt-4 text-muted-foreground leading-8">
            MG Emlak Gayrimenkul olarak kullanıcılarımızın gizliliğini korumayı
            taahhüt ederiz. Web sitemizi ziyaret ettiğinizde bilgileriniz güvenli
            şekilde işlenir.
          </p>
        </section>

        <section className="rounded-3xl border bg-card p-8 shadow-sm">
          <h2 className="flex items-center gap-3 text-2xl font-semibold">
            <div className="h-8 w-1 rounded-full bg-amber-500" />
            2. Toplanan Bilgiler
          </h2>
          <p className="mt-4 text-muted-foreground leading-8">
            Ad, telefon, e-posta ve mesaj içerikleri iletişim formları aracılığıyla
            toplanabilir.
          </p>
        </section>

        <section className="rounded-3xl border bg-card p-8 shadow-sm">
          <h2 className="flex items-center gap-3 text-2xl font-semibold">
            <div className="h-8 w-1 rounded-full bg-amber-500" />
            3. Kullanım Amacı
          </h2>
          <p className="mt-4 text-muted-foreground leading-8">
            Toplanan veriler yalnızca hizmet sunmak, geri dönüş yapmak ve
            müşteri iletişimini sağlamak amacıyla kullanılır.
          </p>
        </section>

        <section className="rounded-3xl border bg-card p-8 shadow-sm">
          <h2 className="flex items-center gap-3 text-2xl font-semibold">
            <div className="h-8 w-1 rounded-full bg-amber-500" />
            4. Veri Güvenliği
          </h2>
          <p className="mt-4 text-muted-foreground leading-8">
            Verileriniz yetkisiz erişimlere karşı korunmakta olup gerekli teknik
            önlemler alınmaktadır.
          </p>
        </section>

        {/* CTA */}
        <div className="rounded-3xl bg-amber-600 p-10 text-center text-white">
          <h3 className="text-3xl font-bold">
            Sorularınız mı var?
          </h3>
          <p className="mt-3 text-amber-100">
            Bizimle iletişime geçmekten çekinmeyin.
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