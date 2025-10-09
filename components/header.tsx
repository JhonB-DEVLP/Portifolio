// components/Header.tsx
"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { motion } from "framer-motion" // Importe o 'motion'
import ThemeToggle from "./theme-toggle"
import LanguageSwitcher from "./language-switcher"
import { useLanguage } from "@/contexts/language-context"

// Itens de navegação fora do componente para evitar recriação
const NAV_ITEMS = [
  { id: "home", translationKey: "nav.home" },
  { id: "skills", translationKey: "nav.skills" },
  { id: "about", translationKey: "nav.about" },
  { id: "projects", translationKey: "nav.projects" },
  { id: "certificates", translationKey: "nav.certificates" },
]

// Constantes para "números mágicos"
const SCROLL_THRESHOLD = 50
const SCROLL_OFFSET = 80

export default function Header() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  const navItems = NAV_ITEMS.map(item => ({ ...item, label: t(item.translationKey) }))

  useEffect(() => {
    setMounted(true)
  }, [])

  // ✅ Efeito de scroll otimizado (mais performático que o original)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: `-${SCROLL_OFFSET}px 0px 0px 0px`, threshold: 0.3 }
    )

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section)
    })

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - SCROLL_OFFSET,
        behavior: "smooth",
      })
    }
  }

  if (!mounted) {
    return null
  }

  return (
    // ✨ ANIMAÇÃO APLICADA AQUI
    <motion.header
      initial={{ y: "-100%" }} // Posição inicial: acima da tela
      animate={{ y: "0%" }}     // Posição final: no lugar
      transition={{ duration: 0.6, ease: "easeInOut" }} // Duração
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
        }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("home") }} className="cursor-pointer">
          <Image
            src={theme === 'dark' ? "/jhon-silva-principal.png" : "/jhon-silva-gradiente-escuro.png"}
            alt="Logo do Portfólio"
            width={256}
            height={40}
            className="h-auto w-36 md:w-40"
            priority
          />
        </a>

        {/* --- Navegação Desktop (como estava no seu original) --- */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`nav-link ${activeSection === item.id ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* --- Controles de Tema e Idioma (Desktop) --- */}
        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* --- Controles Mobile --- */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <button className="text-foreground hover:text-primary p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- Navegação Mobile (como estava no seu original) --- */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-background bg-opacity-95 backdrop-blur-md transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-[500px] py-6 border-b border-tertiary" : "max-h-0"
          }`}
      >
        <nav className="container flex flex-col items-center space-y-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`nav-link text-lg ${activeSection === item.id ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}