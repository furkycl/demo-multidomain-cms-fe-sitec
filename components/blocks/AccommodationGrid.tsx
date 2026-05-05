import type { AccommodationGridBlock } from '@/lib/types';

const TYPE_LABELS: Record<string, string> = {
  host_family: 'Host Family',
  residence: 'Residence',
  shared_apartment: 'Shared Apt.',
  private_apartment: 'Private Apt.',
  hotel: 'Hotel',
};

export function AccommodationGrid({ content }: { content: AccommodationGridBlock['content'] }) {
  const items = content.items ?? [];
  if (items.length === 0) return null;

  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      {content.title && <h2 className="text-3xl font-bold mb-8">{content.title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((a, i) => (
          <article key={i} className="flex gap-4 border rounded-lg overflow-hidden p-4">
            {a.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={a.image_url} alt={a.name} className="w-32 h-32 object-cover rounded shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h3 className="font-semibold text-lg">{a.name}</h3>
                {a.type && <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{TYPE_LABELS[a.type] ?? a.type}</span>}
              </div>
              {a.description && <p className="text-sm opacity-80 mb-2">{a.description}</p>}
              {a.features && a.features.length > 0 && (
                <ul className="flex flex-wrap gap-1 mb-2">
                  {a.features.map((f, j) => (
                    <li key={j} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{f}</li>
                  ))}
                </ul>
              )}
              {a.price_per_week && (
                <div className="font-semibold">{a.price_per_week}</div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
