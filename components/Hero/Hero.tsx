'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useState } from 'react';
import HeroCTA from './HeroCTA';
import LogoCloud from '@/components/LogoCloud/LogoCloud';

export default function Hero() {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Listen for loading screen completion event
  useEffect(() => {
    console.log('🎯 Hero: Configuración del detector de eventos para loadingScreenComplete');

    const handleLoadingComplete = () => {
      console.log(
        '🎉 Hero: ¡Se recibió el evento "loadingScreenComplete"! Iniciando animaciones...',
      );
      setShouldAnimate(true);
    };

    // Add event listener for loading screen completion
    window.addEventListener('loadingScreenComplete', handleLoadingComplete);

    // Cleanup event listener on unmount
    return () => {
      console.log('🧹 Hero: Limpieza del detector de eventos');
      window.removeEventListener(
        'loadingScreenComplete',
        handleLoadingComplete,
      );
    };
  }, []);

  useGSAP(() => {
    if (!shouldAnimate) {
      console.log('⏳ Hero: shouldAnimate es falso, esperando...');
      return;
    }

    console.log('🎬 Hero: ¡La función shouldAnimate es verdadera! Iniciando animaciones GSAP...');

    // Create a timeline for the staggered animation
    const tl = gsap.timeline();

    // Set initial states with different directions
    gsap.set('[data-gsap="tech-badge"]', { opacity: 0, y: -20 }); // fade down
    gsap.set('[data-gsap="hero-text"]', { opacity: 0, scale: 0.9 }); // fade in (scale)
    gsap.set('[data-gsap="cta-view-projects"]', { opacity: 0, x: -30 }); // from left
    gsap.set('[data-gsap="cta-book-call"]', { opacity: 0, x: 30 }); // from right
    gsap.set('[data-gsap="tech-subtitle"]', { opacity: 0, y: -15 }); // fade down
    gsap.set('[data-gsap="logo-cloud"]', { opacity: 0, scale: 0.95 }); // fade in (scale)
    gsap.set('[data-gsap="curve-text"]', { opacity: 0, y: 20 }); // fade up

    // Animate elements in sequence with varied directions
    tl.to('[data-gsap="tech-badge"]', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
      .to(
        '[data-gsap="hero-text"]',
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4',
      )
      .to(
        '[data-gsap="cta-view-projects"]',
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4',
      )
      .to(
        '[data-gsap="cta-book-call"]',
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3',
      )
      .to(
        '[data-gsap="tech-subtitle"]',
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4',
      )
      .to(
        '[data-gsap="logo-cloud"]',
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4',
      )
      .to(
        '[data-gsap="curve-text"]',
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4',
      );
  }, [shouldAnimate]);

  return (
    <div className="relative mt-32 flex min-h-[100dvh] flex-col px-2 md:mt-4 md:px-10 lg:justify-center">
      <HeroCTA />
      <LogoCloud />
    </div>
  );
}
