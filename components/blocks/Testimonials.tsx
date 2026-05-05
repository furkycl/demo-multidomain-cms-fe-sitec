import type { TestimonialsBlock } from '@/lib/types';

export function Testimonials({ content }: { content: TestimonialsBlock['content'] }) {
  const items = content.items ?? [];
  if (items.length === 0) return null;

  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      {content.title && <h2 className="text-3xl font-bold mb-8 text-center">{content.title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <figure key={i} className="border rounded-lg p-6">
            {t.rating && (
              <div className="text-amber-500 mb-2">
                {'★'.repeat(Math.max(0, Math.min(5, Math.round(t.rating))))}
                <span className="text-gray-300">{'★'.repeat(5 - Math.max(0, Math.min(5, Math.round(t.rating))))}</span>
              </div>
            )}
            <blockquote className="text-sm italic mb-4">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="flex items-center gap-3">
              {t.avatar_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.avatar_url} alt={t.author} className="w-10 h-10 rounded-full object-cover" />
              )}
              <div>
                <div className="font-semibold text-sm">{t.author}</div>
                {t.author_title && <div className="text-xs opacity-60">{t.author_title}</div>}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
