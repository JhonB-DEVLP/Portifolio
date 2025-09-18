"use client"

import { Code, Database, Server, Globe, Palette, GitBranch, Terminal, Cpu, Cloud, Layers } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const skills = [
  { name: "Frontend", icon: <Code size={32} />, items: ["React", "Next.js", "TypeScript", "HTML/CSS", "SCSS/SASS"] },
  { name: "Backend", icon: <Server size={32} />, items: ["Node.js", "Express", "NestJS", "Python", "SpringBoot"] },
  { name: "Database", icon: <Database size={32} />, items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"] },
  { name: "Web", icon: <Globe size={32} />, items: ["RESTful APIs", "GraphQL", "OAuth", "JWT"] },
  {
    name: "UI/UX",
    icon: <Palette size={32} />,
    items: ["Figma", "Shadcn", "Responsive Design", "Tailwind CSS", "Material UI"],
  },
  { name: "DevOps", icon: <Cloud size={32} />, items: ["Docker", "CI/CD", "Vercel"] },
  { name: "Version Control", icon: <GitBranch size={32} />, items: ["Git", "GitHub", "GitLab", "Jira"] },
  { name: "Tools", icon: <Terminal size={32} />, items: ["VS Code", "Postman", "npm/yarn", "N8N"] },
  { name: "Architecture", icon: <Layers size={32} />, items: ["Microservices", "Serverless", "MVC", "REST"] },
  {
    name: "Performance",
    icon: <Cpu size={32} />,
    items: ["Optimization", "Caching", "Lazy Loading"],
  },
]

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="section bg-background relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, var(--tertiary) 0%, transparent 70%)`,
          opacity: 0.05,
        }}
      />

      <div className="container relative z-10">
        <h2 className="reveal-up text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="text-primary">{t("skills.title")}</span> {t("skills.subtitle")}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <div key={index} className="reveal-stagger skill-card">
              <div className="text-primary mb-3 md:mb-4">{skill.icon}</div>
              <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3">{skill.name}</h3>
              <ul className="text-xs md:text-sm text-foreground/80 text-center">
                {skill.items.map((item, i) => (
                  <li key={i} className="mb-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
