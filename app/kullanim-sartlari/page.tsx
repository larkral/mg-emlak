import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kullanım Şartları | MG Emlak Gayrimenkul",
  description:
    "MG Emlak Gayrimenkul Kullanım Şartları",
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">
        Kullanım Şartları
      </h1>

      <div className="space-y-8 leading-8 text-muted-foreground">

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">
            1. Genel
          </h2>

          <p>
            Bu internet sitesini kullanan tüm ziyaretçiler aşağıdaki
            kullanım şartlarını kabul etmiş sayılır.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">
            2. Hizmet Kapsamı
          </h2>

          <p>
            Sitede yer alan bilgiler bilgilendirme amacıyla
            sunulmaktadır. İlan içerikleri zaman içerisinde
            güncellenebilir veya değiştirilebilir.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">
            3. Fikri Mülkiyet
          </h2>

          <p>
            Site içerisinde yer alan tüm içerikler, görseller,
            logolar ve tasarımlar MG Emlak Gayrimenkul'e veya ilgili
            hak sahiplerine aittir.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">
            4. Sorumluluğun Sınırlandırılması
          </h2>

          <p>
            Site içeriğinde yer alan bilgilerde oluşabilecek
            değişikliklerden dolayı doğabilecek zararlardan MG Emlak
            Gayrimenkul sorumlu tutulamaz.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">
            5. Değişiklik Hakkı
          </h2>

          <p>
            MG Emlak Gayrimenkul, kullanım şartlarını önceden haber
            vermeksizin güncelleme hakkını saklı tutar.
          </p>
        </section>

      </div>
    </main>
  )
}