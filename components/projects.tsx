"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ExternalLink, Github, ArrowLeft, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with product management, cart functionality, and payment integration.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe", "Redux"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Firebase", "Tailwind CSS", "Redux", "WebSockets"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Finance Dashboard",
    description: "An interactive dashboard for financial data visualization with advanced filtering and reporting.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Vue.js", "Express", "PostgreSQL", "D3.js", "Docker"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Social Media Platform",
    description: "A social networking platform with user profiles, posts, comments, and real-time notifications.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "GraphQL", "MongoDB", "Socket.io", "AWS"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "AI Content Generator",
    description: "An AI-powered application that generates content based on user prompts and preferences.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "Python", "TensorFlow", "OpenAI API", "FastAPI"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Real Estate Platform",
    description:
      "A comprehensive real estate platform with property listings, search functionality, and virtual tours.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "MySQL", "Google Maps API", "AWS S3"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Blog Platform",
    description: "A modern blog platform with markdown support, comments system, and SEO optimization.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS", "Vercel"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Weather App",
    description: "A responsive weather application with location-based forecasts and interactive maps.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "OpenWeather API", "Chart.js", "Geolocation", "PWA"],
    liveLink: "#",
    githubLink: "#",
  },
]

export default function Projects() {
  const { t } = useLanguage()
  const [currentPage, setCurrentPage] = useState(0)
  const [projectsPerPage, setProjectsPerPage] = useState(4)

  useEffect(() => {
    const updateProjectsPerPage = () => {
      if (window.innerWidth < 640) {
        setProjectsPerPage(1) // Mobile: 1 projeto por página
      } else if (window.innerWidth < 1024) {
        setProjectsPerPage(2) // Tablet: 2 projetos por página
      } else {
        setProjectsPerPage(4) // Desktop: 4 projetos por página
      }
    }

    updateProjectsPerPage()
    window.addEventListener("resize", updateProjectsPerPage)

    return () => window.removeEventListener("resize", updateProjectsPerPage)
  }, [])

  const totalPages = Math.ceil(projects.length / projectsPerPage)
  const startIndex = currentPage * projectsPerPage
  const endIndex = startIndex + projectsPerPage
  const currentProjects = projects.slice(startIndex, endIndex)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <section id="projects" className="section bg-background relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle at 30% 50%, var(--tertiary) 0%, transparent 70%)`,
          opacity: 0.05,
        }}
      />

      <div className="container relative z-10">
        <h2 className="reveal-up text-3xl md:text-4xl font-bold mb-12 text-center">
          {t("projects.title")} <span className="text-primary">{t("projects.subtitle")}</span>
        </h2>

        <div className="reveal-scale relative">
          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mb-8 min-h-[600px]">
            {currentProjects.map((project, index) => (
              <div
                key={startIndex + index}
                className="reveal-stagger project-card bg-background bg-opacity-30 border border-tertiary rounded-lg overflow-hidden hover:border-secondary transition-all duration-300 group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-4 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full bg-tertiary/20 text-secondary">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs px-3 py-1 rounded-full bg-tertiary/20 text-secondary">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.liveLink}
                      className="flex items-center gap-2 text-sm text-primary hover:text-secondary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={16} />
                      {t("projects.liveDemo")}
                    </a>
                    <a
                      href={project.githubLink}
                      className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                      {t("projects.sourceCode")}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          {totalPages > 1 && (
            <>
              {/* Navigation Arrows */}
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={prevPage}
                  className="flex items-center gap-2 px-4 py-2 bg-background/80 text-primary rounded-lg border border-tertiary hover:border-primary transition-all"
                  aria-label="Previous projects"
                >
                  <ArrowLeft size={20} />
                  <span className="hidden sm:inline">Anterior</span>
                </button>

                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <span>
                    Página {currentPage + 1} de {totalPages}
                  </span>
                </div>

                <button
                  onClick={nextPage}
                  className="flex items-center gap-2 px-4 py-2 bg-background/80 text-primary rounded-lg border border-tertiary hover:border-primary transition-all"
                  aria-label="Next projects"
                >
                  <span className="hidden sm:inline">Próximo</span>
                  <ArrowRight size={20} />
                </button>
              </div>

              {/* Page Indicators */}
              <div className="reveal-up flex justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentPage === index ? "bg-primary scale-150" : "bg-gray-400 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Projects Counter */}
        <div className="reveal-up text-center mt-8">
          <p className="text-sm text-foreground/60">
            Mostrando {startIndex + 1}-{Math.min(endIndex, projects.length)} de {projects.length} projetos
          </p>
        </div>
      </div>
    </section>
  )
}
