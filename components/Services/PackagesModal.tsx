'use client';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export interface PackagePlan {
  name: string;
  price: string; // ej: "$599 USD"
  cadence?: string; // ej: "/proyecto", "/mes"
  highlights: string[];
  cta?: { title: string; url: string };
  popular?: boolean;
}

export default function PackagesModal({
  open,
  onClose,
  title,
  subtitle,
  plans,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  plans: PackagePlan[];
}) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-[100]">
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="transition-all duration-200"
              enterFrom="opacity-0 translate-y-2 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="transition-all duration-150"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-2 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="text-xs text-white/70">Paquetes & Precios</span>
                  </div>
                  <Dialog.Title className="mt-3 bg-gradient-to-r from-red-400 to-white bg-clip-text text-2xl font-semibold text-transparent">
                    {title}
                  </Dialog.Title>
                  {subtitle && (
                    <p className="mt-1 text-sm text-white/70">{subtitle}</p>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {plans.map((p, i) => (
                    <div
                      key={i}
                      className={[
                        'relative flex h-full flex-col rounded-xl border bg-neutral-900/40 p-5',
                        p.popular
                          ? 'border-red-500/40 shadow-[0_0_24px_rgba(239,68,68,0.15)]'
                          : 'border-white/10',
                      ].join(' ')}
                    >
                      {p.popular && (
                        <div className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-red-600 to-black px-3 py-1 text-[10px] font-bold tracking-wide text-white">
                          MÁS POPULAR
                        </div>
                      )}
                      <h4 className="text-base font-semibold text-white">
                        {p.name}
                      </h4>
                      <div className="mt-1 text-2xl font-bold text-white">
                        {p.price}
                        {p.cadence && (
                          <span className="ml-1 text-sm font-medium text-white/60">
                            {p.cadence}
                          </span>
                        )}
                      </div>

                      <ul className="mt-4 space-y-2 text-sm text-white/85">
                        {p.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      {p.cta && (
                        <a
                          href={p.cta.url}
                          className="mt-5 inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-transparent hover:text-white hover:shadow-alt-cta"
                        >
                          {p.cta.title}
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={onClose}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:bg-white/10"
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
