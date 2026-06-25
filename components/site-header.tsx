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

const navItems = [
  { href: "/", label: "Ana Sayfa", icon: Home },
  { href: "/ilanlar", label: "Tümü", icon: List },
  { href: "/ilanlar?type=satilik", label: "Satılık", icon: Building2, type: "satilik" },
  { href: "/ilanlar?type=kiralik", label: "Kiralık", icon: KeyRound, type: "kiralik" },
  { href: "/ilanlar?type=katkarsiligi", label: "Kat-Karşılığı", icon: MapPin, type: "katkarsiligi" },
  { href: "/iletisim", label: "İletişim", icon: Phone },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  const isActive = (href: string) => {
  const [path, query] = href.split("?")

  if (path === "/") return pathname === "/"
  if (path !== "/ilanlar") return pathname.startsWith(path)

  const currentType = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  ).get("type")

  const hrefType = new URLSearchParams(query).get("type")

  return currentType === hrefType
}

  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur-xl">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* LOGO */}
    <Link href="/" className="flex items-center gap-3 group">
      <div className="flex items-center justify-center">
        <img
          src="/logo.png"
          alt="MG Emlak"
          className="h-9 w-auto object-contain"
        />
      </div>

      <span className="font-semibold tracking-tight text-foreground">
        MG Emlak
      </span>
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
          <div className="transition-transform duration-300">
            {open ? <X /> : <Menu />}
          </div>
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