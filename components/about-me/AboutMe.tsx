'use client';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import {
  CodeBracketIcon,
  BoltIcon,
  RocketLaunchIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid';

export default function AboutMe() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  // Variants
  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] } },
  });
  const pop = (delay = 0) => ({
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] } },
  });

  return (
    <section id="about" className="relative mx-auto mt-40 max-w-7xl px-4">
      {/* Fondo sutil rojo/negro */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(185,28,28,0.20) 0%, rgba(0,0,0,0) 60%)',
        }}
      />

      {/* Heading */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeUp(0)}
        className="mb-10 text-center"
      >
        <p className="mx-auto inline-block rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs uppercase tracking-wider text-red-300">
          Sobre mí
        </p>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Construyo <span className="text-red-400">software</span> y <span className="text-red-400">marcas digitales</span> que venden
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">
          Más de 5 años diseñando y desarrollando productos con foco en velocidad, conversión y
          escalabilidad. Me obsesiona reducir el “tiempo a valor” con entregas iterativas y
          medición real de resultados.
        </p>
      </motion.div>

      {/* Grid principal */}
      <div className="grid gap-8 md:grid-cols-[0.9fr,1.1fr]">
        {/* Columna izquierda: Avatar + Stats + Skills */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={pop(0.1)}
          className="rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900/60 to-black/60 p-6"
        >
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-red-600/60">
              {/* Reemplaza la imagen si la tienes */}
              <Image
                src="/images/png/portfolio-preview.png"
                alt="Foto de perfil"
                fill
                className="object-cover"
                sizes="80px"
                priority
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">L4 DEVELOPMENT</h3>
              <p className="text-sm text-white/70">Full-Stack • Web • Growth</p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { label: 'Años', value: '5+' },
              { label: 'Proyectos', value: '20+' },
              { label: 'Satisfacción', value: '98%' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp(0.15 + i * 0.05)}
                className="rounded-xl border border-white/10 bg-black/40 p-4 text-center"
              >
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-white/60">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skills */}
          <motion.div variants={fadeUp(0.25)} className="mt-6">
            <p className="text-sm font-medium text-white/80">Tech principal</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                'TypeScript',
                'React / Next.js',
                'Node / Nest',
                'Prisma / PostgreSQL',
                'Tailwind',
                'AWS / GCP',
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs text-red-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA secundaria */}
          <motion.div variants={fadeUp(0.3)} className="mt-6">
            <a
              href="/L4.docx"
              download
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2 text-sm font-semibold text-black shadow-cta transition hover:bg-transparent hover:text-white hover:shadow-alt-cta"
            >
              Descargar CV
            </a>
          </motion.div>
        </motion.div>

        {/* Columna derecha: Highlights + CTA */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp(0.05)}
          className="rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900/60 to-black/60 p-6"
        >
          {/* Highlights */}
          <div className="space-y-5">
            <Feature
              icon={<BoltIcon className="h-5 w-5 text-white" />}
              title="Velocidad y conversión primero"
              desc="Arquitecturas rápidas (Core Web Vitals 90+), UX que convierte y copy orientado a negocio."
            />
            <Feature
              icon={<CodeBracketIcon className="h-5 w-5 text-white" />}
              title="Calidad de software real"
              desc="CI/CD, testing, documentación y monitoreo desde el día 1 para reducir riesgo."
            />
            <Feature
              icon={<RocketLaunchIcon className="h-5 w-5 text-white" />}
              title="Entrega por hitos medibles"
              desc="Roadmaps por impacto y tiempo a valor. Menos promesas, más resultados."
            />
            <Feature
              icon={<ShieldCheckIcon className="h-5 w-5 text-white" />}
              title="SLA y soporte"
              desc="Tiempos de respuesta claros y canales definidos. Sin sorpresas."
            />
            <Feature
              icon={<SparklesIcon className="h-5 w-5 text-white" />}
              title="Estrategia de marca & growth"
              desc="Webs y contenido que elevan tu posicionamiento y generan demanda."
            />
          </div>

          {/* CTA principal */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#services"
              className="grid flex-1 place-items-center rounded-full py-3 text-center text-base text-white shadow-alt-cta transition hover:bg-white hover:text-black hover:shadow-cta lg:px-8"
            >
              Ver Servicios
            </a>
            <a
              href="https://cal.com/l4zarusdev"
              className="grid flex-1 place-items-center rounded-full bg-white py-3 text-center text-base text-black shadow-cta transition hover:bg-transparent hover:text-white hover:shadow-alt-cta lg:px-8"
            >
              Reservar llamada
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl border border-white/10 bg-black/40 p-4">
      <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-r from-red-600 to-black ring-1 ring-red-500/40">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-white/75">{desc}</p>
      </div>
    </div>
  );
}
