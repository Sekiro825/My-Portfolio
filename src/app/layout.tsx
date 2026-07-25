import type { Metadata, Viewport } from 'next';
import { Outfit, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const displayFont = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
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
  title: 'Saket Pokale — Portfolio',
  description: 'Product Engineer trainee building at the intersection of Generative AI and Cybersecurity. Full-stack, AI/ML, and a passion for shipping.',
  openGraph: {
    title: 'Saket Pokale — Portfolio',
    description: 'Product Engineer trainee building at the intersection of Generative AI and Cybersecurity.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#FAFAFA',
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
      <body className="relative min-h-screen overflow-x-hidden bg-bg text-text antialiased">
        {/* Content layer */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
