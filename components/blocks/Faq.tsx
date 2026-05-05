import type { FaqBlock } from '@/lib/types';

export function Faq({ content }: { content: FaqBlock['content'] }) {
  const items = content.items ?? [];
  if (items.length === 0) return null;

  return (
    <section className="px-6 py-16 max-w-3xl mx-auto">
      {content.title && <h2 className="text-3xl font-bold mb-8">{content.title}</h2>}
      <div className="space-y-3">
        {items.map((q, i) => (
          <details key={i} className="border rounded-lg group">
            <summary className="cursor-pointer p-4 font-semibold flex items-center justify-between list-none">
              <span>{q.question}</span>
              <span className="opacity-50 group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <div className="px-4 pb-4 text-sm opacity-80 whitespace-pre-line">{q.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
