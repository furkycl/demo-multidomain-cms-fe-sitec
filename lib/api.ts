import type { PageResponse, SiteResponse } from './types';
import type { Locale } from './locales';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';
const SITE_DOMAIN = process.env.SITE_DOMAIN ?? 'localhost';

/**
 * Belirli bir locale + slug için sayfa içeriğini çeker.
 */
export async function fetchPage(locale: Locale, slug: string): Promise<PageResponse | null> {
  const normalizedSlug = slug === '' || slug === '/' ? '' : slug.startsWith('/') ? slug : `/${slug}`;
  const url = `${API_URL}/api/sites/${encodeURIComponent(SITE_DOMAIN)}/${locale}/pages${normalizedSlug}`;

  const res = await fetch(url, {
    next: { revalidate: 60, tags: [`site:${SITE_DOMAIN}`, `page:${locale}:${slug}`] },
    headers: { Accept: 'application/json' },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${res.status} for ${url}: ${await res.text()}`);

  return (await res.json()) as PageResponse;
}

/**
 * Site meta + aktif locale listesi.
 */
export async function fetchSite(): Promise<SiteResponse | null> {
  const url = `${API_URL}/api/sites/${encodeURIComponent(SITE_DOMAIN)}`;
  const res = await fetch(url, {
    next: { revalidate: 300, tags: [`site:${SITE_DOMAIN}`] },
    headers: { Accept: 'application/json' },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${res.status} for ${url}`);
  return (await res.json()) as SiteResponse;
}

/**
 * Lead submit — backend POST /api/leads
 */
export async function submitLead(input: {
  locale: Locale;
  formType: string;
  payload: Record<string, unknown>;
  utm?: { source?: string; medium?: string; campaign?: string };
}): Promise<{ ok: boolean; lead_id?: number; crm_status?: string; error?: string }> {
  const url = `${API_URL}/api/leads`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        source_domain: SITE_DOMAIN,
        locale: input.locale,
        form_type: input.formType,
        payload: input.payload,
        utm: input.utm,
        referrer: typeof window !== 'undefined' ? document.referrer : undefined,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: data?.error ?? `http_${res.status}` };
    return { ok: true, ...data };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'network_error' };
  }
}
