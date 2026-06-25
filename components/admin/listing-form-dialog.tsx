"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { supabase } from "@/lib/supabase"

import {
  CITY,
  NEIGHBORHOODS,
  PROPERTY_TYPES,
  ROOM_OPTIONS,
  type Listing,
  type ListingStatus,
  type PropertyType,
} from "@/lib/data"

export type ListingFormValues = {
  id?: string
  title: string
  description: string
  price: number
  status: ListingStatus
  type: PropertyType
  city: string
  district: string
  area: number
  rooms: string
  bedrooms?: number
  bathrooms: number
  floor: string
  heating: string
  buildingAge: number
  featured: boolean
  images: string[]
  features?: Record<string, any> | null
  parcelNo?: string
islandNo?: string
sheetNo?: string
zoningStatus?: string
titleDeedStatus?: string
kaks?: string
gabari?: string
infrastructure?: string[]
locationFeatures?: string[]
}

const EMPTY: ListingFormValues = {
  id: "",
  title: "",
  description: "",
  price: 0,
  status: "satilik" as ListingStatus,
  type: "Daire",
  city: CITY,
  district: "Erenler",
  area: 0,
  rooms: "2+1",
  bedrooms: 2,
  bathrooms: 1,
  floor: "",
  heating: "Doğalgaz (Kombi)",
  buildingAge: 0,
  featured: false,
  images: [],
  parcelNo: "",
islandNo: "",
sheetNo: "",
zoningStatus: "",
titleDeedStatus: "",
kaks: "",
gabari: "",
infrastructure: [],
locationFeatures: [],
}

