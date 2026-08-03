import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"
import { Experience } from "@/components/sections/experience"
import { Hero } from "@/components/sections/hero"
import { Projects } from "@/components/sections/projects"
import { Skills } from "@/components/sections/skills"
import { Testimonials } from "@/components/sections/testimonials"

/**
 * Every section reads from content/site.ts and returns null when its array is
 * empty, so the order below is the only thing this file decides.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Testimonials />
      <Contact />
    </>
  )
}
