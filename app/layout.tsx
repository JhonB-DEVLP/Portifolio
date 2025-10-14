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
  description: "Portifólio de desenvolvedor Full-Stack",
  icons: {
    icon: "/favicon.png",
  },
}

// Opções recomendadas do Lenis
const lenisOptions = {
  autoRaf: true,      // Deixa o Lenis gerenciar o loop de animação automaticamente
  smoothWheel: true,  // Ativa rolagem suave com o mouse
  smoothTouch: false, // Mantém rolagem nativa em telas de toque
  lerp: 0.1,          // Suavidade (0 = duro, 1 = muito leve)
  wheelMultiplier: 1, // Sensibilidade
  anchors: true,      // Permite âncoras <a href="#id">
}

// Layout principal
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body className={`${exo2.variable} overflow-x-hidden`}>
        {/* Envolve todo o conteúdo da aplicação dentro do ReactLenis */}
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
