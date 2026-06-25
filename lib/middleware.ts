import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")

  const token = req.cookies.get("sb-access-token")?.value

  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}