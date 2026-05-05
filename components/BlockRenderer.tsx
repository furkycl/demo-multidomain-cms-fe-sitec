import type { Block, Site } from '@/lib/types';
import { Header } from '@/components/blocks/Header';
import { Hero } from '@/components/blocks/Hero';
import { RichText } from '@/components/blocks/RichText';
import { Footer } from '@/components/blocks/Footer';

/**
 * Yeni bir blok tipi eklerken bu map'e kaydet.
 * Backend Block::TYPES ile birebir eş.
 */
const COMPONENTS = {
  header: Header,
  hero: Hero,
  rich_text: RichText,
  footer: Footer,
} as const;

export function BlockRenderer({ blocks, site }: { blocks: Block[]; site: Site }) {
  return (
    <main>
      {blocks.map((block) => {
        const Component = COMPONENTS[block.type] as
          | React.ComponentType<{ content: typeof block.content; site: Site }>
          | undefined;

        if (!Component) {
          // Bilinmeyen tip — sessizce atla. Konsola not düş.
          if (process.env.NODE_ENV !== 'production') {
            console.warn(`[BlockRenderer] unknown block type: ${(block as { type: string }).type}`);
          }
          return null;
        }

        return <Component key={block.id} content={block.content} site={site} />;
      })}
    </main>
  );
}
