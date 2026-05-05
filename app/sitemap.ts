import type { MetadataRoute } from 'next';
import { fetchSite } from '@/lib/api';
import { SUPPORTED_LOCALES } from '@/lib/locales';

const STANDARD_PAGES = ['', '/courses', '/accommodation', '/city-guide', '/pricing'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await fetchSite();
  const locales = (site?.locales ?? SUPPORTED_LOCALES) as readonly string[];

  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const page of STANDARD_PAGES) {
      entries.push({
        url: `/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.7,
      });
    }
  }
  return entries;
}
