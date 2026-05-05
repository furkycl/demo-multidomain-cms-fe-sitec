'use client';

import { useState } from 'react';
import type { DestinationsGridBlock } from '@/lib/types';

/**
 * Kaplan-style destination cards with hover video preview.
 *  - Card: bg-white, rounded-2xl, border, shadow on hover, lift on hover
 *  - Image: 16:9 thumbnail, hover → embedded YouTube autoplay
 *  - MapPin badge bottom-left over image
 *  - Red "Learn more →" CTA
 */
export function DestinationsGrid({ content }: { content: DestinationsGridBlock['content'] }) {
  const items = content.items ?? [];
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          {content.title && (
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-[#0F1A3C]">{content.title}</h2>
          )}
          {content.intro && (
            <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">{content.intro}</p>
          )}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-gray-50 rounded-2xl border border-dashed border-gray-300 h-72 flex items-center justify-center text-gray-400 text-sm">
                Add destination from admin
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="locations" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {(content.title || content.intro) && (
          <div className="text-center mb-14">
            {content.title && (
              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-[#0F1A3C] leading-tight">
                {content.title}
              </h2>
            )}
            {content.intro && (
              <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                {content.intro}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((d, i) => {
            const cardId = `${d.city}-${i}`;
            const videoId = d.youtube_url ? extractYouTubeId(d.youtube_url) : null;
            const showVideo = hoveredId === cardId && videoId;

            return (
              <a
                key={cardId}
                href={d.href ?? '#'}
                onMouseEnter={() => setHoveredId(cardId)}
                onMouseLeave={() => setHoveredId(null)}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1 transition-all duration-300 block"
              >
                {/* Image / hover video */}
                <div className="relative h-48 overflow-hidden bg-black">
                  {showVideo ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3&start=3`}
                      title={d.city}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ aspectRatio: '16/9', width: '177.78%', height: '100%' }}
                      allow="autoplay; encrypted-media"
                      tabIndex={-1}
                    />
                  ) : d.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={d.image_url}
                      alt={d.city}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0F1A3C] to-[#142042]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  {d.country && (
                    <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[#0F1A3C] text-[12px] font-medium px-3 py-1 rounded-full">
                      📍 {d.country}
                    </div>
                  )}
                  {d.badge && (
                    <span className="absolute top-3 right-3 bg-[#E31837] text-white text-[11px] uppercase font-bold px-2.5 py-1 rounded">
                      {d.badge}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#0F1A3C]">{d.city}</h3>
                  {d.description && (
                    <p className="mt-2 text-gray-600 text-[14px] leading-relaxed line-clamp-2">{d.description}</p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[#E31837] text-[14px] font-semibold group-hover:gap-2.5 transition-all duration-200">
                    Learn more
                    <span>→</span>
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
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
  } catch {
    // ignore
  }
  return null;
}
