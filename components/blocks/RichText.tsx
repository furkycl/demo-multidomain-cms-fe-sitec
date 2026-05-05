import type { RichTextBlock } from '@/lib/types';
import ReactMarkdown from 'react-markdown';

export function RichText({ content }: { content: RichTextBlock['content'] }) {
  if (!content.markdown) return null;

  return (
    <section className="px-6 py-16 max-w-3xl mx-auto prose">
      <ReactMarkdown>{content.markdown}</ReactMarkdown>
    </section>
  );
}
