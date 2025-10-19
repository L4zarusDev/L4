'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import NumberTicker from '../magicui/number-ticker';

interface Stat {
  value: number;
  label: string;
}

interface StatsClientProps {
  statsData: Stat[];
  isDebug?: boolean;
}

export default function StatsClient({ statsData, isDebug = false }: StatsClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { 
    once: true, 
    margin: "-20% 0px -20% 0px" 
  });

  // Container variants for staggering children
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4, // Wait for title to start
      },
    },
  };

  // Title variant
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94] // power2.out equivalent
      }
    },
  };

  // Individual stat item variant
  const statItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94] // power2.out equivalent
      }
    },
  };

  return (
    <motion.section 
      ref={containerRef}
      className="mx-auto mb-20 max-w-[1440px] px-4 py-12 text-white lg:mb-32"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2 
          className="mb-8 text-center text-base font-semibold lg:text-2xl"
          variants={titleVariants}
        >
          Estadísticas globales {isDebug ? '(Modo de depuración)' : ''}
        </motion.h2>
        <motion.div 
          className="flex flex-col items-center justify-center md:flex-row text-white"
          variants={containerVariants}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="mb-8 w-full px-6 text-center md:mb-0 md:w-1/3"
              variants={statItemVariants}
            >
              <p className="mb-2 text-4xl font-bold lg:text-5xl">
                <NumberTicker value={stat.value} />
              </p>
              <p className="text-sm text-gray-400 lg:text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}