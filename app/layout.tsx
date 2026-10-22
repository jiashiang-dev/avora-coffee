import type { Metadata } from 'next';
import '@fontsource/bodoni-moda/latin-400.css';
import '@fontsource/bodoni-moda/latin-400-italic.css';
import '@fontsource/bodoni-moda/latin-500.css';
import '@fontsource-variable/roboto-flex/full.css';
import './globals.css';
import { publicAsset } from './asset-path';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
const socialImageUrl = `${siteUrl}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'AVORA COFFEE — Coffee made for slower moments',
  description:
    'A warm, modern specialty coffee house built around thoughtful sourcing, careful craft and slower moments.',
  icons: { icon: publicAsset('/favicon.svg') },
  openGraph: {
    title: 'AVORA COFFEE',
    description: 'Coffee made for slower moments.',
    images: [{ url: socialImageUrl, width: 1200, height: 630, alt: 'AVORA COFFEE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AVORA COFFEE',
    description: 'Coffee made for slower moments.',
    images: [socialImageUrl],
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
