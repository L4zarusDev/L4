import Hero from '@/components/Hero/Hero';

import Stats from '@/components/GlobalStats/Stats';
import TimelineComponent from '@/components/Timeline/Timeline';
import AboutMe from '@/components/about-me/AboutMe';
import SecondQuote from '@/components/SecondQuote/SecondQuote';
import { Footer } from '@/components/footer';
import ResponsiveGodRays from '@/components/ui/ResponsiveGodRays';
import { unstable_noStore as noStore } from 'next/cache';
import Services from '@/components/Services/';
import ContactSection from '@/components/Contact/ContactSection';
import FaqAndCTA from '@/components/FAQ/FaqAndCTA';
import StackAndCerts from '@/components/Stack/StackAndCerts';
import DebugNoticeModal from '@/components/DebugNoticeModal';


export const dynamic = 'force-dynamic';
export const revalidate = 43200; // 12h

export default function Home() {
  noStore();

  return (
    <main className="bg-transparent" role="main">
      <DebugNoticeModal />
      {/* Fondo animado */}
      <ResponsiveGodRays />

      {/* 1) Hero */}
      <section id="hero" aria-label="Hero">
        <Hero />
      </section>

      {/* 2) Prueba social rápida */}
      <section id="stats" aria-label="Estadísticas globales" className="scroll-mt-24">
        <Stats />
      </section>

      {/* 3) Servicios */}
      <section id="services" aria-label="Servicios" className="scroll-mt-24">
        <Services />
      </section>

 

      {/* 5) Stack & Certificaciones */}
      <section id="stack" aria-label="Stack y certificaciones" className="scroll-mt-24">
        <StackAndCerts />
      </section>

      {/* 6) Línea de tiempo / trayectoria */}
      <section id="timeline" aria-label="Mi trayectoria" className="scroll-mt-24">
        <TimelineComponent />
      </section>

      {/* 7) Sobre mí */}
      <section id="about" aria-label="Sobre mí" className="scroll-mt-24">
        <AboutMe />
      </section>

      {/* 8) FAQ + CTA final */}
      <section id="faq" aria-label="Preguntas frecuentes" className="scroll-mt-24">
        <FaqAndCTA />
      </section>

      {/* 9) Contacto */}
      <section id="contact" aria-label="Contacto" className="scroll-mt-24">
        <ContactSection />
      </section>

      {/* 10) Cierre + Footer */}
      <section aria-label="Cita final" className="scroll-mt-24">
        <SecondQuote />
      </section>

      <Footer />
    </main>
  );
}
