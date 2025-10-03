import type React from "react"
import { Exo_2 } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"

// Load Exo 2 font
const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  display: "swap",
})

export const metadata = {
  title: "Portifólio"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Custom font for Ethnocentric */}
        <link rel="stylesheet" href="/fonts/ethnocentric/stylesheet.css" />
      </head>
      <body className={`${exo2.variable} overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="portfolio-theme"
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
