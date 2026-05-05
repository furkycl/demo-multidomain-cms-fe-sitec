import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchPage } from '@/lib/api';
import { BlockRenderer } from '@/components/BlockRenderer';
import { isLocale } from '@/lib/locales';

type Params = { locale: string; slug?: string[] };

function buildSlug(slug: string[] | undefined): string {
  if (!slug || slug.length === 0) return '/';
  return '/' + slug.join('/');
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  if (!isLocale(params.locale)) return { title: 'Not found' };
  const data = await fetchPage(params.locale, buildSlug(params.slug));
  if (!data) return { title: 'Not found' };

  const { page, site, alternates } = data;

  // hreflang alternates
  const languages: Record<string, string> = {};
  for (const [loc, path] of Object.entries(alternates)) {
    languages[loc] = path;
  }

  return {
    title: page.seo?.title ?? page.title ?? site.name,
    description: page.seo?.description,
    alternates: {
      languages,
    },
    openGraph: page.seo?.og_image ? { images: [{ url: page.seo.og_image }] } : undefined,
  };
}

export default async function CatchAllPage({ params }: { params: Params }) {
  if (!isLocale(params.locale)) notFound();
  const data = await fetchPage(params.locale, buildSlug(params.slug));
  if (!data) notFound();

  return <BlockRenderer blocks={data.blocks} site={data.site} locale={params.locale} alternates={data.alternates} />;
}
