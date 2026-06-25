import { supabase } from "@/lib/supabase"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ListingsExplorer } from "@/components/listings-explorer"

export default async function Page() {
  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .eq("status", "satilik")
    .order("created_at", { ascending: false })

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