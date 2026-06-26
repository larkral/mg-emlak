import { supabase } from "@/lib/supabase"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ListingsExplorer } from "@/components/listings-explorer"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export default async function Page() {
  const { data: listings, error } = await supabase
    .from("listings")
    .select("*")
    .eq("status", "kat-karsiligi-arsa")
    .order("created_at", { ascending: false })

  if (error) {
    console.log("Supabase error:", error)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <ListingsExplorer listings={listings ?? []} />
      </main>

      <SiteFooter />
    </div>
  )
}