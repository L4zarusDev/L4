import ServiceCard, { Service } from './ServiceCard';
import SectionHeading from '../SectionHeading';
import ServicesCarousel from './ServicesCarousel';

export const servicesData: Service[] = [
  {
    title: 'Desarrollo de software',
    tagline: 'Soluciones a medida con foco en resultados de negocio.',
    icon: 'software',
    bullets: [
      {
        heading: 'Problema → Solución',
        items: [
          'Traducción a lenguaje negocio para priorizar ROI',
          'Roadmap por hitos con KPIs medibles',
        ],
      },
      {
        heading: 'Entregables',
        items: [
          'Arquitectura, backend (API), frontend',
          'CI/CD, pruebas, documentación, monitoreo',
        ],
      },
      {
        heading: 'Modelos',
        items: ['Proyecto fijo', 'Time & materials', 'Mantenimiento'],
      },
      {
        heading: 'Tech',
        items: ['TypeScript, Node, Nest, Prisma', 'PostgreSQL, AWS/GCP, Docker'],
      },
      {
        heading: 'SLA y soporte',
        items: ['Tiempos de respuesta pactados', 'Canales de soporte claros'],
      },
    ],
    tags: ['API', 'Escalabilidad', 'Observabilidad'],
    links: [
      { title: 'Reservar llamada', url: 'https://cal.com/l4zarusdev' },
      { title: 'Solicitar cotización', url: '#contact' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // DESARROLLO WEB (con paquetes)
  // ─────────────────────────────────────────────────────────────────
  {
    title: 'Desarrollo web',
    tagline: 'Sitios rápidos, SEO-friendly y optimizados para conversión.',
    icon: 'web',
    bullets: [
      { heading: 'Objetivos', items: ['Velocidad', 'SEO', 'Conversión'] },
      {
        heading: 'Entregables',
        items: [
          'UI/UX, copy, desarrollo',
          'CMS (Headless/WordPress), analítica, performance (CWV), accesibilidad AA',
        ],
      },
      { heading: 'Extras', items: ['A/B testing', 'Automations (correo, CRM)', 'i18n'] },
      {
        heading: 'Check técnico',
        items: [
          'Lighthouse 90+',
          'schema.org, sitemap, redirecciones',
          'Seguridad (CSP), backups',
        ],
      },
    ],
    tags: ['Next.js', 'SEO', 'Accesibilidad'],
    links: [
      { title: 'Ver paquetes', action: 'packages' }, // 👈 abre modal
      { title: 'Reservar llamada', url: 'https://cal.com/l4zarusdev' },
    ],
    packages: {
      subtitle: 'Paquetes orientados a resultados. Precios de referencia.',
      plans: [
        {
          name: 'Web Start',
          price: '$699 USD',
          cadence: '/proyecto',
          highlights: [
            'Landing 1 sección + contacto',
            'UI/UX base + copy simple',
            'SEO técnico básico + Analytics',
            'Deploy y dominio conectado',
          ],
          cta: { title: 'Empezar', url: 'https://cal.com/l4zarusdev' },
        },
        {
          name: 'Web Growth',
          price: '$1,490 USD',
          cadence: '/proyecto',
          popular: true,
          highlights: [
            'Sitio multipágina + Blog',
            'CMS (Headless o WP)',
            'Core Web Vitals 90+',
            'Automations (email/CRM) + A/B testing',
          ],
          cta: { title: 'Seleccionar', url: 'https://cal.com/l4zarusdev' },
        },
        {
          name: 'Web Performance+',
          price: '$2,400 USD',
          cadence: '/proyecto',
          highlights: [
            'Arquitectura Next.js avanzada',
            'i18n + Accesibilidad AA',
            'SEO técnico completo + schema.org',
            'Soporte 30 días + optimizaciones',
          ],
          cta: { title: 'Solicitar propuesta', url: '#contact' },
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // IMPULSO REDES SOCIALES (con paquetes)
  // ─────────────────────────────────────────────────────────────────
  {
    title: 'Impulso de redes sociales',
    tagline: 'Contenido + Ads cumpliendo políticas. Nada de atajos.',
    icon: 'social',
    bullets: [
      { heading: 'Paquetes', items: ['Starter', 'Growth', 'Pro'] },
      {
        heading: 'Incluye',
        items: [
          'Calendario (x posts/semana)',
          'Creatividades (estáticos + video corto)',
          'Gestión de comentarios/DMs',
          'UGC y colaboraciones',
        ],
      },
      {
        heading: 'Ads',
        items: [
          'Meta / TikTok / LinkedIn (presupuesto aparte)',
          'Reporte mensual: alcance, ER, CPL/CPA',
        ],
      },
      {
        heading: 'Disclaimer TOS',
        items: [
          'Crecimiento orgánico/ads cumpliendo políticas',
          'Sin prácticas prohibidas',
        ],
      },
    ],
    tags: ['Content', 'Ads', 'Analytics'],
    links: [
      { title: 'Ver paquetes', action: 'packages' }, // 👈 reemplazado
      { title: 'Reservar llamada', url: 'https://cal.com/l4zarusdev' },
    ],
    packages: {
      subtitle: 'Planes mensuales. Creatividad + datos = crecimiento real.',
      plans: [
        {
          name: 'Starter',
          price: '$390 USD',
          cadence: '/mes',
          highlights: [
            '12 posts/mes (estáticos y 4 reels)',
            'Calendario editorial',
            'Gestión básica de comentarios',
            'Reporte mensual de métricas',
          ],
          cta: { title: 'Empezar', url: 'https://cal.com/l4zarusdev' },
        },
        {
          name: 'Growth',
          price: '$690 USD',
          cadence: '/mes',
          popular: true,
          highlights: [
            '20 posts/mes (8 reels)',
            'UGC ligero + colaboraciones',
            'Gestión de DMs prioritaria',
            'Ads básicos (setup + optimización)*',
          ],
          cta: { title: 'Seleccionar', url: 'https://cal.com/l4zarusdev' },
        },
        {
          name: 'Pro',
          price: '$1,250 USD',
          cadence: '/mes',
          highlights: [
            '30 posts/mes (12 reels)',
            'Producción de creatividades premium',
            'Gestión integral de comunidad',
            'Ads avanzados + pruebas A/B*',
          ],
          cta: { title: 'Contactar', url: '#contact' },
        },
      ],
    },
  },

  {
    title: 'Venta de licencias (SaaS/Software)',
    tagline: 'Activación inmediata, pagos seguros y soporte humano.',
    icon: 'licenses',
    bullets: [
      { heading: 'Producto', items: ['Demo y video', 'Features y comparativa de planes', 'FAQ y reseñas'] },
      { heading: 'Checkout', items: ['Stripe / Paddle / Lemon Squeezy'] },
      {
        heading: 'Gestión de licencias',
        items: [
          'Alta automática, claves, activación',
          'Dispositivos/asientos, renovaciones',
          'Recordatorios y área de cliente',
        ],
      },
      { heading: 'Legal', items: ['EULA, reembolsos', 'Uso aceptable, privacidad'] },
      { heading: 'Soporte', items: ['Help center, status page', 'SLA de respuesta'] },
    ],
    tags: ['SaaS', 'Licensing', 'Payments'],
    links: [
      { title: 'Contactar ventas', url: '#contact' },
      { title: 'Ver demo', url: '#demo' },
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto mt-56 max-w-7xl px-4 py-16">
      <SectionHeading
        heading="Servicios"
        subheading="Soluciones end-to-end: desde software y sitios web de alto rendimiento, hasta crecimiento en redes y comercialización de licencias."
      />

      {/* Carrusel en una sola línea con flechas */}
      <div className="mt-10">
        <ServicesCarousel services={servicesData} />
      </div>
    </section>
  );
}
