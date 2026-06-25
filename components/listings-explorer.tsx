"use client"

import * as React from "react"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ListingCard } from "@/components/listing-card"
import {
  NEIGHBORHOODS,
  PROPERTY_TYPES,
  ROOM_OPTIONS,
  type Listing,
} from "@/lib/data"

const ALL = ""
const PAGE_SIZE = 6
const PRICE_MAX = 15_000_000

type Filters = {
  status: string
  district: string
  type: string
  rooms: string
  price: [number, number]
}

function normalize(v: string) {
  return (v || "")
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ /g, "-")
}

function FilterPanel({ filters, setFilters, onReset }: any) {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-border/40 bg-white/80 p-5 shadow-xl backdrop-blur-xl">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtreler</h2>

        <Button variant="ghost" size="sm" onClick={onReset}>
          <X className="w-4 h-4 mr-1" />
          Temizle
        </Button>
      </div>

      {/* STATUS */}
      <div className="flex flex-col gap-2">
        <Label>İşlem</Label>
        <Select
          value={filters.status}
          onValueChange={(v) => setFilters((f: any) => ({ ...f, status: v }))}
        >
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Hepsi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Hepsi</SelectItem>
            <SelectItem value="satilik">Satılık</SelectItem>
            <SelectItem value="kiralik">Kiralık</SelectItem>
            <SelectItem value="kat-karsiligi-arsa">Kat Karşılığı Arsa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* TYPE */}
      <div className="flex flex-col gap-2">
        <Label>Tip</Label>
        <Select
          value={filters.type}
          onValueChange={(v) => setFilters((f: any) => ({ ...f, type: v }))}
        >
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Hepsi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Hepsi</SelectItem>
            {PROPERTY_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* DISTRICT */}
      <div className="flex flex-col gap-2">
        <Label>Mahalle</Label>
        <Select
          value={filters.district}
          onValueChange={(v) => setFilters((f: any) => ({ ...f, district: v }))}
        >
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Hepsi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Hepsi</SelectItem>
            {NEIGHBORHOODS.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ROOMS */}
      <div className="flex flex-col gap-2">
        <Label>Oda Sayısı</Label>
        <Select
          value={filters.rooms}
          onValueChange={(v) => setFilters((f: any) => ({ ...f, rooms: v }))}
        >
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Hepsi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Hepsi</SelectItem>
            {ROOM_OPTIONS.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* PRICE */}
      <div className="flex flex-col gap-3">
        <Label>Fiyat</Label>

        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "0-1M", value: [0, 1_000_000] },
            { label: "1-3M", value: [1_000_000, 3_000_000] },
            { label: "3-5M", value: [3_000_000, 5_000_000] },
            { label: "5M+", value: [5_000_000, PRICE_MAX] },
          ].map((p) => (
            <Button
              key={p.label}
              type="button"
              variant="outline"
              className="h-9 rounded-xl text-xs hover:bg-muted transition"
              onClick={() =>
                setFilters((f: any) => ({ ...f, price: p.value }))
              }
            >
              {p.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.price[0] || ""}
            onChange={(e) =>
              setFilters((f: any) => ({
                ...f,
                price: [Number(e.target.value), f.price[1]],
              }))
            }
            className="h-10 rounded-xl border px-3 text-sm"
          />

          <input
            type="number"
            placeholder="Max"
            value={filters.price[1] || ""}
            onChange={(e) =>
              setFilters((f: any) => ({
                ...f,
                price: [f.price[0], Number(e.target.value)],
              }))
            }
            className="h-10 rounded-xl border px-3 text-sm"
          />
        </div>
      </div>
    </div>
  )
}

export function ListingsExplorer({ listings }: { listings: Listing[] }) {
  const [filters, setFilters] = React.useState<Filters>({
    status: ALL,
    district: ALL,
    type: ALL,
    rooms: ALL,
    price: [0, PRICE_MAX],
  })

  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    setPage(1)
  }, [filters])

  const filtered = React.useMemo(() => {
    return listings.filter((l) => {
      if (filters.status && l.status !== filters.status) return false

      if (
        filters.type &&
        normalize(l.type) !== normalize(filters.type)
      )
        return false

      if (filters.district && l.district !== filters.district) return false
      if (filters.rooms && l.rooms !== filters.rooms) return false
      if (l.price < filters.price[0] || l.price > filters.price[1]) return false

      return true
    })
  }, [listings, filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            İlanlar
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Premium gayrimenkul listesi
          </p>
        </div>

        <span className="text-sm text-muted-foreground">
          {filtered.length} sonuç
        </span>
      </div>

      <div className="flex gap-8">

        {/* SIDEBAR */}
        <aside className="hidden lg:block w-80">
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            onReset={() =>
              setFilters({
                status: ALL,
                district: ALL,
                type: ALL,
                rooms: ALL,
                price: [0, PRICE_MAX],
              })
            }
          />
        </aside>

        {/* MAIN */}
        <div className="flex-1">

          {/* MOBILE FILTER */}
          <div className="lg:hidden mb-4">
            <Sheet>
              <SheetTrigger className="flex items-center gap-2 rounded-xl border px-4 py-2 shadow-sm">
                <SlidersHorizontal className="w-4 h-4" />
                Filtreler
              </SheetTrigger>

              <SheetContent>
                <FilterPanel
                  filters={filters}
                  setFilters={setFilters}
                  onReset={() =>
                    setFilters({
                      status: ALL,
                      district: ALL,
                      type: ALL,
                      rooms: ALL,
                      price: [0, PRICE_MAX],
                    })
                  }
                />
              </SheetContent>
            </Sheet>
          </div>

          {/* GRID */}
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {paged.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <Pagination>
                <PaginationContent>
                  <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} />
                  <PaginationNext onClick={() => setPage(p => Math.min(totalPages, p + 1))} />
                </PaginationContent>
              </Pagination>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}