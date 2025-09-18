"use client"

import { useRef } from "react"
import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()
  const footerRef = useRef<HTMLElement>(null)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const navItems = [
    { id: "home", label: t("nav.home") },
    { id: "skills", label: t("nav.skills") },
    { id: "about", label: t("nav.about") },
    { id: "projects", label: t("nav.projects") },
    { id: "certificates", label: t("nav.certificates") },
  ]

  return (
    <footer ref={footerRef} className="bg-background py-12 relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(to top, var(--tertiary) 0%, transparent 100%)`,
          opacity: 0.05,
        }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <div className="text-primary font-ethnocentric text-lg sm:text-xl mb-4">
              <span className="text-secondary">&lt;</span>
              Portfolio
              <span className="text-secondary">/&gt;</span>
            </div>
            <p className="text-foreground/70 text-xs sm:text-sm max-w-xs">{t("footer.description")}</p>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-1 sm:space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a href={`#${item.id}`} className="text-foreground/70 hover:text-primary transition-colors text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">{t("footer.contact")}</h3>
            <div className="space-y-1 sm:space-y-2 text-foreground/70 text-sm">
              <p>{t("about.email")}</p>
              <p>{t("footer.available")}</p>

              <div className="flex gap-4 mt-3 sm:mt-4 justify-center sm:justify-start">
                <a href="#" className="text-secondary hover:text-primary transition-colors">
                  <Github size={18} />
                </a>
                <a href="#" className="text-secondary hover:text-primary transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="text-secondary hover:text-primary transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="mailto:contact@example.com" className="text-secondary hover:text-primary transition-colors">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-tertiary/30 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/50 text-xs sm:text-sm text-center md:text-left">
            © {new Date().getFullYear()} Full-Stack Developer Portfolio. {t("footer.rights")}
          </p>

          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center gap-1 sm:gap-2 text-secondary hover:text-primary transition-colors text-sm"
          >
            {t("footer.backToTop")} <ArrowUp size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
