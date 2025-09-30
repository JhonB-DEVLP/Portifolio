"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"
import ThemeToggle from "./theme-toggle"
import LanguageSwitcher from "./language-switcher"
import { useLanguage } from "@/contexts/language-context"

export default function Header() {
  const { t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  // Efeito para garantir que o componente foi montado no lado do cliente antes de renderizar a logo
  useEffect(() => {
    setMounted(true)
  }, [])

  // Efeito para lidar com eventos de scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionId = section.getAttribute("id") || ""
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  const navItems = [
    { id: "home", label: t("nav.home") },
    { id: "skills", label: t("nav.skills") },
    { id: "about", label: t("nav.about") },
    { id: "projects", label: t("nav.projects") },
    { id: "certificates", label: t("nav.certificates") },
  ]

  // Evita o "flash" da logo errada no carregamento da página
  if (!mounted) {
    return null
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background bg-opacity-90 backdrop-blur-md py-4" : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection("home")
          }}
          className="cursor-pointer"
        >
          <Image
            src={theme === 'dark' ? "/JHON SILVA PRINCIPAL.png" : "/JHON SILVA GRADIENTE ESCURO.png"}
            alt="Logo do Portfólio"
            width={256}
            height={40}
            className="h-auto w-48 md:w-40"
            priority
          />
        </a>

        {/* Desktop Navigation */}
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

        {/* Theme and Language Controls */}
        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <button className="text-foreground hover:text-primary p-2" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-background bg-opacity-95 backdrop-blur-md transition-all duration-300 ${
          isMenuOpen ? "max-h-screen py-6 border-b border-tertiary" : "max-h-0 overflow-hidden"
        }`}
      >
        <nav className="container flex flex-col space-y-6">
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
    </header>
  )
}