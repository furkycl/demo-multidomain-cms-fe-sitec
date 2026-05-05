import type { DestinationsGridBlock } from '@/lib/types';

export function DestinationsGrid({ content }: { content: DestinationsGridBlock['content'] }) {
  const items = content.items ?? [];
  if (items.length === 0) return null;

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      {content.title && (
        <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">{content.title}</h2>
      )}
      {content.intro && (
        <p className="text-lg opacity-80 mb-10 max-w-2xl">{content.intro}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((d, i) => (
          <a
            key={i}
            href={d.href ?? '#'}
            className="relative block group overflow-hidden rounded-xl aspect-[4/3] shadow-md hover:shadow-2xl transition"
          >
            {d.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={d.image_url}
                alt={d.city}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {d.badge && (
              <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs uppercase font-bold px-2.5 py-1 rounded">
                {d.badge}
              </span>
            )}
            <div className="relative z-10 h-full flex flex-col justify-end p-5 text-white">
              {d.country && (
                <p className="text-xs uppercase tracking-widest opacity-80 mb-1">{d.country}</p>
              )}
              <h3 className="text-2xl font-bold mb-1">{d.city}</h3>
              {d.description && (
                <p className="text-sm opacity-90 line-clamp-2">{d.description}</p>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
