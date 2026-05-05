'use client';

import { useEffect, useState } from 'react';
import type { HeaderBlock, Site } from '@/lib/types';
import type { Locale } from '@/lib/locales';
import { LOCALE_INFO } from '@/lib/locales';

/**
 * Kaplan TV-style navbar:
 *  - Top thin gradient bar with optional "Operated by" line
 *  - Sticky white header with logo + nav links + lang switcher + red CTA
 *  - Mobile-aware
 */
export function Header({
  content,
  site,
  locale,
  alternates,
}: {
  content: HeaderBlock['content'];
  site: Site;
  locale: Locale;
  alternates: Record<string, string>;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = content.links ?? [];
  const showOperated = !!(content.operated_by_text || content.operated_by_logo);
  const availableLocales = Object.keys(alternates).length > 0
    ? (Object.keys(alternates) as Locale[])
    : [locale];

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      {/* Operated By bar */}
      {showOperated && (
        <div className="bg-gradient-to-r from-[#0F1A3C] via-[#142042] to-[#0F1A3C]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-end h-9">
            <a
              href={content.operated_by_href || '#'}
              {...(content.operated_by_href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center gap-2.5 group"
            >
              {content.operated_by_text && (
                <span className="text-[13px] text-white/50 leading-none">{content.operated_by_text}</span>
              )}
              {content.operated_by_logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={content.operated_by_logo}
                  alt=""
                  className="h-[13px] w-auto opacity-60 group-hover:opacity-100 transition-opacity"
                />
              )}
            </a>
          </div>
        </div>
      )}

      <nav className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <a href={`/${locale}`} className="flex items-center gap-2.5 flex-shrink-0">
            {content.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={content.logo_url} alt={site.name} className="h-12 sm:h-14 lg:h-16 w-auto" />
            ) : (
              <span className="text-xl font-bold text-[#0F1A3C]">{content.title || site.name}</span>
            )}
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href.startsWith('/') ? `/${locale}${link.href === '/' ? '' : link.href}` : link.href}
                className="text-[15px] text-[#0F1A3C]/70 hover:text-[#0F1A3C] font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: Lang + CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            {/* Lang switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 text-[#0F1A3C]/60 hover:text-[#0F1A3C] transition-colors"
                aria-label="Change language"
              >
                <span className="text-base">🌐</span>
                <span className="text-[12px] font-semibold uppercase">{locale}</span>
              </button>
              {langOpen && (
                <div className="absolute end-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden min-w-[160px] z-50">
                  {availableLocales.map((loc) => {
                    const href = alternates[loc] ?? `/${loc}`;
                    const info = LOCALE_INFO[loc];
                    return (
                      <a
                        key={loc}
                        href={href}
                        hrefLang={loc}
                        className={`block w-full text-left px-4 py-2.5 text-[13px] transition-colors ${
                          loc === locale
                            ? 'text-[#E31837] bg-red-50 font-medium'
                            : 'text-gray-600 hover:text-[#0F1A3C] hover:bg-gray-50'
                        }`}
                      >
                        {info.native}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Red CTA */}
            {content.cta_label && (
              <a
                href={content.cta_href ?? '#contact'}
                className="hidden sm:inline-flex items-center px-6 py-2.5 bg-[#E31837] hover:bg-[#c71430] text-white text-[14px] font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
              >
                {content.cta_label}
              </a>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 text-[#0F1A3C]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-400 ${mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-gray-100 px-6 py-6 space-y-1">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href.startsWith('/') ? `/${locale}${link.href === '/' ? '' : link.href}` : link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-[16px] text-[#0F1A3C]/70 hover:text-[#0F1A3C] font-medium"
            >
              {link.label}
            </a>
          ))}
          {content.cta_label && (
            <a
              href={content.cta_href ?? '#contact'}
              onClick={() => setMobileOpen(false)}
              className="block w-full mt-4 py-3 bg-[#E31837] text-white text-center text-[14px] font-semibold rounded-lg"
            >
              {content.cta_label}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
