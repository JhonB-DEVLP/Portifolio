"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Award, Calendar, ExternalLink, ArrowLeft, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const certificates = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    image: "/1.png",
    link: "/1.png",
  },
  {
    title: "Full-Stack Web Development",
    issuer: "Udacity",
    date: "2022",
    image: "/2.png",
    link: "/2.png",
  },
  {
    title: "React Advanced Concepts",
    issuer: "Frontend Masters",
    date: "2022",
    image: "/3.jfif",
    link: "/3.jfif",
  },
  {
    title: "Node.js Microservices",
    issuer: "Coursera",
    date: "2021",
    image: "/4.jfif",
    link: "/4.jfif",
  },
  {
    title: "UI/UX Design Fundamentals",
    issuer: "Interaction Design Foundation",
    date: "2021",
    image: "/5.jfif",
    link: "/5.jfif",
  },
  {
    title: "Advanced JavaScript Concepts",
    issuer: "Pluralsight",
    date: "2020",
    image: "/6.jfif",
    link: "/6.jfif",
  },
  {
    title: "Advanced JavaScript Concepts",
    issuer: "Pluralsight",
    date: "2020",
    image: "/7.jfif",
    link: "/7.jfif",
  },
  {
    title: "Advanced JavaScript Concepts",
    issuer: "Pluralsight",
    date: "2020",
    image: "/8.jfif",
    link: "/8.jfif",
  },
  {
    title: "Advanced JavaScript Concepts",
    issuer: "Pluralsight",
    date: "2020",
    image: "/9.jfif",
    link: "/9.jfif",
  },
  {
    title: "Advanced JavaScript Concepts",
    issuer: "Pluralsight",
    date: "2020",
    image: "/10.png",
    link: "/10.jfif",
  },
  {
    title: "Advanced JavaScript Concepts",
    issuer: "Pluralsight",
    date: "2020",
    image: "/11.png",
    link: "/11.png",
  },
  {
    title: "Diploma Universitário",
    issuer: "Universidade Católica de Pernambuco",
    date: "2025",
    image: "/12.png",
    link: "/12.png",
  }
]

export default function Certificates() {
  const { t } = useLanguage()
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(6)

  // Ajusta quantidade por página conforme tamanho da tela
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1) // Mobile: 1 por vez
      } else {
        setItemsPerPage(6) // Desktop: 6 de uma vez
      }
    }

    updateItemsPerPage()
    window.addEventListener("resize", updateItemsPerPage)
    return () => window.removeEventListener("resize", updateItemsPerPage)
  }, [])

  const totalPages = Math.ceil(certificates.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCertificates = certificates.slice(startIndex, endIndex)

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
    <section id="certificates" className="section bg-background relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, transparent 0%, var(--tertiary) 100%)`,
          opacity: 0.05,
        }}
      />

      <div className="container relative z-10">
        <div className="reveal-up flex items-center justify-center mb-12">
          <Award className="text-primary mr-3" size={32} />
          <h2 className="text-[22px] md:text-4xl font-bold">
            {t("certificates.title")}{" "}
            <span className="text-primary">{t("certificates.subtitle")}</span>
          </h2>
        </div>

        {/* Grid de certificados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {currentCertificates.map((cert, index) => (
            <div key={index} className="certificate-card h-full">
              <div className="relative aspect-video">
                <a href={cert.link} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover rounded-lg cursor-pointer hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                </a>
              </div>

              <div className="certificate-content p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-bold mb-1">{cert.title}</h3>
                <p className="text-secondary text-xs sm:text-sm mb-2">{cert.issuer}</p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-foreground/60 text-xs">
                    <Calendar size={12} className="mr-1 sm:w-4 sm:h-4" />
                    {cert.date}
                  </div>

                  <a
                    href={cert.link}
                    className="flex items-center gap-1 text-xs text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("certificates.view")}
                    <ExternalLink size={10} className="sm:w-3 sm:h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controles de navegação */}
        {totalPages > 1 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={prevPage}
                className="flex items-center gap-2 px-4 py-2 bg-background/80 text-primary rounded-lg border border-tertiary hover:border-primary transition-all"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">{t("certificates.prev") || "Anterior"}</span>
              </button>

              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <span>
                  Página {currentPage + 1} de {totalPages}
                </span>
              </div>

              <button
                onClick={nextPage}
                className="flex items-center gap-2 px-4 py-2 bg-background/80 text-primary rounded-lg border border-tertiary hover:border-primary transition-all"
              >
                <span className="hidden sm:inline">{t("certificates.next") || "Próximo"}</span>
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="reveal-up flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentPage === index
                      ? "bg-primary scale-150"
                      : "bg-gray-400 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
