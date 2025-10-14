import type React from "react"
import { Exo_2 } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { ReactLenis } from "lenis/react"
import "lenis/dist/lenis.css"
import "./globals.css"

// Fonte principal
const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  display: "swap",
})

// Metadados
export const metadata = {
  title: "Portifólio",
  description: "CTO, Emprendedor e Desenvolvedor Full-Stack",
  icons: {
    icon: "/favicon.png",
  },
}

// Opções recomendadas do Lenis
const lenisOptions = {
  autoRaf: true,
  smoothWheel: true,
  smoothTouch: false,
  lerp: 0.1,
  wheelMultiplier: 1, 
  anchors: true,   
}

// Layout principal
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body className={`${exo2.variable} overflow-x-hidden`}>
        <ReactLenis root options={lenisOptions}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
            storageKey="portfolio-theme"
          >
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </ThemeProvider>
        </ReactLenis>
      </body>
    </html>
  )
}
