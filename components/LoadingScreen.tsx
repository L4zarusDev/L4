'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

interface LoadingScreenProps {
  progress: number;
  isComplete: boolean;
  onComplete: () => void;
}

export default function LoadingScreen({ progress, isComplete, onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Lock scroll when loading screen is active
  useEffect(() => {
    // Disable scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Re-enable scroll when component unmounts
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Animate percentage counter
  useGSAP(() => {
    gsap.to({ value: displayProgress }, {
      value: progress,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: function() {
        setDisplayProgress(Math.round(this.targets()[0].value));
      }
    });
  }, [progress]);

  // Animate progress bar
  useGSAP(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        scaleY: progress / 100,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  }, [progress]);

  // Handle completion animation
  useGSAP(() => {
    if (isComplete && containerRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          // Dispatch custom event when loading screen animation is completely finished
          console.log('🚀 LoadingScreen: Dispatching loadingScreenComplete event');
          window.dispatchEvent(new CustomEvent('loadingScreenComplete'));
          onComplete();
        }
      });

      // Slide up animation all the way
      tl.to(containerRef.current, {
        y: '-100%',
        duration: 1,
        ease: 'power2.inOut',
      });
    }
  }, [isComplete, onComplete]);

  // Don't early return - let the completion animation handle the unmounting

  return (
<div
  ref={containerRef}
  className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
  style={{ touchAction: 'none', overflow: 'hidden' }}
>
      {/* Percentage Counter */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          ref={percentageRef}
          className="text-6xl font-bold text-white md:text-8xl lg:text-9xl"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {displayProgress}%
        </span>
      </div>

      {/* Bottom-to-top Progress Bar */}
<div className="absolute bottom-0 left-0 w-full h-1 bg-black/30">
  <div
    ref={progressBarRef}
    className="h-full w-full origin-bottom bg-gradient-to-r from-red-500 via-rose-600 to-red-800 shadow-[0_0_20px_rgba(239,68,68,0.35)]"
    style={{ transform: 'scaleY(0)' }}
  />
</div>

      {/* Optional: Loading text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <p className="text-white/60 text-sm tracking-wider uppercase">
Cargando experiencia...        </p>
      </div>
    </div>
  );
}