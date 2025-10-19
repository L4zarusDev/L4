'use client';

import { GodRays } from '@paper-design/shaders-react';
import { useViewport } from '@/lib/hooks/useViewport';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { useLoading } from '@/lib/context/LoadingContext';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function ResponsiveGodRays() {
  const { width, height } = useViewport();
  const { isComplete: loadingComplete, setAssetLoaded } = useLoading();
  const [canAnimate, setCanAnimate] = useState(false);

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });

  // Mark shader as loaded with realistic timing
  useEffect(() => {
    const shaderLoadTimer = setTimeout(() => {
      setAssetLoaded('god-rays-shader');
    }, 800);

    return () => clearTimeout(shaderLoadTimer);
  }, [setAssetLoaded]);

  // Listen for loadingScreenComplete event
  useEffect(() => {
    const handleLoadingComplete = () => {
      setCanAnimate(true);
    };

    window.addEventListener('loadingScreenComplete', handleLoadingComplete);

    if (loadingComplete) {
      setCanAnimate(true);
    }

    return () => {
      window.removeEventListener(
        'loadingScreenComplete',
        handleLoadingComplete,
      );
    };
  }, [loadingComplete]);

  // Only render shader when it should be active
  const shouldRenderShader = canAnimate && isIntersecting;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="pointer-events-none absolute left-0 top-0 -z-10 h-[100dvh] w-full overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)',
      }}
    >
      <AnimatePresence mode="wait">
        {shouldRenderShader && (
          <motion.div
            key="god-rays-shader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
            }}
            className="absolute inset-0"
          >
            <GodRays
              width={width}
              height={height}
              // Paleta rojo → negro con highlight cálido
              colors={[
                '#7f1d1d99', // rojo oscuro translúcido (capa lejana)
                '#b91c1cdd', // rojo vivo principal
                '#ffffffff', // highlight central (rayos)
                '#ef4444cc', // rojo coral suave para variación
              ]}
              colorBack="#000000ff" // fondo negro
              colorBloom="#7f1d1d" // bloom rojizo oscuro
              bloom={0.35} // brillo un poco menos agresivo
              intensity={0.75} // intensidad similar a la tuya
              density={0.3}
              spotty={0.28}
              midSize={0.2}
              midIntensity={0.4}
              speed={0.75} // 👈 misma animación
              offsetY={-0.55}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
