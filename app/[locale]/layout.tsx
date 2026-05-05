import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, LOCALE_INFO } from '@/lib/locales';
import '../globals.css';

export async function generateStaticParams() {
  const { SUPPORTED_LOCALES } = await import('@/lib/locales');
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'multi-cms site',
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dir = LOCALE_INFO[params.locale].direction;

  return (
    <html lang={params.locale} dir={dir}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
