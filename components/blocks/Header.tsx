import type { HeaderBlock, Site } from '@/lib/types';

export function Header({ content, site }: { content: HeaderBlock['content']; site: Site }) {
  const bg = content.background_color ?? '#ffffff';
  const title = content.title ?? site.name;

  return (
    <header
      style={{ backgroundColor: bg }}
      className="px-6 py-4 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        {content.logo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={content.logo_url} alt="" className="h-8 w-auto" />
        ) : null}
        <span className="text-lg font-semibold">{title}</span>
      </div>

      {content.links && content.links.length > 0 && (
        <nav className="flex gap-4 text-sm">
          {content.links.map((link, i) => (
            <a key={i} href={link.href} className="hover:underline">
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
