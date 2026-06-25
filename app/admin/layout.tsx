"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // login sayfasını koruma dışında bırak
    if (pathname === "/admin/login") {
      setLoading(false)
      return
    }

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.replace("/admin/login")
        return
      }

      setLoading(false)
    }

    checkAuth()

    // 🔥 gerçek auth değişimlerini dinle
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          router.replace("/admin/login")
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [pathname, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Yükleniyor...
      </div>
    )
  }

  return <>{children}</>
}