import { supabase } from "@/lib/supabase"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ListingsExplorer } from "@/components/listings-explorer"

export default async function Page({
  searchParams,
}: {
  searchParams?: { type?: string }
}) {
  const type = searchParams?.type

  const { data } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false })

  let listings = data ?? []

  // 🔥 filtre sistemi
  if (type) {
    listings = listings.filter((l) =>
      normalizeStatus(l.status) === type
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <ListingsExplorer listings={listings} />
      </main>

      <SiteFooter />
    </div>
  )
}

// 🔥 tek standart normalize
function normalizeStatus(status?: string) {
  return (status || "")
    .toLowerCase()
    .replace(/\s/g, "")
    .replace("ı", "i")
}