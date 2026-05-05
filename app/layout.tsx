import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'multi-cms site',
  description: 'Powered by multi-cms',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
