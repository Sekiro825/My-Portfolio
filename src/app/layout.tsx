import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const displayFont = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Saket Pokale — Cinematic Portfolio',
  description: 'Product Engineer trainee building at the intersection of Generative AI and Cybersecurity. Full-stack, AI/ML, and a passion for shipping.',
  openGraph: {
    title: 'Saket Pokale — Cinematic Portfolio',
    description: 'Product Engineer trainee building at the intersection of Generative AI and Cybersecurity.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#08090d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}>
      <head>
        <link rel="icon" href="/My-Portfolio/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="relative min-h-screen overflow-x-hidden bg-ink-900 text-white antialiased">
        {/* Cinematic background overlays */}
        <div className="grain pointer-events-none fixed inset-0" aria-hidden="true" />
        <div className="scanlines pointer-events-none fixed inset-0" aria-hidden="true" />
        <div className="vignette pointer-events-none fixed inset-0" aria-hidden="true" />

        {/* Content layer */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