export function ListingFormDialog({
  open,
  onOpenChange,
  initial,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  initial?: Listing | null
  onSubmit: (values: ListingFormValues) => void | Promise<void>
}) {
  const [values, setValues] = React.useState<ListingFormValues>(EMPTY)
  const [images, setImages] = React.useState<File[]>([])
  const [uploading, setUploading] = React.useState(false)
  const isLand =
  values.type === "Arsa" ||
  values.status === "kat-karsiligi-arsa"
  const [enableFeatures, setEnableFeatures] = React.useState(false)
  const isKatKarsiligi =
  values.status === "kat-karsiligi-arsa"

const [customFeatures, setCustomFeatures] = React.useState<
  { key: string; value: string }[]
>([])


  React.useEffect(() => {
    if (open) {
      if (initial) {
        setValues({
          ...EMPTY,
          ...initial,
          id: initial.id,
        })
      } else {
        setValues(EMPTY)
      }
      setImages([])
    }
  }, [open, initial])

  function update<K extends keyof ListingFormValues>(
    key: K,
    value: ListingFormValues[K],
  ) {
    setValues((v) => ({ ...v, [key]: value }))
  }

  // ✅ SUPABASE IMAGE UPLOAD (FIXED)
  async function uploadImages(files: File[]) {
    const urls: string[] = []

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`

      const { error } = await supabase.storage
        .from("listings")
        .upload(fileName, file)

      if (error) throw error

      const { data } = supabase.storage
        .from("listings")
        .getPublicUrl(fileName)

      urls.push(data.publicUrl)
    }

    return urls
  } 

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      setUploading(true)

      let uploadedImages: string[] = values.images || []

      // yeni seçilen resimler varsa upload et
      if (images.length > 0) {
        const newUrls = await uploadImages(images)
        uploadedImages = newUrls
      }

      const payload = {
  title: values.title,
  description: values.description,
  price: Number(values.price),
  status: values.status,
  type: values.type,
  city: values.city,
  district: values.district,
  area: Number(values.area),
  rooms: values.rooms,
  bathrooms: Number(values.bathrooms),
  floor: values.floor,
  heating: values.heating,
  buildingAge: Number(values.buildingAge),
  featured: values.featured,
  images: uploadedImages,

  // DB (snake_case)
  island_no: values.islandNo,
  parcel_no: values.parcelNo,
  sheet_no: values.sheetNo,
  zoning_status: values.zoningStatus,
  title_deed_status: values.titleDeedStatus,
  kaks: values.kaks,
  gabari: values.gabari,

  // dynamic features
  features: enableFeatures
    ? customFeatures.reduce((acc, item) => {
        if (item.key.trim()) {
          acc[item.key] = item.value
        }
        return acc
      }, {} as Record<string, any>)
    : null,
}

await onSubmit(payload)
      onOpenChange(false)
    } catch (err) {
      console.log(err)
      alert("İlan kaydedilemedi / resim yükleme hatası")
    } finally {
      setUploading(false)
    }
  }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initial ? "İlanı Düzenle" : "Yeni İlan Ekle"}
          </DialogTitle>
          <DialogDescription>
            İlan bilgilerini doldurun ve kaydedin.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">

          {/* BAŞLIK */}
          <div className="grid gap-2">
            <Label>Başlık</Label>
            <Input
              required
              value={values.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </div>

          {/* AÇIKLAMA */}
          <div className="grid gap-2">
            <Label>Açıklama</Label>
            <Textarea
              required
              rows={3}
              value={values.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          {/* RESİMLER */}
          <div className="grid gap-2">
            <Label>Resimler</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                if (!e.target.files) return
                setImages(Array.from(e.target.files))
              }}
            />
          </div>

          {/* STATUS */}
          <div className="grid gap-2">
            <Label>İşlem Türü</Label>
            <Select
              value={values.status}
              onValueChange={(v) => update("status", v as ListingStatus)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="satilik">Satılık</SelectItem>
                  <SelectItem value="kiralik">Kiralık</SelectItem>
                  <SelectItem value="kat-karsiligi-arsa">Kat Karşılığı Arsa</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {isKatKarsiligi && (
  <div className="grid gap-2">

    <Label>Parsel No</Label>
    <Input
      value={values.parcelNo || ""}
      onChange={(e) => update("parcelNo", e.target.value)}
    />

    <Label>Ada No</Label>
    <Input
      value={values.islandNo || ""}
      onChange={(e) => update("islandNo", e.target.value)}
    />

    <Label>Pafta No</Label>
    <Input
      value={values.sheetNo || ""}
      onChange={(e) => update("sheetNo", e.target.value)}
    />

    <Label>İmar Durumu</Label>
    <Input
      value={values.zoningStatus || ""}
      onChange={(e) => update("zoningStatus", e.target.value)}
    />

    <Label>Tapu Durumu</Label>
    <Input
      value={values.titleDeedStatus || ""}
      onChange={(e) => update("titleDeedStatus", e.target.value)}
    />

    <Label>KAKS</Label>
    <Input
      value={values.kaks || ""}
      onChange={(e) => update("kaks", e.target.value)}
    />

    <Label>Gabari</Label>
    <Input
      value={values.gabari || ""}
      onChange={(e) => update("gabari", e.target.value)}
    />

  </div>
)}

          </div>

          {/* TYPE */}
          <div className="grid gap-2">
            <Label>Emlak Tipi</Label>
            <Select
            value={isKatKarsiligi ? "Arsa" : values.type}
            onValueChange={(v) => {
              if (!isKatKarsiligi) {
                update("type", v as PropertyType)
              }
            }}
            disabled={isKatKarsiligi}
          >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {PROPERTY_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* CITY */}
          <div className="grid gap-2">
            <Label>Şehir</Label>
            <Input value={CITY} disabled />
          </div>

          {/* DISTRICT */}
          <div className="grid gap-2">
            <Label>Mahalle</Label>
            <Select
              value={values.district}
              onValueChange={(value) => update("district", value as string)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {NEIGHBORHOODS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* PRICE */}
          <div className="grid gap-2">
            <Label>Fiyat</Label>
            <Input
              type="number"
              value={values.price || ""}
              onChange={(e) => update("price", Number(e.target.value))}
            />
          </div>

          {/* AREA */}
          <div className="grid gap-2">
            <Label>Alan</Label>
            <Input
              type="number"
              value={values.area || ""}
              onChange={(e) => update("area", Number(e.target.value))}
            />
          </div>
  {!isLand && (
  <>
    {/* ROOMS */}
    <div className="grid gap-2">
      <Label>Oda</Label>
      <Select
        value={values.rooms}
        onValueChange={(v) => update("rooms", v as string)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ROOM_OPTIONS.map((r) => (
            <SelectItem key={r} value={r}>
              {r}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    {/* BATHROOM */}
    <div className="grid gap-2">
      <Label>Banyo</Label>
      <Input
        type="number"
        value={values.bathrooms || ""}
        onChange={(e) =>
          update("bathrooms", Number(e.target.value))
        }
      />
    </div>

    {/* FLOOR */}
    <div className="grid gap-2">
      <Label>Kat</Label>
      <Input
        value={values.floor}
        onChange={(e) => update("floor", e.target.value)}
      />
    </div>

    {/* BUILDING AGE */}
    <div className="grid gap-2">
      <Label>Bina Yaşı</Label>
      <Input
        type="number"
        value={values.buildingAge || ""}
        onChange={(e) =>
          update("buildingAge", Number(e.target.value))
        }
      />
    </div>

    {/* HEATING */}
    <div className="grid gap-2">
      <Label>Isıtma</Label>
      <Input
        value={values.heating}
        onChange={(e) => update("heating", e.target.value)}
      />
    </div>
    <label className="flex items-center gap-2 text-sm">
  <input
    type="checkbox"
    checked={enableFeatures}
    onChange={(e) => setEnableFeatures(e.target.checked)}
  />
  Ek özellik eklemek istiyorum
</label>
{enableFeatures && (
  <div className="mt-3 space-y-3">
    
    <Button
      type="button"
      variant="outline"
      onClick={() =>
        setCustomFeatures((prev) => [
          ...prev,
          { key: "", value: "" },
        ])
      }
    >
      + Özellik Ekle
    </Button>

    {customFeatures.map((item, index) => (
      <div key={index} className="grid grid-cols-2 gap-2">
        
        <Input
          placeholder="Örn: Otopark"
          value={item.key}
          onChange={(e) => {
            const updated = [...customFeatures]
            updated[index].key = e.target.value
            setCustomFeatures(updated)
          }}
        />

        <Input
          placeholder="Örn: Var / Kapalı / 20 Araç"
          value={item.value}
          onChange={(e) => {
            const updated = [...customFeatures]
            updated[index].value = e.target.value
            setCustomFeatures(updated)
          }}
        />

      </div>
    ))}

  </div>
)}
  </>
)}

          {/* FEATURED */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={values.featured}
              onChange={(e) => update("featured", e.target.checked)}
            />
            Öne çıkan ilan
          </label>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              İptal
            </Button>

            <Button type="submit" disabled={uploading}>
              {uploading ? "Yükleniyor..." : initial ? "Güncelle" : "Ekle"}
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  )
}