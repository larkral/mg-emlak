"use client"

import { useState } from "react"
import { Phone, Clock } from "lucide-react"

export default function IletisimPage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  function handleSend() {
    const text = [
      `Konu: ${subject}`,
      ``,
      `Ad Soyad: ${name}`,
      `Telefon: ${phone}`,
      ``,
      `Mesaj:`,
      message,
    ].join("\n")

    const url = `https://wa.me/905322197656?text=${encodeURIComponent(text)}`

    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf7ef] via-white to-[#f5f0e1]">
      <div className="mx-auto max-w-6xl px-4 py-16 space-y-14">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-[#111111]">
            İletişim
          </h1>

          <p className="text-slate-600 max-w-2xl mx-auto">
            MG Emlak ile hızlı iletişime geçin.
          </p>
        </div>

        {/* PHONE CARDS */}
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { tel: "05541117163", label: "0554 111 71 63" },
            { tel: "05322197656", label: "0532 219 76 56" },
            { tel: "05448458858", label: "0544 845 88 58" },
          ].map((item) => (
            <a
              key={item.tel}
              href={`tel:${item.tel}`}
              className="
                rounded-2xl
                border border-amber-200
                bg-amber-50/70
                backdrop-blur
                p-6
                hover:bg-amber-100/70
                hover:shadow-lg
                hover:-translate-y-1
                transition
              "
            >
              <Phone className="size-5 mb-3 text-amber-600" />

              <p className="font-semibold text-slate-900">
                {item.label}
              </p>

              <p className="text-xs text-amber-700 mt-1">
                Tıkla ve ara
              </p>
            </a>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-10 md:grid-cols-2">

          {/* FORM */}
          <div className="rounded-3xl border border-amber-200 bg-white p-8 shadow-sm space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                WhatsApp İletişim Formu
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Satış, kiralık veya danışma için yazabilirsiniz.
              </p>
            </div>

            <input
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-amber-300
              "
              placeholder="Ad Soyad"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-amber-300
              "
              placeholder="Telefon"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-amber-300
              "
              placeholder="Konu"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <textarea
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
                text-sm
                h-32
                focus:outline-none
                focus:ring-2
                focus:ring-amber-300
              "
              placeholder="Mesaj"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              onClick={handleSend}
              className="
                w-full
                rounded-xl
                bg-gradient-to-r
                from-yellow-500
                via-amber-500
                to-yellow-600
                text-black
                py-3
                text-sm
                font-bold
                hover:from-yellow-400
                hover:to-amber-500
                transition
                shadow-lg
              "
            >
              WhatsApp’a Gönder
            </button>
          </div>

          {/* MAP + INFO */}
          <div className="space-y-5">

            {/* MAP */}
            <div className="rounded-3xl overflow-hidden border border-amber-200 shadow-sm bg-white">
              <div className="h-[320px] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d306.4730488466115!2d30.544611998259143!3d38.753639722069515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cf17133e7f08b7%3A0x109b4d2e4315a0d0!2sMG%20Emlak!5e0!3m2!1str!2str!4v1782160595924!5m2!1str!2str"
                  className="w-full h-full"
                  loading="lazy"
                  style={{ border: 0 }}
                />
              </div>
            </div>

            {/* HOURS */}
            <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-white to-amber-50 p-6 space-y-2">
              <div className="flex items-center gap-2 font-medium text-slate-900">
                <Clock className="size-4 text-amber-600" />
                Çalışma Saatleri
              </div>

              <p className="text-sm text-slate-600">
                Pazartesi - Cumartesi: 09:00 - 17:00
              </p>

              <p className="text-sm text-slate-600">
                Pazar: Kapalı
              </p>
            </div>
          </div>
        </div>

        {/* FOOT CTA */}
        <div
          className="
            rounded-3xl
            bg-gradient-to-r
            from-[#111111]
            via-[#1a1a1a]
            to-[#111111]
            p-8
            text-center
            text-white
            shadow-xl
            border
            border-amber-500/30
          "
        >
          <p className="text-lg font-semibold">
            En hızlı dönüş WhatsApp üzerinden yapılır
          </p>

          <p className="text-sm text-amber-200 mt-1">
            MG Emlak – Güvenilir Gayrimenkul Danışmanlığı
          </p>
        </div>

      </div>
    </div>
  )
}