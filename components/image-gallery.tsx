"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function ImageGallery({
  images,
  title,
}: {
  images: string[]
  title: string
}) {
  const [active, setActive] = React.useState(0)
  const [zoom, setZoom] = React.useState<string | null>(null)

  const hasImages = images?.length > 0

  function prev() {
    setActive((a) => (a === 0 ? images.length - 1 : a - 1))
  }

  function next() {
    setActive((a) => (a === images.length - 1 ? 0 : a + 1))
  }

  // swipe support
  const startX = React.useRef<number | null>(null)

  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (startX.current === null) return

    const diff = e.changedTouches[0].clientX - startX.current

    if (diff > 50) prev()
    if (diff < -50) next()

    startX.current = null
  }

  if (!hasImages) {
    return (
      <div className="aspect-[16/10] rounded-2xl border bg-muted flex items-center justify-center text-muted-foreground">
        Görsel yok
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">

      {/* MAIN IMAGE */}
      <div
        className="group relative aspect-[16/10] overflow-hidden rounded-2xl border bg-muted shadow-sm cursor-zoom-in"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => setZoom(images[active])}
      >
        <Image
          src={images[active] || "/placeholder.svg"}
          alt={`${title} - ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover scale-105 transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

        {/* nav buttons */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/70 backdrop-blur-md shadow hover:bg-white transition"
            >
              <ChevronLeft className="size-5" />
            </button>

            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/70 backdrop-blur-md shadow hover:bg-white transition"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        {/* counter */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
          {active + 1} / {images.length}
        </div>
      </div>

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-xl border transition",
                active === i
                  ? "border-black ring-2 ring-black/30"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={img || "/placeholder.svg"}
                alt={`${title} ${i + 1}`}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* ZOOM MODAL */}
      {zoom && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setZoom(null)}
        >
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setZoom(null)}
          >
            <X className="size-7" />
          </button>

          <div className="relative w-full max-w-6xl h-[85vh]">
            <Image
              src={zoom}
              alt="zoom"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

    </div>
  )
}