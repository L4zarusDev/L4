'use client';
import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import SectionHeading from '@/components/SectionHeading';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AcademicCapIcon,
  ComputerDesktopIcon,
  BoltIcon,
  CpuChipIcon,
  FlagIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/solid';

const timelineData = [
  {
    title: '2020',
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4" data-gsap="timeline-header-0">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-red-600 to-black flex items-center justify-center">
            <AcademicCapIcon className="h-4 w-4 text-white" />
          </div>
          <h4 className="text-xl font-bold text-white">El comienzo</h4>
        </div>
        <p className="text-white text-sm md:text-base leading-relaxed" data-gsap="timeline-text-0">
          Comencé mi aventura en la programación: veía videos y aprendía sobre desarrollo web. Fue entonces cuando oí hablar de programar y me enamoré de sus posibilidades.
        </p>
      </div>
    ),
  },
  {
    title: '2021',
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4" data-gsap="timeline-header-1">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-red-600 to-black flex items-center justify-center">
            <ComputerDesktopIcon className="h-4 w-4 text-white" />
          </div>
          <h4 className="text-xl font-bold text-white">Compromiso con el desarrollo web</h4>
        </div>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4" data-gsap="timeline-text-1">
          Me enfoqué y decidí que este era el camino que quería seguir como desarrollador web. Empecé a aprender JS y Python como base.
        </p>
        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-600/20" data-gsap="timeline-achievements-1">
          <h5 className="text-red-500 font-semibold mb-2">Logros clave</h5>
          <div className="space-y-2">
            <div className="flex items-start space-x-3" data-gsap="timeline-bullet-1-0">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></span>
              <span className="text-sm text-gray-100">Fundamentos de JS</span>
            </div>
            <div className="flex items-start space-x-3" data-gsap="timeline-bullet-1-1">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></span>
              <span className="text-sm text-gray-100">Apps con JS</span>
            </div>
            <div className="flex items-start space-x-3" data-gsap="timeline-bullet-1-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></span>
              <span className="text-sm text-gray-100">Me di a conocer más en algunas plataformas.</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: '2022',
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4" data-gsap="timeline-header-0">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-red-600 to-black flex items-center justify-center">
            <CpuChipIcon className="h-4 w-4 text-white" />
          </div>
          <h4 className="text-xl font-bold text-white">Intento de emprendimiento</h4>
        </div>
        <p className="text-white text-sm md:text-base leading-relaxed" data-gsap="timeline-text-0">
          En 2022 hice un intento de abrir un negocio con el mismo nombre, “l4zarus”, pero no salió muy bien debido a la falta de experiencia en algunos sectores.
        </p>
      </div>
    ),
  },
  {
    title: '2023',
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-red-600 to-black flex items-center justify-center">
            <BoltIcon className="h-4 w-4 text-white" />
          </div>
          <h4 className="text-xl font-bold text-white">Transición a JavaScript & stack moderno</h4>
        </div>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
          Alcancé un mejor nivel en JavaScript y comencé a explorar React y TypeScript. Empecé a ver el potencial del desarrollo moderno más allá de los CMS tradicionales.
        </p>
        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-600/20">
          <h5 className="text-red-500 font-semibold mb-2">Logros clave</h5>
          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></span>
              <span className="text-sm text-gray-100">Mejora de JavaScript</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></span>
              <span className="text-sm text-gray-100">Fundamentos de React</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></span>
              <span className="text-sm text-gray-100">Principios de diseño UI/UX</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></span>
              <span className="text-sm text-gray-100">Exploración de TypeScript</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: '2024-2025',
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-red-600 to-black flex items-center justify-center">
            <FlagIcon className="h-4 w-4 text-white" />
          </div>
          <h4 className="text-xl font-bold text-white">Descanso y retomación del proyecto</h4>
        </div>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
          Debido a problemas personales, durante todo 2024 y parte de 2025 el proyecto “L4ZARUS” estuvo suspendido. A finales de septiembre de 2025 tuve la idea de retomarlo y comenzar de nuevo un negocio, pero esta vez con más conocimientos.
        </p>
        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-600/20">
          <h5 className="text-red-500 font-semibold mb-2">Logros clave y plan</h5>
          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></span>
              <a
                href="https://www.instagram.com/l4.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                Creación de contenido
                <ArrowTopRightOnSquareIcon className="h-3 w-3" />
              </a>
            </div>
            <div className="flex items-start space-x-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></span>
              <a
                href="https://l4zarus.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-semibold flex items-center gap-1"
              >
                Página web oficial
                <ArrowTopRightOnSquareIcon className="h-3 w-3" />
              </a>
            </div>
            <div className="flex items-start space-x-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></span>
              <span className="text-sm text-gray-100">Mayor rendimiento en los proyectos</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></span>
              <span className="text-sm text-gray-100">Mejor diseño UI/UX en aplicaciones web y móviles</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></span>
              <span className="text-sm text-gray-100">Integración de Next.js</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></span>
              <span className="text-sm text-gray-100">Emprendimiento a través de la tecnología</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];




export default function TimelineComponent() {
  useGSAP(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Set initial states for timeline section
    gsap.set('[data-gsap="timeline-heading"]', { opacity: 0, y: 20 });
    gsap.set('[data-gsap="timeline-subheading"]', { opacity: 0, y: 25 });
    gsap.set('[data-gsap="timeline-container"]', { opacity: 0, y: 30 });

    // Create staggered timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-gsap="timeline-heading"]',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      }
    });
    
    tl.to('[data-gsap="timeline-heading"]', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    })
    .to('[data-gsap="timeline-subheading"]', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.3')
    .to('[data-gsap="timeline-container"]', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.2');
  });

  return (
    <div id="timeline" className="w-full mt-40">
      <SectionHeading
        heading="Mi viaje como desarrollador"
        subheading="Más de 5 años de evolución: Todo empezó como un pasatiempo en 2020; empecé con cosas básicas de HTML y Python, aprendiendo en distintas comunidades de Discord. Poco a poco le tomé más interés al tema y empecé a programar otro tipo de cosas. En 2022 hice un intento de abrir un negocio con el mismo nombre, “l4zarus”, pero no salió muy bien debido a la falta de experiencia en algunos sectores. Suspendí el proyecto y lo retomé este año."
        animationId="timeline"
      />
      <div data-gsap="timeline-container">
        <Timeline data={timelineData} />
      </div>
    </div>
  );
}
