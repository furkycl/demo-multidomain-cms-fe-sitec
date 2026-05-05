import type { AboutBlock } from '@/lib/types';

/**
 * Kaplan TV-style About / Why Choose section:
 *  - 2 column layout: text+features on left, image+floating badge on right
 *  - 4 feature grid 2x2 (icon + title + desc)
 *  - Red floating badge with stat value/label
 */
export function About({ content }: { content: AboutBlock['content'] }) {
  const features = content.features ?? [];

  return (
    <section id="about" className="bg-[#F5F7FA] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left — text + features */}
          <div>
            {content.title && (
              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-[#0F1A3C] leading-tight">
                {content.title}
              </h2>
            )}
            {content.description && (
              <p className="mt-5 text-gray-600 text-[16px] leading-relaxed">{content.description}</p>
            )}

            {features.length > 0 && (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#0F1A3C]/5 flex items-center justify-center text-[#0F1A3C]/70 text-2xl">
                      {f.icon || '★'}
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-[#0F1A3C]">{f.title}</h3>
                      {f.description && (
                        <p className="mt-1 text-[13px] text-gray-600 leading-relaxed">{f.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — image with floating red badge */}
          {content.image_url && (
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={content.image_url}
                  alt={content.title ?? ''}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              {(content.badge_value || content.badge_label) && (
                <div className="absolute -bottom-5 -right-2 sm:right-6 bg-[#E31837] text-white rounded-2xl px-7 py-5 shadow-xl shadow-red-600/20">
                  {content.badge_value && (
                    <div className="text-3xl sm:text-4xl font-bold">{content.badge_value}</div>
                  )}
                  {content.badge_label && (
                    <div className="text-[13px] font-medium text-white/90 mt-0.5">{content.badge_label}</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
