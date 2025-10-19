// components/SEO/JsonLd.tsx
'use client';
import Script from 'next/script';

export default function JsonLd({ data, id }: { data: object; id: string }) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
