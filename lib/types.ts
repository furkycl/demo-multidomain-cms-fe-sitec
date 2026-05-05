/**
 * Backend Block::TYPES ile eş tutulmalı.
 * Yeni tip eklerken: backend cast'i + bu dosya + components/blocks/<Name>.tsx
 */

export type BlockBase = {
  id: number;
  order: number;
  schema_version: number;
};

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
  content: {
    markdown?: string;
  };
};

export type FooterBlock = BlockBase & {
  type: 'footer';
  content: {
    text?: string;
    background_color?: string;
    text_color?: string;
  };
};

export type Block = HeaderBlock | HeroBlock | RichTextBlock | FooterBlock;

export type Site = {
  domain: string;
  name: string;
  theme: Record<string, string>;
};

export type Page = {
  slug: string;
  title: string;
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
};
