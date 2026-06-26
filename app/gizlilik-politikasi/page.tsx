import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gizlilik Politikası | MG Emlak Gayrimenkul",
  description:
    "MG Emlak Gayrimenkul Gizlilik Politikası",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">
        Gizlilik Politikası
      </h1>

      <div className="space-y-8 leading-8 text-muted-foreground">

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">
            1. Genel Bilgilendirme
          </h2>

          <p>
            MG Emlak Gayrimenkul olarak ziyaretçilerimizin kişisel
            verilerinin korunmasına önem veriyoruz. Bu politika,
            web sitemizi ziyaret ettiğinizde hangi bilgilerin
            toplandığını ve nasıl kullanıldığını açıklar.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">
            2. Toplanan Bilgiler
          </h2>

          <p>
            İletişim formları aracılığıyla ad, telefon numarası,
            e-posta adresi ve mesaj içerikleri tarafımıza
            iletilebilir.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">
            3. Bilgilerin Kullanımı
          </h2>

          <p>
            Toplanan bilgiler yalnızca müşterilerimize hizmet
            sunmak, talepleri yanıtlamak ve iletişim kurmak amacıyla
            kullanılmaktadır.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">
            4. Veri Güvenliği
          </h2>

          <p>
            Kişisel verilerin korunması için gerekli teknik ve
            idari tedbirler alınmaktadır.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">
            5. İletişim
          </h2>

          <p>
            Gizlilik politikamız hakkında sorularınız için bizimle
            iletişime geçebilirsiniz.
          </p>
        </section>

      </div>
    </main>
  )
}