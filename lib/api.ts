import type { PageResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';
const SITE_DOMAIN = process.env.SITE_DOMAIN ?? 'localhost';

/**
 * Belirli bir slug için sayfa içeriğini çeker.
 * ISR: 60 saniyelik cache; backend webhook'u revalidate çağırınca anında tazelenir.
 */
export async function fetchPage(slug: string): Promise<PageResponse | null> {
  const normalized = slug === '' || slug === '/' ? '' : slug.startsWith('/') ? slug : `/${slug}`;
  const url = `${API_URL}/api/sites/${encodeURIComponent(SITE_DOMAIN)}/pages${normalized}`;

  const res = await fetch(url, {
    next: { revalidate: 60, tags: [`page:${slug}`] },
    headers: { Accept: 'application/json' },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`API ${res.status} for ${url}: ${await res.text()}`);
  }

  return (await res.json()) as PageResponse;
}
