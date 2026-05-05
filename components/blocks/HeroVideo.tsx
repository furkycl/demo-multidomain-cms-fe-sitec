import type { HeroVideoBlock } from '@/lib/types';

export function HeroVideo({ content }: { content: HeroVideoBlock['content'] }) {
  const videoId = extractYouTubeId(content.youtube_url ?? '');
  const stats = content.stats ?? [];

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col overflow-hidden">
      <div className="absolute inset-0">
        {videoId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3`}
            title="Hero background"
            className="absolute w-[270vh] min-w-full min-h-full"
            style={{ aspectRatio: '16/9', top: '35%', left: '50%', transform: 'translate3d(-50%, -50%, 0)' }}
            allow="autoplay; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
          />
        ) : content.poster_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={content.poster_image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F1A3C] to-[#142042]" />
        )}
        <div className="absolute inset-0 bg-[#0F1A3C]/65" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-8 w-full">
        {content.badge_text && (
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 text-white/80 text-[13px] font-medium">
              <span className="w-2 h-2 rounded-full bg-white/60" />
              {content.badge_text}
            </span>
          </div>
        )}
        {content.headline && (
          <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] max-w-3xl">
            {content.headline}
          </h1>
        )}
        {content.subheadline && (
          <p className="mt-6 text-white/75 text-base sm:text-lg max-w-xl leading-relaxed">{content.subheadline}</p>
        )}
        <div className="mt-10 flex flex-wrap gap-4">
          {content.cta_label && content.cta_href && (
            <a href={content.cta_href} className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#E31837] hover:bg-[#c71430] text-white text-[15px] font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-red-600/25">
              {content.cta_label}
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
          )}
          {content.secondary_cta_label && content.secondary_cta_href && (
            <a href={content.secondary_cta_href} className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-[15px] font-medium rounded-lg border border-white/30 hover:border-white/50 transition-all duration-300">
              {content.secondary_cta_label}
            </a>
          )}
        </div>
      </div>

      {stats.length > 0 && (
        <div className="relative z-10 bg-[#0F1A3C]/90 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {stats.map((stat, i) => (
                <div key={i} className="py-6 md:py-8 text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
                  <div className="mt-1.5 text-[12px] sm:text-[13px] text-white/60 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function extractYouTubeId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    const v = url.searchParams.get('v');
    if (v && /^[\w-]{11}$/.test(v)) return v;
    const last = url.pathname.split('/').filter(Boolean).pop();
    if (last && /^[\w-]{11}$/.test(last)) return last;
  } catch { /* ignore */ }
  return null;
}
