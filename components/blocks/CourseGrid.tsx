import type { CourseGridBlock } from '@/lib/types';

export function CourseGrid({ content }: { content: CourseGridBlock['content'] }) {
  const items = content.items ?? [];
  if (items.length === 0) return null;

  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      {content.title && <h2 className="text-3xl font-bold mb-2">{content.title}</h2>}
      {content.intro && <p className="text-lg opacity-80 mb-8 max-w-2xl">{content.intro}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((c, i) => (
          <a
            key={i}
            href={c.href ?? '#'}
            className="block border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            {c.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.image_url} alt={c.name} className="w-full h-48 object-cover" />
            )}
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{c.name}</h3>
                {c.level && <span className="text-xs uppercase bg-gray-100 px-2 py-0.5 rounded">{c.level}</span>}
              </div>
              {c.description && <p className="text-sm opacity-80 mb-3">{c.description}</p>}
              <div className="flex justify-between text-sm">
                {c.duration && <span className="opacity-60">{c.duration}</span>}
                {c.price_from && <span className="font-semibold">{c.price_from}</span>}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
