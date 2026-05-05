import type { FooterBlock } from '@/lib/types';

export function Footer({ content }: { content: FooterBlock['content'] }) {
  const bg = content.background_color ?? '#0f172a';
  const text = content.text_color ?? '#94a3b8';

  return (
    <footer style={{ backgroundColor: bg, color: text }} className="px-6 py-8 text-center text-sm">
      {content.text ?? ''}
    </footer>
  );
}
