import type { TrustBarBlock } from '@/lib/types';

export function TrustBar({ content }: { content: TrustBarBlock['content'] }) {
  const logos = content.logos ?? [];
  if (logos.length === 0) return null;

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      {content.title && (
        <p className="text-center text-sm uppercase tracking-wider opacity-60 mb-6">{content.title}</p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-8">
        {logos.map((l, i) => {
          const Wrapper = l.href ? 'a' : 'div';
          return (
            // @ts-expect-error dynamic element
            <Wrapper
              key={i}
              {...(l.href ? { href: l.href, rel: 'noopener', target: '_blank' } : {})}
              className="grayscale hover:grayscale-0 transition opacity-60 hover:opacity-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.image_url} alt={l.name} className="h-12 object-contain" />
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}
