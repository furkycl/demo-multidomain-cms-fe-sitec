import type { Locale } from './locales';

export type BlockBase = {
  id: number;
  order: number;
  schema_version: number;
};

// ─── Generic (legacy) ───────────────────────────────────────────────────
export type HeaderBlock = BlockBase & {
  type: 'header';
  content: {
    title?: string;
    background_color?: string;
    logo_url?: string;
    links?: Array<{ label: string; href: string }>;
  };
};

export type HeroBlock = BlockBase & {
  type: 'hero';
  content: {
    headline?: string;
    subheadline?: string;
    cta_label?: string;
    cta_href?: string;
    background_color?: string;
    text_color?: string;
    background_image?: string;
  };
};

export type RichTextBlock = BlockBase & {
  type: 'rich_text';
  content: { markdown?: string };
};

export type FooterBlock = BlockBase & {
  type: 'footer';
  content: {
    text?: string;
    background_color?: string;
    text_color?: string;
  };
};

// ─── School microsite ──────────────────────────────────────────────────
export type HeroSchoolBlock = BlockBase & {
  type: 'hero_school';
  content: {
    badge_text?: string;
    headline?: string;
    subheadline?: string;
    cta_label?: string;
    cta_href?: string;
    secondary_cta_label?: string;
    secondary_cta_href?: string;
    background_image?: string;
    overlay_color?: string;
  };
};

export type CourseGridBlock = BlockBase & {
  type: 'course_grid';
  content: {
    title?: string;
    intro?: string;
    items?: Array<{
      name: string;
      level?: string;
      duration?: string;
      price_from?: string;
      image_url?: string;
      href?: string;
      description?: string;
    }>;
  };
};

export type AccommodationGridBlock = BlockBase & {
  type: 'accommodation_grid';
  content: {
    title?: string;
    items?: Array<{
      name: string;
      type?: 'host_family' | 'residence' | 'shared_apartment' | 'private_apartment' | 'hotel';
      price_per_week?: string;
      image_url?: string;
      description?: string;
      features?: string[];
    }>;
  };
};

export type CityHighlightsBlock = BlockBase & {
  type: 'city_highlights';
  content: {
    title?: string;
    intro?: string;
    highlights?: Array<{ icon?: string; title: string; description?: string }>;
  };
};

export type ArticleListBlock = BlockBase & {
  type: 'article_list';
  content: {
    title?: string;
    items?: Array<{
      title: string;
      excerpt?: string;
      image_url?: string;
      date?: string;
      href?: string;
    }>;
  };
};

export type PricingTableBlock = BlockBase & {
  type: 'pricing_table';
  content: {
    title?: string;
    intro?: string;
    plans?: Array<{
      name: string;
      price: string;
      period?: string;
      features?: string[];
      cta_label?: string;
      cta_href?: string;
      highlighted?: boolean;
    }>;
  };
};

export type ContactFormBlock = BlockBase & {
  type: 'contact_form';
  content: {
    title?: string;
    intro?: string;
    form_type?: 'contact' | 'brochure' | 'callback' | 'price_quote';
    success_message?: string;
    cta_label?: string;
    show_phone?: boolean;
    show_message?: boolean;
    show_course_interest?: boolean;
  };
};

export type FaqBlock = BlockBase & {
  type: 'faq';
  content: {
    title?: string;
    items?: Array<{ question: string; answer: string }>;
  };
};

export type TestimonialsBlock = BlockBase & {
  type: 'testimonials';
  content: {
    title?: string;
    items?: Array<{
      quote: string;
      author: string;
      author_title?: string;
      avatar_url?: string;
      rating?: number;
    }>;
  };
};

export type TrustBarBlock = BlockBase & {
  type: 'trust_bar';
  content: {
    title?: string;
    logos?: Array<{ name: string; image_url: string; href?: string }>;
  };
};

export type CtaBannerBlock = BlockBase & {
  type: 'cta_banner';
  content: {
    headline?: string;
    text?: string;
    cta_label?: string;
    cta_href?: string;
    background_color?: string;
    text_color?: string;
    background_image?: string;
  };
};


export type AboutBlock = BlockBase & {
  type: 'about';
  content: {
    title?: string;
    description?: string;
    image_url?: string;
    badge_value?: string;
    badge_label?: string;
    features?: Array<{
      icon?: string;
      title: string;
      description?: string;
    }>;
  };
};

export type FooterMegaBlock = BlockBase & {
  type: 'footer_mega';
  content: {
    logo_url?: string;
    tagline?: string;
    columns?: Array<{ title: string; links: Array<{ label: string; href: string }> }>;
    social_links?: Array<{ platform: string; href: string }>;
    copyright_text?: string;
    background_color?: string;
    text_color?: string;
  };
};

// ─── Union ────────────────────────────────────────────────────────────
export type Block =
  | HeaderBlock | HeroBlock | HeroVideoBlock | RichTextBlock | FooterBlock
  | HeroSchoolBlock | CourseGridBlock | AccommodationGridBlock | DestinationsGridBlock
  | AboutBlock | CityHighlightsBlock | ArticleListBlock | PricingTableBlock
  | ContactFormBlock | FaqBlock | TestimonialsBlock | TrustBarBlock
  | CtaBannerBlock | FooterMegaBlock;

// ─── API response shapes ─────────────────────────────────────────────
export type Site = {
  domain: string;
  name: string;
  brand: 'kaplan' | 'alpadia' | 'azurlingua' | null;
  city: string | null;
  country: string | null;
  theme: Record<string, string>;
};

export type Page = {
  slug: string;
  title: string;
  locale: Locale;
  seo: {
    title?: string;
    description?: string;
    og_image?: string;
  };
};

export type PageResponse = {
  site: Site;
  page: Page;
  blocks: Block[];
  alternates: Record<string, string>;
  locales: Locale[];
};

export type SiteResponse = {
  domain: string;
  name: string;
  brand: string | null;
  city: string | null;
  country: string | null;
  theme: Record<string, string>;
  locales: Locale[];
  default_locale: string;
};
