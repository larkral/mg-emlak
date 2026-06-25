import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Fraunces } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://mgemlak.com"),

  title: {
    default: "MG Emlak — Premium Gayrimenkul",
    template: "%s | MG Emlak",
  },

  description:
    "Afyonkarahisar ve çevresinde satılık daire, villa ve arsa ilanları. Modern, hızlı ve güvenilir emlak platformu.",

  applicationName: "MG Emlak",

  keywords: [
    "emlak",
    "afyonkarahisar",
    "satılık daire",
    "kiralık ev",
    "arsa",
    "villa",
    "gayrimenkul",
  ],

  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "MG Emlak",
    title: "MG Emlak",
    description: "Satılık ve kiralık gayrimenkul platformu",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MG Emlak",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MG Emlak",
    description: "Afyonkarahisar satılık & kiralık ilanlar",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}
    >
      <head>
        {/* FLICKER FIX (critical) */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html {
                background-color: white;
              }
              html.dark {
                background-color: #0a0a0a;
              }
              body {
                margin: 0;
              }
            `,
          }}
        />
      </head>

      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}