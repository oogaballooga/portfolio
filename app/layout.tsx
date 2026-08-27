import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import CameraSystem from './components/CameraSystem';
import { siteUrl } from './lib/site-url';
import './globals.css';
import './styles/transitions.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Oscar Eriksen — CS Graduate Student',
  description:
    'Personal portfolio of Oscar Eriksen, M.S. Computer Science graduate student at Seattle University.',
  openGraph: {
    title: 'Oscar Eriksen — CS Graduate Student',
    description:
      'Personal portfolio showcasing projects, experience, and skills.',
    type: 'website',
    url: siteUrl,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Oscar Eriksen — CS Graduate Student',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oscar Eriksen — CS Graduate Student',
    description:
      'Personal portfolio showcasing projects, experience, and skills.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <CameraSystem>{children}</CameraSystem>
      </body>
    </html>
  );
}
