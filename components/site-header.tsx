"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building2,
  Menu,
  X,
  Home,
  List,
  KeyRound,
  MapPin,
  Phone,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  const [counts, setCounts] = React.useState({
    satilik: 0,
    kiralik: 0,
    katKarsiligi: 0,
  })

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  // 📊 DATA FETCH
  React.useEffect(() => {
    const fetchCounts = async () => {
      const { data } = await supabase
        .from("listings")
        .select("type")

      const satilik =
        data?.filter((i) => i.type === "satilik").length || 0

      const kiralik =
        data?.filter((i) => i.type === "kiralik").length || 0

      const katKarsiligi =
        data?.filter((i) => i.type === "kat-karsiligi").length || 0

      setCounts({
        satilik,
        kiralik,
        katKarsiligi,
      })
    }

    fetchCounts()
  }, [])

  // NAV ITEMS (DİNAMİK)
  const navItems = [
    { href: "/", label: "Ana Sayfa", icon: Home },
    { href: "/ilanlar", label: "Tümü", icon: List },

    {
      href: "/ilanlar/satilik",
      label: `Satılık (${counts.satilik})`,
      icon: Building2,
    },
    {
      href: "/ilanlar/kiralik",
      label: `Kiralık (${counts.kiralik})`,
      icon: KeyRound,
    },
    {
      href: "/ilanlar/kat-karsiligi-arsa",
      label: `Kat-Karşılığı (${counts.katKarsiligi})`,
      icon: MapPin,
    },

    { href: "/iletisim", label: "İletişim", icon: Phone },
  ]

  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur-xl">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="MG Emlak"
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />

          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">
              MG Emlak
            </span>
            <span className="text-[11px] text-muted-foreground">
              Gayrimenkul Danışmanlığı
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm rounded-xl transition-all",
                  isActive(item.href)
                    ? "bg-black text-white shadow-md"
                    : "text-muted-foreground hover:text-black hover:bg-muted"
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* MOBILE BUTTON */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-t bg-white/80 backdrop-blur-xl transition-all duration-300 ease-in-out",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-1 px-3 py-2">
          
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm rounded-xl transition",
                  isActive(item.href)
                    ? "bg-black text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-black"
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            )
          })}

        </div>
      </div>
    </header>
  )
}