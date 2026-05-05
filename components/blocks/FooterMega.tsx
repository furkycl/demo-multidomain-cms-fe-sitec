import type { FooterMegaBlock } from '@/lib/types';
import { LanguageSwitcher } from '../LanguageSwitcher';
import type { Locale } from '@/lib/locales';

export function FooterMega({
  content,
  site,
  locale,
  alternates,
}: {
  content: FooterMegaBlock['content'];
  site: { domain: string; name: string };
  locale: Locale;
  alternates: Record<string, string>;
}) {
  const bg = content.background_color ?? '#0f172a';
  const text = content.text_color ?? '#cbd5e1';

  return (
    <footer style={{ backgroundColor: bg, color: text }} className="px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          {content.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={content.logo_url} alt={site.name} className="h-10 mb-3" />
          ) : (
            <div className="text-xl font-semibold mb-3">{site.name}</div>
          )}
          {content.tagline && <p className="text-sm opacity-80">{content.tagline}</p>}
        </div>
        {(content.columns ?? []).map((col, i) => (
          <div key={i}>
            <h4 className="font-semibold mb-3">{col.title}</h4>
            <ul className="space-y-2 text-sm">
              {col.links.map((link, j) => (
                <li key={j}>
                  <a href={link.href} className="opacity-80 hover:opacity-100">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-current/10 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm opacity-60">{content.copyright_text ?? `© ${new Date().getFullYear()} ${site.name}`}</p>
        <div className="flex items-center gap-4">
          {(content.social_links ?? []).map((s, i) => (
            <a
              key={i}
              href={s.href}
              rel="noopener"
              target="_blank"
              className="text-sm opacity-80 hover:opacity-100 capitalize"
            >
              {s.platform}
            </a>
          ))}
          <LanguageSwitcher
            current={locale}
            alternates={alternates}
            availableLocales={Object.keys(alternates).length > 0 ? (Object.keys(alternates) as Locale[]) : [locale]}
          />
        </div>
      </div>
    </footer>
  );
}
