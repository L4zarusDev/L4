'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ServiceCard, { Service } from './ServiceCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const GAP_PX = 32; // tailwind gap-8 = 2rem ≈ 32px

export default function ServicesCarousel({ services }: { services: Service[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null); // para medir ancho de slide
  const [canPrev, setCanPrev] = useState(true);
  const [canNext, setCanNext] = useState(true);

  // Triplicamos para looping: [A B C | A B C | A B C]
  const tripled = useMemo(() => [...services, ...services, ...services], [services]);
  const baseLen = services.length;

  // cuántos slides avanzamos por click: 1 “paso” = 1 slide (como carrusel clásico)
  const stepSlides = 1;

  const getSlideWidth = useCallback(() => {
    const node = slideRef.current;
    if (!node) return 0;
    return Math.round(node.getBoundingClientRect().width + GAP_PX);
  }, []);

  const getMaxScrollLeft = (el: HTMLDivElement) => el.scrollWidth - el.clientWidth;

  // Posiciona el scroll al inicio del bloque medio (equivalente al índice baseLen)
  const jumpToMiddleStart = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = getSlideWidth();
    el.scrollTo({ left: baseLen * w, behavior: 'auto' });
  }, [baseLen, getSlideWidth]);

  // Normaliza cuando nos salimos por izquierda/derecha (loop)
  const normalizeIfNeeded = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = getSlideWidth();
    if (!w) return;

    const currentIndexFloat = el.scrollLeft / w;
    // índice "virtual" dentro de los triplicados
    let currentIndex = Math.round(currentIndexFloat);

    // si estamos en el bloque izq (< baseLen - margen), saltamos al central
    if (currentIndex < baseLen - 4) {
      currentIndex += baseLen;
      el.scrollTo({ left: currentIndex * w, behavior: 'auto' });
    }
    // si nos pasamos del bloque der (>= 2*baseLen + margen), saltamos atrás al central
    else if (currentIndex >= 2 * baseLen + 4) {
      currentIndex -= baseLen;
      el.scrollTo({ left: currentIndex * w, behavior: 'auto' });
    }
  }, [baseLen, getSlideWidth]);

  const updateButtons = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // en modo loop siempre hay “siguiente” y “anterior”
    setCanPrev(true);
    setCanNext(true);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // Al montar/resize, centramos en bloque medio
    const init = () => {
      jumpToMiddleStart();
      updateButtons();
    };
    init();

    const onScroll = () => {
      normalizeIfNeeded();
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', init);

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', init);
    };
  }, [jumpToMiddleStart, normalizeIfNeeded, updateButtons]);

  const scrollBySlides = (dir: 'left' | 'right', slides = stepSlides) => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = getSlideWidth();
    if (!w) return;

    const delta = dir === 'left' ? -w * slides : w * slides;
    el.scrollBy({ left: delta, behavior: 'smooth' });

    // tras la animación, normalizamos “saltando” al bloque central si procede
    window.setTimeout(() => {
      normalizeIfNeeded();
    }, 380); // ~duración del smooth scroll
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') scrollBySlides('left');
    if (e.key === 'ArrowRight') scrollBySlides('right');
  };

  return (
    <div className="relative max-w-7xl mx-auto" onKeyDown={onKeyDown} tabIndex={0} aria-label="Carrusel de servicios">
      {/* Degradados laterales */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-black to-transparent" />

      {/* Flechas */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-30 flex items-center pl-2">
        <button
          type="button"
          aria-label="Anterior"
          disabled={!canPrev}
          onClick={() => scrollBySlides('left')}
          className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-white text-black shadow transition hover:bg-transparent hover:text-white hover:shadow-alt-cta disabled:opacity-40"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-30 flex items-center pr-2">
        <button
          type="button"
          aria-label="Siguiente"
          disabled={!canNext}
          onClick={() => scrollBySlides('right')}
          className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-white text-black shadow transition hover:bg-transparent hover:text-white hover:shadow-alt-cta disabled:opacity-40"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Track: 1 card en móvil, 2 en >= md; centrado */}
      <div
        ref={scrollerRef}
        className="no-scrollbar relative z-10 flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-px-6 px-12 py-2 justify-center"
        style={{ scrollBehavior: 'smooth' }}
      >
        {tripled.map((svc, idx) => (
          <div
            key={`${svc.title}-${idx}`}
            className="snap-start shrink-0 w-[88vw] sm:w-[540px] md:w-[calc(50%-16px)] lg:w-[calc(50%-16px)]"
            ref={idx === baseLen ? slideRef : undefined} // medimos UNA vez (primer slide del bloque medio)
          >
            <ServiceCard {...svc} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* CSS opcional para ocultar la barra de scroll (en globals.css)
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
*/
