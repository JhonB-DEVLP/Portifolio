"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage, type Language } from "@/contexts/language-context"
import { Globe, ChevronDown } from "lucide-react"
import ReactCountryFlag from "react-country-flag"

const languages = [
  { code: "pt", name: "Português", countryCode: "BR" },
  { code: "en", name: "English", countryCode: "US" },
]

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => setIsOpen(!isOpen)

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  const currentLang = languages.find((lang) => lang.code === language)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 p-2 rounded-full bg-background bg-opacity-20 backdrop-blur-sm border border-tertiary hover:border-primary transition-all"
        aria-label="Change language"
      >
        {currentLang && (
          <ReactCountryFlag
            countryCode={currentLang.countryCode}
            svg
            style={{ width: "1.2em", height: "1.2em" }}
          />
        )}
        <span className="hidden sm:inline text-xs uppercase">{language}</span>
        <ChevronDown size={14} className="text-secondary" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-background border border-tertiary z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code as Language)}
                className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm ${
                  language === lang.code
                    ? "bg-tertiary/20 text-primary"
                    : "text-foreground hover:bg-tertiary/10"
                }`}
              >
                <ReactCountryFlag
                  countryCode={lang.countryCode}
                  svg
                  style={{ width: "1.2em", height: "1.2em" }}
                />
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
