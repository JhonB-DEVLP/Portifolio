"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "pt" | "en"

export interface Translations {
  [key: string]: {
    [key: string]: string | { [key: string]: string }
  }
}

const translations: Translations = {
  en: {
    nav: {
      home: "Home",
      skills: "Skills",
      about: "About",
      projects: "Projects",
      certificates: "Certificates",
    },
    hero: {
      title: "Full-Stack",
      subtitle: "Developer",
      description: "Transforming your ideas into experiences, services and digital businesses with the best technologies on the market.",
      explore: "Explore My Work",
      about: "About Me",
      scroll: "Scroll Down",
    },
    skills: {
      title: "Technical",
      subtitle: "Skills",
    },
    about: {
      title: "About",
      subtitle: "Me",
      role: "Full-Stack Developer",
      bio1: "I'm a passionate full-stack developer with expertise in building modern web applications. With a strong foundation in both frontend and backend technologies, I create seamless, user-friendly experiences that solve real-world problems.",
      bio2: "My journey in software development began over 5 years ago, and since then, I've worked on a diverse range of projects from e-commerce platforms to complex enterprise applications. I'm constantly learning and adapting to new technologies to stay at the forefront of web development.",
      experience: "5+ Years Experience",
      location: "Remote / Worldwide",
      email: "jhonesbonifacio_18@outlook.com",
    },
    projects: {
      title: "My",
      subtitle: "Projects",
      liveDemo: "Live Demo",
      sourceCode: "Source Code",
    },
    certificates: {
      title: "Certificates &",
      subtitle: "Achievements",
      view: "View Certificate",
    },
    footer: {
      description: "Creating innovative web solutions with modern technologies and best practices.",
      quickLinks: "Quick Links",
      contact: "Contact",
      available: "Available for freelance work",
      rights: "All rights reserved.",
      backToTop: "Back to Top",
    },
  },
  pt: {
    nav: {
      home: "Início",
      skills: "Habilidades",
      about: "Sobre",
      projects: "Projetos",
      certificates: "Certificados",
    },
    hero: {
      title: "Desenvolvedor",
      subtitle: "Full-Stack",
      description: "Transformando suas ideias em experiências, serviços e negócios digitais com as melhores tecnologias do mercado.",
      explore: "Explorar Meu Trabalho",
      about: "Sobre Mim",
      scroll: "Rolar para Baixo",
    },
    skills: {
      title: "Habilidades",
      subtitle: "Técnicas",
    },
    about: {
      title: "Sobre",
      subtitle: "Mim",
      role: "Desenvolvedor Full-Stack",
      bio1: "Sou um desenvolvedor full-stack apaixonado por construir aplicações web modernas. Com sólida experiência em tecnologias de frontend e backend, crio experiências intuitivas e funcionais que resolvem problemas do mundo real.",
      bio2: "Minha jornada no desenvolvimento de software começou há mais de 5 anos. Desde então, trabalhei em diversos projetos, desde plataformas de e-commerce até aplicações empresariais complexas. Estou sempre aprendendo e me adaptando às novas tecnologias para me manter na vanguarda do desenvolvimento web.",
      experience: "Mais de 5 anos de experiência",
      location: "Remoto / Mundial",
      email: "jhonesbonifacio_18@outlook.com",
    },
    projects: {
      title: "Meus",
      subtitle: "Projetos",
      liveDemo: "Demo ao Vivo",
      sourceCode: "Código-Fonte",
    },
    certificates: {
      title: "Certificados &",
      subtitle: "Conquistas",
      view: "Ver Certificado",
    },
    footer: {
      description: "Criando soluções web inovadoras com tecnologias modernas e as melhores práticas.",
      quickLinks: "Links Rápidos",
      contact: "Contato",
      available: "Disponível para trabalhos freelance",
      rights: "Todos os direitos reservados.",
      backToTop: "Voltar ao Topo",
    },
  },
}


// Define the context type
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, section?: string) => string
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Create provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguage] = useState<Language>("pt")

  // Update language in localStorage when it changes
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pt")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string, section?: string): string => {
    if (!section) {
      const parts = key.split(".")
      section = parts[0]
      key = parts[1]
    }

    try {
      const sectionTranslations = translations[language][section]
      if (typeof sectionTranslations === "string") {
        return sectionTranslations
      }

      return (sectionTranslations as { [key: string]: string })[key] || key
    } catch (error) {
      return key
    }
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
