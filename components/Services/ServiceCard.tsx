'use client';
import { useState } from 'react';
import {
  Cog6ToothIcon,
  GlobeAltIcon,
  MegaphoneIcon,
  KeyIcon,
} from '@heroicons/react/24/solid';
import PackagesModal, { PackagePlan } from './PackagesModal';

export interface Service {
  title: string;
  tagline: string;
  icon?: 'software' | 'web' | 'social' | 'licenses';
  bullets: Array<{
    heading: string;
    items: string[];
  }>;
  tags?: string[];
  links?: { title: string; url?: string; action?: 'packages' }[];
  // Si este servicio tiene paquetes, los pasamos aquí:
  packages?: {
    subtitle?: string;
    plans: PackagePlan[];
  };
}

const iconMap = {
  software: Cog6ToothIcon,
  web: GlobeAltIcon,
  social: MegaphoneIcon,
  licenses: KeyIcon,
};

export default function ServiceCard({
  title,
  tagline,
  icon = 'software',
  bullets,
  tags = [],
  links = [],
  packages,
}: Service) {
  const Icon = iconMap[icon];
  const [open, setOpen] = useState(false);

  const handleLinkClick = (action?: 'packages', url?: string) => {
    if (action === 'packages' && packages) {
      setOpen(true);
      return;
    }
    if (url) window.location.href = url;
  };

  return (
    <>
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] transition hover:border-red-500/40 hover:bg-neutral-900/60">
        {/* Header */}
        <div className="mb-5 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-r from-red-600 to-black">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-white/70">{tagline}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-5">
          {bullets.map((section, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-white/5 bg-white/5 p-4"
            >
              <h4 className="mb-2 text-sm font-semibold text-red-500">
                {section.heading}
              </h4>
              <ul className="space-y-1.5 text-sm text-white/85">
                {section.items.map((it, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <span
                key={i}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            {links.map((l, i) => (
              <button
                key={i}
                onClick={() => handleLinkClick(l.action, l.url)}
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-transparent hover:text-white hover:shadow-alt-cta"
              >
                {l.title}
              </button>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/0 transition group-hover:ring-white/10" />
      </div>

      {/* Modal de paquetes */}
      {packages && (
        <PackagesModal
          open={open}
          onClose={() => setOpen(false)}
          title={title}
          subtitle={packages.subtitle}
          plans={packages.plans}
        />
      )}
    </>
  );
}
