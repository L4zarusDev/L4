// lib/hooks/useIntersectionObserver.ts
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Options = Omit<IntersectionObserverInit, 'root'> & {
  root?: Element | Document | null;
};

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = false,
}: Options & { freezeOnceVisible?: boolean } = {}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [isIntersecting, setIsIntersecting] = useState(false);

  // 👇 Inicializar con null y tipar con unión
  const elementRef = useRef<Element | null>(null);

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = useCallback((e: IntersectionObserverEntry) => {
    setEntry(e);
    setIsIntersecting(e.isIntersecting);
  }, []);

  useEffect(() => {
    const node = elementRef.current;
    if (!node || frozen) return;

    const observer = new IntersectionObserver(
      (entries) => updateEntry(entries[0]),
      { threshold, root: (root as Element | Document | null) ?? null, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, root, rootMargin, frozen, updateEntry]);

  return { ref: elementRef, entry, isIntersecting };
}
