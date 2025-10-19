'use client';
import { motion, useInView } from 'framer-motion';
import React, { useRef, useState } from 'react';
import Turnstile from '@/components/Security/Turnstile';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [cfToken, setCfToken] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    setState('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // honeypot
    if (formData.get('company')?.toString().trim()) {
      setState('success');
      return;
    }

    if (!cfToken) {
      setErrorMsg('Verificación requerida. Completa el captcha.');
      setState('idle');
      return;
    }

    const payload = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      budget: formData.get('budget')?.toString() || '',
      services: (formData.getAll('services') as string[]) || [],
      message: formData.get('message')?.toString() || '',
      cfToken,
    };

    if (!payload.name || !payload.email || !payload.message) {
      setErrorMsg('Por favor completa nombre, email y mensaje.');
      setState('idle');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setState('success');
      form.reset();
      setCfToken('');

      // === GA4 event ===
      // @ts-ignore
      window.dataLayer = window.dataLayer || [];
      // @ts-ignore
      window.dataLayer.push({
        event: 'submit_contact',
        contact_method: 'form',
        services: payload.services.join(','),
        budget: payload.budget,
      });

      // === Meta Pixel ===
      // @ts-ignore
      if (typeof window.fbq === 'function') {
        // @ts-ignore
        window.fbq('trackCustom', 'ContactFormSubmitted', {
          services: payload.services.join(','),
          budget: payload.budget,
        });
      }
    } catch (_err) {
      setErrorMsg('No se pudo enviar el mensaje. Intenta de nuevo.');
      setState('error');
    }
  };

  const fade = (d = 0) => ({
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: d } },
  });

  return (
    <section id="contact" className="relative mx-auto mt-40 max-w-7xl px-4">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(185,28,28,0.18) 0%, rgba(0,0,0,0) 60%)',
        }}
      />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fade(0)}
        className="text-center"
      >
        <p className="mx-auto inline-block rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs uppercase tracking-wider text-red-300">
          Contacto
        </p>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          ¿Listo para despegar en <span className="text-red-400">30 días</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">
          Cuéntame del proyecto y te propongo el mejor enfoque (MVP, web de conversión o growth de redes).
        </p>
      </motion.div>

      <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr,0.9fr]">
        <motion.form
          onSubmit={onSubmit}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fade(0.05)}
          className="rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900/60 to-black/60 p-6"
        >
          <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-white/80">Nombre*</label>
              <input
                name="name"
                required
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white outline-none ring-red-600/30 placeholder-white/40 focus:ring-2"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-white/80">Email*</label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white outline-none ring-red-600/30 placeholder-white/40 focus:ring-2"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-white/80">Presupuesto</label>
              <select
                name="budget"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white outline-none ring-red-600/30 focus:ring-2"
                defaultValue=""
              >
                <option value="" disabled>Selecciona un rango</option>
                <option>&lt; $1,000</option>
                <option>$1,000 – $3,000</option>
                <option>$3,000 – $8,000</option>
                <option>$8,000 – $20,000</option>
                <option>$20,000+</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm text-white/80">Servicios</label>
              <div className="flex flex-wrap gap-2">
                {['Desarrollo de software', 'Desarrollo web', 'Impulso redes', 'Licencias'].map((s) => (
                  <label key={s} className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-sm text-red-200">
                    <input type="checkbox" name="services" value={s} className="accent-red-500" />
                    {s}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm text-white/80">Mensaje*</label>
            <textarea
              name="message"
              required
              rows={6}
              className="w-full resize-none rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white outline-none ring-red-600/30 placeholder-white/40 focus:ring-2"
              placeholder="Cuéntame objetivos, plazos y contexto para darte la mejor propuesta."
            />
          </div>

          <div className="mt-4">
            <Turnstile onToken={setCfToken} />
          </div>

          <div className="mt-4 min-h-[24px] text-sm">
            {state === 'loading' && <span className="text-white/80">Enviando…</span>}
            {state === 'success' && <span className="text-green-400">¡Gracias! Te responderé muy pronto.</span>}
            {(state === 'error' || errorMsg) && <span className="text-red-400">{errorMsg || 'Error al enviar.'}</span>}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={state === 'loading'}
              className="grid flex-1 place-items-center rounded-full bg-white py-3 text-center text-base text-black shadow-cta transition hover:bg-transparent hover:text-white hover:shadow-alt-cta disabled:cursor-not-allowed disabled:opacity-70"
            >
              {state === 'loading' ? 'Enviando…' : 'Enviar mensaje'}
            </button>
            <a
              href="https://cal.com/l4zarusdev"
              className="grid flex-1 place-items-center rounded-full py-3 text-center text-base text-white shadow-alt-cta transition hover:bg-white hover:text-black hover:shadow-cta"
            >
              Agendar llamada
            </a>
          </div>
        </motion.form>

        {/* Aside */}
        <motion.aside
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fade(0.1)}
          className="rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900/60 to-black/60 p-6"
        >
          <h3 className="text-lg font-semibold text-white">¿Prefieres otro canal?</h3>
          <p className="mt-2 text-white/75">
            También respondo por email y redes. Suelo contestar en menos de 24 h hábiles.
          </p>

          <div className="mt-4 space-y-3 text-sm">
            <a href="mailto:hello@l4zarus.dev" className="block rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white/90 hover:border-red-600/40">📬 hello@l4zarus.dev</a>
            <a href="https://instagram.com/l4.dev" target="_blank" className="block rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white/90 hover:border-red-600/40">📸 Instagram @l4.dev</a>
            <a href="https://cal.com/l4zarusdev" target="_blank" className="block rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white/90 hover:border-red-600/40">📅 Agenda 15 min</a>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
