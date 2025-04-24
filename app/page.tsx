"use client";

import { usePreferences } from "../context/PreferencesContext";
import Navbar from "../components/navigation/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Stack from "../components/Stack";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import FadeInSection from "../components/FadeInSection";
import ScrollToTop from "../components/ScrollToTop";

export default function HomePage() {
  const { language } = usePreferences();

  const t = {
    es: {
      about: "Sobre mí",
      aboutText:
        "Soy un desarrollador backend con una fuerte orientación a la calidad del código, la arquitectura escalable y la resolución de problemas reales. Me especializo en construir APIs sólidas, seguras y eficientes utilizando Java (Spring Boot) y PHP (Laravel), integrando bases de datos relacionales y herramientas modernas de desarrollo. Mi enfoque combina buenas prácticas de ingeniería, pensamiento estratégico y compromiso con la entrega de valor en cada proyecto.",
    },
    en: {
      about: "About Me",
      aboutText:
        "I'm a backend developer passionate about building clean, scalable, and high-performance systems. I specialize in designing robust APIs using Java (Spring Boot) and PHP (Laravel), with strong experience in database integration and modern development workflows. I combine engineering best practices with business-driven thinking to deliver backend solutions that create real impact.",
    },
  };

  const tLang = t[language];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 p-4 md:p-10 font-sans transition-all duration-500 bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
        <FadeInSection>
          <Hero />
        </FadeInSection>

        <FadeInSection>
          <About title={tLang.about} text={tLang.aboutText} />
        </FadeInSection>

        <FadeInSection>
          <Stack />
        </FadeInSection>

        <FadeInSection>
          <Projects />
        </FadeInSection>

        <FadeInSection>
          <Testimonials />
        </FadeInSection>

        <FadeInSection>
          <Contact />
        </FadeInSection>

        <ScrollToTop />
        <Footer />
      </main>
    </>
  );
}
