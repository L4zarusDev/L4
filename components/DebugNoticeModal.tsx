'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SS_KEY = 'debugNoticeDismissedSession';

function shouldShowNoticeThisSession() {
  const flag = process.env.NEXT_PUBLIC_SHOW_DEBUG_NOTICE;
  const isDev = process.env.NODE_ENV === 'development';
  const enabled = isDev || flag === 'true';
  if (!enabled) return false;
  try {
    return sessionStorage.getItem(SS_KEY) !== '1';
  } catch {
    return true;
  }
}

export default function DebugNoticeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (shouldShowNoticeThisSession()) setOpen(true);
  }, []);

  // Bloquear scroll mientras esté abierto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const onClose = useCallback(() => {
    try {
      sessionStorage.setItem(SS_KEY, '1');
    } catch {}
    setOpen(false);
  }, []);

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[2000] bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal (desplazado bajo el navbar/hero top) */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="debug-title"
            aria-describedby="debug-desc"
            className="
              fixed inset-0 z-[2001]
              grid justify-center
              items-start pt-28 md:pt-36   /* ← baja el modal bajo el nav */
              px-4
            "
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900 to-black p-5 shadow-2xl">
              {/* Botón cerrar */}
              <button
                onClick={onClose}
                aria-label="Cerrar aviso"
                className="absolute right-3 top-3 rounded-full border border-white/10 p-1 text-white/70 hover:border-red-500/40 hover:text-white"
              >
                ✕
              </button>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs text-red-200">
                Versión de prueba
              </div>

              <h2 id="debug-title" className="text-xl font-semibold text-white">
                Esta es una versión de depuración (demo)
              </h2>

              <p id="debug-desc" className="mt-2 text-sm text-white/80">
                Algunas funciones pueden no estar disponibles o estar en desarrollo.
                Es posible que encuentres fallos, faltantes o cambios frecuentes.
              </p>

              <ul className="mt-3 space-y-1 text-sm text-white/75">
                <li>• Cambios no finales en el diseño y contenido.</li>
                <li>• Posibles errores en formularios o integraciones.</li>
                <li>• Rendimiento y métricas aún en optimización.</li>
              </ul>

              <div className="mt-5 flex items-center justify-between gap-2">
                <button
                  onClick={onClose}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/90 transition hover:border-red-500/40 hover:bg-red-500/10"
                >
                  Entendido
                </button>

                <a
                  href="#contact"
                  onClick={onClose}
                  className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  Reportar un problema
                </a>
              </div>

              {/* Ocultamos el tip en móvil para que no invada el hero */}
              <p className="mt-3 hidden text-[11px] text-white/40 sm:block">
              <code className="text-white/60">NEXT_PUBLIC_SHOW_DEBUG_NOTICE=true</code> MODO PRODUCCION
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
