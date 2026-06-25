import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-amber-200/30 bg-gradient-to-b from-background to-amber-50/20">

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        <div className="grid gap-12 md:grid-cols-4">

          {/* BRAND */}
<div className="md:col-span-1">

  <Link href="/" className="inline-flex items-center">
    <div className="flex items-center justify-center">
      <Image
        src="/logo.png"
        alt="MG Emlak"
        width={120}
        height={40}
        priority
        className="h-9 w-auto object-contain"
      />
    </div>
  </Link>

  <p className="mt-5 text-sm leading-7 text-muted-foreground">
    Afyonkarahisar'da satılık, kiralık ve kat karşılığı arsa
    portföylerinde güvenilir gayrimenkul danışmanlığı hizmeti
    sunuyoruz.
  </p>

</div>

          {/* DISCOVER */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide">
              Keşfet
            </h3>

            <ul className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                <Link className="hover:text-amber-600 transition" href="/ilanlar">
                  Tüm İlanlar
                </Link>
              </li>

              <li>
                <Link className="hover:text-amber-600 transition" href="/ilanlar/satilik">
                  Satılık İlanlar
                </Link>
              </li>

              <li>
                <Link className="hover:text-amber-600 transition" href="/ilanlar/kiralik">
                  Kiralık İlanlar
                </Link>
              </li>

              <li>
                <Link className="hover:text-amber-600 transition" href="/ilanlar/kat-karsiligi-arsa">
                  Kat Karşılığı Arsa
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide">
              Destek
            </h3>

            <ul className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                <Link className="hover:text-amber-600 transition" href="/iletisim">
                  İletişim
                </Link>
              </li>

              <li className="hover:text-amber-600 transition cursor-pointer">
                Gizlilik Politikası
              </li>

              <li className="hover:text-amber-600 transition cursor-pointer">
                Kullanım Şartları
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide">
              İletişim
            </h3>

            <ul className="mt-5 flex flex-col gap-4 text-sm text-muted-foreground">

              <li className="flex items-start gap-3">
                <MapPin className="size-4 mt-1 text-amber-600 shrink-0" />
                <span>
                  Marulcu, Hacı Felahi Cd. No:22 B
                  <br />
                  03200 Afyonkarahisar Merkez
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="size-4 text-amber-600 shrink-0" />
                <span>+90 543 289 52 52</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="size-4 text-amber-600 shrink-0" />
                <span>info@mgemlak.com</span>
              </li>

            </ul>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t border-amber-200/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MG Emlak. Tüm hakları saklıdır.
          </p>

          <div className="flex gap-6 text-xs">
            <a
              href="https://www.instagram.com/gunarslan.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-amber-600 hover:text-amber-500 cursor-pointer transition"
            >
              GUNARSLAN.TECH TARAFINDAN TASARLANMIŞTIR.
            </a>
          </div>

        </div>

      </div>
    </footer>
  )
}