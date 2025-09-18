"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // For debugging
  useEffect(() => {
    if (mounted) {
      console.log("Current theme:", resolvedTheme)
    }
  }, [resolvedTheme, mounted])

  const toggleTheme = () => {
    console.log("Toggling theme from", resolvedTheme)
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <button
        className="p-2 rounded-full bg-background bg-opacity-20 backdrop-blur-sm border border-tertiary transition-all"
        aria-label="Toggle theme"
      >
        <div className="w-[18px] h-[18px]" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-background bg-opacity-20 backdrop-blur-sm border border-tertiary hover:border-primary transition-all"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun size={18} className="text-primary" />
      ) : (
        <Moon size={18} className="text-primary" />
      )}
    </button>
  )
}
