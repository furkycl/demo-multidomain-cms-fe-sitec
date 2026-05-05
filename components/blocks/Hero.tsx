import type { HeroBlock } from '@/lib/types';

export function Hero({ content }: { content: HeroBlock['content'] }) {
  const bg = content.background_color ?? '#0f172a';
  const text = content.text_color ?? '#ffffff';

  const style: React.CSSProperties = {
    backgroundColor: bg,
    color: text,
    backgroundImage: content.background_image
      ? `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${content.background_image})`
      : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <section style={style} className="px-6 py-24 text-center">
      {content.headline && (
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{content.headline}</h1>
      )}
      {content.subheadline && (
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">{content.subheadline}</p>
      )}
      {content.cta_label && content.cta_href && (
        <a
          href={content.cta_href}
          className="inline-block mt-8 px-6 py-3 rounded bg-white text-black font-medium hover:opacity-90"
        >
          {content.cta_label}
        </a>
      )}
    </section>
  );
}
