import type { Metadata } from 'next';
import '@fontsource/bodoni-moda/latin-400.css';
import '@fontsource/bodoni-moda/latin-400-italic.css';
import '@fontsource/bodoni-moda/latin-500.css';
import '@fontsource-variable/roboto-flex/full.css';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'AVORA COFFEE — Coffee made for slower moments',
  description:
    'A warm, modern specialty coffee house built around thoughtful sourcing, careful craft and slower moments.',
  openGraph: {
    title: 'AVORA COFFEE',
    description: 'Coffee made for slower moments.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AVORA COFFEE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AVORA COFFEE',
    description: 'Coffee made for slower moments.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
