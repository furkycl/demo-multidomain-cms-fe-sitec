import type { ArticleListBlock } from '@/lib/types';

export function ArticleList({ content }: { content: ArticleListBlock['content'] }) {
  const items = content.items ?? [];
  if (items.length === 0) return null;

  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      {content.title && <h2 className="text-3xl font-bold mb-8">{content.title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((a, i) => (
          <a key={i} href={a.href ?? '#'} className="block group">
            {a.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={a.image_url} alt={a.title} className="w-full h-48 object-cover rounded-lg mb-3 group-hover:opacity-90" />
            )}
            {a.date && <time className="text-xs opacity-60 uppercase">{a.date}</time>}
            <h3 className="font-semibold text-lg mb-2 group-hover:underline">{a.title}</h3>
            {a.excerpt && <p className="text-sm opacity-80">{a.excerpt}</p>}
          </a>
        ))}
      </div>
    </section>
  );
}
