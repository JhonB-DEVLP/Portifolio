"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Skills from "@/components/skills"
import About from "@/components/about"
import Projects from "@/components/projects"
import Certificates from "@/components/certificates"
import Footer from "@/components/footer"

export default function Home() {
  useEffect(() => {
    // Import ScrollReveal dynamically to avoid SSR issues
    const initScrollReveal = async () => {
      const ScrollReveal = (await import("scrollreveal")).default

      // Configure ScrollReveal
      const sr = ScrollReveal({
        origin: "bottom",
        distance: "60px",
        duration: 1000,
        delay: 100,
        easing: "ease-out",
        reset: true, // Animations repeat when scrolling back up
        mobile: true,
      })

      // Reveal elements with different configurations
      sr.reveal(".reveal-up", {
        origin: "bottom",
        distance: "60px",
        duration: 1000,
        delay: 100,
      })

      sr.reveal(".reveal-left", {
        origin: "left",
        distance: "60px",
        duration: 1000,
        delay: 200,
      })

      sr.reveal(".reveal-right", {
        origin: "right",
        distance: "60px",
        duration: 1000,
        delay: 200,
      })

      sr.reveal(".reveal-scale", {
        origin: "bottom",
        distance: "0px",
        duration: 1000,
        delay: 100,
        scale: 0.8,
      })

      sr.reveal(".reveal-stagger", {
        origin: "bottom",
        distance: "40px",
        duration: 800,
        delay: 100,
        interval: 100, // Stagger effect
      })
    }

    initScrollReveal()
  }, [])

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Skills />
      <About />
      <Projects />
      <Certificates />
      <Footer />
    </main>
  )
}
