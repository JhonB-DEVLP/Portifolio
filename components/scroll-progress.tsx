"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Create a GSAP timeline for the progress bar
    const progressTween = gsap.to(".progress-bar", {
      width: "100%",
      ease: "none",
      paused: true,
    })

    // Set up ScrollTrigger for the entire page
    const scrollTrigger = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Update the progress bar
        progressTween.progress(self.progress)
        setScrollProgress(Math.round(self.progress * 100))
      },
    })

    return () => {
      // Clean up
      scrollTrigger.kill()
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100]">
      <div className="progress-bar h-full bg-primary" style={{ width: `${scrollProgress}%` }}></div>
    </div>
  )
}
