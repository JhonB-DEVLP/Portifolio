import type React from "react"
import { Exo_2 } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import "./globals.css"

// Carrega a fonte principal da aplicação
const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2", // Disponibiliza a fonte como uma variável CSS
  display: "swap",
})

// Metadados da página para SEO e para o navegador
export const metadata = {
  title: "Portifólio",
  description: "Portifólio de desenvolvedor Full-Stack",
  icons: {
    icon: "/favicon.png",
  },
}

// O RootLayout é o componente principal que "abraça" toda a aplicação
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // As alterações estão aqui 👇
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
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