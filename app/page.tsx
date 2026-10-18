import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Education from "@/components/sections/education";
import Experience from "@/components/sections/experience";
import Hero from "@/components/sections/hero";
import Hobbies from "@/components/sections/hobbies";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import TechStack from "@/components/sections/tech-stack";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Education />
      <Experience />
      <TechStack />
      <Projects />
      <Hobbies />
      <Contact />
    </>
  );
}
