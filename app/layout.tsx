import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import CameraSystem from './components/CameraSystem';
import './globals.css';
import './styles/transitions.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Oscar Eriksen — CS Graduate Student',
  description:
    'Personal portfolio of Oscar Eriksen, M.S. Computer Science graduate student at Seattle University.',
  openGraph: {
    title: 'Oscar Eriksen — CS Graduate Student',
    description:
      'Personal portfolio showcasing projects, experience, and skills.',
    type: 'website',
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
      >
        <CameraSystem>{children}</CameraSystem>
      </body>
    </html>
  );
}