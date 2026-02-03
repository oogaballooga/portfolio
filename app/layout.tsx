import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="navbar">
          <Link href="/">Home</Link>
          <Link href="/academics">Academics</Link>
          <Link href="/internships">Internships</Link>
          <Link href="/projects">Projects</Link>
        </nav>

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
