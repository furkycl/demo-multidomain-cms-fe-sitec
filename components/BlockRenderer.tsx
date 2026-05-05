import type { Block, Site } from '@/lib/types';
import type { Locale } from '@/lib/locales';
import { Header } from './blocks/Header';
import { Hero } from './blocks/Hero';
import { RichText } from './blocks/RichText';
import { Footer } from './blocks/Footer';
import { HeroSchool } from './blocks/HeroSchool';
import { CourseGrid } from './blocks/CourseGrid';
import { AccommodationGrid } from './blocks/AccommodationGrid';
import { CityHighlights } from './blocks/CityHighlights';
import { ArticleList } from './blocks/ArticleList';
import { PricingTable } from './blocks/PricingTable';
import { ContactForm } from './blocks/ContactForm';
import { Faq } from './blocks/Faq';
import { Testimonials } from './blocks/Testimonials';
import { TrustBar } from './blocks/TrustBar';
import { CtaBanner } from './blocks/CtaBanner';
import { FooterMega } from './blocks/FooterMega';

const COMPONENTS = {
  header: Header,
  hero: Hero,
  rich_text: RichText,
  footer: Footer,
  hero_school: HeroSchool,
  course_grid: CourseGrid,
  accommodation_grid: AccommodationGrid,
  city_highlights: CityHighlights,
  article_list: ArticleList,
  pricing_table: PricingTable,
  contact_form: ContactForm,
  faq: Faq,
  testimonials: Testimonials,
  trust_bar: TrustBar,
  cta_banner: CtaBanner,
  footer_mega: FooterMega,
} as const;

export function BlockRenderer({
  blocks,
  site,
  locale,
  alternates,
}: {
  blocks: Block[];
  site: Site;
  locale: Locale;
  alternates: Record<string, string>;
}) {
  return (
    <main>
      {blocks.map((block) => {
        const Component = COMPONENTS[block.type] as
          | React.ComponentType<{
              content: typeof block.content;
              site: Site;
              locale: Locale;
              alternates: Record<string, string>;
            }>
          | undefined;

        if (!Component) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.warn(`[BlockRenderer] unknown block type: ${(block as { type: string }).type}`);
          }
          return null;
        }

        return (
          <Component
            key={block.id}
            content={block.content}
            site={site}
            locale={locale}
            alternates={alternates}
          />
        );
      })}
    </main>
  );
}
