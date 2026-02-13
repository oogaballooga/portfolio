"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import ScrollToTop from "./components/ScrollToTop";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    pathname === href ? "font-bold scale-120" : "";

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ScrollToTop />
        <nav className="navbar">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/academics" className={linkClass("/academics")}>Academics</Link>
          <Link href="/internships" className={linkClass("/internships")}>Internships</Link>
          <Link href="/projects" className={linkClass("/projects")}>Projects</Link>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}
