import type { Site } from './types';

/**
 * Schema.org JSON-LD generators — page'ler bunları <script type="application/ld+json">
 * olarak basacak.
 *
 * Kurallar:
 *  - Cross-link YOK (40 mikro site arası link verme).
 *  - Outbound link'ler config/brands.php whitelist'inden geliyor (parent brand).
 */

export function localBusinessJsonLd(site: Site, url: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    url,
    address: site.city
      ? {
          '@type': 'PostalAddress',
          addressLocality: site.city,
          addressCountry: site.country ?? undefined,
        }
      : undefined,
  };
}

export function courseJsonLd(input: {
  name: string;
  description?: string;
  providerName: string;
  providerUrl: string;
  url?: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: input.name,
    description: input.description,
    provider: {
      '@type': 'Organization',
      name: input.providerName,
      sameAs: input.providerUrl,
    },
    ...(input.url ? { url: input.url } : {}),
  };
}
