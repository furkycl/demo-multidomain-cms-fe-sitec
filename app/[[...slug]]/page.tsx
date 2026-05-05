import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchPage } from '@/lib/api';
import { BlockRenderer } from '@/components/BlockRenderer';

type Params = { slug?: string[] };

function buildSlug(slug: string[] | undefined): string {
  if (!slug || slug.length === 0) return '/';
  return '/' + slug.join('/');
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await fetchPage(buildSlug(params.slug));
  if (!data) return { title: 'Bulunamadı' };

  const { page, site } = data;
  return {
    title: page.seo?.title ?? page.title ?? site.name,
    description: page.seo?.description,
    openGraph: page.seo?.og_image ? { images: [{ url: page.seo.og_image }] } : undefined,
  };
}

export default async function CatchAllPage({ params }: { params: Params }) {
  const data = await fetchPage(buildSlug(params.slug));
  if (!data) notFound();

  return <BlockRenderer blocks={data.blocks} site={data.site} />;
}
