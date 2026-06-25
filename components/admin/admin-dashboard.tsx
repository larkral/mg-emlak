"use client"

import { supabase } from "@/lib/supabase"
import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"
import {
  Building2,
  Home,
  LayoutDashboard,
  ListPlus,
  Pencil,
  Plus,
  Trash2,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  ListingFormDialog,
  type ListingFormValues,
} from "@/components/admin/listing-form-dialog"

import { formatPrice, type Listing } from "@/lib/data"

const normalize = (s?: string) =>
  (s || "").toLocaleLowerCase("tr-TR")

export function AdminDashboard() {
  const [items, setItems] = React.useState<Listing[]>([])
  const [loading, setLoading] = React.useState(true)
  const [query, setQuery] = React.useState("")
  const [formOpen, setFormOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<Listing | null>(null)
  const [deleteTarget, setDeleteTarget] = React.useState<Listing | null>(null)

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase()

    return items.filter((l) =>
      (l.title ?? "").toLowerCase().includes(q) ||
      (l.city ?? "").toLowerCase().includes(q) ||
      (l.district ?? "").toLowerCase().includes(q)
    )
  }, [items, query])
  
  async function logout() {
  await supabase.auth.signOut()
  window.location.href = "/admin/login"
}

  const stats = React.useMemo(() => [
    {
      icon: Building2,
      label: "Toplam",
      value: items.length,
    },
    {
      icon: TrendingUp,
      label: "Satılık",
      value: items.filter((l) => normalize(l.status) === "satilik").length,
    },
    {
      icon: Home,
      label: "Kiralık",
      value: items.filter((l) => normalize(l.status) === "kiralik").length,
    },
    {
      icon: ListPlus,
      label: "Öne Çıkan",
      value: items.filter((l) => l.featured).length,
    },
  ], [items])

  function openAdd() {
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(listing: Listing) {
    setEditing(listing)
    setFormOpen(true)
  }

  async function fetchListings() {
    setLoading(true)

    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .order("title", { ascending: true })

    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }

    setItems(data || [])
    setLoading(false)
  }

  React.useEffect(() => {
    fetchListings()
  }, [])

  async function handleSubmit(values: ListingFormValues) {
    if (editing) {
      const { data, error } = await supabase
        .from("listings")
        .update(values)
        .eq("id", editing.id)
        .select()

      if (error) {
        toast.error(error.message)
        return
      }

      setItems((prev) =>
        prev.map((l) => (l.id === editing.id ? data[0] : l))
      )

      toast.success("İlan güncellendi")
    } else {
      const { id, ...listingData } = values

      const { data, error } = await supabase
        .from("listings")
        .insert([
          {
            ...listingData,
            created_at: new Date().toISOString(),
          },
        ])
        .select()

      if (error) {
        toast.error(error.message)
        return
      }

      setItems((prev) => [data[0], ...prev])
      toast.success("Yeni ilan eklendi")
    }

    setFormOpen(false)
  }

  async function confirmDelete() {
    if (!deleteTarget) return

    const { error } = await supabase
      .from("listings")
      .delete()
      .eq("id", deleteTarget.id)

    if (error) {
      toast.error("Silinemedi")
      return
    }

    setItems((prev) => prev.filter((l) => l.id !== deleteTarget.id))
    toast.success("İlan silindi")
    setDeleteTarget(null)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Yükleniyor...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-secondary/30">

      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-card p-5">
        <Link href="/" className="flex items-center gap-2">
          <Building2 className="size-5" />
          <span className="font-semibold">MG Emlak</span>
        </Link>

        <div className="mt-8 flex flex-col gap-2 text-sm font-medium text-primary">
          <LayoutDashboard className="size-4" />
          İlanlar
        </div>
        <br />
        <Button
        onClick={logout}
        className="bg-orange-500/90 text-white hover:bg-orange-500 shadow-sm hover:shadow-md transition-all"
      >
        Çıkış Yap
      </Button>
      </aside>

      {/* MAIN */}
      <div className="flex-1">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b bg-card/80 p-4 backdrop-blur">
          <h1 className="text-lg font-semibold">İlan Yönetimi</h1>

          <Button onClick={openAdd}>
            <Plus className="mr-2" />
            Yeni İlan
          </Button>
        </div>

        <div className="p-6">

          {/* STATS */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-4 rounded-xl border bg-card p-4"
              >
                <s.icon className="size-5 text-primary" />
                <div>
                  <div className="text-xl font-semibold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* TABLE */}
          <div className="mt-6 rounded-xl border bg-card">
            <div className="flex items-center justify-between p-4">
              <h2 className="font-semibold">İlanlar</h2>

              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ara..."
                className="max-w-xs"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Başlık</TableHead>
                  <TableHead>Konum</TableHead>
                  <TableHead>Fiyat</TableHead>
                  <TableHead className="text-right">İşlem</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell className="font-medium">
                      {listing.title}
                      {listing.featured && (
                        <Badge className="ml-2">Öne çıkan</Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      {listing.district}, {listing.city}
                    </TableCell>

                    <TableCell className="text-primary font-medium">
                      {formatPrice(listing.price, listing.status)}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(listing)}
                      >
                        <Pencil />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                        onClick={() => setDeleteTarget(listing)}
                      >
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-10 text-muted-foreground"
                    >
                      Veri bulunamadı
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

        </div>
      </div>

      {/* FORM */}
      <ListingFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        initial={editing}
        onSubmit={handleSubmit}
      />

      {/* DELETE */}
      <Dialog open={!!deleteTarget}>
        <DialogContent>
          <DialogTitle>Silinsin mi?</DialogTitle>
          <DialogDescription>
            Bu işlem geri alınamaz.
          </DialogDescription>

          <DialogFooter>
            <Button onClick={() => setDeleteTarget(null)}>
              İptal
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}