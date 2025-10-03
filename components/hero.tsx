"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

// Importações para as partículas
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { type ISourceOptions } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"
import particlesConfig from "./particles-config"

export default function Hero() {
  const { t } = useLanguage()
  const [init, setInit] = useState(false)

  // Efeito para inicializar o motor das partículas apenas uma vez
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      window.scrollTo({
        top: projectsSection.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="home" className="w-full min-h-screen flex items-center relative overflow-hidden py-20 md:py-0">

      {/* CAMADA 0: Fundo de Gradiente Animado */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, var(--background) 0%, var(--tertiary) 80%, var(--background) 100%)`,
          backgroundSize: "400% 400%",
          opacity: 0.2, // A opacidade pode ser ajustada para o efeito desejado
          animation: "gradientShift 20s ease infinite",
        }}
      />

      {/* CAMADA 1: Fundo de Partículas */}
      {init && (
        <Particles
          id="tsparticles"
          options={particlesConfig as ISourceOptions}
          className="absolute inset-0 z-1" // z-index ajustado para 1
        />
      )}

      {/* CAMADA 10: Conteúdo Principal */}
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto md:mx-0">
          <h1 className="reveal-up text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">
            <span className="text-foreground">{t("hero.title")}</span>
            <br />
            <span className="text-primary">{t("hero.subtitle")}</span>
          </h1>

          <p className="reveal-up text-xl sm:text-xl md:text-2xl text-foreground/80 mb-8">
            {t("hero.description")}
          </p>

          <div className="reveal-up flex flex-wrap gap-4">
            <button
              onClick={scrollToProjects}
              className="btn-primary w-full  sm:w-auto"
            >
              {t("hero.explore")}
            </button>
            <a href="#about" className="btn-secondary text-center w-full sm:w-auto">
              {t("hero.about")}
            </a>
          </div>
        </div>
      </div>

      <div className="reveal-scale absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
        <span className="text-foreground/60 text-sm mb-2">
          {t("hero.scroll")}
        </span>
        <ArrowDown className="text-primary animate-bounce" size={24} />
      </div>

      {/* Animação para o Gradiente */}
      <style jsx>{`
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
        }
      `}</style>
    </section>
  )
}