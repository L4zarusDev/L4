// components/SEO/builders.ts
export const buildOrganization = ({
  name,
  url,
  logo,
  sameAs = [],
}: {
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name,
  url,
  logo,
  sameAs,
});

export const buildWebsite = ({
  name,
  url,
  searchUrl,
}: {
  name: string;
  url: string;
  searchUrl?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name,
  url,
  ...(searchUrl && {
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }),
});

export const buildService = ({
  name,
  serviceType,
  providerName,
  url,
  areaServed,
  offers,
}: {
  name: string;
  serviceType?: string;
  providerName: string;
  url: string;
  areaServed?: string;
  offers?: { name: string; price: string; priceCurrency: string; url?: string }[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  ...(serviceType && { serviceType }),
  provider: { '@type': 'Organization', name: providerName },
  ...(areaServed && { areaServed: { '@type': 'Place', name: areaServed } }),
  ...(offers && {
    offers: offers.map((o) => ({
      '@type': 'Offer',
      name: o.name,
      price: o.price,
      priceCurrency: o.priceCurrency,
      url: o.url || url,
      availability: 'https://schema.org/InStock',
    })),
  }),
});

export const buildBreadcrumbs = (baseUrl: string, items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: `${baseUrl}${it.path}`,
  })),
});

export const buildFAQ = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});
