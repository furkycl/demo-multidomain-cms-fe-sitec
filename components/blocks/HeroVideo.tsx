import type { HeroVideoBlock } from '@/lib/types';

/**
 * Hero with YouTube video as background. Iframe is autoplay+mute+loop+controlsless.
 * Foreground: badge, headline, subheadline, primary + secondary CTAs.
 */
export function HeroVideo({ content }: { content: HeroVideoBlock['content'] }) {
  const videoId = extractYouTubeId(content.youtube_url ?? '');
  const overlay = content.overlay_color ?? 'rgba(15,30,61,0.55)';

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '85vh' }}>
      {/* Video background */}
      {videoId ? (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <iframe
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] min-w-full h-[56.25vw] min-h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&playlist=${videoId}&playsinline=1&rel=0`}
            title="Hero background"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            tabIndex={-1}
          />
        </div>
      ) : content.poster_image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={content.poster_image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: overlay }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 py-32 min-h-[85vh]">
        {content.badge_text && (
          <span className="inline-block bg-white/15 backdrop-blur px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-6 border border-white/20">
            {content.badge_text}
          </span>
        )}
        {content.headline && (
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-5 max-w-5xl leading-tight tracking-tight">
            {content.headline}
          </h1>
        )}
        {content.subheadline && (
          <p className="text-lg md:text-xl max-w-2xl opacity-90 mb-10">{content.subheadline}</p>
        )}
        <div className="flex gap-3 flex-wrap justify-center">
          {content.cta_label && content.cta_href && (
            <a
              href={content.cta_href}
              className="inline-block px-7 py-3.5 rounded-md bg-white text-slate-900 font-semibold hover:bg-slate-100 transition shadow-lg"
            >
              {content.cta_label}
            </a>
          )}
          {content.secondary_cta_label && content.secondary_cta_href && (
            <a
              href={content.secondary_cta_href}
              className="inline-block px-7 py-3.5 rounded-md border-2 border-white/60 hover:bg-white/10 backdrop-blur transition"
            >
              {content.secondary_cta_label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

/** YouTube URL'inden video id'sini çıkarır.
 *  Destekler:
 *    https://www.youtube.com/watch?v=XXXX
 *    https://youtu.be/XXXX
 *    https://www.youtube.com/embed/XXXX
 *    XXXX (raw id)
 */
function extractYouTubeId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  // Raw 11-char id
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    const v = url.searchParams.get('v');
    if (v && /^[\w-]{11}$/.test(v)) return v;
    const parts = url.pathname.split('/').filter(Boolean);
    const last = parts[parts.length - 1];
    if (last && /^[\w-]{11}$/.test(last)) return last;
  } catch {
    // Not a URL
  }
  return null;
}
