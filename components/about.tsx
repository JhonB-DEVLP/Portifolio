"use client"

import Image from "next/image"
import { Calendar, MapPin, Mail, Github, Linkedin, Instagram } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="section bg-background/95 relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, var(--tertiary) 0%, transparent 100%)`,
          opacity: 0.05,
        }}
      />

      <div className="container relative z-10">
        <h2 className="reveal-up text-3xl md:text-4xl font-bold mb-12 text-center">
          {t("about.title")} <span className="text-primary">{t("about.subtitle")}</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="reveal-left order-1 lg:order-1 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 blur-lg"></div>
              <div className="relative rounded-full border-4 border-tertiary overflow-hidden w-50 h-50 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
                <Image
                  src="/perfil-jhon.jpg"
                  alt="Profile"
                  width={350}
                  height={350}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div className="reveal-right order-2 lg:order-2 text-center lg:text-left">
            <h3 className="text-xl md:text-2xl font-bold mb-4">{t("about.role")}</h3>

            <p className="text-sm md:text-base text-foreground/80 mb-4 md:mb-6">{t("about.bio1")}</p>

            <p className="text-sm md:text-base text-foreground/80 mb-4 md:mb-6">{t("about.bio2")}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Calendar className="text-secondary" size={16} />
                <span className="text-sm md:text-base">{t("about.experience")}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <MapPin className="text-secondary" size={16} />
                <span className="text-sm md:text-base">{t("about.location")}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:col-span-2">
                <Mail className="text-secondary" size={16} />
                <span className="text-sm md:text-base">{t("about.email")}</span>
              </div>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start">
              <a href="https://github.com/JhonB-DEVLP" className="reveal-stagger social-icon">
                <Github className="text-secondary hover:text-primary" size={20} />
              </a>
              <a href="https://www.linkedin.com/in/jhonesbonifaciodasilva/" className="reveal-stagger social-icon">
                <Linkedin className="text-secondary hover:text-primary" size={20} />
              </a>
              <a href="https://www.instagram.com/jbtheonee?igsh=ZW83YzU2ZGNlc3J1&utm_source=qr" className="reveal-stagger social-icon">
                <Instagram className="text-secondary hover:text-primary" size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
