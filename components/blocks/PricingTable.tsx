import type { PricingTableBlock } from '@/lib/types';

export function PricingTable({ content }: { content: PricingTableBlock['content'] }) {
  const plans = content.plans ?? [];
  if (plans.length === 0) return null;

  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      {content.title && <h2 className="text-3xl font-bold mb-2 text-center">{content.title}</h2>}
      {content.intro && <p className="text-lg opacity-80 mb-8 text-center max-w-2xl mx-auto">{content.intro}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((p, i) => (
          <div
            key={i}
            className={`border rounded-lg p-6 flex flex-col ${p.highlighted ? 'border-blue-500 ring-2 ring-blue-500' : ''}`}
          >
            {p.highlighted && (
              <span className="self-start bg-blue-500 text-white text-xs px-2 py-1 rounded uppercase tracking-wider mb-4">
                Önerilen
              </span>
            )}
            <h3 className="font-semibold text-xl mb-2">{p.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">{p.price}</span>
              {p.period && <span className="opacity-60 ml-1">/{p.period}</span>}
            </div>
            {p.features && p.features.length > 0 && (
              <ul className="space-y-2 mb-6 flex-1">
                {p.features.map((f, j) => (
                  <li key={j} className="text-sm">✓ {f}</li>
                ))}
              </ul>
            )}
            {p.cta_label && p.cta_href && (
              <a
                href={p.cta_href}
                className={`block text-center px-4 py-2 rounded font-semibold ${
                  p.highlighted ? 'bg-blue-500 text-white hover:bg-blue-600' : 'border hover:bg-gray-50'
                }`}
              >
                {p.cta_label}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
