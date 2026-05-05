import type { HeroSchoolBlock } from '@/lib/types';

export function HeroSchool({ content }: { content: HeroSchoolBlock['content'] }) {
  const overlay = content.overlay_color ?? 'rgba(15,23,42,0.55)';
  const style: React.CSSProperties = content.background_image
    ? {
        backgroundImage: `linear-gradient(${overlay},${overlay}), url(${content.background_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)' };

  return (
    <section style={style} className="px-6 py-32 text-white text-center">
      {content.badge_text && (
        <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-6">
          {content.badge_text}
        </span>
      )}
      {content.headline && (
        <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl mx-auto">{content.headline}</h1>
      )}
      {content.subheadline && (
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 mb-8">{content.subheadline}</p>
      )}
      <div className="flex gap-3 justify-center flex-wrap">
        {content.cta_label && content.cta_href && (
          <a
            href={content.cta_href}
            className="inline-block px-6 py-3 rounded bg-white text-black font-semibold hover:opacity-90"
          >
            {content.cta_label}
          </a>
        )}
        {content.secondary_cta_label && content.secondary_cta_href && (
          <a
            href={content.secondary_cta_href}
            className="inline-block px-6 py-3 rounded border border-white/40 hover:bg-white/10"
          >
            {content.secondary_cta_label}
          </a>
        )}
      </div>
    </section>
  );
}
