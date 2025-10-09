// components/ThemeToggle.tsx
"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // useEffect para garantir que o componente só renderiza no lado do cliente,
  // evitando erros de hidratação (hydration mismatch).
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  // Se o componente ainda não montou no cliente, não renderizamos nada
  // para garantir que o tema correto (dark/light) seja exibido sem flash.
  if (!mounted) {
    // Retornar um placeholder vazio ou nulo é uma boa prática aqui.
    // Pode ser um <div className="w-10 h-10" /> se quiser evitar layout shift.
    return null
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center p-2 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm border border-tertiary hover:border-primary transition-all duration-300"
      aria-label="Alternar tema"
    >
      {/* Ícone Sol: Visível no tema 'light', some no 'dark' */}
      <Sun 
        size={18} 
        className="rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" 
      />
      
      {/* Ícone Lua: Invisível no tema 'light', aparece no 'dark' */}
      <Moon 
        size={18} 
        className="absolute rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" 
      />
    </button>
  )
}