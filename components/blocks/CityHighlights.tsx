import type { CityHighlightsBlock } from '@/lib/types';

export function CityHighlights({ content }: { content: CityHighlightsBlock['content'] }) {
  const items = content.highlights ?? [];

  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      {content.title && <h2 className="text-3xl font-bold mb-2">{content.title}</h2>}
      {content.intro && <p className="text-lg opacity-80 mb-8 max-w-2xl">{content.intro}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((h, i) => (
          <div key={i} className="border rounded-lg p-5">
            {h.icon && <div className="text-3xl mb-3">{h.icon}</div>}
            <h3 className="font-semibold text-lg mb-2">{h.title}</h3>
            {h.description && <p className="text-sm opacity-80">{h.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
