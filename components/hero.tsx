"use client"
import { ShinyButton } from "./ShinyButton"
import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"

// Importações para as partículas
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { type ISourceOptions } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"
import particlesConfig from "./particles-config"

// Constante para o offset do scroll
const SCROLL_OFFSET = 80;

// Variantes para a animação (sem delay para sincronizar com o Header)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Mantém o efeito cascata entre os itens
    },
  },
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 }, // Começa 30px abaixo e invisível
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export default function Hero() {
  const { t } = useLanguage()
  const [isClient, setIsClient] = useState(false)

  // Garante que 'Particles' só renderize no lado do cliente
  useEffect(() => {
    setIsClient(true)
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    })
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      window.scrollTo({
        top: projectsSection.offsetTop - SCROLL_OFFSET,
        behavior: "smooth",
      })
    }
  }

  const scrollToAbout = () => {
    const projectsSection = document.getElementById("about")
    if (projectsSection) {
      window.scrollTo({
        top: projectsSection.offsetTop - SCROLL_OFFSET,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="home" className="relative flex items-center w-full min-h-screen py-20 md:py-0 overflow-hidden">

      {/* --- FUNDO (Gradiente e Partículas) --- */}
      <div className="absolute inset-0 z-0 bg-gradient-hero animate-gradient-shift opacity-20" />
      {isClient && (
        <Particles
          id="tsparticles"
          options={particlesConfig as ISourceOptions}
          className="absolute inset-0 z-10"
        />
      )}

      {/* --- CONTEÚDO PRINCIPAL (Com Animação) --- */}
      <motion.div
        className="container relative z-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl mx-auto md:mx-0">
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl mb-6"
          >
            <span className="text-foreground">{t("hero.title")}</span>
            <br />
            <span className="text-primary">{t("hero.subtitle")}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-foreground/80 sm:text-xl md:text-2xl mb-8"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <ShinyButton
              onClick={scrollToProjects}
              className="btn-primary w-full sm:w-auto" // A classe btn-primary é o que ativa o CSS
            >
              {t("hero.explore")}
            </ShinyButton>
            <ShinyButton
              onClick={scrollToAbout}
              className="btn-secondary text-center w-full sm:w-auto"
            >
              {t("hero.about")}
            </ShinyButton>
          </motion.div>
        </div>
      </motion.div>

      {/* --- INDICADOR DE SCROLL --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
        <span className="text-sm text-foreground/60 mb-2">{t("hero.scroll")}</span>
        <ArrowDown className="text-primary animate-bounce" size={24} />
      </div>

    </section>
  )
}