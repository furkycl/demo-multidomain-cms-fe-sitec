'use client';

import Link from 'next/link';
import { LOCALE_INFO } from '@/lib/locales';
import type { Locale } from '@/lib/locales';

export function LanguageSwitcher({
  current,
  alternates,
  availableLocales,
}: {
  current: Locale;
  alternates: Record<string, string>;
  availableLocales: Locale[];
}) {
  return (
    <div className="relative inline-block">
      <details className="group">
        <summary className="cursor-pointer list-none px-3 py-1.5 text-sm rounded border border-current/20 hover:border-current/40 inline-flex items-center gap-2">
          <span>{LOCALE_INFO[current].native}</span>
          <span className="opacity-50">▾</span>
        </summary>
        <ul className="absolute right-0 mt-2 min-w-[180px] bg-white text-black shadow-lg rounded border z-50 max-h-80 overflow-auto">
          {availableLocales.map((locale) => {
            const href = alternates[locale] ?? `/${locale}`;
            const info = LOCALE_INFO[locale];
            const isCurrent = locale === current;
            return (
              <li key={locale}>
                <Link
                  href={href}
                  className={`block px-3 py-2 text-sm hover:bg-gray-100 ${isCurrent ? 'font-semibold bg-gray-50' : ''}`}
                  hrefLang={locale}
                  dir={info.direction}
                >
                  <span className="font-mono text-xs opacity-50 mr-2">{locale}</span>
                  {info.native}
                </Link>
              </li>
            );
          })}
        </ul>
      </details>
    </div>
  );
}
