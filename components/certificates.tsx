"use client"

import Image from "next/image"
import { Award, Calendar, ExternalLink } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const certificates = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    image: "/placeholder.svg?height=400&width=600",
    link: "#",
  },
  {
    title: "Full-Stack Web Development",
    issuer: "Udacity",
    date: "2022",
    image: "/placeholder.svg?height=400&width=600",
    link: "#",
  },
  {
    title: "React Advanced Concepts",
    issuer: "Frontend Masters",
    date: "2022",
    image: "/placeholder.svg?height=400&width=600",
    link: "#",
  },
  {
    title: "Node.js Microservices",
    issuer: "Coursera",
    date: "2021",
    image: "/placeholder.svg?height=400&width=600",
    link: "#",
  },
  {
    title: "UI/UX Design Fundamentals",
    issuer: "Interaction Design Foundation",
    date: "2021",
    image: "/placeholder.svg?height=400&width=600",
    link: "#",
  },
  {
    title: "Advanced JavaScript Concepts",
    issuer: "Pluralsight",
    date: "2020",
    image: "/placeholder.svg?height=400&width=600",
    link: "#",
  },
]

export default function Certificates() {
  const { t } = useLanguage()

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
            {t("certificates.title")} <span className="text-primary">{t("certificates.subtitle")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {certificates.map((cert, index) => (
            <div key={index} className="reveal-stagger certificate-card h-full">
              <div className="relative aspect-video">
                <Image src={cert.image || "/placeholder.svg"} alt={cert.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
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
      </div>
    </section>
  )
}
