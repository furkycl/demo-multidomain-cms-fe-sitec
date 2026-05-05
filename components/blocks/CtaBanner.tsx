import type { CtaBannerBlock } from '@/lib/types';

export function CtaBanner({ content }: { content: CtaBannerBlock['content'] }) {
  const bg = content.background_color ?? '#1e40af';
  const text = content.text_color ?? '#ffffff';
  const style: React.CSSProperties = {
    backgroundColor: bg,
    color: text,
    backgroundImage: content.background_image
      ? `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${content.background_image})`
      : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <section style={style} className="px-6 py-16 text-center">
      {content.headline && <h2 className="text-3xl md:text-4xl font-bold mb-3">{content.headline}</h2>}
      {content.text && <p className="text-lg max-w-2xl mx-auto mb-6 opacity-90">{content.text}</p>}
      {content.cta_label && content.cta_href && (
        <a
          href={content.cta_href}
          className="inline-block px-8 py-3 rounded bg-white text-black font-semibold hover:opacity-90"
        >
          {content.cta_label}
        </a>
      )}
    </section>
  );
}
